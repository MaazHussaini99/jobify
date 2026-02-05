import React from 'react';
import Hero from '../../components/Nextonnect/ui/Hero';
import PublicLayout from '../../components/Nextonnect/layout/PublicLayout';

const TrainingPage: React.FC = () => {
  return (
    <PublicLayout>
      <Hero
        title="Training & Development"
        subtitle="Invest in your workforce with professional training programs. Enhance skills, improve performance, and drive organizational success."
        ctaText="Explore Programs"
        ctaLink="/contact"
      />

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Training Programs</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive training solutions to develop your workforce.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-8 rounded-lg">
              <div className="text-4xl mb-4">💼</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Professional Development</h3>
              <p className="text-gray-600">
                Enhance leadership, communication, and management skills for career advancement.
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg">
              <div className="text-4xl mb-4">🔧</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Technical Training</h3>
              <p className="text-gray-600">
                Industry-specific technical skills training for your team.
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg">
              <div className="text-4xl mb-4">🛡️</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Safety Training</h3>
              <p className="text-gray-600">
                OSHA compliance and workplace safety certification programs.
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg">
              <div className="text-4xl mb-4">👥</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Team Building</h3>
              <p className="text-gray-600">
                Collaborative workshops to strengthen team dynamics and productivity.
              </p>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default TrainingPage;
