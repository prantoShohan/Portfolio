'use client';

import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import CustomSections from './custom-sections';
import { SectionType } from '@/model/sectiontype';

const Analogue = () => {
  const overviewRef = useRef(null);
  const modulesRef = useRef(null);
  const vcoRef = useRef(null);
  const clockDividerADSRRef = useRef(null);
  const tenStepSequencerRef = useRef(null);
  const vcaRef = useRef(null);
  const buildingFromScratchRef = useRef(null);

  const sectionRefs = [
    overviewRef,
    modulesRef,
    vcoRef,
    clockDividerADSRRef,
    tenStepSequencerRef,
    vcaRef,
    buildingFromScratchRef,
  ];
  const [activeSection, setActiveSection] = useState<string>();

  const ANALOG_SECTIONS: SectionType[] = [
    {
      title: 'Overview',
      ref: overviewRef,
      subsections: [],
    },
    {
      title: 'Modules',
      ref: modulesRef,
      subsections: [
        {
          title: 'VCO',
          ref: vcoRef,
          subsections: [],
        },
        {
          title: 'Clock + Divider & ADSR',
          ref: clockDividerADSRRef,
          subsections: [],
        },
        {
          title: '10 Step Sequencer',
          ref: tenStepSequencerRef,
          subsections: [],
        },
      ],
    },
    {
      title: 'Building From Scratch',
      ref: buildingFromScratchRef,
      subsections: [],
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id); // Update active section based on `id`
          }
        });
      },
      { threshold: .75 } // Adjust this to control how much of the section needs to be visible
    );

    // Observe all sections
    sectionRefs.forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    // Cleanup
    return () => observer.disconnect();
  }, [sectionRefs]);

  console.log(activeSection);

  return (
    <div className="bg-white min-h-screen relative">
      {/* Emergence Details */}
      <div className="relative h-[460px]">
        <Image
          src={'/images/analog/cover.png'}
          className="object-cover"
          alt=""
          fill
          unoptimized
        />
        <div className="absolute bottom-0  w-full bg-black/50 responsive-padding">
          <div className="w-full pb-4 backdrop:blur space-y-2 ">
            <div className="text-5xl font-bold">Analog</div>
            <div className="text-base font-bold top-40 ">
              Modular synthsizer
            </div>
          </div>
        </div>
      </div>
      <div className="text-black relative px-4 responsive-padding ">
        <CustomSections
          sections={ANALOG_SECTIONS}
          activeSection={activeSection}
        />
        <div className=" text-black py-10 relative space-x-3  ">
          <div className="space-y-7 section-text">
            <div
              className="flex space-x-4 justify-between"
              id="Overview"
              ref={overviewRef}
            >
              <div className="section-text w-[30%] text-justify">
                <div className="section-title p-0 pb-8">Overview</div>
                Dhaka is one of the most densly populated cities in the world.
                It has rapid growth in last 30 years with steady decline in its
                wetland and natural landscapes. It has become an parasite. This
                project poses an alternative means of growth through simulating
                natural growth process.
              </div>
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/-AepALiHQB4?si=6rhr5dWdTmeej4-r"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>

            <div id="growth_2" className="flex justify-between space-x-3">
              <div id="text" className="space-y-2">
                <div className="space-y-2" id="Modules" ref={modulesRef}>
                  <div className="section-title">Modules</div>
                  Dhaka is one of the most densly populated cities in the world.
                  <div id="multimedia" className="relative h-[370px]">
                    <Image
                      src={'/images/analog/video_ref.png'}
                      className="object-contain"
                      alt=""
                      fill
                      unoptimized
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="pt-10" id="VCO" ref={vcoRef}>
                    <div className="subsection-title">VCO</div>
                    <div className="section-text">
                      Dhaka is one of the most densly populated cities in the
                      world. It has rapid growth in last 30 years with steady
                      decline in its wetland and natural landscapes. It has
                      become an parasite. This project poses an alternative
                      means of growth through simulating natural growth process.
                    </div>
                    <div id="multimedia" className="relative h-[560px]">
                      <Image
                        src={'/images/analog/vco.png'}
                        className="object-contain"
                        alt=""
                        fill
                        unoptimized
                      />
                    </div>
                    Dhaka is one of the most densly populated cities in the
                    world.
                    <div id="multimedia" className="relative h-[460px]">
                      <Image
                        src={'/images/analog/circuit.png'}
                        className="object-contain"
                        alt=""
                        fill
                        unoptimized
                      />
                    </div>
                  </div>
                  <div
                    className="text-section"
                    id="Clock + Divider & ADSR"
                    ref={clockDividerADSRRef}
                  >
                    <div className="subsection-title">
                      {' '}
                      Clock + Divider & ADSR{' '}
                    </div>
                    <div className="section-text">
                      Dhaka is one of the most densly populated cities in the
                      world. It has rapid growth in last 30 years with steady
                      decline in its wetland and natural landscapes. It has
                      become an parasite. This project poses an alternative
                      means of growth through simulating natural growth process.
                    </div>
                    <div id="multimedia" className="relative h-[360px]">
                      <Image
                        src={'/images/analog/clock+adsr.png'}
                        className="object-contain"
                        alt=""
                        fill
                        unoptimized
                      />
                    </div>
                  </div>
                  <div
                    className="flex space-x-4 relative text-section"
                    id="10 Step Sequencer"
                    ref={tenStepSequencerRef}
                  >
                    <div className="section-text w-[20%]">
                      <div className="subsection-title">
                        {' '}
                        10 Step Sequencer{' '}
                      </div>
                      Dhaka is one of the most densly populated cities in the
                      world. It has rapid growth in last 30 years with steady
                      decline in its wetland and natural landscapes. It has
                      become an parasite. This project poses an alternative
                      means of growth through simulating natural growth process.
                    </div>
                    <div id="multimedia" className="relative w-[70%] h-[460px]">
                      <Image
                        src={'/images/analog/sequencer.png'}
                        className="object-contain"
                        alt=""
                        fill
                        unoptimized
                      />
                    </div>
                  </div>
                  {/*TODO: Placeholder */}
                  {/* <div
                    className="text-section"
                    id="Clock + Divider & ADSR"
                    ref={clockDividerADSRRef}
                  >
                    <div className="subsection-title">
                      {' '}
                      Clock + Divider & ADSR{' '}
                    </div>
                    <div className="section-text">
                      Dhaka is one of the most densly populated cities in the
                      world. It has rapid growth in last 30 years with steady
                      decline in its wetland and natural landscapes. It has
                      become an parasite. This project poses an alternative
                      means of growth through simulating natural growth process.
                    </div>
                    <div id="multimedia" className="relative h-[360px]">
                      <Image
                        src={'/images/analog/clock+adsr.png'}
                        className="object-contain"
                        alt=""
                        fill
                        unoptimized
                      />
                    </div>
                  </div> */}
                </div>
                <div
                  className="space-y-2"
                  id="Building From Scratch"
                  ref={buildingFromScratchRef}
                >
                  <div className="section-title">Building From Scratch</div>
                  Dhaka is one of the most densly populated cities in the world.
                  <div id="multimedia" className="relative h-[470px]">
                    <Image
                      src={'/images/analog/video_ref.png'}
                      className="object-contain"
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
      </div>
    </div>
  );
};

export default Analogue;
