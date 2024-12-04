'use client';


import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import CustomSections from './custom-sections';
import { SectionType } from '@/model/sectiontype';

const Evolution = () => {
  const overviewRef = useRef(null);
  const ContextRef = useRef(null);
  const GeneticCodingRef = useRef(null);
  const EvolutionRef = useRef(null);
  const SpeciesRef = useRef(null);

  const sectionRefs = [
    overviewRef, ContextRef, GeneticCodingRef, EvolutionRef, SpeciesRef

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
      title: 'Evolution',
      ref: EvolutionRef,
      subsections: [],
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
              Computational Growth of Urban Organism
            </div>
          </div>
        </div>
      </div>




      </div>

  );
};

export default Evolution;
