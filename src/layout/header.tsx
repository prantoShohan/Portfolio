'use client';

import { cn } from '@/lib/utils';
import Hamburger from 'hamburger-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';

const Header = () => {
  const path = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <div className="!min-h-[4vh] flex items-center  bg-[#222222] w-full responsive-padding z-30 sticky top-0 justify-between">
      <div className="">
        <Link href={'/'} className="text-2xl font-bold">
          Pranto Shohan
        </Link>
      </div>

      <div className="space-x-3">
        <Hamburger onToggle={toggleMenu} toggled={isMenuOpen} size={20} />
        {isMenuOpen && (
          <div
            className={cn(
              'absolute animate-in fade-in-0 zoom-in-95 duration-600 flex flex-col space-y-4 shadow-md rounded-md md:right-[26%] right-[2%] -left-[2%] md:left-auto z-50 px-4 py-4 md:w-[200px] bg-black/60',
              isMenuOpen
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 -translate-y-4'
            )}
          >
            <div className="pt-4">
              <Link
                href={'/#projects'}
                className="link-hover font-medium"
                onClick={toggleMenu}
              >
                <div className="flex items-center space-x-1">
                  <span>Projects</span>
                </div>
              </Link>
              <Link
                href={'/#projects'}
                className="link-hover font-medium"
                onClick={toggleMenu}
              >
                <div className="flex items-center space-x-1">
                  <span>About me</span>
                </div>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
