'use client';


import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import CustomSections from './custom-sections';
import { SectionType } from '@/model/sectiontype';

const Exploration = () => {
  const overviewRef = useRef(null);


  const sectionRefs = [
    overviewRef, 

  ];

  const [activeSection, setActiveSection] = useState<string>();

  const EMERGENCE_SECTIONS: SectionType[] = [
    {
      title: 'Overview',
      ref: overviewRef,
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
    <div className = "bg-white min-h-screen relative">
      {/* Cover */}
      <div className="relative h-[460px] bg-white">
        <Image
          src={'/images/exploration/anima.gif'}
          className="object-cover md:object-contain"
          alt=""
          fill
          unoptimized
        />
        <div className="absolute bottom-0 backdrop-blur-sm w-full bg-black/30 responsive-padding">
          <div className="w-full pb-4  space-y-2">
            <div className="text-5xl font-bold ">Exploration</div>
            <div className="text-base font-bold top-40 ">
                of Parametric Forms
            </div>
          </div>
        </div>
      </div>



      <div className="text-black relative px-4 ">
      
        
        <div
          id="Overview"
          ref={overviewRef}>
          <div className="section-title">Overview</div>
          <div className="section-text">
            These projects were done during the first year of my architecture school.
             Having prior experience in programming, I became immidiately interested in Grasshopper.
             As I experimented with grasshopper for my class project, it became intuitive to me.

          </div>

          <div className="w-full mt-4">
            <img 
              src="/images/exploration/10.jpeg"
              className="w-full h-auto object-contain"
              alt="Reaction Diffusion"
            />
          </div>
          <div className="w-full mt-4">
            <img 
              src="/images/exploration/20.jpeg"
              className="w-full h-auto object-contain"
              alt="Reaction Diffusion"
            />
          </div>
          <div className="w-full mt-4">
            <img 
              src="/images/exploration/30.jpeg"
              className="w-full h-auto object-contain"
              alt="Reaction Diffusion"
            />
          </div>
          <div className="w-full mt-4">
            <img 
              src="/images/exploration/40.jpeg"
              className="w-full h-auto object-contain"
              alt="Reaction Diffusion"
            />
          </div>
          <div className="w-full mt-4">
            <img 
              src="/images/exploration/50.jpeg"
              className="w-full h-auto object-contain"
              alt="Reaction Diffusion"
            />
          </div>
          <div className="w-full mt-4">
            <img 
              src="/images/exploration/60.jpeg"
              className="w-full h-auto object-contain"
              alt="Reaction Diffusion"
            />
          </div>
          <div className="w-full mt-4">
            <img 
              src="/images/exploration/70.jpeg"
              className="w-full h-auto object-contain"
              alt="Reaction Diffusion"
            />
          </div>
          <div className="w-full mt-4">
            <img 
              src="/images/exploration/80.jpeg"
              className="w-full h-auto object-contain"
              alt="Reaction Diffusion"
            />
          </div>

        </div>

        
      



        

        






      </div>

      

    </div>

  );
};

export default Exploration;