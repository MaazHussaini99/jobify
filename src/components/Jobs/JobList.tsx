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
        authMode: 'userPool'
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
        <button
          className="btn btn-secondary filter-toggle"
          onClick={() => setShowFilters(!showFilters)}
        >
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>

        <div className={`filters-panel ${showFilters ? 'open' : ''}`}>
          <JobFilters filters={filters} onFilterChange={handleFilterChange} />
        </div>

        <div className="job-list-content">
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
