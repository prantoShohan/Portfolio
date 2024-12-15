import { Copyright, Facebook, Github, Instagram, Youtube } from 'lucide-react';
import React from 'react';

const Footer = () => {
  return (
    <div className=" responsive-padding w-full bg-[#222222] space-y-6 flex flex-col justify-between px-4 py-4">
      <div className="py-1 flex justify-between items-center">
        <div className="flex space-x-1 justify-center items-center">
          <Copyright size={14} />
          <div className="text-sm">Pranto Shohan 2024</div>
        </div>
        <div className="flex space-x-3 justify-end items-center">
          <a href="https://www.facebook.com/pranto.shohan" target="_blank">
            <Facebook size={24} />
          </a>
          <a href="https://www.instagram.com/pranto91/" target="_blank">
            <Instagram size={24} />
          </a>
          <a href="https://www.youtube.com/@PrantoShohan" target="_blank">
            <Youtube size={28} />
          </a>
          <a href="https://github.com/prantoShohan" target="_blank">
            <Github size={24} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
