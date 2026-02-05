import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../../components/Nextonnect/ui/Hero';
import PublicLayout from '../../components/Nextonnect/layout/PublicLayout';

const TalentPage: React.FC = () => {
  return (
    <PublicLayout>
      <Hero
        title="Talent Solutions"
        subtitle="Connect with exceptional talent to drive your business forward. Our comprehensive recruitment and talent management services ensure you find the right people for success."
        ctaText="Find Talent"
        ctaLink="/signup"
      />

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Talent Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From recruitment to retention, we provide end-to-end talent solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-lg">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Talent Acquisition</h3>
              <p className="text-gray-600">
                Find the right candidates with our extensive network and screening processes.
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg">
              <div className="text-4xl mb-4">📋</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Contract Staffing</h3>
              <p className="text-gray-600">
                Flexible staffing solutions for project-based or temporary needs.
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Direct Placement</h3>
              <p className="text-gray-600">
                Full-time placement services for permanent positions.
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg">
              <div className="text-4xl mb-4">👥</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Team Building</h3>
              <p className="text-gray-600">
                Build high-performing teams aligned with your company culture.
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Workforce Planning</h3>
              <p className="text-gray-600">
                Strategic planning to meet your future talent needs.
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg">
              <div className="text-4xl mb-4">🌟</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Retention Strategies</h3>
              <p className="text-gray-600">
                Keep your best talent engaged and motivated.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-brand-blue-800 to-brand-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Build Your Dream Team?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join our platform to connect with top talent or find your next opportunity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="inline-flex items-center px-8 py-4 rounded-md text-lg font-medium text-brand-blue-900 bg-brand-yellow-500 hover:bg-brand-yellow-600 transition-colors shadow-lg"
            >
              Get Started
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center px-8 py-4 rounded-md text-lg font-medium text-white border-2 border-white hover:bg-white hover:text-brand-blue-900 transition-colors"
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
