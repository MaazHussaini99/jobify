import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './Layout.css';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, profile, signOutUser } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOutUser();
      navigate('/');
    } catch (err) {
      console.error('Sign out error:', err);
    }
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <span className="logo-icon">J</span>
          <span className="logo-text">Jobify</span>
        </Link>

        <nav className={`nav ${showMobileMenu ? 'open' : ''}`}>
          <Link to="/jobs" className="nav-link" onClick={() => setShowMobileMenu(false)}>
            Find Jobs
          </Link>
          <Link to="/professionals" className="nav-link" onClick={() => setShowMobileMenu(false)}>
            Find Professionals
          </Link>
          {isAuthenticated && (
            <Link to="/messages" className="nav-link" onClick={() => setShowMobileMenu(false)}>
              Messages
            </Link>
          )}
        </nav>

        <div className="header-actions">
          {isAuthenticated ? (
            <div className="user-menu">
              <button
                className="user-menu-trigger"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                {profile?.profilePicture ? (
                  <img src={profile.profilePicture} alt="" className="user-avatar" />
                ) : (
                  <div className="user-avatar placeholder">
                    {profile?.firstName?.[0]}{profile?.lastName?.[0]}
                  </div>
                )}
                <span className="user-name">{profile?.firstName}</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>

              {showDropdown && (
                <>
                  <div className="dropdown-overlay" onClick={() => setShowDropdown(false)} />
                  <div className="dropdown-menu">
                    <Link
                      to={`/profile/${profile?.id}`}
                      className="dropdown-item"
                      onClick={() => setShowDropdown(false)}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                      View Profile
                    </Link>
                    <Link
                      to="/profile/edit"
                      className="dropdown-item"
                      onClick={() => setShowDropdown(false)}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                      </svg>
                      Edit Profile
                    </Link>
                    {profile?.userType === 'PROFESSIONAL' && (
                      <>
                        <Link
                          to="/resume/upload"
                          className="dropdown-item"
                          onClick={() => setShowDropdown(false)}
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                            <polyline points="14 2 14 8 20 8"></polyline>
                            <line x1="12" y1="18" x2="12" y2="12"></line>
                            <line x1="9" y1="15" x2="15" y2="15"></line>
                          </svg>
                          Upload Resume
                        </Link>
                        <Link
                          to="/resume/export"
                          className="dropdown-item"
                          onClick={() => setShowDropdown(false)}
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                            <polyline points="7 10 12 15 17 10"></polyline>
                            <line x1="12" y1="15" x2="12" y2="3"></line>
                          </svg>
                          Export Resume
                        </Link>
                      </>
                    )}
                    {profile?.userType === 'EMPLOYER' && (
                      <Link
                        to="/jobs/create"
                        className="dropdown-item"
                        onClick={() => setShowDropdown(false)}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="12" y1="5" x2="12" y2="19"></line>
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                        Post a Job
                      </Link>
                    )}
                    <Link
                      to="/dashboard"
                      className="dropdown-item"
                      onClick={() => setShowDropdown(false)}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="3" width="7" height="7"></rect>
                        <rect x="14" y="3" width="7" height="7"></rect>
                        <rect x="14" y="14" width="7" height="7"></rect>
                        <rect x="3" y="14" width="7" height="7"></rect>
                      </svg>
                      Dashboard
                    </Link>
                    <div className="dropdown-divider" />
                    <button
                      className="dropdown-item danger"
                      onClick={() => {
                        setShowDropdown(false);
                        handleSignOut();
                      }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                        <polyline points="16 17 21 12 16 7"></polyline>
                        <line x1="21" y1="12" x2="9" y2="12"></line>
                      </svg>
                      Sign Out
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/signin" className="btn btn-secondary">Sign In</Link>
              <Link to="/signup" className="btn btn-primary">Sign Up</Link>
            </div>
          )}

          <button
            className="mobile-menu-btn"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {showMobileMenu ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </>
              ) : (
                <>
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </>
              )}
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
