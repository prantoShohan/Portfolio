import Link from 'next/link';
import React from 'react';

const Header = () => {
  return (
    <div className="!min-h-[4vh] flex items-center  bg-[#222222] w-full responsive-padding z-30 sticky top-0">
      <div className="">
        <Link href={'/'} className="text-2xl font-bold">
          Pranto Shohan
        </Link>
      </div>
    </div>
  );
};

export default Header;
