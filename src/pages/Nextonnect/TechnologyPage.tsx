import React from 'react';
import Hero from '../../components/Nextonnect/ui/Hero';
import PublicLayout from '../../components/Nextonnect/layout/PublicLayout';

const TechnologyPage: React.FC = () => {
  return (
    <PublicLayout>
      <Hero
        title="Technology Solutions"
        subtitle="From AI audits to custom solutions driving your company's success. We leverage cutting-edge technology to solve complex business challenges."
        ctaText="Learn More"
        ctaLink="/contact"
      />

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Technology Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Innovative technology solutions tailored to your business needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-8 rounded-lg">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">AI & Machine Learning</h3>
              <p className="text-gray-600">
                Leverage artificial intelligence to automate processes and gain insights from your data.
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg">
              <div className="text-4xl mb-4">☁️</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Cloud Solutions</h3>
              <p className="text-gray-600">
                Scalable cloud infrastructure and migration services for modern businesses.
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Cybersecurity</h3>
              <p className="text-gray-600">
                Protect your business with comprehensive security assessments and solutions.
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Digital Transformation</h3>
              <p className="text-gray-600">
                Modernize your operations with digital-first strategies and implementations.
              </p>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default TechnologyPage;
