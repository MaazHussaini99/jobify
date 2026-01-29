import React, { useState, useEffect, useCallback } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { generateClient } from 'aws-amplify/api';
import { useAuth } from '../../contexts/AuthContext';
import { JobPosting, JobSearchFilters } from '../../types';
import { listJobPostings } from '../../graphql/queries';
import JobCard from './JobCard';
import JobFilters from './JobFilters';
import { Loading, EmptyState, Pagination } from '../Common';
import './Jobs.css';

const client = generateClient();

const JobList: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { isAuthenticated, profile } = useAuth();

  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [nextToken, setNextToken] = useState<string | null>(null);
  const [filters, setFilters] = useState<JobSearchFilters>({
    keyword: searchParams.get('keyword') || '',
    skills: searchParams.get('skills')?.split(',').filter(Boolean) || [],
    jobTypes: [],
    experienceLevels: [],
    locationTypes: [],
    location: searchParams.get('location') || ''
  });
  const [showFilters, setShowFilters] = useState(false);

  const fetchJobs = useCallback(async (loadMore = false) => {
    try {
      setIsLoading(true);

      // Build filter object
      const filter: any = {
        status: { eq: 'OPEN' }
      };

      if (filters.jobTypes && filters.jobTypes.length > 0) {
        filter.jobType = { eq: filters.jobTypes[0] };
      }

      if (filters.experienceLevels && filters.experienceLevels.length > 0) {
        filter.experienceLevel = { eq: filters.experienceLevels[0] };
      }

      if (filters.locationTypes && filters.locationTypes.length > 0) {
        filter.locationType = { eq: filters.locationTypes[0] };
      }

      const response: any = await client.graphql({
        query: listJobPostings,
        variables: {
          filter,
          limit: 20,
          nextToken: loadMore ? nextToken : null
        },
        authMode: isAuthenticated ? 'userPool' : 'apiKey'
      });

      const fetchedJobs = response.data?.listJobPostings?.items || [];
      const newNextToken = response.data?.listJobPostings?.nextToken;

      // Client-side filtering for skills and keyword
      let filteredJobs = fetchedJobs;

      if (filters.keyword) {
        const keyword = filters.keyword.toLowerCase();
        filteredJobs = filteredJobs.filter((job: JobPosting) =>
          job.title.toLowerCase().includes(keyword) ||
          job.description?.toLowerCase().includes(keyword) ||
          job.requiredSkills?.some(skill => skill.toLowerCase().includes(keyword))
        );
      }

      if (filters.skills && filters.skills.length > 0) {
        filteredJobs = filteredJobs.filter((job: JobPosting) =>
          filters.skills!.some(skill =>
            job.requiredSkills?.some(rs => rs.toLowerCase().includes(skill.toLowerCase()))
          )
        );
      }

      if (loadMore) {
        setJobs(prev => [...prev, ...filteredJobs]);
      } else {
        setJobs(filteredJobs);
      }

      setNextToken(newNextToken);
    } catch (err: any) {
      setError(err.message || 'Failed to load jobs');
    } finally {
      setIsLoading(false);
    }
  }, [filters, nextToken]);

  useEffect(() => {
    fetchJobs();
  }, [filters]);

  const handleFilterChange = (newFilters: JobSearchFilters) => {
    setFilters(newFilters);
    setNextToken(null);
  };

  const handleLoadMore = () => {
    if (nextToken) {
      fetchJobs(true);
    }
  };

  return (
    <div className="job-list-page">
      <div className="job-list-header">
        <div className="header-content">
          <h1>Find Jobs</h1>
          <p>Discover opportunities that match your skills</p>
        </div>
        {isAuthenticated && profile?.userType === 'EMPLOYER' && (
          <Link to="/jobs/create" className="btn btn-primary">
            Post a Job
          </Link>
        )}
      </div>

      <div className="job-list-container">
        <aside className={`filters-panel ${showFilters ? 'open' : ''}`}>
          <div className="filters-panel-header">
            <span>Filters</span>
            <button
              className="filter-close-btn"
              onClick={() => setShowFilters(false)}
              aria-label="Close filters"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          <JobFilters filters={filters} onFilterChange={handleFilterChange} />
        </aside>

        <div className="job-list-content">
          <button
            className="btn btn-secondary filter-toggle"
            onClick={() => setShowFilters(true)}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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

          {error && (
            <div className="alert alert-error">{error}</div>
          )}

          {isLoading && jobs.length === 0 ? (
            <Loading message="Loading jobs..." />
          ) : jobs.length === 0 ? (
            <EmptyState
              icon={
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                </svg>
              }
              title="No jobs found"
              description="Try adjusting your filters or check back later for new opportunities."
              action={
                <button
                  className="btn btn-secondary"
                  onClick={() => handleFilterChange({ keyword: '' })}
                >
                  Clear Filters
                </button>
              }
            />
          ) : (
            <>
              <div className="job-count">
                {jobs.length} job{jobs.length !== 1 ? 's' : ''} found
              </div>
              <div className="job-grid">
                {jobs.map(job => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
              <Pagination
                hasMore={!!nextToken}
                isLoading={isLoading}
                onLoadMore={handleLoadMore}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobList;
