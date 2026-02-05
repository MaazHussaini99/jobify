import React from 'react';
import Hero from '../../components/Nextonnect/ui/Hero';
import PublicLayout from '../../components/Nextonnect/layout/PublicLayout';

const trainingPrograms = [
  { icon: '💼', title: 'Professional Development', desc: 'Enhance leadership, communication, and management skills for career advancement.' },
  { icon: '🔧', title: 'Technical Training', desc: 'Industry-specific technical skills training for your team.' },
  { icon: '🛡️', title: 'Safety Training', desc: 'OSHA compliance and workplace safety certification programs.' },
  { icon: '👥', title: 'Team Building', desc: 'Collaborative workshops to strengthen team dynamics and productivity.' },
];

const TrainingPage: React.FC = () => {
  return (
    <PublicLayout>
      <Hero
        title="Training & Development"
        subtitle="Invest in your workforce with professional training programs. Enhance skills, improve performance, and drive organizational success."
        ctaText="Explore Programs"
        ctaLink="/contact"
      />

      <section style={{ padding: '5rem 0', backgroundColor: 'white' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#111827', marginBottom: '1rem' }}>
              Training Programs
            </h2>
            <p style={{ fontSize: '1.25rem', color: '#4b5563', maxWidth: '48rem', margin: '0 auto' }}>
              Comprehensive training solutions to develop your workforce.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem'
          }}>
            {trainingPrograms.map((program) => (
              <div key={program.title} style={{
                backgroundColor: '#f9fafb',
                padding: '2rem',
                borderRadius: '8px'
              }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{program.icon}</div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#111827', marginBottom: '0.5rem' }}>
                  {program.title}
                </h3>
                <p style={{ color: '#4b5563' }}>{program.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default TrainingPage;
