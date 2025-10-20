'use client';

import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import CustomSections from '../custom-sections';
import { SectionType } from '@/model/sectiontype';
import CodeBlock from '../CodeBlock';
import Link from 'next/link';

const ForestDetails = () => {
  const overviewRef = useRef(null);
  const urbanstateRef = useRef(null);
  const roadsRef = useRef(null);
  const demandWalkabilityRef = useRef(null);
  const existingRef = useRef(null);
  const growthRef = useRef(null);
  const examplesRef = useRef(null);
  const merrymountRef = useRef(null);
  const mirpurRef = useRef(null);
  const uniformGridRef = useRef(null);

  const sectionRefs = [
    overviewRef,
    urbanstateRef,
    roadsRef,
    demandWalkabilityRef,
    existingRef,
    growthRef,
    examplesRef,
    merrymountRef,
    mirpurRef,
    uniformGridRef,
  ];

  const [activeSection, setActiveSection] = useState<string>();

  const FOREST_SECTIONS: SectionType[] = [
    {
      title: 'Forest',
      ref: overviewRef,
      subsections: [],
    },
    {
      title: 'Urbanstate',
      ref: urbanstateRef,
      subsections: [
        { title: 'Roads and Plots', ref: roadsRef, subsections: [] },
        { title: 'DemandMatrix and WalkabilityMatrix', ref: demandWalkabilityRef, subsections: [] },
        { title: 'Adding existing', ref: existingRef, subsections: [] },
        { title: 'Growth step', ref: growthRef, subsections: [] },
      ],
    },
    {
      title: 'Examples',
      ref: examplesRef,
      subsections: [
        { title: 'Merrymount', ref: merrymountRef, subsections: [] },
        // { title: 'Mirpur 10', ref: mirpurRef, subsections: [] },
        // { title: 'Uniform grid', ref: uniformGridRef, subsections: [] },
      ],
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.75 }
    );

    sectionRefs.forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, [sectionRefs]);

  const images = [1, 2, 3]; // Or however many you have.
  const [modalImage, setModalImage] = useState<string | null>(null);
  const [startIdx, setStartIdx] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 640) {        // <sm (mobile)
        setVisibleCount(1);
      } else if (window.innerWidth < 1024) {// <lg (tablet)
        setVisibleCount(2);
      } else {                              // desktop
        setVisibleCount(3);
      }
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [merrymountCarouselIdx, setMerrymountCarouselIdx] = useState(0);
  const [carouselVisibleCount, setCarouselVisibleCount] = useState(3);
  const merrymountImages = [
    '/images/forest/merrymount_46.png',
    '/images/forest/merrymount_47.png',
    '/images/forest/merrymount_48.png',
  ];
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 640) setCarouselVisibleCount(1);
      else if (window.innerWidth < 1024) setCarouselVisibleCount(2);
      else setCarouselVisibleCount(3);
    }
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  function MerrymountCarousel({ setModalImage }: { setModalImage: React.Dispatch<React.SetStateAction<string | null>> }) {
    return (
      <div className="w-full flex items-center justify-center gap-4 mt-4 py-6">
        <button
          type="button"
          aria-label="Previous"
          onClick={() => setMerrymountCarouselIdx(merrymountCarouselIdx === 0 ? merrymountImages.length - carouselVisibleCount : merrymountCarouselIdx - 1)}
          className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 text-xl font-bold"
        >&#8592;</button>
        <div className="flex flex-row gap-4 w-full max-w-full overflow-hidden">
          {merrymountImages.slice(merrymountCarouselIdx, merrymountCarouselIdx + carouselVisibleCount).map((src, idx) => (
            <img
              key={src}
              src={src}
              alt={`Merrymount Example ${idx}`}
              onClick={() => setModalImage(src)}
              className="flex-1 w-0 max-w-[240px] max-h-40 object-contain rounded shadow cursor-pointer transition-transform hover:scale-105"
            />
          ))}
          {/* Wrapping logic for end of array */}
          {merrymountCarouselIdx + carouselVisibleCount > merrymountImages.length &&
            merrymountImages.slice(0, (merrymountCarouselIdx + carouselVisibleCount) % merrymountImages.length).map((src, idx) => (
              <img
                key={'wrap-' + src}
                src={src}
                alt={`Merrymount Example ${idx}`}
                onClick={() => setModalImage(src)}
                className="flex-1 w-0 max-w-[240px] max-h-40 object-contain rounded shadow cursor-pointer transition-transform hover:scale-105"
              />
            ))
          }
        </div>
        <button
          type="button"
          aria-label="Next"
          onClick={() => setMerrymountCarouselIdx((merrymountCarouselIdx + 1) % merrymountImages.length)}
          className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 text-xl font-bold"
        >&#8594;</button>
      </div>
    );
  }


  return (
    <div className="bg-white min-h-screen relative">
      {/* Cover */}
      <div className="relative h-[460px] bg-gray-900">
        <Image
          src={'/images/forest/cover.gif'}
          className="object-cover"
          alt="Forest Cover"
          fill
          unoptimized
        />
        <div className="absolute bottom-0 backdrop-blur-sm w-full bg-black/20 responsive-padding">
          <div className="w-full pb-4 space-y-2">
            <div className="text-5xl font-bold">Forest</div>
            <div className="text-base font-bold top-40">
              Simulate, analyze, and visualize emergent urban systems
            </div>
          </div>
        </div>
      </div>

      <div className="text-black relative px-4 responsive-padding">
        <CustomSections
          sections={FOREST_SECTIONS}
          activeSection={activeSection}
        />

        {/* Forest (title section) */}
        <div>
          <div className="section-title flex flex-col md:flex-row md:items-center gap-2 md:gap-3" id="Forest" ref={overviewRef}>
            <Image
              src="/images/forest/forest.png"
              alt="Forest Icon"
              width={56}
              height={56}
              className="object-contain"
            />
            <span>Forest</span>
          </div>
          <div className="section-text">
            <div className="w-full my-6">
              <img
                src="/images/forest/Components.png"
                alt="Forest components overview"
                className="w-full h-auto object-contain border border-gray-300/50"
              />
            </div>
            Forest is a tool for simulating, analyzing, and visualizing urban systems. It uses a node‑graph–based
            framework to model the emergent growth patterns of settlements, focusing on demand, accessibility, and walkability.
            <br /><br />
            Forest generates a complete Urbanstate — a dynamic dataset that stores information about circulation
            networks, plot positions, available spaces, demand, and occupancy. This Urbanstate can be analyzed,
            visualized, and simulated. You can import existing urban conditions directly from OpenStreetMap (OSM)
            data to assess zoning efficiency and walkability, or simulate growth scenarios to predict future
            development and demand.
            <br /><br />
            In Forest, all plots are represented as nodes. Each node follows simple local rules, interacting with its
            neighbors to generate and respond to demand. The system is fully decentralized — each node behaves like a
            cell in a cellular automaton, similar to Game of Life or Particle Life. Through these interactions, complex
            urban patterns emerge organically, reflecting behaviors that mimic life itself.
          </div>
          
        </div>
        <div className="w-full flex items-center justify-center gap-4 mt-8 py-6">
          {/* Left Arrow */}
          <button
            type="button"
            aria-label="Previous"
            onClick={() => setStartIdx(startIdx === 0 ? images.length - visibleCount : startIdx - 1)}
            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 text-xl font-bold"
          >&#8592;</button>

          {/* Image Row */}
          <div className="flex flex-row gap-4 w-full max-w-full overflow-hidden">
            {images.slice(startIdx, startIdx + visibleCount).map(num => (
              <img
                key={num}
                src={`/images/forest/${num}.gif`}
                alt={`Forest example ${num}`}
                onClick={() => setModalImage(`/images/forest/${num}.gif`)}
                className="flex-1 w-0 max-w-[240px] max-h-40 object-contain rounded shadow cursor-pointer transition-transform hover:scale-105"
              />
            ))}
            {/* Wrap logic if slicing overflows images.length */}
            {startIdx + visibleCount > images.length &&
              images.slice(0, (startIdx + visibleCount) % images.length).map(num => (
                <img
                  key={'wrap-' + num}
                  src={`/images/forest/${num}.gif`}
                  alt={`Forest example ${num}`}
                  onClick={() => setModalImage(`/images/forest/${num}.gif`)}
                  className="flex-1 w-0 max-w-[240px] max-h-40 object-contain rounded shadow cursor-pointer transition-transform hover:scale-105"
                />
              ))
            }
          </div>

          {/* Right Arrow */}
          <button
            type="button"
            aria-label="Next"
            onClick={() => setStartIdx((startIdx + 1) % images.length)}
            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 text-xl font-bold"
          >&#8594;</button>
        </div>
        {modalImage && (
          <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center" onClick={() => setModalImage(null)}>
            <img
              src={modalImage}
              alt="Enlarged Forest Example"
              className="max-w-[90vw] max-h-[90vh] rounded shadow-lg border-2 border-white"
              onClick={e => e.stopPropagation()} // Prevents closing when clicking the image
            />
          </div>
        )}
        <div className="w-full flex justify-center mt-2">
          <a href="https://www.food4rhino.com/en/app/forest" target="_blank" rel="noopener noreferrer" className="text-green-700 underline hover:text-green-900 transition font-medium">
            Download Forest plugin on Food4Rhino
          </a>
        </div>

        {/* Urbanstate */}
        <div className="md:space-x-5 relative text-section">
          <div className="relative">
            <div className="section-title" id="Urbanstate" ref={urbanstateRef}>
              Urbanstate
            </div>
            <div className='font-style: italic text:xl py-4 text-gray-600'>
              The data model combining network, plots, zone types, demand and walkability.
            </div>
            <div className="section-text">
              To start with Forest you need to build the Urbanstate object. It is made of a Network model — which
              defines the road network, plots, and the internal connectivity graph — and an Urban model, which
              defines the types of zones present in the urban system. The demand and walkability matrices define how
              the defined zone types interact with one another.
            </div>
          <div className="w-full mt-4">
            <img
              src="/images/forest/ForestStructure.png"
              alt="Forest structure diagram"
              className="w-full h-auto object-contain border border-gray-300/50"
            />
          </div>
          </div>
        </div>

        {/* Roads and Plots */}
        <div>
          <div className="subsection-title" id="Roads and Plots" ref={roadsRef}>Roads and Plots</div>
          <div className="section-text">
            Single line road network and closed polyline plots. You can create it manually or you can import from an
            OSM file. The available space of the plot depends on the actual geometric area of the plots.
          </div>
        </div>

        {/* DemandMatrix and WalkabilityMatrix */}
        <div>
          <div className="subsection-title" id="DemandMatrix and WalkabilityMatrix" ref={demandWalkabilityRef}>
            DemandMatrix and WalkabilityMatrix
          </div>
          <div className="section-text">
            Demand Matrix defines how different urban zone types generate demand for others. Each cell in the matrix
            quantifies the amount of required amenities (target zone) generated by one unit of another zone (source).
            For example, a value of 1/50 from Residential → Commercial means one Commercial unit can support 50
            Residential units, or equivalently, each Residential unit requires 1/50 of a Commercial unit within walkable
            distance. I am taking this data from BNBC(Bangladesh National Building Code) and the data is from the year 2018.
            <br /><br />
            Walkability Matrix (β) represents how quickly spatial influence or walkability decreases with distance
            between two zone types, typically modeled as y = e^(−βx). For example, Residential → Commercial has β = 2.14
            — demand for commercial amenities decays rapidly with distance (people prefer nearby shops and services).
            Residential → Work has β = 1.81 — residents are more willing to travel farther to reach workplaces compared
            to commercial amenities. This data and system of calculating the probability of walking is taken form NIH(National Institutes of Health)
            from the article "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3377942/"
            <br /><br />
          </div>
          <div className="w-full mt-4">
            <img
              src="/images/forest/Animation.gif"
              alt="Walkability animation"
              className="w-full h-auto object-contain border border-gray-300/50"
            />
          </div>
        </div>

        {/* Adding existing */}
        <div>
          <div className="subsection-title" id="Adding existing" ref={existingRef}>Adding existing</div>
          <div className="section-text">
            You can add existing units of a certain zone type and visualize them with an occupancy visualizer. You can
            also calculate the demand and visualize it.
          </div>
        </div>

        {/* Growth step */}
        <div>
          <div className="subsection-title" id="Growth step" ref={growthRef}>Growth step</div>
          <div className="section-text">
            Growth step is the cycle between calculating demand and growth. Each node has a current state of occupancy,
            demand and available space. If demand of any zone type crosses a certain threshold, and there is enough
            space in the node, then a unit of that zone type is created. In the next step, the demand is calculated again.
            <div className="w-full flex justify-center mt-4">
              <img
                src="/images/forest/cycle.png"
                alt="Growth cycle diagram"
                className="max-w-xs w-full h-auto object-contain border border-gray-300/50"
              />
            </div>
            <br /><br />
            Each node (plot) looks at its surrounding neighbor plots within a given distance and accumulates the influence
            they exert based on: (1) how much of each zone type they contain (occupants), (2) how strong the base
            attraction/repulsion between zone types is (Demand Matrix), and (3) how far away they are (Walkability Matrix
            or Distance Factor). That combined influence becomes the demand for each zone type in the current node.
            <br /><br />
            This cycle of demand and growth stops when: (1) either there is not enough demand for further growth; or (2)
            there is no available space for further growth. Sometimes the algorithm cannot find a solution and keeps
            fluctuating back and forth — in this case, you should decrease the growth rate to help it find a solution.
            When it reaches equilibrium it means optimum positions for the units have been found. Note that, for example,
            if a healthcare unit is present, it will produce negative demand for healthcare around its surrounding,
            indicating it has mitigated the demand for healthcare.
          </div>
          <div className="md:flex md:flex-row pt-8 md:space-x-5">
            <div className="w-full mt-4 border border-gray-300/50">
              <img
                src="/images/forest/gr 1.png"
                className="w-full h-auto object-contain cursor-pointer"
                alt="Growth step result 1"
                onClick={() => setModalImage('/images/forest/gr 1.png')}
              />
            </div>
            <div className="w-full mt-4 border border-gray-300/50">
              <img
                src="/images/forest/gr2.png"
                className="w-full h-auto object-contain cursor-pointer"
                alt="Growth step result 2"
                onClick={() => setModalImage('/images/forest/gr2.png')}
              />
            </div>
          </div>
          {modalImage && (
            <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center" onClick={() => setModalImage(null)}>
              <img
                src={modalImage}
                alt="Enlarged view"
                className="max-w-[90vw] max-h-[90vh] rounded shadow-lg border-2 border-white"
                onClick={e => e.stopPropagation()} // Keeps modal open when image is clicked
              />
            </div>
          )}
        </div>

        {/* Examples */}
        <div>
          <div className="section-title" id="Examples" ref={examplesRef}>Examples</div>
        </div>

        {/* Merrymount */}
        <div>
          <div className="subsection-title" id="Merrymount" ref={merrymountRef}>Merrymount</div>
          {/* Large 3.gif at top */}
          <div className="w-full my-6">
            <img
              src="/images/forest/3.gif"
              alt="Merrymount animation"
              className="w-full h-auto object-contain border border-gray-300/50 cursor-pointer"
              onClick={() => setModalImage('/images/forest/3.gif')}
            />
          </div>
          {/* Responsive window carousel for merrymount_46/47/48 */}
          <MerrymountCarousel setModalImage={setModalImage} />
        </div>

        
        {/* Uniform grid */}
        {/* <div>
          <div className="subsection-title" id="Uniform grid" ref={uniformGridRef}>Uniform grid</div>
          <div className="section-text">
            Description placeholder: synthetic grid to illustrate parameter sensitivity (β values, thresholds, growth rate).
          </div>
        </div> */}

        <div className="h-[80px]"></div>
      </div>
    </div>
  );
};

export default ForestDetails;
