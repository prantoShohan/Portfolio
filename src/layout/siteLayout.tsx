'use client';

import React from 'react';
import Header from './header';
import Footer from './footer';
import { usePathname } from 'next/navigation';  // Import usePathname
import { Analytics } from '@vercel/analytics/next';

const SiteLayout = ({ children }: { readonly children: React.ReactNode }) => {
  const pathname = usePathname();

  // Condition to exclude the Header on the LandingPage
  const showHeader = pathname !== '/';  // Assumes '/' is the landing page

  return (
    <div className="flex flex-col relative">
      {/* Conditionally render the Header */}
      {showHeader && <Header />}
      <div className="min-h-[84vh] h-full w-full pb- relative ">
        {children}
        <Analytics />
      </div>
      <Footer />
    </div>
  );
};

export default SiteLayout;
