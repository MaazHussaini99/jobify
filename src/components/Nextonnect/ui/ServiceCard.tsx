import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
  href: string;
  color?: 'blue' | 'yellow';
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  icon,
  href,
  color = 'blue',
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [btnHovered, setBtnHovered] = useState(false);

  const colorStyles = {
    blue: {
      default: '#1e40af',
      hover: '#1e3a8a',
    },
    yellow: {
      default: '#d97706',
      hover: '#f59e0b',
    },
  };

  return (
    <div
      style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: isHovered
          ? '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
          : '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        overflow: 'hidden',
        transition: 'all 0.3s',
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
      }}
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
    >
      <div style={{ padding: '2rem' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{icon}</div>
        <h3 style={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          color: '#111827',
          marginBottom: '0.75rem'
        }}>
          {title}
        </h3>
        <p style={{
          color: '#4b5563',
          marginBottom: '1.5rem',
          lineHeight: 1.7
        }}>
          {description}
        </p>
        <Link
          to={href}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '0.75rem 1.5rem',
            borderRadius: '6px',
            color: 'white',
            fontWeight: 500,
            textDecoration: 'none',
            transition: 'background-color 0.2s',
            backgroundColor: btnHovered
              ? colorStyles[color].hover
              : colorStyles[color].default,
          }}
          onMouseOver={() => setBtnHovered(true)}
          onMouseOut={() => setBtnHovered(false)}
        >
          Learn More
          <svg
            style={{
              marginLeft: '0.5rem',
              width: '20px',
              height: '20px',
              transition: 'transform 0.2s',
              transform: isHovered ? 'translateX(4px)' : 'translateX(0)',
            }}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;
