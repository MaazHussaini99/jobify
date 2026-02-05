import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Talent', href: '/talent' },
  { name: 'Technology', href: '/technology' },
  { name: 'Compliance', href: '/compliance' },
  { name: 'Training', href: '/training' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3">
              <img
                src="/nextonnect-logo.png"
                alt="Nextonnect Logo"
                className="h-14 w-auto"
              />
              <div className="text-xl font-bold">
                <span className="text-brand-blue-800">Next</span>
                <span className="text-brand-yellow-600">onnect</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-brand-blue-800 hover:bg-gray-100 transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/signin"
              className="ml-2 px-4 py-2 rounded-md text-sm font-medium text-brand-blue-800 hover:bg-gray-100 transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="ml-2 px-6 py-2 rounded-md text-sm font-medium text-white bg-brand-blue-800 hover:bg-brand-blue-900 transition-colors"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-brand-blue-800 hover:bg-gray-100 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-brand-blue-800 hover:bg-gray-100"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/signin"
              className="block px-3 py-2 rounded-md text-base font-medium text-brand-blue-800 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="block px-3 py-2 rounded-md text-base font-medium text-white bg-brand-blue-800 hover:bg-brand-blue-900"
              onClick={() => setIsOpen(false)}
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
