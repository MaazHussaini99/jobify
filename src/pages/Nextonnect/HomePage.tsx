import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../../components/Nextonnect/ui/Hero';
import ServiceCard from '../../components/Nextonnect/ui/ServiceCard';
import PublicLayout from '../../components/Nextonnect/layout/PublicLayout';

const services = [
  {
    title: 'Talent Solutions',
    description:
      'Connect with exceptional talent to drive your business forward. Our comprehensive recruitment and talent management services ensure you find the right people for success.',
    icon: '👥',
    href: '/talent',
    color: 'blue' as const,
  },
  {
    title: 'Technology Solutions',
    description:
      'From AI audits to custom solutions driving your companies success',
    icon: '💻',
    href: '/technology',
    color: 'blue' as const,
  },
  {
    title: 'Compliance Management',
    description:
      'Navigate complex regulatory requirements with confidence. Our expert compliance solutions help you meet obligations while minimizing risk.',
    icon: '✓',
    href: '/compliance',
    color: 'yellow' as const,
  },
  {
    title: 'Training & Development',
    description:
      'Invest in your workforce with professional training programs. Enhance skills, improve performance, and drive organizational success.',
    icon: '🎓',
    href: '/training',
    color: 'yellow' as const,
  },
];

const industries = [
  { name: 'Data Center', description: 'Infrastructure and operational excellence' },
  { name: 'Oil & Gas', description: 'Energy sector compliance and safety' },
  { name: 'Semi Conductor', description: 'Advanced manufacturing solutions' },
  { name: 'Renewable Energy', description: 'Sustainable energy solutions' },
];

const HomePage: React.FC = () => {
  const [ctaHovered, setCtaHovered] = useState(false);

  return (
    <PublicLayout>
      <Hero
        title="Empowering Your Business Success"
        subtitle="Comprehensive solutions in Talent, Technology, Compliance, and Training to transform your organization and drive sustainable growth."
      />

      {/* Services Section */}
      <section style={{ padding: '5rem 0', backgroundColor: '#f9fafb' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{
              fontSize: 'clamp(1.875rem, 4vw, 2.5rem)',
              fontWeight: 'bold',
              color: '#111827',
              marginBottom: '1rem'
            }}>
              Our Core Services
            </h2>
            <p style={{
              fontSize: '1.25rem',
              color: '#4b5563',
              maxWidth: '48rem',
              margin: '0 auto'
            }}>
              We provide integrated solutions across four key areas to help your
              business thrive in today's competitive landscape.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            {services.map((service) => (
              <ServiceCard key={service.title} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section style={{ padding: '5rem 0', backgroundColor: 'white' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{
              fontSize: 'clamp(1.875rem, 4vw, 2.5rem)',
              fontWeight: 'bold',
              color: '#111827',
              marginBottom: '1rem'
            }}>
              Industries We Serve
            </h2>
            <p style={{
              fontSize: '1.25rem',
              color: '#4b5563',
              maxWidth: '48rem',
              margin: '0 auto'
            }}>
              Delivering specialized solutions across critical sectors
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem'
          }}>
            {industries.map((industry) => (
              <div
                key={industry.name}
                style={{
                  backgroundColor: '#f9fafb',
                  padding: '1.5rem',
                  borderRadius: '8px',
                  textAlign: 'center',
                  transition: 'box-shadow 0.3s'
                }}
                onMouseOver={(e) => e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)'}
                onMouseOut={(e) => e.currentTarget.style.boxShadow = 'none'}
              >
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: 'bold',
                  color: '#111827',
                  marginBottom: '0.5rem'
                }}>
                  {industry.name}
                </h3>
                <p style={{ color: '#4b5563', fontSize: '0.875rem' }}>
                  {industry.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section style={{ padding: '5rem 0', backgroundColor: '#f9fafb' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{
              fontSize: 'clamp(1.875rem, 4vw, 2.5rem)',
              fontWeight: 'bold',
              color: '#111827',
              marginBottom: '1rem'
            }}>
              Why Choose Nextonnect?
            </h2>
            <p style={{
              fontSize: '1.25rem',
              color: '#4b5563',
              maxWidth: '48rem',
              margin: '0 auto'
            }}>
              We combine expertise, innovation, and dedication to deliver
              exceptional results for our clients.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem'
          }}>
            <div style={{ textAlign: 'center', padding: '1.5rem' }}>
              <div style={{
                width: '64px',
                height: '64px',
                backgroundColor: '#dbeafe',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem'
              }}>
                <svg
                  style={{ width: '32px', height: '32px', color: '#1e40af' }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: 'bold',
                color: '#111827',
                marginBottom: '0.5rem'
              }}>
                Proven Expertise
              </h3>
              <p style={{ color: '#4b5563' }}>
                Years of experience delivering successful outcomes across
                multiple industries and sectors.
              </p>
            </div>

            <div style={{ textAlign: 'center', padding: '1.5rem' }}>
              <div style={{
                width: '64px',
                height: '64px',
                backgroundColor: '#fef3c7',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem'
              }}>
                <svg
                  style={{ width: '32px', height: '32px', color: '#d97706' }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: 'bold',
                color: '#111827',
                marginBottom: '0.5rem'
              }}>
                Innovative Solutions
              </h3>
              <p style={{ color: '#4b5563' }}>
                Cutting-edge approaches and technologies to keep you ahead of
                the competition.
              </p>
            </div>

            <div style={{ textAlign: 'center', padding: '1.5rem' }}>
              <div style={{
                width: '64px',
                height: '64px',
                backgroundColor: '#dbeafe',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem'
              }}>
                <svg
                  style={{ width: '32px', height: '32px', color: '#1e40af' }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: 'bold',
                color: '#111827',
                marginBottom: '0.5rem'
              }}>
                Dedicated Support
              </h3>
              <p style={{ color: '#4b5563' }}>
                Personalized service and ongoing support to ensure your
                long-term success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: '5rem 0',
        background: 'linear-gradient(to right, #1e40af, #1e3a8a)',
        color: 'white'
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 1rem',
          textAlign: 'center'
        }}>
          <h2 style={{
            fontSize: 'clamp(1.875rem, 4vw, 2.5rem)',
            fontWeight: 'bold',
            marginBottom: '1rem'
          }}>
            Ready to Transform Your Business?
          </h2>
          <p style={{
            fontSize: '1.25rem',
            color: '#bfdbfe',
            marginBottom: '2rem',
            maxWidth: '42rem',
            margin: '0 auto 2rem'
          }}>
            Let's discuss how our comprehensive solutions can help you
            achieve your goals.
          </p>
          <Link
            to="/contact"
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
            Get Started Today
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
        </div>
      </section>
    </PublicLayout>
  );
};

export default HomePage;
