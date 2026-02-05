import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { useStorageUrl } from '../../../hooks/useStorageUrl';

interface NavigationProps {
  variant?: 'public' | 'authenticated';
}

const publicNavLinks = [
  { name: 'Home', href: '/' },
  { name: 'Find Jobs', href: '/jobs' },
  { name: 'Find Talent', href: '/professionals' },
  { name: 'Technology', href: '/technology' },
  { name: 'Compliance', href: '/compliance' },
  { name: 'Training', href: '/training' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

const Navigation: React.FC<NavigationProps> = ({ variant = 'public' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, profile, signOutUser, isLoading } = useAuth();
  const profilePictureUrl = useStorageUrl(profile?.profilePicture);

  const handleSignOut = async () => {
    try {
      await signOutUser();
      navigate('/');
    } catch (err) {
      console.error('Sign out error:', err);
    }
  };

  // Build nav links based on auth state
  const getNavLinks = () => {
    if (isAuthenticated) {
      const links = [
        { name: 'Dashboard', href: '/dashboard' },
        { name: 'Find Jobs', href: '/jobs' },
      ];
      // Only show Find Talent to employers
      if (profile?.userType === 'EMPLOYER') {
        links.push({ name: 'Find Talent', href: '/professionals' });
      }
      // Messages only for authenticated users
      links.push({ name: 'Messages', href: '/messages' });
      return links;
    }
    return publicNavLinks;
  };

  const navLinks = getNavLinks();

  return (
    <nav style={{
      backgroundColor: 'white',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 50
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 1rem'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '80px'
        }}>
          {/* Logo */}
          <Link to={isAuthenticated ? '/dashboard' : '/'} style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
            <img
              src="/nextonnect-logo.png"
              alt="Nextonnect Logo"
              style={{ height: '56px', width: 'auto' }}
            />
            <div style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
              <span style={{ color: '#1e40af' }}>Next</span>
              <span style={{ color: '#f59e0b' }}>onnect</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem'
          }} className="desktop-nav">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '6px',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: '#374151',
                  textDecoration: 'none',
                  transition: 'all 0.2s'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#f3f4f6';
                  e.currentTarget.style.color = '#1e40af';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#374151';
                }}
              >
                {link.name}
              </Link>
            ))}

            {/* Auth Section */}
            {!isLoading && (
              isAuthenticated ? (
                <div style={{ position: 'relative', marginLeft: '0.5rem' }}>
                  <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '0.5rem',
                      borderRadius: '6px',
                      border: 'none',
                      background: 'transparent',
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      color: '#374151'
                    }}
                  >
                    {profilePictureUrl ? (
                      <img
                        src={profilePictureUrl}
                        alt=""
                        style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '50%',
                          objectFit: 'cover'
                        }}
                      />
                    ) : (
                      <div style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        backgroundColor: '#1e40af',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.75rem',
                        fontWeight: 600
                      }}>
                        {profile?.firstName?.[0]}{profile?.lastName?.[0]}
                      </div>
                    )}
                    <span>{profile?.firstName}</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </button>

                  {showDropdown && (
                    <>
                      <div
                        onClick={() => setShowDropdown(false)}
                        style={{
                          position: 'fixed',
                          inset: 0,
                          zIndex: 40
                        }}
                      />
                      <div style={{
                        position: 'absolute',
                        right: 0,
                        top: '100%',
                        marginTop: '0.5rem',
                        width: '220px',
                        backgroundColor: 'white',
                        borderRadius: '8px',
                        boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
                        border: '1px solid #e5e7eb',
                        zIndex: 50,
                        overflow: 'hidden'
                      }}>
                        <Link
                          to={`/profile/${profile?.id}`}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            padding: '0.75rem 1rem',
                            color: '#374151',
                            textDecoration: 'none',
                            fontSize: '0.875rem'
                          }}
                          onClick={() => setShowDropdown(false)}
                          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                          onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                          </svg>
                          View Profile
                        </Link>
                        <Link
                          to="/profile/edit"
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            padding: '0.75rem 1rem',
                            color: '#374151',
                            textDecoration: 'none',
                            fontSize: '0.875rem'
                          }}
                          onClick={() => setShowDropdown(false)}
                          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                          onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
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
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                padding: '0.75rem 1rem',
                                color: '#374151',
                                textDecoration: 'none',
                                fontSize: '0.875rem'
                              }}
                              onClick={() => setShowDropdown(false)}
                              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                              onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
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
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                padding: '0.75rem 1rem',
                                color: '#374151',
                                textDecoration: 'none',
                                fontSize: '0.875rem'
                              }}
                              onClick={() => setShowDropdown(false)}
                              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                              onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
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
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.75rem',
                              padding: '0.75rem 1rem',
                              color: '#374151',
                              textDecoration: 'none',
                              fontSize: '0.875rem'
                            }}
                            onClick={() => setShowDropdown(false)}
                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <line x1="12" y1="5" x2="12" y2="19"></line>
                              <line x1="5" y1="12" x2="19" y2="12"></line>
                            </svg>
                            Post a Job
                          </Link>
                        )}
                        <div style={{ height: '1px', backgroundColor: '#e5e7eb', margin: '0.5rem 0' }} />
                        <button
                          onClick={() => {
                            setShowDropdown(false);
                            handleSignOut();
                          }}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            padding: '0.75rem 1rem',
                            color: '#dc2626',
                            fontSize: '0.875rem',
                            width: '100%',
                            border: 'none',
                            background: 'transparent',
                            cursor: 'pointer',
                            textAlign: 'left'
                          }}
                          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#fef2f2'}
                          onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
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
                <>
                  <Link
                    to="/signin"
                    style={{
                      marginLeft: '0.5rem',
                      padding: '0.5rem 1rem',
                      borderRadius: '6px',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      color: '#1e40af',
                      textDecoration: 'none',
                      transition: 'all 0.2s'
                    }}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    style={{
                      marginLeft: '0.5rem',
                      padding: '0.5rem 1.5rem',
                      borderRadius: '6px',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      color: 'white',
                      backgroundColor: '#1e40af',
                      textDecoration: 'none',
                      transition: 'all 0.2s'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = '#1e3a8a';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = '#1e40af';
                    }}
                  >
                    Get Started
                  </Link>
                </>
              )
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            style={{
              display: 'none',
              padding: '0.5rem',
              borderRadius: '6px',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              color: '#374151'
            }}
            className="mobile-menu-btn"
          >
            <svg
              style={{ height: '24px', width: '24px' }}
              stroke="currentColor"
              fill="none"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div style={{
          padding: '0.5rem',
          backgroundColor: 'white',
          borderTop: '1px solid #e5e7eb'
        }} className="mobile-menu">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              style={{
                display: 'block',
                padding: '0.75rem 1rem',
                borderRadius: '6px',
                fontSize: '1rem',
                fontWeight: 500,
                color: '#374151',
                textDecoration: 'none'
              }}
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          {!isLoading && (
            isAuthenticated ? (
              <>
                <Link
                  to={`/profile/${profile?.id}`}
                  style={{
                    display: 'block',
                    padding: '0.75rem 1rem',
                    borderRadius: '6px',
                    fontSize: '1rem',
                    fontWeight: 500,
                    color: '#374151',
                    textDecoration: 'none'
                  }}
                  onClick={() => setIsOpen(false)}
                >
                  View Profile
                </Link>
                <Link
                  to="/profile/edit"
                  style={{
                    display: 'block',
                    padding: '0.75rem 1rem',
                    borderRadius: '6px',
                    fontSize: '1rem',
                    fontWeight: 500,
                    color: '#374151',
                    textDecoration: 'none'
                  }}
                  onClick={() => setIsOpen(false)}
                >
                  Edit Profile
                </Link>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    handleSignOut();
                  }}
                  style={{
                    display: 'block',
                    width: '100%',
                    padding: '0.75rem 1rem',
                    borderRadius: '6px',
                    fontSize: '1rem',
                    fontWeight: 500,
                    color: '#dc2626',
                    textDecoration: 'none',
                    border: 'none',
                    background: 'transparent',
                    textAlign: 'left',
                    cursor: 'pointer'
                  }}
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/signin"
                  style={{
                    display: 'block',
                    padding: '0.75rem 1rem',
                    borderRadius: '6px',
                    fontSize: '1rem',
                    fontWeight: 500,
                    color: '#1e40af',
                    textDecoration: 'none'
                  }}
                  onClick={() => setIsOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  style={{
                    display: 'block',
                    padding: '0.75rem 1rem',
                    borderRadius: '6px',
                    fontSize: '1rem',
                    fontWeight: 500,
                    color: 'white',
                    backgroundColor: '#1e40af',
                    textDecoration: 'none',
                    marginTop: '0.5rem'
                  }}
                  onClick={() => setIsOpen(false)}
                >
                  Get Started
                </Link>
              </>
            )
          )}
        </div>
      )}

      {/* CSS for responsive behavior */}
      <style>{`
        @media (max-width: 1024px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-btn {
            display: flex !important;
          }
        }
        @media (min-width: 1025px) {
          .mobile-menu {
            display: none !important;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navigation;
