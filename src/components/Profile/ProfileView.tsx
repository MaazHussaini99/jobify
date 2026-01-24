import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { generateClient } from 'aws-amplify/api';
import { useAuth } from '../../contexts/AuthContext';
import { UserProfile } from '../../types';
import { getUserProfile, listReviewsByUser } from '../../graphql/queries';
import StarRating from '../Common/StarRating';
import SkillBadge from '../Common/SkillBadge';
import './Profile.css';

const client = generateClient();

const ProfileView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { profile: currentUserProfile } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isOwnProfile = currentUserProfile?.id === id;

  useEffect(() => {
    const fetchProfile = async () => {
      if (!id) return;

      try {
        setIsLoading(true);
        const [profileResponse, reviewsResponse]: any = await Promise.all([
          client.graphql({
            query: getUserProfile,
            variables: { id }
          }),
          client.graphql({
            query: listReviewsByUser,
            variables: { revieweeId: id, limit: 10 }
          })
        ]);

        setProfile(profileResponse.data?.getUserProfile);
        setReviews(reviewsResponse.data?.listReviews?.items || []);
      } catch (err: any) {
        setError(err.message || 'Failed to load profile');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  if (isLoading) {
    return <div className="profile-loading">Loading profile...</div>;
  }

  if (error || !profile) {
    return (
      <div className="profile-error">
        <h2>Profile Not Found</h2>
        <p>{error || 'The requested profile could not be found.'}</p>
        <Link to="/professionals" className="btn btn-primary">
          Browse Professionals
        </Link>
      </div>
    );
  }

  const fullName = `${profile.firstName} ${profile.lastName}`;

  return (
    <div className="profile-view">
      {/* Header Section */}
      <div className="profile-header">
        <div className="profile-cover" style={{ backgroundImage: profile.coverPhoto ? `url(${profile.coverPhoto})` : undefined }}>
          {isOwnProfile && (
            <Link to="/profile/edit" className="edit-cover-btn">
              Edit Cover
            </Link>
          )}
        </div>
        <div className="profile-header-content">
          <div className="profile-avatar">
            {profile.profilePicture ? (
              <img src={profile.profilePicture} alt={fullName} />
            ) : (
              <div className="avatar-placeholder">
                {profile.firstName[0]}{profile.lastName[0]}
              </div>
            )}
          </div>
          <div className="profile-header-info">
            <div className="profile-name-section">
              <h1>{fullName}</h1>
              {profile.userType === 'EMPLOYER' && profile.companyName && (
                <span className="company-badge">{profile.companyName}</span>
              )}
            </div>
            {profile.headline && <p className="profile-headline">{profile.headline}</p>}
            <div className="profile-meta">
              {profile.location && (
                <span className="meta-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  {profile.location}
                </span>
              )}
              {profile.averageRating > 0 && (
                <span className="meta-item">
                  <StarRating rating={profile.averageRating} readonly size="small" />
                  <span>({profile.totalReviews} reviews)</span>
                </span>
              )}
              {profile.userType === 'PROFESSIONAL' && profile.hourlyRate && (
                <span className="meta-item rate">
                  ${profile.hourlyRate}/hr
                </span>
              )}
            </div>
          </div>
          <div className="profile-header-actions">
            {isOwnProfile ? (
              <Link to="/profile/edit" className="btn btn-primary">
                Edit Profile
              </Link>
            ) : (
              <>
                <Link to={`/messages/new?userId=${profile.id}`} className="btn btn-primary">
                  Message
                </Link>
                {profile.userType === 'PROFESSIONAL' && (
                  <button className="btn btn-secondary">Invite to Job</button>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="profile-content">
        <div className="profile-main">
          {/* About Section */}
          {profile.bio && (
            <section className="profile-section">
              <h2>About</h2>
              <p className="profile-bio">{profile.bio}</p>
            </section>
          )}

          {/* Skills Section */}
          {profile.skills && profile.skills.length > 0 && (
            <section className="profile-section">
              <h2>Skills</h2>
              <div className="skills-grid">
                {profile.skills.map((skill, index) => (
                  <SkillBadge key={index} skill={skill} />
                ))}
              </div>
            </section>
          )}

          {/* Experience Section */}
          {profile.experience && profile.experience.length > 0 && (
            <section className="profile-section">
              <h2>Experience</h2>
              <div className="timeline">
                {profile.experience.map((exp) => (
                  <div key={exp.id} className="timeline-item">
                    <div className="timeline-marker"></div>
                    <div className="timeline-content">
                      <h3>{exp.title}</h3>
                      <p className="timeline-company">{exp.company}</p>
                      <p className="timeline-date">
                        {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                        {exp.location && ` | ${exp.location}`}
                      </p>
                      {exp.description && <p className="timeline-description">{exp.description}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education Section */}
          {profile.education && profile.education.length > 0 && (
            <section className="profile-section">
              <h2>Education</h2>
              <div className="timeline">
                {profile.education.map((edu) => (
                  <div key={edu.id} className="timeline-item">
                    <div className="timeline-marker"></div>
                    <div className="timeline-content">
                      <h3>{edu.degree}</h3>
                      <p className="timeline-company">{edu.institution}</p>
                      {edu.fieldOfStudy && <p className="timeline-field">{edu.fieldOfStudy}</p>}
                      <p className="timeline-date">
                        {edu.startDate} - {edu.endDate || 'Present'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certifications Section */}
          {profile.certifications && profile.certifications.length > 0 && (
            <section className="profile-section">
              <h2>Certifications</h2>
              <div className="certifications-list">
                {profile.certifications.map((cert) => (
                  <div key={cert.id} className="certification-item">
                    <div className="cert-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="8" r="7"></circle>
                        <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                      </svg>
                    </div>
                    <div className="cert-content">
                      <h4>{cert.name}</h4>
                      <p>{cert.issuingOrganization}</p>
                      <p className="cert-date">
                        Issued {cert.issueDate}
                        {cert.expirationDate && ` - Expires ${cert.expirationDate}`}
                      </p>
                      {cert.credentialUrl && (
                        <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer" className="cert-link">
                          View Credential
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Reviews Section */}
          {reviews.length > 0 && (
            <section className="profile-section">
              <h2>Reviews</h2>
              <div className="reviews-list">
                {reviews.map((review) => (
                  <div key={review.id} className="review-item">
                    <div className="review-header">
                      <div className="review-author">
                        {review.reviewer?.profilePicture ? (
                          <img src={review.reviewer.profilePicture} alt="" />
                        ) : (
                          <div className="avatar-placeholder small">
                            {review.reviewer?.firstName?.[0]}{review.reviewer?.lastName?.[0]}
                          </div>
                        )}
                        <div>
                          <p className="reviewer-name">
                            {review.reviewer?.firstName} {review.reviewer?.lastName}
                          </p>
                          {review.reviewer?.companyName && (
                            <p className="reviewer-company">{review.reviewer.companyName}</p>
                          )}
                        </div>
                      </div>
                      <StarRating rating={review.rating} readonly size="small" />
                    </div>
                    {review.title && <h4 className="review-title">{review.title}</h4>}
                    <p className="review-content">{review.content}</p>
                    {review.job && (
                      <p className="review-job">
                        Project: <Link to={`/jobs/${review.job.id}`}>{review.job.title}</Link>
                      </p>
                    )}
                    <p className="review-date">{new Date(review.createdAt).toLocaleDateString()}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <aside className="profile-sidebar">
          {/* Availability */}
          {profile.userType === 'PROFESSIONAL' && profile.availability && (
            <div className="sidebar-card">
              <h3>Availability</h3>
              <div className={`availability-status ${profile.availability.status.toLowerCase().replace('_', '-')}`}>
                {profile.availability.status.replace('_', ' ')}
              </div>
              {profile.availability.hoursPerWeek && (
                <p className="availability-hours">{profile.availability.hoursPerWeek} hours/week</p>
              )}
              {profile.availability.timezone && (
                <p className="availability-timezone">{profile.availability.timezone}</p>
              )}
            </div>
          )}

          {/* Stats */}
          <div className="sidebar-card">
            <h3>Stats</h3>
            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-value">{profile.totalJobsCompleted || 0}</span>
                <span className="stat-label">Jobs Completed</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{profile.totalReviews || 0}</span>
                <span className="stat-label">Reviews</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{profile.averageRating?.toFixed(1) || '-'}</span>
                <span className="stat-label">Rating</span>
              </div>
            </div>
          </div>

          {/* Contact Links */}
          {(profile.website || profile.linkedIn || profile.github) && (
            <div className="sidebar-card">
              <h3>Links</h3>
              <div className="links-list">
                {profile.website && (
                  <a href={profile.website} target="_blank" rel="noopener noreferrer" className="link-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="2" y1="12" x2="22" y2="12"></line>
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                    </svg>
                    Website
                  </a>
                )}
                {profile.linkedIn && (
                  <a href={profile.linkedIn} target="_blank" rel="noopener noreferrer" className="link-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect x="2" y="9" width="4" height="12"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                    LinkedIn
                  </a>
                )}
                {profile.github && (
                  <a href={profile.github} target="_blank" rel="noopener noreferrer" className="link-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                    </svg>
                    GitHub
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Member Since */}
          <div className="sidebar-card">
            <p className="member-since">
              Member since {new Date(profile.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default ProfileView;
