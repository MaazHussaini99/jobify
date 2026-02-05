import Link from 'next/link';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
  href: string;
  color?: 'blue' | 'yellow';
}

export default function ServiceCard({
  title,
  description,
  icon,
  href,
  color = 'blue',
}: ServiceCardProps) {
  const colorClasses = {
    blue: 'bg-brand-blue-800 hover:bg-brand-blue-900',
    yellow: 'bg-brand-yellow-600 hover:bg-brand-yellow-700',
  };

  return (
    <div className="group bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="p-8">
        <div className="text-5xl mb-4">{icon}</div>
        <h3 className="text-2xl font-bold text-gray-900 mb-3">{title}</h3>
        <p className="text-gray-600 mb-6 leading-relaxed">{description}</p>
        <Link
          href={href}
          className={`inline-flex items-center px-6 py-3 rounded-md text-white font-medium transition-colors ${colorClasses[color]}`}
        >
          Learn More
          <svg
            className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}
