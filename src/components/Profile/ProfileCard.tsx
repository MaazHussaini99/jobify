import React from 'react';
import { Link } from 'react-router-dom';
import { UserProfile } from '../../types';
import StarRating from '../Common/StarRating';
import './Profile.css';

interface ProfileCardProps {
  profile: UserProfile;
  showActions?: boolean;
  onMessage?: (profile: UserProfile) => void;
  onInvite?: (profile: UserProfile) => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  profile,
  showActions = true,
  onMessage,
  onInvite
}) => {
  const fullName = `${profile.firstName} ${profile.lastName}`;
  const topSkills = profile.skills?.slice(0, 5) || [];

  return (
    <div className="profile-card">
      <Link to={`/profile/${profile.id}`} className="profile-card-link">
        <div className="card-avatar">
          {profile.profilePicture ? (
            <img src={profile.profilePicture} alt={fullName} />
          ) : (
            <div className="avatar-placeholder">
              {profile.firstName[0]}{profile.lastName[0]}
            </div>
          )}
          {profile.availability?.status === 'AVAILABLE' && (
            <span className="availability-dot available" title="Available"></span>
          )}
        </div>

        <div className="card-content">
          <h3 className="card-name">{fullName}</h3>
          {profile.headline && <p className="card-headline">{profile.headline}</p>}

          {profile.location && (
            <p className="card-location">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              {profile.location}
            </p>
          )}

          {profile.averageRating > 0 && (
            <div className="card-rating">
              <StarRating rating={profile.averageRating} readonly size="small" />
              <span>({profile.totalReviews})</span>
            </div>
          )}

          {topSkills.length > 0 && (
            <div className="card-skills">
              {topSkills.map((skill, index) => (
                <span key={index} className="skill-tag">{skill.name}</span>
              ))}
              {(profile.skills?.length || 0) > 5 && (
                <span className="skill-more">+{(profile.skills?.length || 0) - 5} more</span>
              )}
            </div>
          )}

          <div className="card-meta">
            {profile.hourlyRate && (
              <span className="meta-rate">${profile.hourlyRate}/hr</span>
            )}
            {profile.totalJobsCompleted > 0 && (
              <span className="meta-jobs">{profile.totalJobsCompleted} jobs</span>
            )}
          </div>
        </div>
      </Link>

      {showActions && (
        <div className="card-actions">
          {onMessage && (
            <button
              className="btn btn-secondary btn-sm"
              onClick={(e) => {
                e.preventDefault();
                onMessage(profile);
              }}
            >
              Message
            </button>
          )}
          {onInvite && (
            <button
              className="btn btn-primary btn-sm"
              onClick={(e) => {
                e.preventDefault();
                onInvite(profile);
              }}
            >
              Invite
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
