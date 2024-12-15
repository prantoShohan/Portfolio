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
    <div className="!min-h-[4vh] flex items-center bg-[#222222] w-full responsive-padding z-30 sticky top-0 justify-between py-2">
      <div>
        <Link href={'/'} className="text-2xl font-bold">
          Pranto Shohan
        </Link>
      </div>

      <div className="space-x-3">
        <Hamburger onToggle={toggleMenu} toggled={isMenuOpen} size={20} />
        {isMenuOpen && (
          <div
            className={cn(
              'absolute animate-in fade-in-0 zoom-in-95 duration-600 flex flex-col space-y-6 shadow-lg rounded-md md:right-[26%] right-[2%] -left-[2%] md:left-auto z-50 px-4 py-4 md:w-[200px] bg-black/60 backdrop-blur-md',
              isMenuOpen
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 -translate-y-4'
            )}
          >
            <div className="pt-4 flex flex-col items-end space-y-6">
              <Link
                href={'/#mind-map'}
                className="link-hover font-medium group"
                onClick={toggleMenu}
              >
                <div className="relative flex items-center space-x-1">
                  <span className="group-hover:after:w-full after:transition-all after:duration-300 after:ease-in-out after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-white after:w-0">
                    Mind Map
                  </span>
                </div>
              </Link>
              <Link
                href={'/#academic-projects'}
                className="link-hover font-medium group"
                onClick={toggleMenu}
              >
                <div className="relative flex items-center space-x-1">
                  <span className="group-hover:after:w-full after:transition-all after:duration-300 after:ease-in-out after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-white after:w-0">
                    Academic Projects
                  </span>
                </div>
              </Link>
              <Link
                href={'/#personal-projects'}
                className="link-hover font-medium group"
                onClick={toggleMenu}
              >
                <div className="relative flex items-center space-x-1">
                  <span className="group-hover:after:w-full after:transition-all after:duration-300 after:ease-in-out after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-white after:w-0">
                    Personal Projects
                  </span>
                </div>
              </Link>
              <Link
                href={'/#arts-and-misc'}
                className="link-hover font-medium group"
                onClick={toggleMenu}
              >
                <div className="relative flex items-center space-x-1">
                  <span className="group-hover:after:w-full after:transition-all after:duration-300 after:ease-in-out after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-white after:w-0">
                    Arts and Misc.
                  </span>
                </div>
              </Link>
              <Link
                href={'/#about'}
                className="link-hover font-medium group"
                onClick={toggleMenu}
              >
                <div className="relative flex items-center space-x-1">
                  <span className="group-hover:after:w-full after:transition-all after:duration-300 after:ease-in-out after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-white after:w-0">
                    About
                  </span>
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
