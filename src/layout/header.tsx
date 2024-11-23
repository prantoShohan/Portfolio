import Link from 'next/link';
import React from 'react';

const Header = () => {
  return (
    <div className="!min-h-[10vh] flex items-center border border-white/5 bg-background w-full responsive-padding z-30 sticky top-0">
      <div className="">
        <Link href={'/'} className="text-5xl font-bold">
          Pranto Shohan
        </Link>
      </div>
    </div>
  );
};

export default Header;
