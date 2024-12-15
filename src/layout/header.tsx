'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll';

const Header = () => {
  const path = usePathname();

  return (
    <div className="!min-h-[4vh] flex items-center  bg-[#222222] w-full responsive-padding z-30 sticky top-0 justify-between">
      <div className="">
        <Link href={'/'} className="text-2xl font-bold">
          Pranto Shohan
        </Link>
      </div>
      {path === '/' ? (
        <div className="space-x-3">
          <AnchorLink className="link-hover" href="#projects">
            Projects
          </AnchorLink>
          <AnchorLink className="link-hover" href="#about-me">
            About me
          </AnchorLink>
        </div>
      ) : (
        <div className="space-x-3">
          <Link className="link-hover" href="/#projects">
            Projects
          </Link>
          <Link className="link-hover" href="/#about-me">
            About me
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
