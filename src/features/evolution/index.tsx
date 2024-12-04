'use client';


import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import CustomSections from './custom-sections';
import { SectionType } from '@/model/sectiontype';

const Evolution = () => {
  const overviewRef = useRef(null);
  const ContextRef = useRef(null);
  const GeneticCodingRef = useRef(null);
  const FitnessRef = useRef(null);
  const EvolutionRef = useRef(null);
  const SpeciesRef = useRef(null);
  const GenerationsRef = useRef(null);
  const ParetoRef = useRef(null);

  const sectionRefs = [
    overviewRef, ContextRef, GeneticCodingRef, FitnessRef, EvolutionRef, SpeciesRef, GenerationsRef, ParetoRef

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
      subsections: [],
    },
    {
      title: 'Genetic Coding',
      ref: GeneticCodingRef,
      subsections: [],
    },
    {
      title: 'Fitness Objectives',
      ref: FitnessRef,
      subsections: [],
    },
    {
      title: 'Evolution',
      ref: EvolutionRef,
      subsections: [
        {
          title: 'Generations',
          ref: GenerationsRef,
          subsections: [],
        },
        {
          title: 'Pareto Front',
          ref: ParetoRef,
          subsections: [],
        },
      ],
    },
    {
      title: 'Species',
      ref: SpeciesRef,
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
          src={'/images/evolution/cover.gif'}
          className="object-cover"
          alt=""
          fill
          unoptimized
        />
        <div className="absolute bottom-0 backdrop-blur-sm w-full bg-black/30 responsive-padding">
          <div className="w-full pb-4  space-y-2">
            <div className="text-5xl font-bold ">Evolution</div>
            <div className="text-base font-bold top-40 ">
                Designing Building Form in Natural System
            </div>
          </div>
        </div>
      </div>



      <div className="text-black relative px-4 responsive-padding">
        <CustomSections
            sections={EMERGENCE_SECTIONS}
            activeSection={activeSection}
          />
      
        
        <div
          id="Overview"
          ref={overviewRef}>
          <div className="section-title">Overview</div>
          <div className="section-text">
            In this project I explored how to subject a building to Evolution for optimal performance.
            We can create an environment where the process of Natural selection can be applied to a buildig.
            To do this we have to treat the building as organism with genetic coding or parameters, which will define its form. 
            And then test the building to our desired criteria, the fitness objective. And lastly evolve a number of generations to find out 
            best performing designs.
          </div>

          <div className="w-full mt-4">
            <img 
              src="/images/evolution/Diagram.png"
              className="w-full h-auto object-contain"
              alt="Reaction Diffusion"
            />
          </div>

        </div>

        <div
          id="Context"
          ref={ContextRef}>
          <div className="section-title">Context</div>
          <div className="section-text">
            This study aims to develop an evolutionary algorithm
            based form finding framework to improve the indoor
            environment conditions of a courtyard based educational
            building in an urban context of Dhaka, counterbalancing the
            FAR and MGC by building form related variables, e.g., the
            number of floors, depth, length and position of each block
            around the courtyard (with corridor). The framework
            proposed in this study is applicable to the design of
            educational buildings as well as other courtyard type buildings
            under different climatic conditions.
          </div>

          <div className="w-full mt-4">
            <img 
              src="/images/evolution/Context.png"
              className="w-full h-auto object-contain"
              alt="Reaction Diffusion"
            />
          </div>

        </div>

        <div className="w-full"
          id="Genetic Coding"
          ref={GeneticCodingRef}>  

          <div className="md:flex md:flex-row md:space-x-5 relative text-section">
              {/* Text Section */}
              <div className="md:w-[20%] md:basis-1/2 relative">
                <div className="text-2xl font-bold pb-4 text-gray-800">
                  Genetic Coding
                </div>
                
                <div className="section-text">
                  Organisms have genetic coding which guides their formation. The building can be thought as a parametric system, 
                  where the parameters can act as the genes. And the parametric system translates the genes into a building model.
                  So by using a parametric system of form generation buildings can act like organisms.
                </div>
              </div>

              {/* Image Section */}
              <div className="md:w-[80%] relative grow mt-4 w-full h-auto" >
                <img
                  src="/images/evolution/Genetic coding.png"
                  className="object-contain w-full h-auto "
                  
                  alt="Dhaka Landform"
                />
              </div>

          </div>
          <div className="w-full mt-4">
            <img 
              src="/images/evolution/Script.png"
              className="w-full h-auto object-contain"
              alt="Reaction Diffusion"
            />
          </div>
        </div>



        <div
          id="Fitness Objectives"
          ref={FitnessRef}>
          <div className="md:flex md:flex-row md:space-x-5 relative text-section">
              {/* Text Section */}
              <div className="md:w-[20%] md:basis-2/3 relative">
                <div className="text-2xl font-bold pb-4 text-gray-800">
                Fitness Objectives
                </div>
                
                <div className="section-text">
                  Three Fitness Objectives (FOs) were considered to
                  analyze the fitness of the solution as follows.
                </div>
              </div>

              {/* Image Section */}
              <div className="md:w-[80%] relative grow mt-4 w-full h-auto" >
                <img
                  src="/images/evolution/Fitness objectives.png"
                  className="object-contain w-full h-auto "
                  
                  alt="Dhaka Landform"
                />
              </div>

          </div>

        </div>



        <div
          id="Evolution"
          ref={EvolutionRef}>
          <div className="section-title">Evolution</div>
          <div className="section-text">
            The evolutionary algorithm solver-Wallacei starts with a population of random parameters.
            According to the calculated fitness scores, it selects the best individuals and use these for the seed of next 
            generation. 
          </div>

          <div
          id="Generations"
          ref={GenerationsRef}>
            <div className="text-xl font-bold py-4 text-gray-600">Generations</div>

            <div className="w-full mt-4">
              <img 
                src="/images/evolution/Generations.png"
                className="w-full h-auto object-contain"
                alt="Reaction Diffusion"
              />
            </div>

            <div className="section-text pt-4">
              In every generation the population comes closer and closer 
              to the origin and the points closest to the origin forms a Pareto front (Figure).

              The red lines indicate solutions from older generations,
              and the blue lines indicate solutions from newer generations.
              The Normal Distribution of the generations is used to assess
              the variation and convergence of the solutions. The simulation
              produced solutions with higher fitness for FO1 (FAR) while
              preserving a sufficient degree of variation throughout the
              population. For FO2 (DSH), the algorithm creates variations
              with great fluctuations throughout the generations, but the
              fitness value cannot increase considerably. For FO3 (MGC),
              the algorithm creates an adequate level of variations
              throughout the generations
            </div>
          
            <div className="w-full pt-10">
              <img 
                src="/images/evolution/Graphs.png"
                className="w-full h-auto object-contain"
                alt="Reaction Diffusion"
              />
            </div>
          </div>

          <div
            id="Pareto Front"
            ref={ParetoRef}
            className="mt-8">
            <div className="text-xl font-bold py-4 text-gray-600">Pareto Front</div>

            <div className="w-full mt-4">
              <img 
                src="/images/evolution/Pareto front.jpg"
                className="w-full h-auto object-contain"
                alt="Reaction Diffusion"
              />
            </div>

            <div className="section-text pt-4">
              The Pareto front represents the best solutions in each generation. In the Pareto graph , every point represents
              an individual, and the closer it is to the origin, the more
              minimized the FOs are. Pareto Front solutions are marked
              with yellow dots. The evolving
              transformation and increasing diversity of outcomes have
              also indicated alterations in the solutions depicted on the
              Pareto Front
            </div>

            <div className="w-full mt-4">
              <img 
                src="/images/evolution/pareto animation.gif"
                className="w-full h-auto object-contain"
                alt="Reaction Diffusion"
              />
            </div>
          </div>
        </div>
      



        <div
          id="Species"
          ref={SpeciesRef}>
          <div className="section-title">Species</div>
          <div className="section-text">
            After analysing 50 generation of 30 individual buildings total 1500 individuals,
            Wallacei gives us all the data in a Parallel Coordinate Plot(PCP) and a 3d graph of the solution space.
              Here every single line represents an individual. Red lines are older generations and blue lines are newer generation.
              The lower it is in the Fitness Objectives axis, the more it is desirable. But we can see not many individuals performing best in all
                the three objectives. In the 3d graph every point represents 
                  and individual and closer it is to the origin represents more minimised the fitness objectives are.
          </div>

          <div className='md:flex md:flex-row pt-8 md:space-x-5'>
            <div className="w-full mt-4 ">
                <img 
                  src="/images/evolution/pcp.png"
                  className="w-full h-auto object-contain"
                  alt="Reaction Diffusion"
                />
            </div>

            <div className="w-full mt-4 ">
                <img 
                  src="/images/evolution/pareto.png"
                  className="w-full h-auto object-contain"
                  alt="Reaction Diffusion"
                />
            </div>
          </div>

          <div className="section-text">
            With the help of  Wallacei’s built in K-Means Clustering algorithm,
            we can cluster all the solutions into 5 groups. K-Means clustering algorithm groups the similar solutions
            together where we can identify
            different types of solutions based on the trade off among the three fitness  objectives.
          </div>

          <div className='md:flex md:flex-row pt-8 md:space-x-5 '>
            <div className="w-full mt-4  ">
                <img 
                  src="/images/evolution/PCP species.png"
                  className="w-full h-auto object-contain "
                  alt="Reaction Diffusion"
                />
            </div>

            <div className="w-full mt-4 " >
                <img 
                  src="/images/evolution/k means.png"
                  className="w-full h-auto object-contain "
                  alt="Reaction Diffusion"
                />
            </div>
          </div>


          <div className="section-text">
            Here, different colour indicates different similar groupings.
            For example in the PCP, the yellow line represents a group of solution that has better performance
            in FO2(DSH) and FO3(MGC) but it has a very poor performance in FO1(FAR). On the other hand,
            the red and pink clusters has over all better performance in all the three objectives.
            This analysis can help the architect take more informed decisions based on these trade offs.
          </div>

          <div className="w-full mt-4">
            <img 
              src="/images/evolution/species.png"
              className="w-full h-auto object-contain"
              alt="Reaction Diffusion"
            />
          </div>

          <div className="w-full">           
            <div className="md:flex md:flex-row md:space-x-5 relative text-section">
            <div className="flex flex-col justify-between md:w-[20%] md:basis-2/3 md:ml-4 md:py-4 relative md:order-last">
                <div className="section-text ">
                  This study shows how to conduct a simple optimization of building forms considering local codes.
                   More importantly, it shows that the procedure of the MOO turns out to be an exploratory passage
                    for building planning and design. Similar to nature, which evolves many species of an organism
                     of the same context, optimization makes a set of species that evolved from the same context but
                      remained different from one another, which provides architects with a number of options to improve
                       upon and design further. The results show that the optimized
                   solutions from the MOO using EA have a compromised building performance in the optimum solution.

                </div>
                <div className="md:w-[80%] relative grow mt-4 w-full h-auto">
                  <img
                    src="/images/evolution/EXISTING.png"
                    className="object-contain w-full h-auto"
                    alt="Dhaka Landform"
                  />
                </div>

              </div>
              <div className="md:w-[80%] relative grow mt-4 w-full h-auto !ml-0 ">
                <img
                  src="/images/evolution/Green.png"
                  className="object-contain w-full h-auto"
                  alt="Dhaka Landform"
                />
              </div>
              
            </div>
          </div>


        </div>






      </div>

      

      </div>

  );
};

export default Evolution;
