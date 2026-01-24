import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { generateClient } from 'aws-amplify/api';
import { useAuth } from '../../contexts/AuthContext';
import { UserProfile, ProfessionalSearchFilters, AvailabilityStatus } from '../../types';
import { listProfessionals } from '../../graphql/queries';
import { ProfileCard } from '../Profile';
import { Loading, EmptyState, Pagination } from '../Common';
import './Search.css';

const client = generateClient();

const AVAILABILITY_OPTIONS: { value: AvailabilityStatus; label: string }[] = [
  { value: 'AVAILABLE', label: 'Available' },
  { value: 'PARTIALLY_AVAILABLE', label: 'Partially Available' },
  { value: 'OPEN_TO_OFFERS', label: 'Open to Offers' }
];

const ProfessionalSearch: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { profile } = useAuth();

  const [professionals, setProfessionals] = useState<UserProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [nextToken, setNextToken] = useState<string | null>(null);

  const [filters, setFilters] = useState<ProfessionalSearchFilters>({
    keyword: searchParams.get('keyword') || '',
    skills: searchParams.get('skills')?.split(',').filter(Boolean) || [],
    availability: [],
    location: searchParams.get('location') || '',
    minRate: searchParams.get('minRate') ? parseInt(searchParams.get('minRate')!) : undefined,
    maxRate: searchParams.get('maxRate') ? parseInt(searchParams.get('maxRate')!) : undefined,
    minRating: searchParams.get('minRating') ? parseFloat(searchParams.get('minRating')!) : undefined
  });

  const [showFilters, setShowFilters] = useState(false);
  const [skillInput, setSkillInput] = useState('');

  const fetchProfessionals = useCallback(async (loadMore = false) => {
    try {
      setIsLoading(true);

      const filter: any = {
        userType: { eq: 'PROFESSIONAL' }
      };

      const response: any = await client.graphql({
        query: listProfessionals,
        variables: {
          filter,
          limit: 20,
          nextToken: loadMore ? nextToken : null
        },
        authMode: 'userPool'
      });

      let fetchedProfs = response.data?.listUserProfiles?.items || [];
      const newNextToken = response.data?.listUserProfiles?.nextToken;

      // Client-side filtering
      if (filters.keyword) {
        const keyword = filters.keyword.toLowerCase();
        fetchedProfs = fetchedProfs.filter((prof: UserProfile) =>
          prof.firstName.toLowerCase().includes(keyword) ||
          prof.lastName.toLowerCase().includes(keyword) ||
          prof.headline?.toLowerCase().includes(keyword) ||
          prof.skills?.some(s => s.name.toLowerCase().includes(keyword))
        );
      }

      if (filters.skills && filters.skills.length > 0) {
        fetchedProfs = fetchedProfs.filter((prof: UserProfile) =>
          filters.skills!.some(skill =>
            prof.skills?.some(s => s.name.toLowerCase().includes(skill.toLowerCase()))
          )
        );
      }

      if (filters.availability && filters.availability.length > 0) {
        fetchedProfs = fetchedProfs.filter((prof: UserProfile) =>
          prof.availability && filters.availability!.includes(prof.availability.status)
        );
      }

      if (filters.location) {
        const loc = filters.location.toLowerCase();
        fetchedProfs = fetchedProfs.filter((prof: UserProfile) =>
          prof.location?.toLowerCase().includes(loc)
        );
      }

      if (filters.minRate !== undefined) {
        fetchedProfs = fetchedProfs.filter((prof: UserProfile) =>
          prof.hourlyRate && prof.hourlyRate >= filters.minRate!
        );
      }

      if (filters.maxRate !== undefined) {
        fetchedProfs = fetchedProfs.filter((prof: UserProfile) =>
          prof.hourlyRate && prof.hourlyRate <= filters.maxRate!
        );
      }

      if (filters.minRating !== undefined) {
        fetchedProfs = fetchedProfs.filter((prof: UserProfile) =>
          prof.averageRating && prof.averageRating >= filters.minRating!
        );
      }

      if (loadMore) {
        setProfessionals(prev => [...prev, ...fetchedProfs]);
      } else {
        setProfessionals(fetchedProfs);
      }

      setNextToken(newNextToken);
    } catch (err: any) {
      setError(err.message || 'Failed to load professionals');
    } finally {
      setIsLoading(false);
    }
  }, [filters, nextToken]);

  useEffect(() => {
    fetchProfessionals();
  }, [filters]);

  const handleKeywordSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Trigger search
    fetchProfessionals();
  };

  const handleAddSkill = () => {
    if (skillInput.trim() && !filters.skills?.includes(skillInput.trim())) {
      setFilters(prev => ({
        ...prev,
        skills: [...(prev.skills || []), skillInput.trim()]
      }));
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setFilters(prev => ({
      ...prev,
      skills: prev.skills?.filter(s => s !== skill)
    }));
  };

  const handleAvailabilityToggle = (status: AvailabilityStatus) => {
    setFilters(prev => ({
      ...prev,
      availability: prev.availability?.includes(status)
        ? prev.availability.filter(s => s !== status)
        : [...(prev.availability || []), status]
    }));
  };

  const handleMessage = (prof: UserProfile) => {
    window.location.href = `/messages/new?userId=${prof.id}`;
  };

  const handleInvite = (prof: UserProfile) => {
    // TODO: Implement job invite modal
    console.log('Invite professional:', prof.id);
  };

  const clearFilters = () => {
    setFilters({});
    setSkillInput('');
  };

  return (
    <div className="search-page">
      <div className="search-header">
        <h1>Find Professionals</h1>
        <p>Discover talented professionals for your projects</p>
      </div>

      <div className="search-container">
        {/* Search Bar */}
        <form onSubmit={handleKeywordSearch} className="search-bar">
          <div className="search-input-wrapper">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              type="text"
              placeholder="Search by name, skill, or keyword..."
              value={filters.keyword || ''}
              onChange={(e) => setFilters(prev => ({ ...prev, keyword: e.target.value }))}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Search
          </button>
          <button
            type="button"
            className="btn btn-secondary filter-btn"
            onClick={() => setShowFilters(!showFilters)}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="4" y1="21" x2="4" y2="14"></line>
              <line x1="4" y1="10" x2="4" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12" y2="3"></line>
              <line x1="20" y1="21" x2="20" y2="16"></line>
              <line x1="20" y1="12" x2="20" y2="3"></line>
              <line x1="1" y1="14" x2="7" y2="14"></line>
              <line x1="9" y1="8" x2="15" y2="8"></line>
              <line x1="17" y1="16" x2="23" y2="16"></line>
            </svg>
            Filters
          </button>
        </form>

        {/* Filters Panel */}
        {showFilters && (
          <div className="filters-panel-horizontal">
            <div className="filter-group">
              <label>Skills</label>
              <div className="skill-filter">
                <input
                  type="text"
                  placeholder="Add skill..."
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
                />
                <button type="button" onClick={handleAddSkill}>Add</button>
              </div>
              {filters.skills && filters.skills.length > 0 && (
                <div className="selected-filters">
                  {filters.skills.map(skill => (
                    <span key={skill} className="filter-tag">
                      {skill}
                      <button onClick={() => handleRemoveSkill(skill)}>&times;</button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="filter-group">
              <label>Availability</label>
              <div className="checkbox-inline">
                {AVAILABILITY_OPTIONS.map(({ value, label }) => (
                  <label key={value} className="checkbox-item">
                    <input
                      type="checkbox"
                      checked={filters.availability?.includes(value)}
                      onChange={() => handleAvailabilityToggle(value)}
                    />
                    {label}
                  </label>
                ))}
              </div>
            </div>

            <div className="filter-group">
              <label>Hourly Rate</label>
              <div className="rate-range">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.minRate || ''}
                  onChange={(e) => setFilters(prev => ({
                    ...prev,
                    minRate: e.target.value ? parseInt(e.target.value) : undefined
                  }))}
                />
                <span>to</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.maxRate || ''}
                  onChange={(e) => setFilters(prev => ({
                    ...prev,
                    maxRate: e.target.value ? parseInt(e.target.value) : undefined
                  }))}
                />
              </div>
            </div>

            <div className="filter-group">
              <label>Location</label>
              <input
                type="text"
                placeholder="City, state..."
                value={filters.location || ''}
                onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
              />
            </div>

            <div className="filter-group">
              <label>Min Rating</label>
              <select
                value={filters.minRating || ''}
                onChange={(e) => setFilters(prev => ({
                  ...prev,
                  minRating: e.target.value ? parseFloat(e.target.value) : undefined
                }))}
              >
                <option value="">Any</option>
                <option value="4">4+ stars</option>
                <option value="4.5">4.5+ stars</option>
              </select>
            </div>

            <button className="clear-btn" onClick={clearFilters}>
              Clear All
            </button>
          </div>
        )}

        {/* Results */}
        <div className="search-results">
          {error && <div className="alert alert-error">{error}</div>}

          {isLoading && professionals.length === 0 ? (
            <Loading message="Searching professionals..." />
          ) : professionals.length === 0 ? (
            <EmptyState
              icon={
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              }
              title="No professionals found"
              description="Try adjusting your search criteria or filters."
              action={
                <button className="btn btn-secondary" onClick={clearFilters}>
                  Clear Filters
                </button>
              }
            />
          ) : (
            <>
              <div className="results-count">
                {professionals.length} professional{professionals.length !== 1 ? 's' : ''} found
              </div>
              <div className="professionals-grid">
                {professionals.map(prof => (
                  <ProfileCard
                    key={prof.id}
                    profile={prof}
                    showActions={profile?.userType === 'EMPLOYER'}
                    onMessage={handleMessage}
                    onInvite={handleInvite}
                  />
                ))}
              </div>
              <Pagination
                hasMore={!!nextToken}
                isLoading={isLoading}
                onLoadMore={() => fetchProfessionals(true)}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfessionalSearch;
