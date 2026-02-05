import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Find Jobs', href: '/jobs' },
  { name: 'Find Talent', href: '/professionals' },
  { name: 'Technology', href: '/technology' },
  { name: 'Compliance', href: '/compliance' },
  { name: 'Training', href: '/training' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

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
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
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
