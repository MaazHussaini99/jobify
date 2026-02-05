import React from 'react';
import Hero from '../../components/Nextonnect/ui/Hero';
import PublicLayout from '../../components/Nextonnect/layout/PublicLayout';

const complianceServices = [
  { icon: '📋', title: 'Regulatory Compliance', desc: 'Ensure adherence to industry-specific regulations and standards.' },
  { icon: '🔍', title: 'Compliance Audits', desc: 'Comprehensive audits to identify gaps and areas for improvement.' },
  { icon: '⚠️', title: 'Risk Assessment', desc: 'Identify and mitigate compliance risks before they become issues.' },
  { icon: '📚', title: 'Policy Development', desc: 'Create and implement effective compliance policies and procedures.' },
  { icon: '🎓', title: 'Compliance Training', desc: 'Educate your team on compliance requirements and best practices.' },
  { icon: '📊', title: 'Reporting & Documentation', desc: 'Maintain accurate records and generate compliance reports.' },
];

const CompliancePage: React.FC = () => {
  return (
    <PublicLayout>
      <Hero
        title="Compliance Management"
        subtitle="Navigate complex regulatory requirements with confidence. Our expert compliance solutions help you meet obligations while minimizing risk."
        ctaText="Get Compliant"
        ctaLink="/contact"
      />

      <section style={{ padding: '5rem 0', backgroundColor: 'white' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#111827', marginBottom: '1rem' }}>
              Compliance Services
            </h2>
            <p style={{ fontSize: '1.25rem', color: '#4b5563', maxWidth: '48rem', margin: '0 auto' }}>
              Stay ahead of regulatory requirements with our comprehensive compliance solutions.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem'
          }}>
            {complianceServices.map((service) => (
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

export default CompliancePage;
