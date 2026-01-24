import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { generateClient } from 'aws-amplify/api';
import { formatDistanceToNow } from 'date-fns';
import { useAuth } from '../../contexts/AuthContext';
import { JobPosting, JobApplication } from '../../types';
import { getJobPosting, listApplicationsByJob } from '../../graphql/queries';
import { updateJobPosting } from '../../graphql/mutations';
import { StarRating, Loading } from '../Common';
import './Jobs.css';

const client = generateClient();

const JobDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated, profile } = useAuth();

  const [job, setJob] = useState<JobPosting | null>(null);
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasApplied, setHasApplied] = useState(false);

  const isOwner = profile?.id === job?.employerId;

  useEffect(() => {
    const fetchJobDetails = async () => {
      if (!id) return;

      try {
        setIsLoading(true);

        const jobResponse: any = await client.graphql({
          query: getJobPosting,
          variables: { id },
          authMode: 'userPool'
        });

        const fetchedJob = jobResponse.data?.getJobPosting;
        if (!fetchedJob) {
          setError('Job not found');
          return;
        }

        setJob(fetchedJob);

        // Increment view count
        await client.graphql({
          query: updateJobPosting,
          variables: {
            input: {
              id,
              viewCount: (fetchedJob.viewCount || 0) + 1
            }
          },
          authMode: 'userPool'
        });

        // Fetch applications if employer
        if (profile?.id === fetchedJob.employerId) {
          const applicationsResponse: any = await client.graphql({
            query: listApplicationsByJob,
            variables: { jobId: id, limit: 50 },
            authMode: 'userPool'
          });
          setApplications(applicationsResponse.data?.listJobApplications?.items || []);
        }

        // Check if current user has applied
        if (profile?.userType === 'PROFESSIONAL') {
          const userApplicationsResponse: any = await client.graphql({
            query: listApplicationsByJob,
            variables: { jobId: id, limit: 100 },
            authMode: 'userPool'
          });
          const userApp = userApplicationsResponse.data?.listJobApplications?.items?.find(
            (app: JobApplication) => app.applicantId === profile.id
          );
          setHasApplied(!!userApp);
        }
      } catch (err: any) {
        setError(err.message || 'Failed to load job details');
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobDetails();
  }, [id, profile]);

  const formatBudget = () => {
    if (!job) return '';
    if (!job.minBudget && !job.maxBudget) return 'Negotiable';

    const type = job.compensationType === 'HOURLY' ? '/hr' : '';
    if (job.minBudget && job.maxBudget) {
      return `$${job.minBudget.toLocaleString()} - $${job.maxBudget.toLocaleString()}${type}`;
    }
    if (job.minBudget) return `From $${job.minBudget.toLocaleString()}${type}`;
    if (job.maxBudget) return `Up to $${job.maxBudget.toLocaleString()}${type}`;
    return 'Negotiable';
  };

  const getDurationLabel = (duration: string) => {
    const labels: Record<string, string> = {
      'LESS_THAN_WEEK': 'Less than a week',
      'ONE_TO_FOUR_WEEKS': '1-4 weeks',
      'ONE_TO_THREE_MONTHS': '1-3 months',
      'THREE_TO_SIX_MONTHS': '3-6 months',
      'MORE_THAN_SIX_MONTHS': 'More than 6 months',
      'ONGOING': 'Ongoing'
    };
    return labels[duration] || duration;
  };

  if (isLoading) {
    return <Loading message="Loading job details..." fullScreen />;
  }

  if (error || !job) {
    return (
      <div className="job-error">
        <h2>Job Not Found</h2>
        <p>{error || 'The job you are looking for does not exist or has been removed.'}</p>
        <Link to="/jobs" className="btn btn-primary">
          Browse Jobs
        </Link>
      </div>
    );
  }

  return (
    <div className="job-details-page">
      <div className="job-details-header">
        <Link to="/jobs" className="back-link">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Back to Jobs
        </Link>
      </div>

      <div className="job-details-container">
        <div className="job-details-main">
          {/* Job Header */}
          <div className="job-header-card">
            <div className="job-header-top">
              <div className="employer-info-large">
                {job.employer?.profilePicture ? (
                  <img src={job.employer.profilePicture} alt="" className="employer-logo" />
                ) : (
                  <div className="employer-logo placeholder">
                    {job.employer?.companyName?.[0] || 'C'}
                  </div>
                )}
                <div>
                  <Link to={`/profile/${job.employerId}`} className="employer-link">
                    {job.employer?.companyName || 'Company'}
                  </Link>
                  {job.employer?.averageRating && job.employer.averageRating > 0 && (
                    <div className="employer-rating">
                      <StarRating rating={job.employer.averageRating} readonly size="small" />
                      <span>({job.employer?.totalReviews || 0} reviews)</span>
                    </div>
                  )}
                </div>
              </div>
              <span className={`job-status status-${job.status.toLowerCase()}`}>
                {job.status}
              </span>
            </div>

            <h1 className="job-title-large">{job.title}</h1>

            <div className="job-meta-large">
              <span className="meta-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                </svg>
                {job.jobType.replace(/_/g, ' ')}
              </span>
              <span className="meta-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                {job.locationType} {job.location && `- ${job.location}`}
              </span>
              <span className="meta-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                {getDurationLabel(job.duration)}
              </span>
              <span className="meta-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="1" x2="12" y2="23"></line>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
                {formatBudget()}
              </span>
            </div>

            <div className="job-posted">
              Posted {formatDistanceToNow(new Date(job.createdAt), { addSuffix: true })}
              {job.applicationDeadline && (
                <> | Apply by {new Date(job.applicationDeadline).toLocaleDateString()}</>
              )}
            </div>
          </div>

          {/* Job Description */}
          <div className="job-section">
            <h2>About This Job</h2>
            <div className="job-description-content">
              {job.description}
            </div>
          </div>

          {/* Responsibilities */}
          {job.responsibilities && job.responsibilities.length > 0 && (
            <div className="job-section">
              <h2>Responsibilities</h2>
              <ul className="job-list">
                {job.responsibilities.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Requirements */}
          {job.requirements && job.requirements.length > 0 && (
            <div className="job-section">
              <h2>Requirements</h2>
              <ul className="job-list">
                {job.requirements.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Skills */}
          <div className="job-section">
            <h2>Required Skills</h2>
            <div className="skills-list-large">
              {job.requiredSkills?.map((skill, index) => (
                <span key={index} className="skill-tag-large">{skill}</span>
              ))}
            </div>
            {job.preferredSkills && job.preferredSkills.length > 0 && (
              <>
                <h3>Preferred Skills</h3>
                <div className="skills-list-large">
                  {job.preferredSkills.map((skill, index) => (
                    <span key={index} className="skill-tag-large preferred">{skill}</span>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Applications (for owner) */}
          {isOwner && applications.length > 0 && (
            <div className="job-section">
              <h2>Applications ({applications.length})</h2>
              <div className="applications-list">
                {applications.map(app => (
                  <div key={app.id} className="application-item">
                    <Link to={`/profile/${app.applicantId}`} className="applicant-info">
                      {app.applicant?.profilePicture ? (
                        <img src={app.applicant.profilePicture} alt="" />
                      ) : (
                        <div className="avatar-placeholder small">
                          {app.applicant?.firstName?.[0]}{app.applicant?.lastName?.[0]}
                        </div>
                      )}
                      <div>
                        <p className="applicant-name">
                          {app.applicant?.firstName} {app.applicant?.lastName}
                        </p>
                        <p className="applicant-headline">{app.applicant?.headline}</p>
                      </div>
                    </Link>
                    <div className="application-meta">
                      <span className={`status-badge status-${app.status.toLowerCase()}`}>
                        {app.status}
                      </span>
                      {app.proposedRate && <span>${app.proposedRate}/hr</span>}
                      <span>{formatDistanceToNow(new Date(app.appliedAt), { addSuffix: true })}</span>
                    </div>
                    <Link to={`/applications/${app.id}`} className="btn btn-secondary btn-sm">
                      View
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="job-details-sidebar">
          <div className="sidebar-card apply-card">
            {isOwner ? (
              <>
                <Link to={`/jobs/${job.id}/edit`} className="btn btn-primary btn-block">
                  Edit Job
                </Link>
                <div className="job-stats">
                  <div className="stat">
                    <span className="stat-value">{job.viewCount || 0}</span>
                    <span className="stat-label">Views</span>
                  </div>
                  <div className="stat">
                    <span className="stat-value">{job.applicationCount || 0}</span>
                    <span className="stat-label">Applications</span>
                  </div>
                </div>
              </>
            ) : isAuthenticated && profile?.userType === 'PROFESSIONAL' ? (
              <>
                {hasApplied ? (
                  <button className="btn btn-secondary btn-block" disabled>
                    Already Applied
                  </button>
                ) : job.status === 'OPEN' ? (
                  <Link to={`/jobs/${job.id}/apply`} className="btn btn-primary btn-block">
                    Apply Now
                  </Link>
                ) : (
                  <button className="btn btn-secondary btn-block" disabled>
                    Not Accepting Applications
                  </button>
                )}
                <button className="btn btn-secondary btn-block">
                  Save Job
                </button>
              </>
            ) : !isAuthenticated ? (
              <>
                <Link to="/signin" className="btn btn-primary btn-block">
                  Sign In to Apply
                </Link>
                <p className="apply-hint">
                  Don't have an account? <Link to="/signup">Sign up</Link>
                </p>
              </>
            ) : null}
          </div>

          <div className="sidebar-card">
            <h3>Job Overview</h3>
            <dl className="job-overview-list">
              <div className="overview-item">
                <dt>Experience</dt>
                <dd>{job.experienceLevel}</dd>
              </div>
              <div className="overview-item">
                <dt>Job Type</dt>
                <dd>{job.jobType.replace(/_/g, ' ')}</dd>
              </div>
              <div className="overview-item">
                <dt>Duration</dt>
                <dd>{getDurationLabel(job.duration)}</dd>
              </div>
              <div className="overview-item">
                <dt>Location</dt>
                <dd>{job.locationType} {job.location && `(${job.location})`}</dd>
              </div>
              <div className="overview-item">
                <dt>Compensation</dt>
                <dd>{formatBudget()}</dd>
              </div>
              {job.startDate && (
                <div className="overview-item">
                  <dt>Start Date</dt>
                  <dd>{new Date(job.startDate).toLocaleDateString()}</dd>
                </div>
              )}
            </dl>
          </div>

          <div className="sidebar-card">
            <h3>About the Company</h3>
            <Link to={`/profile/${job.employerId}`} className="company-preview">
              {job.employer?.profilePicture ? (
                <img src={job.employer.profilePicture} alt="" />
              ) : (
                <div className="avatar-placeholder">
                  {job.employer?.companyName?.[0] || 'C'}
                </div>
              )}
              <div>
                <p className="company-name">{job.employer?.companyName}</p>
                <p className="company-location">{job.employer?.location}</p>
              </div>
            </Link>
            <Link to={`/profile/${job.employerId}`} className="btn btn-secondary btn-sm btn-block">
              View Company Profile
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default JobDetails;
