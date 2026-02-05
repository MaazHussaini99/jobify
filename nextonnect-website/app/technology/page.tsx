import Hero from '@/components/ui/Hero';

export const metadata = {
  title: 'Technology Solutions - Nextonnect',
  description:
    'Innovative technology solutions to transform your business operations and drive digital transformation.',
};

export default function TechnologyPage() {
  return (
    <>
      <Hero
        title="Technology Solutions"
        subtitle="Innovative technology solutions to transform your business operations"
        ctaText="Contact Us"
        ctaLink="/contact"
      />

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-brand-blue-800 mb-6">
              Technology Solutions
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Nextonnect delivers cutting-edge technology solutions that drive
              digital transformation and operational excellence. We help businesses
              leverage technology to achieve their strategic goals.
            </p>

            <h2 className="text-3xl font-bold text-brand-blue-800 mb-6 mt-12">
              Our Expertise
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Transform your business by providing anything from AI audits to custom
              solutions driving your companies success.
            </p>

            <h2 className="text-3xl font-bold text-brand-blue-800 mb-6 mt-12">
              Core Offerings
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  AI Audits
                </h3>
                <p className="text-gray-600">
                  Comprehensive evaluation of your AI readiness and opportunities
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Software Audits
                </h3>
                <p className="text-gray-600">
                  In-depth analysis of your existing software systems
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Workflow Automations
                </h3>
                <p className="text-gray-600">
                  Streamlining processes for maximum efficiency
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Custom Solutions Development
                </h3>
                <p className="text-gray-600">
                  Tailored software built for your unique needs
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Digital Transformation
                </h3>
                <p className="text-gray-600">
                  Modernizing legacy systems for the future
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Cloud Solutions
                </h3>
                <p className="text-gray-600">
                  Migration, optimization, and management
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  IT Infrastructure
                </h3>
                <p className="text-gray-600">
                  Design, implementation, and support
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Cybersecurity
                </h3>
                <p className="text-gray-600">
                  Protecting your digital assets
                </p>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-brand-blue-800 mb-6 mt-12">
              Innovation-Driven Approach
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              We stay ahead of technology trends to provide solutions that are not
              only current but future-proof. Our team continuously explores emerging
              technologies to deliver competitive advantages to our clients.
            </p>

            <h2 className="text-3xl font-bold text-brand-blue-800 mb-6 mt-12">
              Benefits
            </h2>
            <div className="space-y-4 mt-6">
              <p className="text-gray-600 leading-relaxed">
                Scalable and flexible solutions
              </p>
              <p className="text-gray-600 leading-relaxed">
                Enhanced operational efficiency
              </p>
              <p className="text-gray-600 leading-relaxed">
                Reduced technology costs
              </p>
              <p className="text-gray-600 leading-relaxed">
                Improved security and compliance
              </p>
              <p className="text-gray-600 leading-relaxed">
                24/7 technical support
              </p>
            </div>

            <p className="text-gray-600 leading-relaxed mt-8">
              Partner with us to navigate the complex technology landscape and unlock
              new possibilities for your business.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-brand-blue-800 to-brand-blue-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Transform Your Technology?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Let&apos;s discuss how our technology solutions can accelerate your
            business.
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
