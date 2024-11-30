'use client';

import Image from 'next/image';
import CompareSlider from './CompareSlider';
import React, { useEffect, useRef, useState } from 'react';
import CustomSections from './custom-sections';
import { SectionType } from '@/model/sectiontype';


const EmergenceDetails = () => {

  const overviewRef = useRef(null);
  const ContextRef = useRef(null);
  const SiteRef = useRef(null);
  const Urban_OrganismRef = useRef(null);
  const LandformRef = useRef(null);
  const ConnectivityRef = useRef(null);
  const ZoningRef = useRef(null);
  const EfficiencyRef = useRef(null);
  const LandscapeRef = useRef(null);


  const sectionRefs = [
    overviewRef, ContextRef, SiteRef, Urban_OrganismRef,
    LandformRef, ConnectivityRef, ZoningRef, EfficiencyRef,
    LandscapeRef

  ];

  const [activeSection, setActiveSection] = useState<string>();

  const EMERGENCE_SECTIONS: SectionType[] = [
    {
      title: 'Overview',
      ref: overviewRef,
      subsections: [],
    },
    {
      title: 'Context',
      ref: ContextRef,
      subsections: [{
        title: 'Site',
        ref: SiteRef,
        subsections: [],
      }],
    },
    {
      title: 'Urban Organism',
      ref: Urban_OrganismRef,
      subsections: [{
        title: 'Landform System',
        ref: LandformRef,
        subsections: [],
      },
      {
        title: 'Connectivity System',
        ref: ConnectivityRef,
        subsections: [],
      },
      {
        title: 'Zoning System',
        ref: ZoningRef,
        subsections: [],
      }],
    },
    {
      title: 'Efficiency',
      ref: EfficiencyRef,
      subsections: [],
    },
    {
      title: 'Landscape',
      ref: LandscapeRef,
      subsections: [],
    }

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
      <CustomSections
          sections={EMERGENCE_SECTIONS}
          activeSection={activeSection}
        />
{/*Overview  */}
        <div
          id="Overview"
          ref={overviewRef}>
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
        <div className="md:flex md:flex-row md:space-x-5 relative text-section" 
          id="Context"
          ref={ContextRef}>
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

        <div
          id="Site"
          ref={SiteRef}>
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
        <div 
          id="Urban Organism"
          ref={Urban_OrganismRef}>
          <div className="section-title">Urban Organism</div>
          <div className="section-text">
            If we compare the different systems of an organism with different system of a city, we can find a clear similarity.
            Circulation, resource cycle, positioning of organs, information system both city and organism has common.
            while the growth of the city is determined by brute force- landfill, the growth of an organism is the result of millions of years evolution.
            If we could optimize these system of the cities mimicking organic system, we could find more efficient solutions.
          </div>

{/* Landform System */}
          <div className="w-full"
            id="Landform System"
            ref={LandformRef}>           
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
          
          {/* Connectivity System */}
          <div className='pt-8'
            id="Connectivity System"
            ref={ConnectivityRef}>
            <div className='subsection-title'>
              Connectivity System
            </div>
            <div className="section-text">
            This basic connectivity problem is not new in nature. almost every organism deals with the transportation problem in some way. 
            Slime molds can optimize connectivity among the food sources. Ants can collectively create more efficient routes.
            Swarm intelligence where the knowledge of multiple individuals collectively creates an emergent pattern is seen in nature in abundance.
            </div>
            <div className="w-full mt-4">
              <img 
                src="/images/emergence/slime mold japan.png"
                className="w-full h-auto object-contain"
                alt="Reaction Diffusion"
              />
            </div>
            <div className="w-full mt-4">
              <img 
                src="/images/emergence/Ants path.png"
                className="w-full h-auto object-contain"
                alt="Reaction Diffusion"
              />
            </div>
            <div className="section-text mt-4">
              These systems can also be modelled computationally to solve Connectivity problems. 
              In these landforms, creating efficient road network is a challanging task.
              But by mimicking the collective intelligence in nature, 
              we can find several different ways to connect and develop a road network based on this information.
            </div>
            <div className="w-full mt-4">
              <img 
                src="/images/emergence/Slime mold.gif"
                className="w-full h-auto object-contain"
                alt="Reaction Diffusion"
              />
            </div>
          </div>

          {/* Zoning system */}
          <div className="w-full"
            id="Zoning System"
            ref={ZoningRef}>           
            <div className="md:flex md:flex-row md:space-x-5 relative text-section">
              {/* Text Section */}
              <div className="md:w-[20%] md:basis-1/2 relative">
                <div className="text-xl font-bold py-4 text-gray-600">Zoning System</div>
                <div className="section-text">
                  There are natural settlement growth in this type of landform. But to design an efficient and walkable neighbourhood is challanging.
                  The natural settlement growth pattern is simulated using walkability metrics.
                </div>
              </div>

              {/* Image Section */}
              <div className="md:w-[80%] relative grow mt-4 w-full h-auto">
                <img
                  src="/images/emergence/Dhaka settlement.png"
                  className="object-contain w-full h-auto"
                  alt="Dhaka Landform"
                />
              </div>
            </div>
          </div>

          <div className="w-full">           
            <div className="md:flex md:flex-row md:space-x-5 relative text-section">
            <div className="flex flex-col justify-between md:w-[20%] md:basis-1/2 md:ml-4 md:py-4 relative md:order-last">
                <div className="section-text ">
                  Using walkability metrices, we can find the optimum walking distance from different types of zones.
                  We can calculate demand of certain amenities according to what is present around.
                  This type of natural growth can be understood on the basis of demand and growth.
                  Growth of certain zone creates demand for more amenities around. This cycle contineously grows a settlement.

                </div>
                <div className="md:w-[80%] relative grow mt-4 w-full h-auto">
                  <img
                    src="/images/emergence/Cycle.png"
                    className="object-contain w-full h-auto"
                    alt="Dhaka Landform"
                  />
                </div>

              </div>
              <div className="md:w-[80%] relative grow mt-4 w-full h-auto !ml-0 border">
                <img
                  src="/images/emergence/entities.png"
                  className="object-contain w-full h-auto"
                  alt="Dhaka Landform"
                />
              </div>
              
            </div>
          </div>
          <div className="w-full mt-4 border">
              <img 
                src="/images/emergence/steps.png"
                className="w-full h-auto object-contain"
                alt="Reaction Diffusion"
              />
          </div>

          <div className="section-text mt-4">
              For example, in step 1 there are a number of residential units present, which creates demand for schools and shops nearby. 
              New commercial and educational units grows based on the demand in step 2. But this growth also creates new demand which is responded in step 3.
          </div>

          <div className="w-full mt-4">
              <img 
                src="/images/emergence/formula.png"
                className="w-full h-auto object-contain"
                alt="Reaction Diffusion"
              />
          </div>

          <div className="section-text mt-4">
            The demand is calculated with this formula. The demand of any amenities depend upon 3 things. The number of requester of that amenity, 
            required number amenities per requester unit and the walkability distance factor.
          </div>


          <div className="w-full">           
            <div className="md:flex md:flex-row md:space-x-5 relative text-section">
            <div className="md:w-[20%] md:basis-1/3 md:ml-4 md:py-4 relative md:order-last">
                <div className="section-text ">
                  Using a small network this algorithm is tested. This is just the cycle of calculating demand and adding required zones. 
                  The cycle gradually comes to an equilibrium after around 50 steps and positions the required amenities in such places that it can serve
                  maximum number of people in walkable distance.

                </div>
              </div>
              <div className="md:w-[80%] relative grow mt-4 w-full h-auto !ml-0">
                <img
                  src="/images/emergence/zoning example.gif"
                  className="object-contain w-full h-auto"
                  alt="Dhaka Landform"
                />
              </div>
              
            </div>
          </div>

          <div className="section-text mt-4">
            Then it is applied to our site which has a much larger area and more complex network. It also reaches an equilibrium in around step 35.
          </div>

          <div className="w-full mt-4">
              <img 
                src="/images/emergence/zoning animation.gif"
                className="w-full h-auto object-contain"
                alt="Reaction Diffusion"
              />
          </div>
        </div>

{/* Efficiency of Urban Organism */}
        <div className="w-full"
          id="Efficiency"
          ref={EfficiencyRef}>  

          <div className="md:flex md:flex-row md:space-x-5 relative text-section">
              {/* Text Section */}
              <div className="md:w-[20%] md:basis-1/3 relative">
                <div className="text-2xl font-bold pb-4 text-gray-800">
                  Efficiency of Urban Organism
                </div>
                
                <div className="section-text">
                  This is a kind of swarm intelligent, where each agent reacts with its neighbours. The cycle of growth and demand is a dynamical system.
                  After the system reaches an equilibrium, a solution is found.
                </div>
              </div>

              {/* Image Section */}
              <div className="md:w-[80%] relative grow mt-4 w-full h-auto border" >
                <img
                  src="/images/emergence/mp.png"
                  className="object-contain w-full h-auto "
                  
                  alt="Dhaka Landform"
                />
              </div>
          </div>


          
          <div className='md:flex md:flex-row pt-8 md:space-x-5'>
            <div className="w-full mt-4 border">
                <img 
                  src="/images/emergence/ex1.png"
                  className="w-full h-auto object-contain"
                  alt="Reaction Diffusion"
                />
            </div>

            <div className="w-full mt-4 border">
                <img 
                  src="/images/emergence/ex2.png"
                  className="w-full h-auto object-contain"
                  alt="Reaction Diffusion"
                />
            </div>
          </div>
          <div className="section-text mt-4">
            In these two examples, the distance from different amenities are shown. All amenities are within walking distance.
          </div>
          
        </div>

{/* Landscape System */}
        <div className="w-full"
          id="Landscape"
          ref={LandscapeRef}>
          <div className="section-title">Landscape and Walkability</div>

          <div className="section-text mt-4">
            The eco-system of the edge is the most important in these landscapes. The long edge is lined up with vegetable gardens, wild plants and ponds.
            The the roads are designed to promote walking and cycling. There are trails along the edge for public. 
          </div>

          <div className="w-full mt-4">
              <img 
                src="/images/emergence/masterplan annotated.jpg"
                className="w-full h-auto object-contain"
                alt="Reaction Diffusion"
              />
          </div>
          
          <div className="section-text mt-4">
            The ponds are used as public spaces. The inner courtyard also acts as public space.
          </div>

          <div className='md:flex md:flex-row pt-8 md:space-x-5'>
            <div className="w-full mt-4">
                <img 
                  src="/images/emergence/cake 1.jpeg"
                  className="w-full h-auto object-contain"
                  alt="Reaction Diffusion"
                />
            </div>

            <div className="w-full mt-4">
                <img 
                  src="/images/emergence/cake 2.jpeg"
                  className="w-full h-auto object-contain"
                  alt="Reaction Diffusion"
                />
            </div>
          </div>


          <div className="w-full mt-4">
              <img 
                src="/images/emergence/section.jpeg"
                className="w-full h-auto object-contain"
                alt="Reaction Diffusion"
              />
          </div>


        </div>

        

        <div className= "h-[30px]"></div>

        
      </div>
    </div>





  );
};

export default EmergenceDetails;
