'use client';


import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { SectionType } from '@/model/sectiontype';
import CustomSections from '../custom-sections';

const Architecture = () => {
  const overviewRef = useRef(null);
  const HighriseRef = useRef(null);
  const SportsRef = useRef(null);
  const MawaRef = useRef(null);


  const sectionRefs = [
    overviewRef, HighriseRef, SportsRef, MawaRef,

  ];

  const [activeSection, setActiveSection] = useState<string>();

  const ARCHITECTURE_SECTIONS: SectionType[] = [
    {
      title: 'Overview',
      ref: overviewRef,
      subsections: [],
    },
    {
      title: 'Highrise',
      ref: HighriseRef,
      subsections: [],
    },
    {
      title: 'Sports Complex',
      ref: SportsRef,
      subsections: [],
    },
    {
      title: 'Riverfront Development',
      ref: MawaRef,
      subsections: [],
    },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id); // Update active section based on `id`
          }
        });
      },
      { threshold: 0.75 } // Adjust this to control how much of the section needs to be visible
    );

    // Observe all sections
    sectionRefs.forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    // Cleanup
    return () => observer.disconnect();
  }, [sectionRefs]);





  return (
    <div className = "bg-white min-h-screen relative ">
      {/* Cover */}
      <div className="relative h-[460px] bg-white">
        <Image
          src={'/images/architecture/Cover.png'}
          className="object-cover md:object-contain"
          alt=""
          fill
          unoptimized
        />
        <div className="absolute bottom-0  w-full bg-black/30 ">
          <div className="w-full pb-4  space-y-2 responsive-padding">
            <div className="text-5xl font-bold ">Architecture</div>
            <div className="text-base font-bold top-40 ">
            Academic Design Projects
            </div>
          </div>
        </div>
      </div>



      <div className="text-black relative px-4 responsive-padding-pages">
        <CustomSections
              sections={ARCHITECTURE_SECTIONS}
              activeSection={activeSection}
            />
      
        
        <div>
          <div className="section-title" 
            id="Overview"
            ref={overviewRef}>Overview</div>
          <div className="section-text max-w-[600px]">
            These are some of architectural design projects done during my undergraduate years.

          </div>
          <div className="h-[80px]"></div>
          <div className='flex flex-row w-full border border-gray-300/50' 
            id="Highrise"
            ref={HighriseRef}>
            <div className="w-full mt-4">
              <img 
                src="/images/architecture/portfolio 2_page-0008.jpg"
                className="w-full h-auto object-contain"
                alt="Reaction Diffusion"
              />
            </div>

            <div className="w-full mt-4">
              <img 
                src="/images/architecture/portfolio 2_page-0009.jpg"
                className="w-full h-auto object-contain"
                alt="Reaction Diffusion"
              />
            </div>
          </div>

          <div className='flex flex-row w-full border border-gray-300/50' >
            <div className="w-full mt-4">
              <img 
                src="/images/architecture/portfolio 2_page-0010.jpg"
                className="w-full h-auto object-contain"
                alt="Reaction Diffusion"
              />
            </div>

            <div className="w-full mt-4">
              <img 
                src="/images/architecture/portfolio 2_page-0011.jpg"
                className="w-full h-auto object-contain"
                alt="Reaction Diffusion"
              />
            </div>
          </div>

          <div className='flex flex-row w-full border border-gray-300/50' >
            <div className="w-full mt-4">
              <img 
                src="/images/architecture/portfolio 2_page-0012.jpg"
                className="w-full h-auto object-contain"
                alt="Reaction Diffusion"
              />
            </div>

            <div className="w-full mt-4">
              <img 
                src="/images/architecture/portfolio 2_page-0013.jpg"
                className="w-full h-auto object-contain"
                alt="Reaction Diffusion"
              />
            </div>
          </div>

          <div className='flex flex-row w-full border border-gray-300/50' >
            <div className="w-full mt-4">
              <img 
                src="/images/architecture/portfolio 2_page-0014.jpg"
                className="w-full h-auto object-contain"
                alt="Reaction Diffusion"
              />
            </div>

            <div className="w-full mt-4">
              <img 
                src="/images/architecture/portfolio 2_page-0015.jpg"
                className="w-full h-auto object-contain"
                alt="Reaction Diffusion"
              />
            </div>
          </div>

          <div className='flex flex-row w-full border border-gray-300/50' >
            <div className="w-full mt-4">
              <img 
                src="/images/architecture/portfolio 2_page-0016.jpg"
                className="w-full h-auto object-contain"
                alt="Reaction Diffusion"
              />
            </div>

            <div className="w-full mt-4">
              <img 
                src="/images/architecture/portfolio 2_page-0017.jpg"
                className="w-full h-auto object-contain"
                alt="Reaction Diffusion"
              />
            </div>
          </div>

          <div className='flex flex-row w-full border border-gray-300/50' >
            <div className="w-full mt-4">
              <img 
                src="/images/architecture/portfolio 2_page-0018.jpg"
                className="w-full h-auto object-contain"
                alt="Reaction Diffusion"
              />
            </div>

            <div className="w-full mt-4">
              <img 
                src="/images/architecture/portfolio 2_page-0019.jpg"
                className="w-full h-auto object-contain"
                alt="Reaction Diffusion"
              />
            </div>
          </div>

          <div className='flex flex-row w-full border border-gray-300/50' >
            <div className="w-full mt-4">
              <img 
                src="/images/architecture/portfolio 2_page-0020.jpg"
                className="w-full h-auto object-contain"
                alt="Reaction Diffusion"
              />
            </div>

            <div className="w-full mt-4">
              <img 
                src="/images/architecture/portfolio 2_page-0021.jpg"
                className="w-full h-auto object-contain"
                alt="Reaction Diffusion"
              />
            </div>
          </div>

          <div className='flex flex-row w-full border border-gray-300/50 mt-12' 
            id="Sports Complex"
            ref={SportsRef}>
            <div className="w-full mt-4">
              <img 
                src="/images/architecture/portfolio 2_page-0022.jpg"
                className="w-full h-auto object-contain"
                alt="Reaction Diffusion"
              />
            </div>

            <div className="w-full mt-4">
              <img 
                src="/images/architecture/portfolio 2_page-0023.jpg"
                className="w-full h-auto object-contain"
                alt="Reaction Diffusion"
              />
            </div>
          </div>

          <div className="w-full mt-4">
            <img 
              src="/images/architecture/1.png"
              className="w-full h-auto object-contain"
              alt="Reaction Diffusion"
            />
          </div>
          <div className="w-full mt-4">
            <img 
              src="/images/architecture/2.png"
              className="w-full h-auto object-contain"
              alt="Reaction Diffusion"
            />
          </div>
          <div className="w-full mt-4">
            <img 
              src="/images/architecture/3.png"
              className="w-full h-auto object-contain"
              alt="Reaction Diffusion"
            />
          </div>
          <div className="w-full mt-4">
            <img 
              src="/images/architecture/4.png"
              className="w-full h-auto object-contain"
              alt="Reaction Diffusion"
            />
          </div>
          <div className="w-full mt-4">
            <img 
              src="/images/architecture/5.png"
              className="w-full h-auto object-contain"
              alt="Reaction Diffusion"
            />
          </div>
          <div className="w-full mt-4">
            <img 
              src="/images/architecture/6.png"
              className="w-full h-auto object-contain"
              alt="Reaction Diffusion"
            />
          </div>

          <div className='flex flex-row w-full border border-gray-300/50' 
            id="Riverfront Development"
            ref={MawaRef}>
            <div className="w-full mt-4">
              <img 
                src="/images/architecture/portfolio 2_page-0034.jpg"
                className="w-full h-auto object-contain"
                alt="Reaction Diffusion"
              />
            </div>

            <div className="w-full mt-4">
              <img 
                src="/images/architecture/portfolio 2_page-0035.jpg"
                className="w-full h-auto object-contain"
                alt="Reaction Diffusion"
              />
            </div>
          </div>

          <div className='flex flex-row w-full ' >
            <div className="w-full mt-4">
              <img 
                src="/images/architecture/portfolio 2_page-0036.jpg"
                className="w-full h-auto object-contain"
                alt="Reaction Diffusion"
              />
            </div>

            <div className="w-full mt-4">
              <img 
                src="/images/architecture/portfolio 2_page-0037.jpg"
                className="w-full h-auto object-contain"
                alt="Reaction Diffusion"
              />
            </div>
          </div>

          <div className='flex flex-row w-full 0' >
            <div className="w-full mt-4">
              <img 
                src="/images/architecture/portfolio 2_page-0038.jpg"
                className="w-full h-auto object-contain"
                alt="Reaction Diffusion"
              />
            </div>

            <div className="w-full mt-4">
              <img 
                src="/images/architecture/portfolio 2_page-0039.jpg"
                className="w-full h-auto object-contain"
                alt="Reaction Diffusion"
              />
            </div>
          </div>

          <div className='flex flex-row w-full ' >
            <div className="w-full mt-4">
              <img 
                src="/images/architecture/portfolio 2_page-0040.jpg"
                className="w-full h-auto object-contain"
                alt="Reaction Diffusion"
              />
            </div>

            <div className="w-full mt-4">
              <img 
                src="/images/architecture/portfolio 2_page-0041.jpg"
                className="w-full h-auto object-contain"
                alt="Reaction Diffusion"
              />
            </div>
          </div>

          <div className='flex flex-row w-full  ' >
            <div className="w-full mt-4">
              <img 
                src="/images/architecture/portfolio 2_page-0042.jpg"
                className="w-full h-auto object-contain"
                alt="Reaction Diffusion"
              />
            </div>

            <div className="w-full mt-4">
              <img 
                src="/images/architecture/portfolio 2_page-0043.jpg"
                className="w-full h-auto object-contain"
                alt="Reaction Diffusion"
              />
            </div>
          </div>
          <div className="h-[80px]"></div>





          

        </div>

        
      



        

        






      </div>

      

    </div>

  );
};

export default Architecture;
