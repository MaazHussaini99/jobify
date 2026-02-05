import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../../components/Nextonnect/ui/Hero';
import PublicLayout from '../../components/Nextonnect/layout/PublicLayout';

const talentServices = [
  { icon: '🔍', title: 'Talent Acquisition', desc: 'Find the right candidates with our extensive network and screening processes.' },
  { icon: '📋', title: 'Contract Staffing', desc: 'Flexible staffing solutions for project-based or temporary needs.' },
  { icon: '🎯', title: 'Direct Placement', desc: 'Full-time placement services for permanent positions.' },
  { icon: '👥', title: 'Team Building', desc: 'Build high-performing teams aligned with your company culture.' },
  { icon: '📊', title: 'Workforce Planning', desc: 'Strategic planning to meet your future talent needs.' },
  { icon: '🌟', title: 'Retention Strategies', desc: 'Keep your best talent engaged and motivated.' },
];

const TalentPage: React.FC = () => {
  const [ctaHovered, setCtaHovered] = useState(false);
  const [contactHovered, setContactHovered] = useState(false);

  return (
    <PublicLayout>
      <Hero
        title="Talent Solutions"
        subtitle="Connect with exceptional talent to drive your business forward. Our comprehensive recruitment and talent management services ensure you find the right people for success."
        ctaText="Find Talent"
        ctaLink="/signup"
      />

      <section style={{ padding: '5rem 0', backgroundColor: 'white' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#111827', marginBottom: '1rem' }}>
              Our Talent Services
            </h2>
            <p style={{ fontSize: '1.25rem', color: '#4b5563', maxWidth: '48rem', margin: '0 auto' }}>
              From recruitment to retention, we provide end-to-end talent solutions.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem'
          }}>
            {talentServices.map((service) => (
              <div key={service.title} style={{
                backgroundColor: '#f9fafb',
                padding: '2rem',
                borderRadius: '8px'
              }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{service.icon}</div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#111827', marginBottom: '0.5rem' }}>
                  {service.title}
                </h3>
                <p style={{ color: '#4b5563' }}>{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{
        padding: '5rem 0',
        background: 'linear-gradient(to right, #1e40af, #1e3a8a)',
        color: 'white'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1rem', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            Ready to Build Your Dream Team?
          </h2>
          <p style={{ fontSize: '1.25rem', color: '#bfdbfe', marginBottom: '2rem', maxWidth: '42rem', margin: '0 auto 2rem' }}>
            Join our platform to connect with top talent or find your next opportunity.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
            <Link
              to="/signup"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
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
              Get Started
            </Link>
            <Link
              to="/contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '1rem 2rem',
                borderRadius: '6px',
                fontSize: '1.125rem',
                fontWeight: 500,
                color: contactHovered ? '#1e3a8a' : 'white',
                backgroundColor: contactHovered ? 'white' : 'transparent',
                border: '2px solid white',
                textDecoration: 'none',
                transition: 'all 0.2s'
              }}
              onMouseOver={() => setContactHovered(true)}
              onMouseOut={() => setContactHovered(false)}
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default TalentPage;
