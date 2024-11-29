'use client';

import Image from 'next/image';
import React from 'react';
import CompareSlider from './CompareSlider';

const EmergenceDetails = () => {
  return (

    
    <div className = "bg-white min-h-screen relative">
      {/* Cover */}
      <div className="relative h-[460px] bg-gray-900">
        <Image
          src={'/images/emergence/Cover animation.gif'}
          className="object-cover"
          alt=""
          fill
          unoptimized
        />
        <div className="absolute bottom-0 backdrop-blur-sm w-full bg-black/20 responsive-padding">
          <div className="w-full pb-4  space-y-2">
            <div className="text-5xl font-bold">Emergence</div>
            <div className="text-base font-bold top-40 ">
              Computational Growth of Urban Organism
            </div>
          </div>
        </div>
      </div>



      <div className="text-black relative px-4 responsive-padding">
{/*Overview  */}
        <div>
          <div className="section-title">Overview</div>
          <div className="section-text">
            This is my final year thesis.  It is based on the idea that cities are also organisms.
            And we can design the layers of systems in cities like organisms. Living in Dhaka,
            one of the most rapidly growing cities in the world, I certainly found out the necessity of sustainable growth of cities.
            In last 30 years, Dhaka’s growth had a horrible impact on the environment and livability. To solve this issue we need a
            totally a new way of planning specifically for the unique landform and ecology of Dhaka. I used computational simulation methods to mimick 
            natural systems to optimize different layers of urban systems like landform, connectivity and zoning.
          </div>
        </div>

{/* Context */}
        <div className="md:flex md:flex-row md:space-x-5 relative text-section" id="">
          <div className="md:w-[20%] md:basis-1/3 relative">
          {/* this header needs to have a custom class */}
            <div className="text-2xl font-bold pb-4 text-gray-800">
                Context
            </div>
            <div className="section-text ">
            Dhaka is one of the most densly populated cities in the
            world. It has rapid growth in last 30 years with steady
            decline in its wetland and natural landscapes. Though it has a very distinct geographical characteristic,
             main growth method is to landfill the wetlands and create iron-grid road pattern. But just outskirts of Dhaka shows us a 
             more organic form of settlement growth.
            </div>
          </div>
          <div id="multimedia" className="relative md:w-[60%] pt-4 md:py-auto h-[360px] md:basis-2/3">
            <Image
              src={'/images/emergence/Growth graph.png'}
              className="object-contain md:object-cover object-left"
              alt=""
              fill
              unoptimized
            />
          </div>
        </div>

        <div id="multimedia" className="relative md:mt-8 h-[300px] md:h-[600px]">
            <Image
              src={'/images/emergence/dhaka timelapse small.gif'}
              className="object-cover"
              alt=""
              fill
              unoptimized
            />
        </div>

        <div>
          <div className="subsection-title">Site</div>
          <div className="section-text">
            Uttara Phase-3 is one of three biggest housing projects conducted by Dhaka government. But the amount of wetland destroyed is shocking.
          </div>
          <div className="w-full h-auto py-4">
            <CompareSlider
              beforeImage="/images/emergence/before.jpg"
              afterImage="/images/emergence/after.jpg"
            />
          </div>
        </div>


{/*Urban Organism */}
        <div >
          <div className="section-title">Urban Organism</div>
          <div className="section-text">
            If we compare the different systems of an organism with different system of a city, we can find a clear similarity.
            Circulation, resource cycle, positioning of organs, information system both city and organism has common.
            while the growth of the city is determined by brute force- landfill, the growth of an organism is the result of millions of years evolution.
            If we could optimize these system of the cities mimicking organic system, we could find more efficient solutions.
          </div>

{/* Landform System */}
          <div className="w-full">           
            <div className="md:flex md:flex-row md:space-x-5 relative text-section">
              {/* Text Section */}
              <div className="md:w-[20%] md:basis-1/3 relative">
                <div className="text-xl font-bold py-4 text-gray-600">Landform System</div>
                <div className="section-text">
                  Dhaka has a unique landform pattern. The Madhupur Tract, greater Dhaka is surrounded by rivers. 
                  Every year the river floods and brings freshwater inland. Thousands of years of flooding has created amoeboid patterns in the geography. 
                  The highlands are surrounded by lower lands used for agriculture in the dry season. The water has fused in the nooks and crannies of the land. 
                </div>
              </div>

              {/* Image Section */}
              <div className="md:w-[80%] relative grow mt-4 w-full h-auto">
                <img
                  src="/images/emergence/Dhaka grid.jpg"
                  className="object-contain w-full h-auto"
                  alt="Dhaka Landform"
                />
              </div>
            </div>
          </div>

          <div className="pt-8">
            <div className="section-text">
              This is Reaction-Diffusion and it occurs in many other places in nature, both organic and inorganic. 
            </div>

            <div className="w-full mt-4">
              <img 
                src="/images/emergence/Reaction diffusion.jpg"
                className="w-full h-auto object-contain"
                alt="Reaction Diffusion"
              />
            </div>
          </div>

          <div className="w-full">           
            <div className="md:flex md:flex-row md:space-x-5 relative text-section">
            <div className="md:w-[20%] md:basis-1/3 md:ml-4 md:py-4 relative md:order-last">
                <div className="section-text ">
                  Differential growth or reaction diffusion can be simulated with an algorithm and it can give us a pattern similar to the landform of Dhaka.

                </div>
              </div>
              <div className="md:w-[80%] relative grow mt-4 w-full h-auto !ml-0">
                <img
                  src="/images/emergence/diff growth demo.gif"
                  className="object-contain w-full h-auto"
                  alt="Dhaka Landform"
                />
              </div>
              
            </div>
          </div>

          <div className="pt-8">
            <div className="section-text">
              Relating the natural geography with the differential growth, we can use this model to design landform that will maintain the 
              flow of water during flooding season. This pattern also maximizes the lenght of edge ecology.
            </div>

            <div className="w-full mt-4">
              <img 
                src="/images/emergence/differential growth.gif"
                className="w-full h-auto object-contain"
                alt="Reaction Diffusion"
              />
            </div>
          </div>
          

        </div>

        <div className= "h-[30px]"></div>

        {/* <div className=" text-black py-10 relative space-x-3  border">
          <div className="space-y-7 section-text">

              <div
                className="flex flex-row space-x-10 relative text-section  border"
                id="Urban Organismr"
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
        </div> */}
      </div>
    </div>





  );
};

export default EmergenceDetails;
