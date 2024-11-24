'use client';

import Image from 'next/image';
import React from 'react';

const EmergenceDetails = () => {
  return (

    
    <div className = "bg-white min-h-screen relative">
        <div className="relative h-[460px]">
        {/* Cover Image */}
          <Image
            src={'/images/emergence/Slime full.jpg'}
            className="object-cover"
            alt=""
            fill
            unoptimized
          />
          <div className="absolute bottom-0  w-full bg-black/50 responsive-padding">
            <div className="w-full pb-4 backdrop:blur space-y-2 ">
              {/* Title */}
              <div className="text-5xl font-bold">Emergence</div>
              {/* Subtitle */}
              <div className="text-base font-bold top-40 ">
                Computational Growth of Urban Organism
              </div>
            </div>
          </div>
        </div>



        <div className="text-black relative px-4 responsive-padding ">

          {/* {custom sections } */}


          <div className=" text-black py-10 relative space-x-3  border">
            <div className="space-y-7 section-text ">

                <div
                  className="flex flex-row space-x-10 relative text-section  border"
                  id="Urban Organismr"
                  //ref={tenStepSequencerRef}
                >
                  <div className="section-text w-[20%] border basis-1/3">
                    <div className="section-title border">
                      Urban Organism
                    </div>
                    Dhaka is one of the most densly populated cities in the
                    world. It has rapid growth in last 30 years with steady
                    decline in its wetland and natural landscapes. It has
                    become an parasite. This project poses an alternative
                    means of growth through simulating natural growth process.
                  </div>
                  <div id="multimedia" className="relative w-[60%] h-[460px] border basis-2/3">
                    <Image
                      src={'/images/emergence/dhaka timelapse small.gif'}
                      className="object-cover"
                      alt=""
                      fill
                      unoptimized
                    />
                  </div>
                </div>
              

            </div>
          </div>
        </div>
    </div>





  );
};

export default EmergenceDetails;
