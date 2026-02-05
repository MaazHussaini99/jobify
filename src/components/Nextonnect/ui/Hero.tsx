import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface HeroProps {
  title: string;
  subtitle: string;
  ctaText?: string;
  ctaLink?: string;
  showLearnMore?: boolean;
}

const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  ctaText = 'Get Started',
  ctaLink = '/contact',
  showLearnMore = true,
}) => {
  const [learnMoreHovered, setLearnMoreHovered] = useState(false);
  const [ctaHovered, setCtaHovered] = useState(false);

  return (
    <div style={{
      position: 'relative',
      background: 'linear-gradient(to bottom right, #1e3a8a, #1e40af, #1d4ed8)',
      color: 'white'
    }}>
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: 'black',
        opacity: 0.1
      }}></div>
      <div style={{
        position: 'relative',
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '6rem 1rem'
      }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 3.75rem)',
            fontWeight: 'bold',
            marginBottom: '1.5rem',
            lineHeight: 1.1
          }}>
            {title}
          </h1>
          <p style={{
            fontSize: 'clamp(1.125rem, 2vw, 1.5rem)',
            color: '#bfdbfe',
            marginBottom: '2rem',
            maxWidth: '48rem',
            margin: '0 auto 2rem',
            lineHeight: 1.6
          }}>
            {subtitle}
          </p>
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: '1rem',
            justifyContent: 'center'
          }}>
            <Link
              to={ctaLink}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1rem 2rem',
                borderRadius: '6px',
                fontSize: '1.125rem',
                fontWeight: 500,
                color: '#1e3a8a',
                backgroundColor: ctaHovered ? '#d97706' : '#f59e0b',
                textDecoration: 'none',
                transition: 'background-color 0.2s',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
              }}
              onMouseOver={() => setCtaHovered(true)}
              onMouseOut={() => setCtaHovered(false)}
            >
              {ctaText}
              <svg
                style={{ marginLeft: '0.5rem', width: '20px', height: '20px' }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
            {showLearnMore && (
              <Link
                to="/about"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '1rem 2rem',
                  borderRadius: '6px',
                  fontSize: '1.125rem',
                  fontWeight: 500,
                  color: learnMoreHovered ? '#1e3a8a' : 'white',
                  backgroundColor: learnMoreHovered ? 'white' : 'transparent',
                  border: '2px solid white',
                  textDecoration: 'none',
                  transition: 'all 0.2s'
                }}
                onMouseOver={() => setLearnMoreHovered(true)}
                onMouseOut={() => setLearnMoreHovered(false)}
              >
                Learn More
              </Link>
            )}
          </div>
        </div>
      </div>
      {/* Decorative bottom wave */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0
      }}>
        <svg
          style={{ width: '100%', height: '50px' }}
          preserveAspectRatio="none"
          viewBox="0 0 1440 74"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 74L60 68.8C120 63.7 240 53.3 360 48.2C480 43 600 43 720 48.2C840 53.3 960 63.7 1080 63.7C1200 63.7 1320 53.3 1380 48.2L1440 43V74H1380C1320 74 1200 74 1080 74C960 74 840 74 720 74C600 74 480 74 360 74C240 74 120 74 60 74H0Z"
            fill="white"
          />
        </svg>
      </div>
    </div>
  );
};

export default Hero;
