import Hero from '@/components/ui/Hero';

export const metadata = {
  title: 'Compliance Solutions - Nextonnect',
  description:
    'Comprehensive compliance management to meet regulatory requirements and minimize risk.',
};

export default function CompliancePage() {
  return (
    <>
      <Hero
        title="Compliance Solutions"
        subtitle="Comprehensive compliance management to meet regulatory requirements"
        ctaText="Contact Us"
        ctaLink="/contact"
      />

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-brand-blue-800 mb-6">
              Compliance Solutions
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Navigate the complex regulatory landscape with confidence.
              Nextonnect&apos;s compliance solutions help organizations meet their
              obligations while minimizing risk and maintaining operational
              efficiency.
            </p>

            <h2 className="text-3xl font-bold text-brand-blue-800 mb-6 mt-12">
              Comprehensive Compliance Management
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              We provide end-to-end compliance services tailored to your industry
              and specific regulatory requirements. Our expert team stays current
              with evolving regulations to keep you compliant.
            </p>

            <h2 className="text-3xl font-bold text-brand-blue-800 mb-6 mt-12">
              Service Areas
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Regulatory Compliance
                </h3>
                <p className="text-gray-600">
                  Meeting industry-specific requirements
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Risk Assessment
                </h3>
                <p className="text-gray-600">
                  Identifying and mitigating compliance risks
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Policy Development
                </h3>
                <p className="text-gray-600">
                  Creating comprehensive compliance frameworks
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Training & Awareness
                </h3>
                <p className="text-gray-600">
                  Educating your team on compliance matters
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Audit Support
                </h3>
                <p className="text-gray-600">
                  Preparing for and managing regulatory audits
                </p>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-brand-blue-800 mb-6 mt-12">
              Industry Experience
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Our compliance professionals have extensive experience across multiple
              sectors including:
            </p>
            <div className="space-y-4 mt-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-900 font-semibold mb-1">
                  Site Safety Management & Staffing
                </p>
                <p className="text-gray-600 text-sm">
                  Short-term or long-term placements
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-900 font-semibold mb-1">
                  OSHA / EM 385-1-1 / NFPA / Owner-Specific Compliance Support
                </p>
                <p className="text-gray-600 text-sm">
                  Comprehensive regulatory compliance
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-900 font-semibold mb-1">
                  Audits, Inspections, and Field Training
                </p>
                <p className="text-gray-600 text-sm">
                  On-site compliance verification
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-900 font-semibold mb-1">
                  Safety Program Development
                </p>
                <p className="text-gray-600 text-sm">
                  SSSPs, JHAs, PTPs, crisis plans
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-900 font-semibold mb-1">
                  Rapid 24-48 Hour Placement
                </p>
                <p className="text-gray-600 text-sm">
                  For urgent project needs
                </p>
              </div>
            </div>
            <div className="space-y-2 mt-6">
              <p className="text-gray-600 leading-relaxed">
                Healthcare (HIPAA, HITECH)
              </p>
              <p className="text-gray-600 leading-relaxed">
                Financial Services (SOX, PCI-DSS)
              </p>
              <p className="text-gray-600 leading-relaxed">
                Construction & Safety (OSHA)
              </p>
              <p className="text-gray-600 leading-relaxed">
                Environmental Regulations
              </p>
            </div>

            <h2 className="text-3xl font-bold text-brand-blue-800 mb-6 mt-12">
              Why Partner With Us?
            </h2>
            <div className="space-y-4 mt-6">
              <p className="text-gray-600 leading-relaxed">
                Proactive compliance monitoring
              </p>
              <p className="text-gray-600 leading-relaxed">
                Expert guidance on regulatory changes
              </p>
              <p className="text-gray-600 leading-relaxed">
                Customized compliance programs
              </p>
              <p className="text-gray-600 leading-relaxed">
                Reduced compliance costs
              </p>
              <p className="text-gray-600 leading-relaxed">Peace of mind</p>
            </div>

            <p className="text-gray-600 leading-relaxed mt-8">
              Let us handle the complexity of compliance so you can focus on growing
              your business.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-brand-blue-800 to-brand-blue-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ensure Your Compliance Today
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Let us help you navigate the complex regulatory landscape.
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
