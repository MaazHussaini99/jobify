import React from 'react';
import Hero from '../../components/Nextonnect/ui/Hero';
import PublicLayout from '../../components/Nextonnect/layout/PublicLayout';

const AboutPage: React.FC = () => {
  return (
    <PublicLayout>
      <Hero
        title="About Nextonnect"
        subtitle="Building bridges between talent, technology, and opportunity since our founding."
        ctaText="Contact Us"
        ctaLink="/contact"
        showLearnMore={false}
      />

      {/* Mission Section */}
      <section style={{ padding: '5rem 0', backgroundColor: 'white' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1rem' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '3rem',
            alignItems: 'center'
          }}>
            <div>
              <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#111827', marginBottom: '1.5rem' }}>
                Our Mission
              </h2>
              <p style={{ fontSize: '1.125rem', color: '#4b5563', marginBottom: '1rem' }}>
                At Nextonnect, we believe in the power of connection. Our mission is to
                bridge the gap between exceptional talent and forward-thinking organizations,
                while providing the technology, compliance, and training solutions needed
                for sustainable success.
              </p>
              <p style={{ fontSize: '1.125rem', color: '#4b5563' }}>
                We are committed to delivering personalized, innovative solutions that
                address the unique challenges of each client we serve.
              </p>
            </div>
            <div style={{
              background: 'linear-gradient(to bottom right, #1e40af, #1e3a8a)',
              borderRadius: '16px',
              padding: '2rem',
              color: 'white'
            }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Our Values</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {[
                  { title: 'Integrity', desc: 'Honest, transparent partnerships' },
                  { title: 'Excellence', desc: 'Delivering outstanding results' },
                  { title: 'Innovation', desc: 'Embracing new solutions' },
                  { title: 'Partnership', desc: 'Your success is our success' },
                ].map((item) => (
                  <li key={item.title} style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '1rem' }}>
                    <span style={{ color: '#f59e0b', marginRight: '0.75rem' }}>✓</span>
                    <span><strong>{item.title}:</strong> {item.desc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Approach Section */}
      <section style={{ padding: '5rem 0', backgroundColor: '#f9fafb' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#111827', marginBottom: '1rem' }}>
              Our Approach
            </h2>
            <p style={{ fontSize: '1.25rem', color: '#4b5563', maxWidth: '48rem', margin: '0 auto' }}>
              We take a holistic approach to business solutions, understanding that
              talent, technology, compliance, and training are interconnected.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem'
          }}>
            {[
              { icon: '🎯', title: 'Understand', desc: 'We start by deeply understanding your business, challenges, and goals.' },
              { icon: '🔧', title: 'Customize', desc: 'We develop tailored solutions that address your specific needs.' },
              { icon: '🚀', title: 'Deliver', desc: 'We implement with precision and provide ongoing support for success.' },
            ].map((item) => (
              <div key={item.title} style={{
                backgroundColor: 'white',
                padding: '2rem',
                borderRadius: '8px',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
              }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{item.icon}</div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#111827', marginBottom: '0.5rem' }}>
                  {item.title}
                </h3>
                <p style={{ color: '#4b5563' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default AboutPage;
