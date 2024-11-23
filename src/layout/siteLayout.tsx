'use client';

import React from 'react';
import Header from './header';
import Footer from './footer';

const SiteLayout = ({ children }: { readonly children: React.ReactNode }) => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="min-h-[84vh] h-full w-full pb-6 relative ">
        {children}
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default SiteLayout;
