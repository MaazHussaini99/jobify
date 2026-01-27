import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { generateClient } from 'aws-amplify/api';
import { useAuth } from '../../contexts/AuthContext';
import { JobPosting } from '../../types';
import { createSavedJob, deleteSavedJob } from '../../graphql/mutations';
import { StarRating } from '../Common';
import { formatDistanceToNow } from 'date-fns';
import './Jobs.css';

const client = generateClient();

interface JobCardProps {
  job: JobPosting;
  isSaved?: boolean;
  savedJobId?: string;
  onSaveChange?: (saved: boolean) => void;
  showApplyButton?: boolean;
}

const JobCard: React.FC<JobCardProps> = ({
  job,
  isSaved = false,
  savedJobId,
  onSaveChange,
  showApplyButton = true
}) => {
  const { isAuthenticated, profile } = useAuth();

  // Hide company info for all users except employers viewing their own jobs
  const showCompanyInfo = profile?.userType === 'EMPLOYER' && job.employerId === profile?.id;
  const [saved, setSaved] = useState(isSaved);
  const [saving, setSaving] = useState(false);

  const handleSaveToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated || !profile) return;

    try {
      setSaving(true);

      if (saved && savedJobId) {
        await client.graphql({
          query: deleteSavedJob,
          variables: { input: { id: savedJobId } },
          authMode: 'userPool'
        });
        setSaved(false);
        onSaveChange?.(false);
      } else {
        await client.graphql({
          query: createSavedJob,
          variables: {
            input: {
              userId: profile.id,
              jobId: job.id,
              savedAt: new Date().toISOString()
            }
          },
          authMode: 'userPool'
        });
        setSaved(true);
        onSaveChange?.(true);
      }
    } catch (err) {
      console.error('Error saving job:', err);
    } finally {
      setSaving(false);
    }
  };

  const formatBudget = () => {
    if (!job.minBudget && !job.maxBudget) return 'Negotiable';
    const currency = job.currency || 'USD';
    const type = job.compensationType === 'HOURLY' ? '/hr' : '';

    if (job.minBudget && job.maxBudget) {
      return `$${job.minBudget} - $${job.maxBudget}${type}`;
    }
    if (job.minBudget) return `From $${job.minBudget}${type}`;
    if (job.maxBudget) return `Up to $${job.maxBudget}${type}`;
    return 'Negotiable';
  };

  const getJobTypeLabel = (type: string) => {
    return type.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
  };

  const getLocationTypeIcon = () => {
    switch (job.locationType) {
      case 'REMOTE':
        return (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="2" y1="12" x2="22" y2="12"></line>
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
          </svg>
        );
      case 'ONSITE':
        return (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
        );
      default:
        return (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
            <line x1="8" y1="21" x2="16" y2="21"></line>
            <line x1="12" y1="17" x2="12" y2="21"></line>
          </svg>
        );
    }
  };

  return (
    <div className="job-card">
      <Link to={`/jobs/${job.id}`} className="job-card-link">
        <div className="job-card-header">
          <div className="employer-info">
            {showCompanyInfo ? (
              <>
                {job.employer?.profilePicture ? (
                  <img src={job.employer.profilePicture} alt="" className="employer-avatar" />
                ) : (
                  <div className="employer-avatar placeholder">
                    {job.employer?.companyName?.[0] || 'C'}
                  </div>
                )}
                <div>
                  <p className="employer-name">{job.employer?.companyName || 'Company'}</p>
                  {job.employer?.averageRating && job.employer.averageRating > 0 && (
                    <div className="employer-rating">
                      <StarRating rating={job.employer.averageRating} readonly size="small" />
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="employer-avatar placeholder">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                  </svg>
                </div>
                <div>
                  <p className="employer-name">Verified Employer</p>
                  <p className="employer-note">via Nextonnect</p>
                </div>
              </>
            )}
          </div>
          {isAuthenticated && profile?.userType === 'PROFESSIONAL' && (
            <button
              className={`save-btn ${saved ? 'saved' : ''}`}
              onClick={handleSaveToggle}
              disabled={saving}
              title={saved ? 'Remove from saved' : 'Save job'}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill={saved ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
              </svg>
            </button>
          )}
        </div>

        <h3 className="job-title">{job.title}</h3>

        {job.shortDescription && (
          <p className="job-description">{job.shortDescription}</p>
        )}

        <div className="job-tags">
          <span className="tag tag-primary">{getJobTypeLabel(job.jobType)}</span>
          <span className="tag tag-secondary">{job.experienceLevel}</span>
          <span className={`tag tag-${job.locationType.toLowerCase()}`}>
            {getLocationTypeIcon()}
            {job.locationType}
          </span>
        </div>

        <div className="job-skills">
          {job.requiredSkills?.slice(0, 4).map((skill, index) => (
            <span key={index} className="skill-chip">{skill}</span>
          ))}
          {job.requiredSkills && job.requiredSkills.length > 4 && (
            <span className="skill-more">+{job.requiredSkills.length - 4}</span>
          )}
        </div>

        <div className="job-card-footer">
          <div className="job-budget">{formatBudget()}</div>
          <div className="job-meta">
            {job.applicationCount && job.applicationCount > 0 && (
              <span className="applicants">{job.applicationCount} applicants</span>
            )}
            <span className="posted-time">
              {formatDistanceToNow(new Date(job.createdAt), { addSuffix: true })}
            </span>
          </div>
        </div>
      </Link>

      {showApplyButton && isAuthenticated && profile?.userType === 'PROFESSIONAL' && (
        <div className="job-card-actions">
          <Link to={`/jobs/${job.id}/apply`} className="btn btn-primary btn-sm">
            Apply Now
          </Link>
        </div>
      )}
    </div>
  );
};

export default JobCard;
