'use client';

import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import CustomSections from '../custom-sections';
import { SectionType } from '@/model/sectiontype';
import CodeBlock from '../CodeBlock';
import Link from 'next/link';

const ForestDetails = () => {
  const overviewRef = useRef(null);
  const contextRef = useRef(null);
  const featuresRef = useRef(null);
  const implementationRef = useRef(null);
  const resultsRef = useRef(null);

  const sectionRefs = [
    overviewRef, contextRef, featuresRef, implementationRef, resultsRef
  ];

  const [activeSection, setActiveSection] = useState<string>();

  const FOREST_SECTIONS: SectionType[] = [
    {
      title: 'Overview',
      ref: overviewRef,
      subsections: [],
    },
    {
      title: 'Context',
      ref: contextRef,
      subsections: [],
    },
    {
      title: 'Features',
      ref: featuresRef,
      subsections: [],
    },
    {
      title: 'Implementation',
      ref: implementationRef,
      subsections: [],
    },
    {
      title: 'Results',
      ref: resultsRef,
      subsections: [],
    }
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
              A Grasshopper Plugin for Urban Growth Exploration
            </div>
          </div>
        </div>
      </div>

      <div className="text-black relative px-4 responsive-padding">
        <CustomSections
          sections={FOREST_SECTIONS}
          activeSection={activeSection}
        />

        {/* Overview */}
        <div>
          <div className="section-title" id="Overview" ref={overviewRef}>Overview</div>
          <div className='font-style: italic text:xl py-4 text-gray-600'>
            A computational tool for exploring urban growth patterns through algorithmic design.
          </div>
          <div className="section-text">
            Forest-A is a Grasshopper plugin designed to simulate and explore urban growth patterns 
            through computational methods. This tool enables architects and urban planners to 
            experiment with different growth algorithms and visualize their impact on urban development.
          </div>
        </div>

        {/* Context */}
        <div className="md:space-x-5 relative text-section">
          <div className="relative">
            <div className="section-title" id="Context" ref={contextRef}>
              Context
            </div>
            <div className='font-style: italic text:xl py-4 text-gray-600'>
              The need for computational tools in urban planning and design.
            </div>
            <div className="section-text">
              As cities continue to grow and evolve, there's an increasing need for tools that can 
              help planners understand and predict urban growth patterns. Forest-A addresses this 
              challenge by providing an intuitive interface for exploring different growth algorithms 
              and their effects on urban morphology.
            </div>
          </div>
        </div>

        {/* Features */}
        <div>
          <div className="section-title" id="Features" ref={featuresRef}>Features</div>
          <div className='font-style: italic text:xl py-4 text-gray-600'>
            Key capabilities of the Forest-A plugin.
          </div>
          <div className="section-text">
            Forest-A offers a comprehensive set of tools for urban growth simulation, including 
            multiple growth algorithms, real-time visualization, and parameter adjustment capabilities.
          </div>
        </div>

        {/* Implementation */}
        <div>
          <div className="section-title" id="Implementation" ref={implementationRef}>Implementation</div>
          <div className='font-style: italic text:xl py-4 text-gray-600'>
            Technical details and development process.
          </div>
          <div className="section-text">
            The plugin is built using C# and integrates seamlessly with Grasshopper's visual 
            programming interface. It utilizes advanced algorithms for growth simulation and 
            provides an intuitive user experience for exploring different urban scenarios.
          </div>
        </div>

        {/* Results */}
        <div>
          <div className="section-title" id="Results" ref={resultsRef}>Results</div>
          <div className='font-style: italic text:xl py-4 text-gray-600'>
            Impact and applications of the Forest-A plugin.
          </div>
          <div className="section-text">
            Forest-A has been successfully used in various urban planning projects, demonstrating 
            its effectiveness in exploring different growth scenarios and informing design decisions. 
            The tool has proven valuable for both academic research and practical urban planning applications.
          </div>
        </div>

        <div className="h-[80px]"></div>
      </div>
    </div>
  );
};

export default ForestDetails;
