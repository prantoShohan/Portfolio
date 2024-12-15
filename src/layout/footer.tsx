import { Copyright, Facebook, Github, Instagram, Youtube } from 'lucide-react';
import React from 'react';

const Footer = () => {
  return (
    <div className="h-[0px] responsive-padding w-full bg-[#222222] space-y-6 flex flex-col justify-between px-4 ">
      <div className="py-1 flex justify-between items-center">
        <div className="flex space-x-1 justify-center items-center">
          <Copyright size={14} />
          <div className="text-sm">Pranto Shohan</div>
        </div>
        <div className="flex space-x-3 justify-end items-center">
          <Facebook size={24} />
          <Instagram size={24} />
          <Youtube size={28} />
          <Github size={24} />
        </div>
      </div>
    </div>
  );
};

export default Footer;
