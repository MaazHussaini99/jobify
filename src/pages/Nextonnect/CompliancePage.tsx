import React from 'react';
import Hero from '../../components/Nextonnect/ui/Hero';
import PublicLayout from '../../components/Nextonnect/layout/PublicLayout';

const CompliancePage: React.FC = () => {
  return (
    <PublicLayout>
      <Hero
        title="Compliance Management"
        subtitle="Navigate complex regulatory requirements with confidence. Our expert compliance solutions help you meet obligations while minimizing risk."
        ctaText="Get Compliant"
        ctaLink="/contact"
      />

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Compliance Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stay ahead of regulatory requirements with our comprehensive compliance solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-lg">
              <div className="text-4xl mb-4">📋</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Regulatory Compliance</h3>
              <p className="text-gray-600">
                Ensure adherence to industry-specific regulations and standards.
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Compliance Audits</h3>
              <p className="text-gray-600">
                Comprehensive audits to identify gaps and areas for improvement.
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg">
              <div className="text-4xl mb-4">⚠️</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Risk Assessment</h3>
              <p className="text-gray-600">
                Identify and mitigate compliance risks before they become issues.
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Policy Development</h3>
              <p className="text-gray-600">
                Create and implement effective compliance policies and procedures.
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg">
              <div className="text-4xl mb-4">🎓</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Compliance Training</h3>
              <p className="text-gray-600">
                Educate your team on compliance requirements and best practices.
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Reporting & Documentation</h3>
              <p className="text-gray-600">
                Maintain accurate records and generate compliance reports.
              </p>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default CompliancePage;
