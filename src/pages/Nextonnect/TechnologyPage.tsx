import React from 'react';
import Hero from '../../components/Nextonnect/ui/Hero';
import PublicLayout from '../../components/Nextonnect/layout/PublicLayout';

const techServices = [
  { icon: '🤖', title: 'AI & Machine Learning', desc: 'Leverage artificial intelligence to automate processes and gain insights from your data.' },
  { icon: '☁️', title: 'Cloud Solutions', desc: 'Scalable cloud infrastructure and migration services for modern businesses.' },
  { icon: '🔒', title: 'Cybersecurity', desc: 'Protect your business with comprehensive security assessments and solutions.' },
  { icon: '📱', title: 'Digital Transformation', desc: 'Modernize your operations with digital-first strategies and implementations.' },
];

const TechnologyPage: React.FC = () => {
  return (
    <PublicLayout>
      <Hero
        title="Technology Solutions"
        subtitle="From AI audits to custom solutions driving your company's success. We leverage cutting-edge technology to solve complex business challenges."
        ctaText="Learn More"
        ctaLink="/contact"
      />

      <section style={{ padding: '5rem 0', backgroundColor: 'white' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#111827', marginBottom: '1rem' }}>
              Our Technology Services
            </h2>
            <p style={{ fontSize: '1.25rem', color: '#4b5563', maxWidth: '48rem', margin: '0 auto' }}>
              Innovative technology solutions tailored to your business needs.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem'
          }}>
            {techServices.map((service) => (
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
    </PublicLayout>
  );
};

export default TechnologyPage;
