import Hero from '@/components/ui/Hero';

export const metadata = {
  title: 'About Us - Nextonnect',
  description:
    'Learn about Nextonnect and our mission to provide exceptional talent, technology, compliance, and training solutions.',
};

export default function AboutPage() {
  return (
    <>
      <Hero
        title="About Nextonnect"
        subtitle="Your trusted partner in talent, technology, compliance, and training solutions"
        ctaText="Contact Us"
        ctaLink="/contact"
      />

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-brand-blue-800 mb-6">
              Who We Are
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Nextonnect is a comprehensive solutions provider specializing in
              four core areas: Talent Solutions, Technology Services, Compliance
              Management, and Professional Training. We are dedicated to helping
              businesses of all sizes achieve their goals through integrated,
              innovative approaches.
            </p>

            <h2 className="text-3xl font-bold text-brand-blue-800 mb-6 mt-12">
              Our Mission
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Our mission is to empower organizations to thrive in an
              ever-changing business landscape by providing exceptional services
              that drive growth, ensure compliance, and build capabilities. We
              believe in long-term partnerships built on trust, expertise, and
              measurable results.
            </p>

            <h2 className="text-3xl font-bold text-brand-blue-800 mb-6 mt-12">
              Our Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Excellence
                </h3>
                <p className="text-gray-600">
                  We strive for excellence in everything we do, delivering
                  superior quality and exceptional results.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Integrity
                </h3>
                <p className="text-gray-600">
                  We conduct our business with the highest ethical standards and
                  transparency.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Innovation
                </h3>
                <p className="text-gray-600">
                  We embrace innovation and continuously seek better ways to
                  serve our clients.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Partnership
                </h3>
                <p className="text-gray-600">
                  We build lasting relationships based on mutual trust and shared
                  success.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Nextonnect?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="text-xl font-bold mb-2">Comprehensive Solutions</h3>
              <p className="text-gray-600">
                All your business needs addressed through our four integrated
                service areas.
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">🏆</div>
              <h3 className="text-xl font-bold mb-2">Industry Expertise</h3>
              <p className="text-gray-600">
                Deep knowledge and experience across multiple industries and
                sectors.
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">🤝</div>
              <h3 className="text-xl font-bold mb-2">Client-Focused</h3>
              <p className="text-gray-600">
                Personalized service tailored to your unique goals and
                challenges.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
