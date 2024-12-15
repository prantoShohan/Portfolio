'use client';


import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { SectionType } from '@/model/sectiontype';
import CustomSections from '../custom-sections';
import CodeBlock from '../CodeBlock';

const Kaleidoscope = () => {

  const MakingRef = useRef(null);
  const ToyappRef = useRef(null);


  const sectionRefs = [
     MakingRef, ToyappRef,

  ];

  const [activeSection, setActiveSection] = useState<string>();

  const KALEIDOSCOPE_SECTIONS: SectionType[] = [

    {
      title: 'Making',
      ref: MakingRef,
      subsections: [],
    },
    {
      title: 'Toy Application',
      ref: ToyappRef,
      subsections: [],
    },

  ]

  const code = `
	#include "Equil.h"
	#include "utils/utils.h"



Equil::Equil(float a, int x, int y)
{
	for(int j = 0; j < y; j++)
	{
		for (int i = 0; i < x; i++)
		{
			vertices.push_back({ glm::vec3(3 * a * i,                    (a * sin(-30) * (j * 2)),                     0.0f),       0.0f });
			vertices.push_back({ glm::vec3(3 * a * i + a,                (a * sin(-30) * (j * 2)),                     0.0f),       1.0f });
			vertices.push_back({ glm::vec3((3 * i * a) + (a / 2),        (a * sin(-30) * (j * 2)) + (a * sin(-30)),    0.0f),       2.0f });


			vertices.push_back({ glm::vec3((3 * i * a) + (1.5f * a),     (a * sin(-30) * (j * 2)) + (a * sin(-30)),    0.0f),       0.0f });
			vertices.push_back({ glm::vec3((3 * i * a) + (2.0f * a),     (a * sin(-30) * (j * 2)),                     0.0f),       2.0f });
			vertices.push_back({ glm::vec3((3 * i * a) + (2.5f * a),     (a * sin(-30) * (j * 2)) + (a * sin(-30)),    0.0f),       1.0f });


			faces.push_back(glm::uvec3(6 * i + 0 + (x * 6 * j),      6 * i + 1 + (x * 6 * j),     6 * i + 2 + (x * 6 * j)));
 			faces.push_back(glm::uvec3(6 * i + 1 + (x * 6 * j),      6 * i + 3 + (x * 6 * j),     6 * i + 2 + (x * 6 * j)));
 			faces.push_back(glm::uvec3(6 * i + 1 + (x * 6 * j),      6 * i + 4 + (x * 6 * j),     6 * i + 3 + (x * 6 * j)));
 			faces.push_back(glm::uvec3(6 * i + 3 + (x * 6 * j),      6 * i + 4 + (x * 6 * j),     6 * i + 5 + (x * 6 * j)));

			if (i > 0)
			{
				faces.push_back(glm::uvec3(6 * i - 2 + (x * 6 * j), 6 * i + (x * 6 * j), 6 * i - 1 + (x * 6 * j)));
				faces.push_back(glm::uvec3(6 * i + (x * 6 * j), 6 * i + 2 + (x * 6 * j), 6 * i - 1 + (x * 6 * j)));
			}
			if (j > 0)
			{
				faces.push_back(glm::uvec3(6 * i + 0 + (x * 6 * j), 6 * i + 1 + (x * 6 * j), 6 * i + 2 + (x * 6 * (j-1))));
				faces.push_back(glm::uvec3(6 * i + 1 + (x * 6 * j), 6 * i + 3 + (x * 6 * (j-1)), 6 * i + 2 + (x * 6 * (j-1))));
				faces.push_back(glm::uvec3(6 * i + 1 + (x * 6 * j), 6 * i + 4 + (x * 6 * j), 6 * i + 3 + (x * 6 *( j - 1))));
				faces.push_back(glm::uvec3(6 * i + 3 + (x * 6 * (j-1)), 6 * i + 4 + (x * 6 * j), 6 * i + 5 + (x * 6 * (j-1))));

				if (i > 0)
				{
					faces.push_back(glm::uvec3(6 * i - 2 + (x * 6 * j), 6 * i + (x * 6 * j), 6 * i - 1 + (x * 6 * (j-1))));
					faces.push_back(glm::uvec3(6 * i + (x * 6 * (j)), 6 * i + 2 + (x * 6 * (j-1)), 6 * i - 1 + (x * 6 * (j-1))));
				}

			}

		}
	}








	float b = 0.5f;

	texCoord = {
		glm::vec2(0.0f, 0.0f),
		glm::vec2(b, 0.0f),
		glm::vec2(b / 2, b * sin(-30))
	};

// 	vertices = {
// 		{glm::vec3(0.0f, 0.0f, 0.0f), 0.0f},
// 		{glm::vec3(a, 0.0f, 0.0f), 1.0f},
// 		{glm::vec3(a / 2, a * sin(-30), 0.0f),2.0f},
// 		{glm::vec3(a / 2 + a, a * sin(-30), 0.0f), 0.0f},
// 		{glm::vec3(2*a, 0.0f, 0.0f), 2.0f}
// 	};
// 
// 
// 
// 
// 	faces = {
// 		glm::uvec3(0, 1, 2),
// 		glm::uvec3(1, 3, 2),
// 		glm::uvec3(4, 3, 1)
// 	};

	lattice = Geometry(getVertices(), layout, getIndices());

}

void Equil::bind()
{
	lattice.bind();
}

void Equil::unbind()
{
	lattice.unbind();
}

std::vector<float> Equil::getVertices()
{
	std::vector<float> vert;
	for (Vertex v : vertices)
	{
		vert.push_back(v.pos.x);
		vert.push_back(v.pos.y);
		vert.push_back(v.pos.z);

		vert.push_back(v.t);


	}

	return vert;
}

std::vector<unsigned int> Equil::getIndices()
{
	std::vector<unsigned int> ind;
	for (glm::ivec3 v : faces)
	{
		ind.push_back(v.x);
		ind.push_back(v.y);
		ind.push_back(v.z);
	}

	return ind;
}
 `

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
              sections={KALEIDOSCOPE_SECTIONS}
              activeSection={activeSection}
            />
      
        
        <div>

          <div className="md:flex md:flex-row md:space-x-5 relative text-section mt-32" >
            <div className="md:w-[20%] md:basis-1/2 relative">
            {/* this header needs to have a custom class */}
              <div className="section-title mt-0"
                id="Making"
                ref={MakingRef}>
                Making
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
             <div className="section-title"
                  id="Toy Application"
                  ref={ToyappRef}>
                  Toy Application
              </div> 
              <CodeBlock code={code} language="python" />     
             
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

          <div className="h-[80px]"></div>

          
          
          

          


          

        </div>

        
      



        

        






      </div>

      

    </div>

  );
};

export default Kaleidoscope;
