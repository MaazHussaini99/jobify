import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { generateClient } from 'aws-amplify/api';
import { useAuth } from '../../contexts/AuthContext';
import { JobPosting } from '../../types';
import { getJobPosting } from '../../graphql/queries';
import { createJobApplication } from '../../graphql/mutations';
import { Loading } from '../Common';
import './Jobs.css';

const client = generateClient();

const JobApply: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { profile } = useAuth();

  const [job, setJob] = useState<JobPosting | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    coverLetter: '',
    proposedRate: '',
    estimatedDuration: '',
    availability: '',
    portfolioLinks: ['']
  });

  useEffect(() => {
    const fetchJob = async () => {
      if (!id) return;

      try {
        const response: any = await client.graphql({
          query: getJobPosting,
          variables: { id }
        });
        setJob(response.data?.getJobPosting);
      } catch (err: any) {
        setError('Failed to load job details');
      } finally {
        setIsLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  if (!profile || profile.userType !== 'PROFESSIONAL') {
    return (
      <div className="job-error">
        <h2>Access Denied</h2>
        <p>Only professionals can apply for jobs.</p>
        <Link to="/jobs" className="btn btn-primary">Browse Jobs</Link>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePortfolioLinkChange = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      portfolioLinks: prev.portfolioLinks.map((link, i) => i === index ? value : link)
    }));
  };

  const handleAddPortfolioLink = () => {
    setFormData(prev => ({
      ...prev,
      portfolioLinks: [...prev.portfolioLinks, '']
    }));
  };

  const handleRemovePortfolioLink = (index: number) => {
    setFormData(prev => ({
      ...prev,
      portfolioLinks: prev.portfolioLinks.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.coverLetter.trim()) {
      setError('Cover letter is required');
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      await client.graphql({
        query: createJobApplication,
        variables: {
          input: {
            jobId: id,
            applicantId: profile.id,
            coverLetter: formData.coverLetter.trim(),
            proposedRate: formData.proposedRate ? parseFloat(formData.proposedRate) : null,
            estimatedDuration: formData.estimatedDuration || null,
            availability: formData.availability || null,
            portfolioLinks: formData.portfolioLinks.filter(link => link.trim()),
            status: 'PENDING',
            appliedAt: new Date().toISOString()
          }
        }
      });

      navigate(`/jobs/${id}`, { state: { applied: true } });
    } catch (err: any) {
      setError(err.message || 'Failed to submit application');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <Loading message="Loading..." />;
  }

  if (!job) {
    return (
      <div className="job-error">
        <h2>Job Not Found</h2>
        <Link to="/jobs" className="btn btn-primary">Browse Jobs</Link>
      </div>
    );
  }

  return (
    <div className="job-apply-page">
      <div className="apply-header">
        <Link to={`/jobs/${id}`} className="back-link">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Back to Job
        </Link>
        <h1>Apply to {job.title}</h1>
        <p className="apply-company">{job.employer?.companyName}</p>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <form onSubmit={handleSubmit} className="apply-form">
        <div className="form-section">
          <h2>Your Application</h2>

          <div className="form-group">
            <label htmlFor="coverLetter">Cover Letter *</label>
            <textarea
              id="coverLetter"
              name="coverLetter"
              value={formData.coverLetter}
              onChange={handleInputChange}
              rows={8}
              placeholder="Introduce yourself and explain why you're a great fit for this position..."
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="proposedRate">
                Proposed Rate ($/hr)
                {job.compensationType === 'HOURLY' && job.minBudget && job.maxBudget && (
                  <span className="rate-hint">
                    Budget: ${job.minBudget} - ${job.maxBudget}/hr
                  </span>
                )}
              </label>
              <input
                type="number"
                id="proposedRate"
                name="proposedRate"
                value={formData.proposedRate}
                onChange={handleInputChange}
                min="0"
                placeholder="Your hourly rate"
              />
            </div>

            <div className="form-group">
              <label htmlFor="estimatedDuration">Estimated Duration</label>
              <input
                type="text"
                id="estimatedDuration"
                name="estimatedDuration"
                value={formData.estimatedDuration}
                onChange={handleInputChange}
                placeholder="e.g., 2 weeks, 1 month"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="availability">Your Availability</label>
            <textarea
              id="availability"
              name="availability"
              value={formData.availability}
              onChange={handleInputChange}
              rows={3}
              placeholder="When can you start? How many hours per week can you dedicate?"
            />
          </div>
        </div>

        <div className="form-section">
          <h2>Portfolio Links</h2>
          <p className="section-hint">Share relevant work samples or portfolio items</p>

          {formData.portfolioLinks.map((link, index) => (
            <div key={index} className="list-input-item">
              <input
                type="url"
                value={link}
                onChange={(e) => handlePortfolioLinkChange(index, e.target.value)}
                placeholder="https://..."
              />
              {formData.portfolioLinks.length > 1 && (
                <button
                  type="button"
                  className="remove-item-btn"
                  onClick={() => handleRemovePortfolioLink(index)}
                >
                  &times;
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={handleAddPortfolioLink}
          >
            + Add Link
          </button>
        </div>

        <div className="form-section profile-preview">
          <h2>Your Profile</h2>
          <p className="section-hint">This information will be shared with the employer</p>

          <div className="preview-card">
            <div className="preview-avatar">
              {profile.profilePicture ? (
                <img src={profile.profilePicture} alt="" />
              ) : (
                <div className="avatar-placeholder">
                  {profile.firstName[0]}{profile.lastName[0]}
                </div>
              )}
            </div>
            <div className="preview-info">
              <h3>{profile.firstName} {profile.lastName}</h3>
              <p>{profile.headline}</p>
              {profile.skills && profile.skills.length > 0 && (
                <div className="preview-skills">
                  {profile.skills.slice(0, 5).map((skill, index) => (
                    <span key={index} className="skill-tag">{skill.name}</span>
                  ))}
                </div>
              )}
            </div>
            <Link to="/profile/edit" className="btn btn-secondary btn-sm">
              Edit Profile
            </Link>
          </div>
        </div>

        <div className="form-actions">
          <Link to={`/jobs/${id}`} className="btn btn-secondary">
            Cancel
          </Link>
          <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit Application'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default JobApply;
