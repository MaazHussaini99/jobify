import React from 'react';
import { Link } from 'react-router-dom';

const footerLinks = {
  services: [
    { name: 'Talent Solutions', href: '/talent' },
    { name: 'Technology Solutions', href: '/technology' },
    { name: 'Compliance Management', href: '/compliance' },
    { name: 'Training & Development', href: '/training' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
  ],
};

const linkStyle: React.CSSProperties = {
  color: '#9ca3af',
  textDecoration: 'none',
  fontSize: '0.875rem',
  transition: 'color 0.2s',
};

const Footer: React.FC = () => {
  return (
    <footer style={{ backgroundColor: '#111827', color: 'white' }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '3rem 1rem'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2rem'
        }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
              <img
                src="/nextonnect-logo.png"
                alt="Nextonnect Logo"
                style={{ height: '40px', width: 'auto' }}
              />
              <div style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
                <span style={{ color: '#60a5fa' }}>Next</span>
                <span style={{ color: '#f59e0b' }}>onnect</span>
              </div>
            </div>
            <p style={{ color: '#9ca3af', fontSize: '0.875rem' }}>
              Connecting talent, technology, compliance, and training to drive
              your business forward.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem' }}>Services</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {footerLinks.services.map((link) => (
                <li key={link.name} style={{ marginBottom: '0.5rem' }}>
                  <Link
                    to={link.href}
                    style={linkStyle}
                    onMouseOver={(e) => e.currentTarget.style.color = '#f59e0b'}
                    onMouseOut={(e) => e.currentTarget.style.color = '#9ca3af'}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem' }}>Company</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {footerLinks.company.map((link) => (
                <li key={link.name} style={{ marginBottom: '0.5rem' }}>
                  <Link
                    to={link.href}
                    style={linkStyle}
                    onMouseOver={(e) => e.currentTarget.style.color = '#f59e0b'}
                    onMouseOut={(e) => e.currentTarget.style.color = '#9ca3af'}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem' }}>Contact</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.875rem', color: '#9ca3af' }}>
              <li style={{ marginBottom: '0.5rem' }}>Email: info@nextonnect.com</li>
              <li style={{ marginBottom: '0.5rem' }}>Phone: 826-255-8238</li>
              <li style={{ marginTop: '1rem' }}>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#9ca3af', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseOver={(e) => e.currentTarget.style.color = '#f59e0b'}
                  onMouseOut={(e) => e.currentTarget.style.color = '#9ca3af'}
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          marginTop: '2rem',
          paddingTop: '2rem',
          borderTop: '1px solid #374151',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem'
        }}>
          <p style={{ color: '#9ca3af', fontSize: '0.875rem', margin: 0 }}>
            © 2026 Nextonnect. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {footerLinks.legal.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                style={linkStyle}
                onMouseOver={(e) => e.currentTarget.style.color = '#f59e0b'}
                onMouseOut={(e) => e.currentTarget.style.color = '#9ca3af'}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
