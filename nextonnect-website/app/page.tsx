import Hero from '@/components/ui/Hero';
import ServiceCard from '@/components/ui/ServiceCard';

const services = [
  {
    title: 'Talent Solutions',
    description:
      'Connect with exceptional talent to drive your business forward. Our comprehensive recruitment and talent management services ensure you find the right people for success.',
    icon: '👥',
    href: '/talent',
    color: 'blue' as const,
  },
  {
    title: 'Technology Solutions',
    description:
      'From AI audits to custom solutions driving your companies success',
    icon: '💻',
    href: '/technology',
    color: 'blue' as const,
  },
  {
    title: 'Compliance Management',
    description:
      'Navigate complex regulatory requirements with confidence. Our expert compliance solutions help you meet obligations while minimizing risk.',
    icon: '✓',
    href: '/compliance',
    color: 'yellow' as const,
  },
  {
    title: 'Training & Development',
    description:
      'Invest in your workforce with professional training programs. Enhance skills, improve performance, and drive organizational success.',
    icon: '🎓',
    href: '/training',
    color: 'yellow' as const,
  },
];

export default function Home() {
  return (
    <>
      <Hero
        title="Empowering Your Business Success"
        subtitle="Comprehensive solutions in Talent, Technology, Compliance, and Training to transform your organization and drive sustainable growth."
      />

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Core Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide integrated solutions across four key areas to help your
              business thrive in today&apos;s competitive landscape.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service) => (
              <ServiceCard key={service.title} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Industries We Serve
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Delivering specialized solutions across critical sectors
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg text-center hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Data Center</h3>
              <p className="text-gray-600 text-sm">Infrastructure and operational excellence</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg text-center hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Oil & Gas</h3>
              <p className="text-gray-600 text-sm">Energy sector compliance and safety</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg text-center hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Semi Conductor</h3>
              <p className="text-gray-600 text-sm">Advanced manufacturing solutions</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg text-center hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Renewable Energy</h3>
              <p className="text-gray-600 text-sm">Sustainable energy solutions</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Nextonnect?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We combine expertise, innovation, and dedication to deliver
              exceptional results for our clients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-brand-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-brand-blue-800"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Proven Expertise
              </h3>
              <p className="text-gray-600">
                Years of experience delivering successful outcomes across
                multiple industries and sectors.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-brand-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-brand-yellow-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Innovative Solutions
              </h3>
              <p className="text-gray-600">
                Cutting-edge approaches and technologies to keep you ahead of
                the competition.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-brand-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-brand-blue-800"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Dedicated Support
              </h3>
              <p className="text-gray-600">
                Personalized service and ongoing support to ensure your
                long-term success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-brand-blue-800 to-brand-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Let&apos;s discuss how our comprehensive solutions can help you
            achieve your goals.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center px-8 py-4 rounded-md text-lg font-medium text-brand-blue-900 bg-brand-yellow-500 hover:bg-brand-yellow-600 transition-colors shadow-lg"
          >
            Get Started Today
            <svg
              className="ml-2 w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </a>
        </div>
      </section>
    </>
  );
}
