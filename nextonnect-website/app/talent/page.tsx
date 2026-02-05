import Hero from '@/components/ui/Hero';

export const metadata = {
  title: 'Talent Solutions - Nextonnect',
  description:
    'Comprehensive talent acquisition and management solutions to build exceptional teams.',
};

export default function TalentPage() {
  return (
    <>
      <Hero
        title="Talent Solutions"
        subtitle="Connecting exceptional talent with opportunities for growth and success"
        ctaText="Contact Us"
        ctaLink="/contact"
      />

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-brand-blue-800 mb-6">
              Talent Solutions
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              At Nextonnect, we specialize in identifying, nurturing, and placing
              top-tier talent across industries. Our comprehensive talent solutions
              ensure that businesses find the right people to drive their success.
            </p>

            <h2 className="text-3xl font-bold text-brand-blue-800 mb-6 mt-12">
              Our Approach
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              We believe in a holistic approach to talent management that goes
              beyond simple recruitment. Our team works closely with both candidates
              and employers to create meaningful connections that benefit everyone
              involved.
            </p>

            <h2 className="text-3xl font-bold text-brand-blue-800 mb-6 mt-12">
              Key Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Talent Acquisition
                </h3>
                <p className="text-gray-600">
                  Sourcing and recruiting top professionals
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Talent Development
                </h3>
                <p className="text-gray-600">
                  Training and upskilling programs
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Workforce Planning
                </h3>
                <p className="text-gray-600">
                  Strategic hiring and resource allocation
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Executive Search
                </h3>
                <p className="text-gray-600">
                  Finding leaders who can drive transformation
                </p>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-brand-blue-800 mb-6 mt-12">
              Why Choose Our Talent Solutions?
            </h2>
            <div className="space-y-4 mt-6">
              <p className="text-gray-600 leading-relaxed">
                Extensive network of qualified professionals
              </p>
              <p className="text-gray-600 leading-relaxed">
                Industry-specific expertise
              </p>
              <p className="text-gray-600 leading-relaxed">
                Rigorous screening and vetting processes
              </p>
              <p className="text-gray-600 leading-relaxed">
                Ongoing support and relationship management
              </p>
            </div>

            <p className="text-gray-600 leading-relaxed mt-8">
              Let us help you build a team that propels your organization forward.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-brand-blue-800 to-brand-blue-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Build Your Dream Team?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Let us help you find the talent that will drive your success.
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
