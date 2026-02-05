# Nextonnect Website

A modern, responsive website for Nextonnect showcasing their core business areas: Talent, Technology, Compliance, and Training.

## Features

- **Modern Design**: Clean, professional design with blue, construction yellow, black, and white color theme
- **Responsive Layout**: Fully responsive design that works on all devices
- **Lightweight CMS**: Markdown-based content management system for easy content updates
- **SEO Optimized**: Built-in SEO features with proper meta tags and structure
- **Fast Performance**: Optimized for speed using Next.js 16 and Tailwind CSS v4
- **AWS Amplify Ready**: Pre-configured for deployment on AWS Amplify

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Content**: Markdown with gray-matter and remark
- **Deployment**: AWS Amplify

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd nextonnect-website
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
nextonnect-website/
├── app/                    # Next.js app directory
│   ├── about/             # About page
│   ├── compliance/        # Compliance service page
│   ├── contact/           # Contact page
│   ├── talent/            # Talent service page
│   ├── technology/        # Technology service page
│   ├── training/          # Training service page
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── layout/           # Layout components (Navigation, Footer)
│   └── ui/               # UI components (Hero, ServiceCard)
├── content/              # Markdown content for CMS
│   ├── compliance/       # Compliance content
│   ├── talent/          # Talent content
│   ├── technology/      # Technology content
│   └── training/        # Training content
├── lib/                  # Utility functions
│   └── markdown.ts      # Markdown processing utilities
└── public/              # Static assets

```

## Content Management

The website uses a markdown-based CMS. Content is stored in the `content/` directory, organized by category.

### Adding New Content

1. Navigate to the appropriate category folder in `content/`
2. Create a new `.md` file or edit existing ones
3. Add frontmatter at the top:

```markdown
---
title: "Your Title"
description: "Your description"
icon: "📝"
order: 1
---

# Your content here...
```

4. The changes will be reflected after rebuilding the site

### Content Structure

Each markdown file supports:
- **title**: Display title
- **description**: Short description
- **icon**: Emoji icon (optional)
- **order**: Display order (optional)
- **content**: Markdown body content

## Customization

### Theme Colors

Colors are defined in `app/globals.css`. The theme uses:
- **Primary Blue**: `#1e40af` (brand-blue-800)
- **Secondary Blue**: `#3b82f6` (brand-blue-500)
- **Construction Yellow**: `#fbbf24` (brand-yellow-500)
- **Dark Yellow**: `#f59e0b` (brand-yellow-600)

### Modifying Components

- **Navigation**: Edit `components/layout/Navigation.tsx`
- **Footer**: Edit `components/layout/Footer.tsx`
- **Hero**: Edit `components/ui/Hero.tsx`
- **Service Cards**: Edit `components/ui/ServiceCard.tsx`

## Deployment

### AWS Amplify Deployment

1. **Connect Repository**:
   - Log in to AWS Amplify Console
   - Click "New app" > "Host web app"
   - Connect your Git repository

2. **Configure Build Settings**:
   - Amplify will automatically detect the `amplify.yml` configuration
   - Review and confirm the build settings

3. **Deploy**:
   - Click "Save and deploy"
   - Amplify will build and deploy your application
   - You'll receive a deployment URL

### Manual Deployment

Build the production-ready application:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

### Environment Variables

Create a `.env.local` file based on `.env.example`:

```env
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NEXT_PUBLIC_SITE_NAME=Nextonnect
NEXT_PUBLIC_CONTACT_EMAIL=info@nextonnect.com
NEXT_PUBLIC_CONTACT_PHONE=(555) 123-4567
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Support

For questions or issues, contact:
- Email: info@nextonnect.com
- Phone: (555) 123-4567

## License

Copyright © 2025 Nextonnect. All rights reserved.
