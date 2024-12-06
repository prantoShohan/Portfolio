'use client';


import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import CustomSections from './custom-sections';
import { SectionType } from '@/model/sectiontype';

const Photography = () => {

  const MakingRef = useRef(null);
  const ToyappRef = useRef(null);


  const sectionRefs = [
     MakingRef, ToyappRef,

  ];

  const [activeSection, setActiveSection] = useState<string>();

  const PHOTOGRAPHY_SECTIONS: SectionType[] = [

    {
      title: 'Making from Scratch',
      ref: MakingRef,
      subsections: [],
    },
    {
      title: 'Toy Application',
      ref: ToyappRef,
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
          src={'/images/kaleidoscope/Cover.gif'}
          className="object-cover md:object-cover"
          alt=""
          fill
          unoptimized
        />
        <div className="absolute bottom-0 backdrop-blur-sm w-full bg-black/30 ">
          <div className="w-full pb-4  space-y-2 responsive-padding">
            <div className="text-5xl font-bold ">Kaleidoscope</div>
            <div className="text-base font-bold top-40 ">
                A toy app with OpenGL
            </div>
          </div>
        </div>
      </div>



      <div className="text-black relative px-4 responsive-padding">
        <CustomSections
              sections={PHOTOGRAPHY_SECTIONS}
              activeSection={activeSection}
            />
      
        
        <div>

          <div className="md:flex md:flex-row md:space-x-5 relative text-section" >
            <div className="md:w-[20%] md:basis-1/2 relative">
            {/* this header needs to have a custom class */}
              <div className="text-2xl font-bold pt-2 text-gray-800"
                id="Making from Scratch"
                ref={MakingRef}>
                Making from Scratch
              </div>
              <div className="section-text ">
              I was fascinated with the idea of kelaidoscope, how it can take a small piece of reality and makes a 
              whole universe out of that. Building a kelaidoscope was really easy. So I went to a glass shop and brought 
              three pieces of mirror and bound them together with duct tape. 
              </div>
            </div>
            <div className="w-full mt-4 border border-gray-300/50">
              <img 
                src="/images/kaleidoscope/hand.png"
                className="w-full h-auto object-contain"
                alt="Reaction Diffusion"
              />
            </div>
            
          </div>

          <div className="w-full mt-4">
            <img 
              src="/images/kaleidoscope/real.gif"
              className="w-full h-auto object-contain"
              alt="Reaction Diffusion"
            />
          </div>

          

          <div className="w-full">   
             <div className="text-2xl font-bold pt-2 text-gray-800 pt-12"
                  id="Toy Application"
                  ref={ToyappRef}>
                  Toy Application
              </div>      
             
            <div className="md:flex md:flex-row md:space-x-5 relative text-section">
            <div className="md:w-[20%] md:basis-1/2 md:ml-4  relative md:order-last">
                <div className="section-text ">
                  I was learning C++ and design patterns of object oriented languages and experimenting with openGL
                  for graphics. openGL was very daunting. So I thought a simple project like e kelaidoscope can be 
                  built with openGL.
                </div>
              </div>
              <div className="md:w-[80%] relative grow  w-full h-auto !ml-0 border border-gray-300/50">
                <img
                  src="/images/kaleidoscope/setchbok.png"
                  className="object-contain w-full h-auto"
                  alt="Dhaka Landform"
                />
              </div>
              
            </div>
          </div>

          <div className="w-full mt-4">
            <img 
              src="/images/kaleidoscope/Kaleidoscope_v1.3.gif"
              className="w-full h-auto object-contain"
              alt="Reaction Diffusion"
            />
          </div>

          <div className='md:flex md:flex-row w-full mt-4 space-x-2'>
            <div className="w-full mt-4">
              <img 
                src="/images/kaleidoscope/1.png"
                className="w-full h-auto object-contain"
                alt="Reaction Diffusion"
              />
            </div>
            <div className="w-full mt-4">
              <img 
                src="/images/kaleidoscope/2.jpg"
                className="w-full h-auto object-contain"
                alt="Reaction Diffusion"
              />
            </div>
          </div>

          <div className= "h-[30px]"></div>

          
          
          

          


          

        </div>

        
      



        

        






      </div>

      

    </div>

  );
};

export default Photography;
