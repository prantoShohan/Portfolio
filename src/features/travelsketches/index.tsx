'use client';


import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import CustomSections from './custom-sections';
import { SectionType } from '@/model/sectiontype';
import ImageComparison from '../ImageComparison';



const TravelSketches: React.FC = () => {

  const OverviewRef = useRef(null);
  const IndiaTripRef = useRef(null);
  const KeralaRef = useRef(null);


  const images = [
    '/images/travelsketches/1.jpg',
    '/images/travelsketches/2.jpg',
  ];


  const sectionRefs = [
    OverviewRef, IndiaTripRef, KeralaRef

  ];

  const [activeSection, setActiveSection] = useState<string>();

  const TRAVELSKETCHES_SECTIONS: SectionType[] = [

    {
      title: 'Overview',
      ref: OverviewRef,
      subsections: [],
    },
    {
      title: 'India Trip',
      ref: IndiaTripRef,
      subsections: [],
    },
    {
      title: 'Kerala',
      ref: KeralaRef,
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
          src={'/images/travelsketches/cover.png'}
          className="object-cover md:object-cover"
          alt=""
          fill
          unoptimized
        />
        <div className="absolute bottom-0 backdrop-blur-sm w-full bg-black/30 ">
          <div className="w-full pb-4  space-y-2 responsive-padding">
            <div className="text-5xl font-bold ">Travel Sketches</div>
            <div className="text-base font-bold top-40 ">

            </div>
          </div>
        </div>
      </div>



      <div className="text-black relative px-4 responsive-padding">
        <CustomSections
              sections={TRAVELSKETCHES_SECTIONS}
              activeSection={activeSection}
            />
      
        
        <div>
          <div className="section-title" 
            id="Overview"
            ref={OverviewRef}>Overview</div>
          <div className="section-text max-w-[600px]">
            These sketches were done on site taking not more than 30 minuites each. My travels broadened my perspective about the Life Universe and Everything.
          </div>
          <div className="section-title" 
            id="India Trip"
            ref={IndiaTripRef}>India Trip</div>
          <div className="section-text max-w-[600px]">
            I travelled around the india for 35 days. visiting more than 15 cities I learned about culture, architecture, food and natural adaptations.
          </div>
          <div className="w-full mt-4">
            <img 
              src="/images/travelsketches/portfolio 2_page-0046.jpg"
              className="w-full h-auto object-contain"
              alt="Reaction Diffusion"
            />
          </div>
          <div className="w-full mt-4">
            <img 
              src="/images/travelsketches/portfolio 2_page-0047.jpg"
              className="w-full h-auto object-contain"
              alt="Reaction Diffusion"
            />
          </div>
          <div className="w-full mt-4">
            <img 
              src="/images/travelsketches/portfolio 2_page-0048.jpg"
              className="w-full h-auto object-contain"
              alt="Reaction Diffusion"
            />
          </div>
          <div className="w-full mt-4">
            <img 
              src="/images/travelsketches/portfolio 2_page-0049.jpg"
              className="w-full h-auto object-contain"
              alt="Reaction Diffusion"
            />
          </div>
          <div className="w-full mt-4">
            <img 
              src="/images/travelsketches/portfolio 2_page-0050.jpg"
              className="w-full h-auto object-contain"
              alt="Reaction Diffusion"
            />
          </div>
          <div className="w-full mt-4">
            <img 
              src="/images/travelsketches/portfolio 2_page-0051.jpg"
              className="w-full h-auto object-contain"
              alt="Reaction Diffusion"
            />
          </div>



          <div className="section-title" 
            id="Kerala"
            ref={KeralaRef}>Kerala</div>
          <div className="section-text max-w-[600px]">
            I was one of the first students in my university who went abroad the country for internship. I interned at Center for Sustainable Built and Natural Environment(CSBNE) in Kerala, India for 2 months and
            travelled around Kerala. I learned about vernacular architecture and culture.
          </div>

          <div className='md:flex md:flex-row w-full md:space-x-4' >
            <div className="w-full mt-4">
              <img 
                src="/images/travelsketches/1.jpg"
                className="w-full h-auto object-contain"
                alt="Reaction Diffusion"
              />
            </div>

            <div className="w-full mt-4">
              <img 
                src="/images/travelsketches/2.jpg"
                className="w-full h-auto object-contain"
                alt="Reaction Diffusion"
              />
            </div>
          </div>
          <div className="w-full mt-4">
            <img 
              src="/images/travelsketches/isla.jpg"
              className="w-full h-auto object-contain"
              alt="Reaction Diffusion"
            />
          </div>
          <div className="w-full mt-4">
            <img 
              src="/images/travelsketches/isla 2.jpg"
              className="w-full h-auto object-contain"
              alt="Reaction Diffusion"
            />
          </div>
          <div className="w-full mt-4">
            <img 
              src="/images/travelsketches/munnar 1.jpg"
              className="w-full h-auto object-contain"
              alt="Reaction Diffusion"
            />
          </div>

          












          





          <div className= "h-[30px]"></div>

          
          
          

          


          

        </div>

        
      



        

        






      </div>

      

    </div>

  );
};

export default TravelSketches;
