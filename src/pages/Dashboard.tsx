import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { generateClient } from 'aws-amplify/api';
import { useAuth } from '../contexts/AuthContext';
import { JobPosting, JobApplication } from '../types';
import { getJobsByEmployer, listApplicationsByApplicant } from '../graphql/queries';
import { Loading } from '../components/Common';
import './Pages.css';

const client = generateClient();

const Dashboard: React.FC = () => {
  const { profile } = useAuth();
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!profile) return;

      try {
        setIsLoading(true);

        if (profile.userType === 'EMPLOYER') {
          const response: any = await client.graphql({
            query: getJobsByEmployer,
            variables: { employerId: profile.id, limit: 10 },
            authMode: 'userPool'
          });
          setJobs(response.data?.listJobPostings?.items || []);
        } else {
          const response: any = await client.graphql({
            query: listApplicationsByApplicant,
            variables: { applicantId: profile.id, limit: 10 },
            authMode: 'userPool'
          });
          setApplications(response.data?.listJobApplications?.items || []);
        }
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [profile]);

  if (isLoading) {
    return <Loading message="Loading dashboard..." fullScreen />;
  }

  if (!profile) {
    return (
      <div className="dashboard-page">
        <p>Please sign in to view your dashboard.</p>
      </div>
    );
  }

  const isEmployer = profile.userType === 'EMPLOYER';

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1>Welcome back, {profile.firstName}!</h1>
        <p>{isEmployer ? 'Manage your job postings and applications' : 'Track your job applications and opportunities'}</p>
      </div>

      <div className="dashboard-grid">
        {/* Stats Cards */}
        <div className="dashboard-stats">
          {isEmployer ? (
            <>
              <div className="stat-card">
                <div className="stat-icon jobs">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                  </svg>
                </div>
                <div className="stat-info">
                  <span className="stat-value">{jobs.length}</span>
                  <span className="stat-label">Active Jobs</span>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon applications">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                </div>
                <div className="stat-info">
                  <span className="stat-value">
                    {jobs.reduce((sum, job) => sum + (job.applicationCount || 0), 0)}
                  </span>
                  <span className="stat-label">Total Applications</span>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="stat-card">
                <div className="stat-icon applications">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                  </svg>
                </div>
                <div className="stat-info">
                  <span className="stat-value">{applications.length}</span>
                  <span className="stat-label">Applications</span>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon completed">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <div className="stat-info">
                  <span className="stat-value">{profile.totalJobsCompleted || 0}</span>
                  <span className="stat-label">Jobs Completed</span>
                </div>
              </div>
            </>
          )}
          <div className="stat-card">
            <div className="stat-icon rating">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
            </div>
            <div className="stat-info">
              <span className="stat-value">{profile.averageRating?.toFixed(1) || '-'}</span>
              <span className="stat-label">Rating ({profile.totalReviews || 0} reviews)</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="dashboard-content">
          {isEmployer ? (
            <div className="dashboard-section">
              <div className="section-header">
                <h2>Your Job Postings</h2>
                <Link to="/jobs/create" className="btn btn-primary">
                  Post New Job
                </Link>
              </div>

              {jobs.length === 0 ? (
                <div className="empty-section">
                  <p>You haven't posted any jobs yet.</p>
                  <Link to="/jobs/create" className="btn btn-secondary">
                    Post Your First Job
                  </Link>
                </div>
              ) : (
                <div className="jobs-list">
                  {jobs.map(job => (
                    <div key={job.id} className="job-row">
                      <div className="job-row-info">
                        <Link to={`/jobs/${job.id}`} className="job-row-title">
                          {job.title}
                        </Link>
                        <span className={`status-tag status-${job.status.toLowerCase()}`}>
                          {job.status}
                        </span>
                      </div>
                      <div className="job-row-meta">
                        <span>{job.applicationCount || 0} applications</span>
                        <Link to={`/jobs/${job.id}`} className="btn btn-secondary btn-sm">
                          View
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="dashboard-section">
              <div className="section-header">
                <h2>Your Applications</h2>
                <Link to="/jobs" className="btn btn-primary">
                  Find Jobs
                </Link>
              </div>

              {applications.length === 0 ? (
                <div className="empty-section">
                  <p>You haven't applied to any jobs yet.</p>
                  <Link to="/jobs" className="btn btn-secondary">
                    Browse Jobs
                  </Link>
                </div>
              ) : (
                <div className="applications-list">
                  {applications.map(app => (
                    <div key={app.id} className="application-row">
                      <div className="application-row-info">
                        <Link to={`/jobs/${app.jobId}`} className="application-row-title">
                          {app.job?.title || 'Job'}
                        </Link>
                        <span className={`status-tag status-${app.status.toLowerCase()}`}>
                          {app.status}
                        </span>
                      </div>
                      <div className="application-row-meta">
                        <span>Applied {new Date(app.appliedAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="dashboard-sidebar">
          <div className="sidebar-section">
            <h3>Quick Actions</h3>
            <div className="quick-actions">
              <Link to="/profile/edit" className="quick-action">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
                Edit Profile
              </Link>
              <Link to="/messages" className="quick-action">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
                Messages
              </Link>
              {isEmployer ? (
                <Link to="/professionals" className="quick-action">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                  Find Talent
                </Link>
              ) : (
                <Link to="/jobs" className="quick-action">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                  Browse Jobs
                </Link>
              )}
            </div>
          </div>

          <div className="sidebar-section profile-completion">
            <h3>Profile Completion</h3>
            <div className="completion-bar">
              <div className="completion-fill" style={{ width: `${calculateProfileCompletion(profile)}%` }}></div>
            </div>
            <p className="completion-text">{calculateProfileCompletion(profile)}% complete</p>
            {calculateProfileCompletion(profile) < 100 && (
              <Link to="/profile/edit" className="btn btn-secondary btn-sm">
                Complete Profile
              </Link>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
};

// Helper function to calculate profile completion
function calculateProfileCompletion(profile: any): number {
  if (!profile) return 0;

  const fields = [
    profile.firstName,
    profile.lastName,
    profile.headline,
    profile.bio,
    profile.location,
    profile.profilePicture,
    profile.skills && profile.skills.length > 0,
    profile.userType === 'PROFESSIONAL' ? profile.experience && profile.experience.length > 0 : profile.companyName,
  ];

  const completed = fields.filter(Boolean).length;
  return Math.round((completed / fields.length) * 100);
}

export default Dashboard;
