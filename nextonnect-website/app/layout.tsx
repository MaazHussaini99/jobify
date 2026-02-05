import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Nextonnect - Talent, Technology, Compliance & Training Solutions",
  description: "Nextonnect provides comprehensive solutions in talent acquisition, technology services, compliance management, and professional training to drive your business forward.",
  keywords: "talent solutions, technology consulting, compliance management, professional training, workforce development",
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased font-sans">
        <Navigation />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
