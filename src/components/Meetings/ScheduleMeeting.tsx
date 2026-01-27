import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { generateClient } from 'aws-amplify/api';
import { useAuth } from '../../contexts/AuthContext';
import { UserProfile, JobPosting } from '../../types';
import { getUserProfile, listJobPostings } from '../../graphql/queries';
import { createMeeting } from '../../graphql/mutations';
import { Loading } from '../Common';
import './Meetings.css';

const client = generateClient();

// Admin email that's always invited to meetings
const ADMIN_EMAIL = 'admin@nextonnect.com';

const ScheduleMeeting: React.FC = () => {
  const { professionalId } = useParams<{ professionalId: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { profile, isAuthenticated } = useAuth();

  const [professional, setProfessional] = useState<UserProfile | null>(null);
  const [employerJobs, setEmployerJobs] = useState<JobPosting[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    scheduledDate: '',
    scheduledTime: '',
    duration: 30,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    jobId: searchParams.get('jobId') || '',
    notes: ''
  });

  // Check if current user is an employer
  const isEmployer = profile?.userType === 'EMPLOYER';

  useEffect(() => {
    const fetchData = async () => {
      if (!professionalId || !isAuthenticated) return;

      try {
        setIsLoading(true);

        // Fetch professional profile
        const profileResponse: any = await client.graphql({
          query: getUserProfile,
          variables: { id: professionalId },
          authMode: 'userPool'
        });

        const fetchedProfessional = profileResponse.data?.getUserProfile;
        if (!fetchedProfessional) {
          setError('Professional not found');
          return;
        }

        if (fetchedProfessional.userType !== 'PROFESSIONAL') {
          setError('Can only schedule meetings with professionals');
          return;
        }

        setProfessional(fetchedProfessional);

        // Fetch employer's jobs if they are an employer
        if (profile?.userType === 'EMPLOYER') {
          const jobsResponse: any = await client.graphql({
            query: listJobPostings,
            variables: {
              filter: { employerId: { eq: profile.id } },
              limit: 50
            },
            authMode: 'userPool'
          });

          setEmployerJobs(jobsResponse.data?.listJobPostings?.items || []);
        }
      } catch (err: any) {
        setError(err.message || 'Failed to load data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [professionalId, isAuthenticated, profile]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isEmployer) {
      setError('Only employers can schedule meetings');
      return;
    }

    if (!formData.title || !formData.scheduledDate || !formData.scheduledTime) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      // Combine date and time
      const scheduledDateTime = new Date(`${formData.scheduledDate}T${formData.scheduledTime}`);

      const meetingInput = {
        organizerId: profile!.id,
        professionalId: professionalId,
        adminEmail: ADMIN_EMAIL,
        title: formData.title,
        description: formData.description || null,
        scheduledDate: scheduledDateTime.toISOString(),
        duration: Number(formData.duration),
        timezone: formData.timezone,
        jobId: formData.jobId || null,
        organizerNotes: formData.notes || null,
        status: 'PENDING'
      };

      await client.graphql({
        query: createMeeting,
        variables: { input: meetingInput },
        authMode: 'userPool'
      });

      setSuccess(true);

      // Redirect after a short delay
      setTimeout(() => {
        navigate(`/profile/${professionalId}`);
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Failed to schedule meeting');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="meeting-error">
        <h2>Authentication Required</h2>
        <p>Please sign in to schedule a meeting.</p>
      </div>
    );
  }

  if (!isEmployer) {
    return (
      <div className="meeting-error">
        <h2>Access Denied</h2>
        <p>Only employers can schedule meetings with professionals.</p>
      </div>
    );
  }

  if (isLoading) {
    return <Loading message="Loading..." fullScreen />;
  }

  if (error && !professional) {
    return (
      <div className="meeting-error">
        <h2>Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (success) {
    return (
      <div className="meeting-success">
        <div className="success-icon">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        </div>
        <h2>Meeting Scheduled!</h2>
        <p>
          Your meeting request has been sent to {professional?.firstName} {professional?.lastName}.
        </p>
        <p className="admin-note">
          A Nextonnect representative ({ADMIN_EMAIL}) has been automatically invited to facilitate the meeting.
        </p>
      </div>
    );
  }

  // Get minimum date (today)
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="schedule-meeting-page">
      <div className="schedule-meeting-header">
        <h1>Schedule a Meeting</h1>
        <p>
          Schedule a meeting with {professional?.firstName} {professional?.lastName}
        </p>
      </div>

      <div className="schedule-meeting-container">
        <div className="meeting-form-card">
          {error && <div className="alert alert-error">{error}</div>}

          <form onSubmit={handleSubmit} className="meeting-form">
            {/* Professional Info */}
            <div className="meeting-participant">
              <h3>Meeting With</h3>
              <div className="participant-card">
                {professional?.profilePicture ? (
                  <img src={professional.profilePicture} alt="" className="participant-avatar" />
                ) : (
                  <div className="participant-avatar placeholder">
                    {professional?.firstName?.[0]}{professional?.lastName?.[0]}
                  </div>
                )}
                <div className="participant-info">
                  <p className="participant-name">
                    {professional?.firstName} {professional?.lastName}
                  </p>
                  <p className="participant-headline">{professional?.headline}</p>
                </div>
              </div>
            </div>

            {/* Admin Notice */}
            <div className="admin-notice">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
              <p>
                A Nextonnect administrator ({ADMIN_EMAIL}) will be automatically invited to facilitate this meeting.
              </p>
            </div>

            {/* Meeting Details */}
            <div className="form-section">
              <h3>Meeting Details</h3>

              <div className="form-group">
                <label htmlFor="title">Meeting Title *</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g., Initial Discussion for React Developer Position"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="What would you like to discuss?"
                  rows={4}
                />
              </div>

              {employerJobs.length > 0 && (
                <div className="form-group">
                  <label htmlFor="jobId">Related Job (Optional)</label>
                  <select
                    id="jobId"
                    name="jobId"
                    value={formData.jobId}
                    onChange={handleInputChange}
                  >
                    <option value="">Select a job posting</option>
                    {employerJobs.map(job => (
                      <option key={job.id} value={job.id}>
                        {job.title}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* Date & Time */}
            <div className="form-section">
              <h3>Date & Time</h3>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="scheduledDate">Date *</label>
                  <input
                    type="date"
                    id="scheduledDate"
                    name="scheduledDate"
                    value={formData.scheduledDate}
                    onChange={handleInputChange}
                    min={today}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="scheduledTime">Time *</label>
                  <input
                    type="time"
                    id="scheduledTime"
                    name="scheduledTime"
                    value={formData.scheduledTime}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="duration">Duration</label>
                  <select
                    id="duration"
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                  >
                    <option value={15}>15 minutes</option>
                    <option value={30}>30 minutes</option>
                    <option value={45}>45 minutes</option>
                    <option value={60}>1 hour</option>
                    <option value={90}>1.5 hours</option>
                    <option value={120}>2 hours</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="timezone">Timezone</label>
                  <input
                    type="text"
                    id="timezone"
                    name="timezone"
                    value={formData.timezone}
                    onChange={handleInputChange}
                    readOnly
                  />
                </div>
              </div>
            </div>

            {/* Notes */}
            <div className="form-section">
              <h3>Additional Notes</h3>
              <div className="form-group">
                <label htmlFor="notes">Notes for the meeting</label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="Any additional information you'd like to share..."
                  rows={3}
                />
              </div>
            </div>

            {/* Actions */}
            <div className="form-actions">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate(-1)}
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Scheduling...' : 'Schedule Meeting'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ScheduleMeeting;
