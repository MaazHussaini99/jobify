import React from 'react';
import { Link } from 'react-router-dom';

interface HeroProps {
  title: string;
  subtitle: string;
  ctaText?: string;
  ctaLink?: string;
  showLearnMore?: boolean;
}

const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  ctaText = 'Get Started',
  ctaLink = '/contact',
  showLearnMore = true,
}) => {
  return (
    <div className="relative bg-gradient-to-br from-brand-blue-900 via-brand-blue-800 to-brand-blue-700 text-white">
      <div className="absolute inset-0 bg-black opacity-10"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            {title}
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
            {subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to={ctaLink}
              className="inline-flex items-center justify-center px-8 py-4 rounded-md text-lg font-medium text-brand-blue-900 bg-brand-yellow-500 hover:bg-brand-yellow-600 transition-colors shadow-lg"
            >
              {ctaText}
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
            </Link>
            {showLearnMore && (
              <Link
                to="/about"
                className="inline-flex items-center justify-center px-8 py-4 rounded-md text-lg font-medium text-white bg-transparent border-2 border-white hover:bg-white hover:text-brand-blue-900 transition-colors"
              >
                Learn More
              </Link>
            )}
          </div>
        </div>
      </div>
      {/* Decorative bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          className="w-full h-12 md:h-20"
          preserveAspectRatio="none"
          viewBox="0 0 1440 74"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 74L60 68.8C120 63.7 240 53.3 360 48.2C480 43 600 43 720 48.2C840 53.3 960 63.7 1080 63.7C1200 63.7 1320 53.3 1380 48.2L1440 43V74H1380C1320 74 1200 74 1080 74C960 74 840 74 720 74C600 74 480 74 360 74C240 74 120 74 60 74H0Z"
            fill="white"
          />
        </svg>
      </div>
    </div>
  );
};

export default Hero;
