import Hero from '@/components/ui/Hero';

export const metadata = {
  title: 'Training & Development - Nextonnect',
  description:
    'Professional training programs to elevate your workforce capabilities and drive organizational success.',
};

export default function TrainingPage() {
  return (
    <>
      <Hero
        title="Training & Development"
        subtitle="Professional training programs to elevate your workforce capabilities"
        ctaText="Contact Us"
        ctaLink="/contact"
      />

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-brand-blue-800 mb-6">
              Training & Development
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Invest in your most valuable asset—your people. Nextonnect offers
              comprehensive training and development programs designed to enhance
              skills, improve performance, and drive organizational success.
            </p>

            <h2 className="text-3xl font-bold text-brand-blue-800 mb-6 mt-12">
              Professional Development Programs
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Our training solutions are designed to meet the evolving needs of
              modern workplaces, combining industry best practices with practical,
              hands-on learning experiences.
            </p>

            <h2 className="text-3xl font-bold text-brand-blue-800 mb-6 mt-12">
              Training Categories
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Technical Skills Training
                </h3>
                <p className="text-gray-600">
                  Software, tools, and technologies
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Leadership Development
                </h3>
                <p className="text-gray-600">
                  Building effective leaders at all levels
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Safety & Compliance
                </h3>
                <p className="text-gray-600">
                  OSHA, industry-specific safety protocols
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Soft Skills
                </h3>
                <p className="text-gray-600">
                  Communication, teamwork, and problem-solving
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Industry Certifications
                </h3>
                <p className="text-gray-600">
                  Preparation for professional credentials
                </p>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-brand-blue-800 mb-6 mt-12">
              Flexible Delivery Methods
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We understand that organizations have different learning preferences
              and constraints. Our training programs are available in multiple
              formats:
            </p>
            <div className="space-y-3 mt-6">
              <p className="text-gray-600 leading-relaxed">
                In-person workshops
              </p>
              <p className="text-gray-600 leading-relaxed">
                Virtual instructor-led training
              </p>
              <p className="text-gray-600 leading-relaxed">
                Self-paced online courses
              </p>
              <p className="text-gray-600 leading-relaxed">
                Blended learning approaches
              </p>
              <p className="text-gray-600 leading-relaxed">
                On-site customized programs
              </p>
            </div>

            <h2 className="text-3xl font-bold text-brand-blue-800 mb-6 mt-12">
              Benefits of Our Training
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Increased Productivity
                </h3>
                <p className="text-gray-600">
                  Better-trained employees work more efficiently
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Higher Retention
                </h3>
                <p className="text-gray-600">
                  Employees value professional development opportunities
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Improved Safety
                </h3>
                <p className="text-gray-600">
                  Proper training reduces workplace incidents
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Enhanced Competitiveness
                </h3>
                <p className="text-gray-600">
                  A skilled workforce drives innovation
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Compliance Assurance
                </h3>
                <p className="text-gray-600">
                  Meet regulatory training requirements
                </p>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-brand-blue-800 mb-6 mt-12">
              Customized Solutions
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Every organization is unique. We work with you to develop training
              programs that align with your specific goals, culture, and industry
              requirements.
            </p>

            <p className="text-gray-600 leading-relaxed mt-8">
              Empower your team with the knowledge and skills they need to excel.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-brand-blue-800 to-brand-blue-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Empower Your Team</h2>
          <p className="text-xl text-blue-100 mb-8">
            Discover how our training programs can transform your workforce.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center px-8 py-4 rounded-md text-lg font-medium text-brand-blue-900 bg-brand-yellow-500 hover:bg-brand-yellow-600 transition-colors shadow-lg"
          >
            Get Started
          </a>
        </div>
      </section>
    </>
  );
}
