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
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-4">
                At Nextonnect, we believe in the power of connection. Our mission is to
                bridge the gap between exceptional talent and forward-thinking organizations,
                while providing the technology, compliance, and training solutions needed
                for sustainable success.
              </p>
              <p className="text-lg text-gray-600">
                We are committed to delivering personalized, innovative solutions that
                address the unique challenges of each client we serve.
              </p>
            </div>
            <div className="bg-gradient-to-br from-brand-blue-800 to-brand-blue-900 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Our Values</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-brand-yellow-500 mr-3">✓</span>
                  <span><strong>Integrity:</strong> Honest, transparent partnerships</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-yellow-500 mr-3">✓</span>
                  <span><strong>Excellence:</strong> Delivering outstanding results</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-yellow-500 mr-3">✓</span>
                  <span><strong>Innovation:</strong> Embracing new solutions</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-yellow-500 mr-3">✓</span>
                  <span><strong>Partnership:</strong> Your success is our success</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Approach</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We take a holistic approach to business solutions, understanding that
              talent, technology, compliance, and training are interconnected.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Understand</h3>
              <p className="text-gray-600">
                We start by deeply understanding your business, challenges, and goals.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="text-4xl mb-4">🔧</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Customize</h3>
              <p className="text-gray-600">
                We develop tailored solutions that address your specific needs.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Deliver</h3>
              <p className="text-gray-600">
                We implement with precision and provide ongoing support for success.
              </p>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default AboutPage;
