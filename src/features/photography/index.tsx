'use client';


import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import CustomSections from '../custom-sections';
import { SectionType } from '@/model/sectiontype';
import ImageGrid from '../ImageGrid';

const Photography = () => {

  const Mushrooms = [
    '/images/photography/m1-min.jpg',
    '/images/photography/m2-min.jpg',
    '/images/photography/m3-min.jpg',
    '/images/photography/m4-min.jpg',
    '/images/photography/m5-min.jpg',
    '/images/photography/m6-min.jpg',
    '/images/photography/m9-min.jpg',
    '/images/photography/m10-min.jpg',
    '/images/photography/m11-min.jpg',
    '/images/photography/m12-min.jpg',
    '/images/photography/m13-min.jpg',
    '/images/photography/m15-min.jpg',
    // Add more images as needed
  ];

  const Lens = [
    '/images/photography/ms1.jpg',
    '/images/photography/ms2.jpg',
    // '/images/photography/ms3.jpg',
    '/images/photography/ms4.jpg',
    '/images/photography/ms5.jpg',
    '/images/photography/ms6.jpg',
    '/images/photography/ms7.jpg',
    '/images/photography/ms9.jpg',
    '/images/photography/ms13.jpg',
    '/images/photography/ms11.jpg',
    '/images/photography/j6.jpg',
    '/images/photography/ms14.jpg',
    '/images/photography/ms15.jpg',
    '/images/photography/ms16.jpg',
    '/images/photography/ms17.jpg',
    '/images/photography/ms18.jpg',
    '/images/photography/ms12.jpg',


    // Add more images as needed
  ];

  const Collection = [
    '/images/photography/8.jpg',

    '/images/photography/3.jpg',
    '/images/photography/4.jpg',
    '/images/photography/9.jpeg',
    '/images/photography/5.jpg',
    '/images/photography/6.jpg',
    '/images/photography/1.jpg',
    '/images/photography/2.jpg',


    // Add more images as needed
  ];

  const Bladderwort = [
    '/images/photography/j1.jpg',
    '/images/photography/j2.jpg',
    '/images/photography/j3.jpg',
    '/images/photography/j5.jpg',



    // Add more images as needed
  ];

  const LensRef = useRef(null);
  const MushroomRef = useRef(null);
  const CollectionRef = useRef(null);



  const sectionRefs = [
     LensRef, MushroomRef, CollectionRef

  ];

  const [activeSection, setActiveSection] = useState<string>();

  const PHOTOGRAPHY_SECTIONS: SectionType[] = [

    {
      title: 'Through Lenses',
      ref: LensRef,
      subsections: [],
    },
    {
      title: 'Mushrooms',
      ref: MushroomRef,
      subsections: [],
    },
    {
      title: 'Collections',
      ref: CollectionRef,
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
          src={'/images/photography/cover.png'}
          className="object-cover md:object-cover"
          alt=""
          fill
          unoptimized
        />
        <div className="absolute bottom-0 backdrop-blur-sm w-full bg-black/30 ">
          <div className="w-full pb-4  space-y-2 responsive-padding">
            <div className="text-5xl font-bold ">Observations</div>
            <div className="text-base font-bold top-40 ">
                of Nature
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
          

          

          <div className="section-title"    
              id="Through Lenses"
              ref={LensRef}>Through Lenses</div>
          
          <div className="section-text max-w-[600px]">
            As I started to look at nature with different lenses, I found out that there are more than that meets the naked eye.
            I used my magnifying glass or microscope to take these photographs. The design of nature never fails to amaze me.
          </div>

          <div className='flex flex-row space-x-2 mt-8'>
            <div className="basis-1/3">
              <img 
                src="/images/photography/bino.jpg"
                className="w-full h-auto object-contain"
                alt="Reaction Diffusion"
              />
            </div>
            <div className="basis-1/3">
              <img 
                src="/images/photography/mag.jpg"
                className="w-full h-auto object-contain"
                alt="Reaction Diffusion"
              />
            </div>
            <div className="basis-1/3">
              <img 
                src="/images/photography/microscope.jpg"
                className="w-full h-auto object-contain"
                alt="Reaction Diffusion"
              />
            </div>
          </div>

          <div className="flex justify-center items-center ">
            <ImageGrid images={Lens} />
          </div>
          <div className="w-full mt-4">
              <img 
                src="/images/photography/vorticella.gif"
                className="w-full h-auto object-contain"
                alt="Reaction Diffusion"
              />
            </div>

          <div className="section-text max-w-[600px] mt-24">
            These are eggs of snail I found in local water body. First I did not realize what these are, it looks like jelly. Looking under microscope
            reveals it&apos;s cuteness.
          </div>


          <div className='md:flex md:flex-row w-full' >
            <div className="w-full mt-4">
              <img 
                src="/images/photography/s2.jpg"
                className="w-full h-auto object-contain"
                alt="Reaction Diffusion"
              />
            </div>

            <div className="w-full mt-4">
              <img 
                src="/images/photography/snl.jpg"
                className="w-full h-auto object-contain"
                alt="Reaction Diffusion"
              />
            </div>
          </div>

          <div className= "h-[30px]"></div>

          <div className="section-text max-w-[600px]">
            The Bladderwort is a carnivorous aquatic plants found in local water bodies.
            It has small bladders which are kept in high pressure. A slight disturbance in around the mouth of the bladder triggers it to suck with high speed.
            It is one of the fastest organisms.
          </div>
          <div className="flex justify-center items-center ">
            <ImageGrid images={Bladderwort} />
          </div>

          

          <div className= "h-[30px]"></div>

          <div className="section-title"    
              id="Mushrooms"
              ref={MushroomRef}>Mushrooms</div>
          
          <div className="section-text max-w-[600px]">
            I love mushrooms. And this is my collection.
          </div>

          <div className="flex justify-center items-center ">
            <ImageGrid images={Mushrooms} />
          </div>


          <div className= "h-[30px]"></div>

          <div className="section-title"    
              id="Collections"
              ref={CollectionRef}>Collections</div>

          <div className="section-text max-w-[600px]">
            I visit different biomes and collect seeds or other interesting plant parts for studying later.
          </div>
          <div className="w-full mt-4">
            <img 
              src="/images/photography/kit.jpg"
              className="w-full h-auto object-contain"
              alt="Reaction Diffusion"
            />
          </div>

          <div className="w-full mt-8">
            <img 
              src="/images/photography/kathal.gif"
              className="w-full h-auto object-contain"
              alt="Reaction Diffusion"
            />
          </div>

          <div className="flex justify-center items-center ">
            <ImageGrid images={Collection} />
          </div>
          
          <div className= "h-[30px]"></div>
          <div className="section-text max-w-[600px]">
            This is my plant lab outside my dormitory, where I grow and obsever plants for longer period of time.
          </div>

          <div className="w-full mt-4">
            <img 
              src="/images/photography/corridor.jpg"
              className="w-full h-auto object-contain"
              alt="Reaction Diffusion"
            />
          </div>
          
          <div className="w-full mt-4">
            <img 
              src="/images/photography/corridor1.jpg"
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

export default Photography;
