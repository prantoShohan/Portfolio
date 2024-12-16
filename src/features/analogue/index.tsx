'use client';

import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { SectionType } from '@/model/sectiontype';
import CustomSections from '../custom-sections';

const Analogue = () => {
  // Define section refs here
  const overviewRef = useRef(null);
  const modulesRef = useRef(null);
  const vcoRef = useRef(null);
  const clockDividerRef = useRef(null);
  const ADSRRef = useRef(null); 
  const tenStepSequencerRef = useRef(null);
  const vcaRef = useRef(null);
  const vcfRef = useRef(null);
  const powerRef = useRef(null);
  const buildingFromScratchRef = useRef(null);
  const simulationRef = useRef(null);
  const breadBoardRef = useRef(null);
  const panelRef = useRef(null);
  const veroRef = useRef(null);
  const pcbRef = useRef(null);

  // assign any newly created ref here
  const sectionRefs = [
    overviewRef,
    modulesRef,
    vcoRef,
    clockDividerRef,
    tenStepSequencerRef,
    vcaRef,
    buildingFromScratchRef,
    ADSRRef,
    vcfRef, powerRef, simulationRef, breadBoardRef, panelRef, veroRef, pcbRef
  ];

  // Current selected selction state
  const [activeSection, setActiveSection] = useState<string>();

  // Section definitio with ref
  // For First level sections add in the first layer
  // So on and so forth
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
        // {
        //   title: 'VCO',
        //   ref: vcoRef,
        //   subsections: [],
        // },
        // {
        //   title: 'Clock + Divider',
        //   ref: clockDividerRef,
        //   subsections: [],
        // },
        // {
        //   title: '10 Step Sequencer',
        //   ref: tenStepSequencerRef,
        //   subsections: [],
        // },
        // {
        //   title: 'ADSR',
        //   ref: ADSRRef,
        //   subsections: [],
        // },
        // {
        //   title: 'VCA',
        //   ref: vcaRef,
        //   subsections: [],
        // },
        // {
        //   title: 'VCF',
        //   ref: vcfRef,
        //   subsections: [],
        // },
        // {
        //   title: 'Power and Casing',
        //   ref: powerRef,
        //   subsections: [],
        // },
      ],
    },
    {
      title: 'Building From Scratch',
      ref: buildingFromScratchRef,
      subsections: [
        {
          title: 'Circuit Simulation',
          ref: simulationRef,
          subsections: [],
        },
        {
          title: 'Breadboard Prototype',
          ref: breadBoardRef,
          subsections: [],
        },
        {
          title: 'Panel Design',
          ref: panelRef,
          subsections: [],
        },
        {
          title: 'Vero Board Design',
          ref: veroRef,
          subsections: [],
        },
        {
          title: 'PCB Design',
          ref: pcbRef,
          subsections: [],
        },
      ],
    },
  ];


  // To determine the in view section
  // can be reused by cp 
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
    <div className="bg-white min-h-screen relative">
      {/* Emergence Details */}
      {/* Project cover */}
      <div className="relative h-[460px]">
        {/* Cover Image */}
        <Image
          src={'/images/analog/cover.gif'}
          className="object-cover"
          alt=""
          fill
          unoptimized
        />
        {/* Cover Text */}
        <div className="absolute bottom-0  w-full bg-black/50 responsive-padding">
          <div className="w-full pb-4 backdrop:blur space-y-2 ">
            {/* Title */}
            <div className="text-5xl font-bold">Analog</div>
            {/* Subtitle */}
            <div className="text-base font-bold top-40 ">
              Modular synthsizer
            </div>
          </div>
        </div>
      </div>
      {/* Text section starts */}
      <div className="text-black relative px-4 responsive-padding ">
        {/* Section navigation */}
        <CustomSections
          sections={ANALOG_SECTIONS}
          activeSection={activeSection}
        />


        <div className="w-full">           

            {/* Text Section */}
            <div className="relative">
              <div className="section-title"
                id="Landform System"
                ref={overviewRef}>Overview</div>
              <div className="section-text">
                I am fascinated with generative
                  music and modular synthesizers. However, modular synthesizers is neither available in my country nor
                   affordable. So, I have built one from scratch using locally sourced components.
                    I persisted—learning the necessary math and circuit design, mastering soldering,
                      and gradually building a set of basic modules through trial and error. I’m still building new ones today.
              </div>
            </div>
           
            <div className="relative grow w-full mt-8">
              <div className="relative w-full pb-[56.25%] h-0">
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/Zh674k-CJ6k?si=od_knN2cr1S6HyvT"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </div>
            </div>

        </div>

        <div
          id="Modules"
          ref={modulesRef}>
          <div className="section-title">Modules</div>
          <div className="section-text">
            These are the basic modules to function a analog synthesizer.
          </div>

          <div className="w-full mt-4">
            <img 
              src="/images/analog/full.png"
              className="w-full h-auto object-contain"
              alt="Reaction Diffusion"
            />
          </div>
        </div>


        <div className="w-full pt-32">           

            {/* Text Section */}
            <div className=" relative">
              <div className="subsection-title">VCO</div>
              <div className="section-text">
                I am a fan of Don Buchla and West Coast synthesis.
                 So I wanted to experiment with FM and triangle core oscillators.
                  This design is based on Thomas Henry’s VCO 1. But I have actively modified it.
                   In his design a transistor based schmidt trigger used. I used an LM311 comparator instead of that.
                    His design used +15V to -15V. I modified it to +12V to -12V. And there are few other minor changes.
              </div>
            </div>

            {/* Image Section */}
            <div className=" relative grow mt-16 w-full h-auto">
              <img 
                src="/images/analog/vco.png"
                className="w-full h-auto object-contain"
                alt="Reaction Diffusion"
              />
            </div>


          <div className=" relative grow mt-16 w-full h-auto">
            <img 
              src="/images/analog/circuit.png"
              className="w-full h-auto object-contain"
              alt="Reaction Diffusion"
            />
          </div>

          <div className="md:flex md:flex-row md:space-x-5 relative text-section mt-16">
            {/* Text Section */}
            <div className="md:w-[20%] md:basis-1/3 relative">
              <div className="section-text">
                This was an earlier design of a sawtooth wave vco based on CD40106 as Schmitt Trigger.
              </div>
            </div>

            {/* Image Section */}
            <div className=" relative grow mt-4 w-full h-auto">
              <img 
                src="/images/analog/vcosaw.png"
                className="w-full h-auto object-contain"
                alt="Reaction Diffusion"
              />
            </div>
          </div>
        </div>


        <div className="w-full pt-32">           
          <div className="md:flex md:flex-row md:space-x-5 relative text-section">
            {/* Text Section */}
            <div className="md:w-[20%] md:basis-1/3 relative">
              <div className="subsection-title mt-0">Clock + Divider</div>
              <div className="section-text">
                The clock divider is built with CD4040 binary counter. There is an external clock input support.
              </div>
            </div>

            {/* Image Section */}
            <div className=" relative grow mt-4 w-full h-auto">
              <img
                src="/images/analog/clk.png"
                className="object-contain w-full h-auto"
                alt="Dhaka Landform"
              />
            </div>
          </div>
        </div>


        <div className="w-full pt-32">           
          <div className="md:flex md:flex-row md:space-x-5 relative text-section">
            {/* Text Section */}
            <div className="md:w-[20%] md:basis-1/3 relative">
              <div className="subsection-title mt-0">10 Step Sequencer</div>
              <div className="section-text">
                The sequencer is based on CD4017 Decade Counter. The length of the sequence can be adjusted from 1 to 10.
              </div>
            </div>

            {/* Image Section */}
            <div className=" relative grow mt-4 w-full h-auto">
              <img
                src="/images/analog/seq.png"
                className="object-contain w-full h-auto"
                alt="Dhaka Landform"
              />
            </div>
          </div>
        </div>


        <div className="w-full pt-32">           
          <div className="md:flex md:flex-row md:space-x-5 relative text-section">
            {/* Text Section */}
            <div className="md:w-[20%] md:basis-1/3 relative">
              <div className="subsection-title mt-0">ADSR: Attack Decay Sustain Release</div>
              <div className="section-text">
                This ADSR is based on Kassutronics Precision ADSR which is actually based on The Fastest Envelope in the West by Rene Schmitz.
              </div>
            </div>

            {/* Image Section */}
            <div className=" relative grow mt-4 w-full h-auto">
              <img
                src="/images/analog/ADSR.png"
                className="object-contain w-full h-auto"
                alt="Dhaka Landform"
              />
            </div>
          </div>
        </div>


        <div className="w-full pt-32">           
          <div className="md:flex md:flex-row md:space-x-5 relative text-section">
            {/* Text Section */}
            <div className="md:w-[20%] md:basis-1/3 relative">
              <div className="subsection-title mt-0">Dual VCA: Voltage Controlled Amplifier</div>
              <div className="section-text">
                This is classic transistor VCA based on Moritz Klein.
              </div>
            </div>

            {/* Image Section */}
            <div className=" relative grow mt-4 w-full h-auto">
              <img
                src="/images/analog/vca.png"
                className="object-contain w-full h-auto"
                alt="Dhaka Landform"
              />
            </div>
          </div>
        </div>


        <div className="w-full pt-32">           
          <div className="md:flex md:flex-row md:space-x-5 relative text-section">
            {/* Text Section */}
            <div className="md:w-[20%] md:basis-1/3 relative">
              <div className="subsection-title mt-0">VCF: Voltage Controlled Filter</div>
              <div className="section-text">
                This is a diode ladder filter based on Moritz Klein.
              </div>
            </div>

            {/* Image Section */}
            <div className=" relative grow mt-4 w-full h-auto">
              <img
                src="/images/analog/vcf.png"
                className="object-contain w-full h-auto"
                alt="Dhaka Landform"
              />
            </div>
          </div>
        </div>

        <div className="w-full pt-32">           
          <div className="relative text-section">
            {/* Text Section */}
            <div className=" relative">
              <div className="subsection-title mt-0">Power and Casing</div>
              <div className="section-text">
                The power supply provide the rail to rail voltage required for driving the op-amps.
                The cover is made from 5mm PVC with glue joint.
              </div>
            </div>

            {/* Image Section */}
            <div className=" relative grow mt-4 w-full h-auto">
              <img
                src="/images/analog/ps.jpg"
                className="object-contain w-full h-auto"
                alt="Dhaka Landform"
              />
            </div>
          </div>
        </div>


        <div
          id="Building From Scratch"
          ref={buildingFromScratchRef}>
          <div className="section-title">Building From Scratch</div>
          <div className="section-text">
            A lot of planning goes into building a module. Most circuit available require some level of modification and 
            core understanding of the circuit.But the most challanging task is Debugging the circuit. 
          </div>
        </div>


        <div className="w-full">           
          <div className="relative text-section">
            {/* Text Section */}
            <div className=" relative">
              <div className="subsection-title "
                 id="Circuit Simulation"ref={simulationRef}>Circuit Simulation</div>
              <div className="section-text">
                Simulators help to understand the circuits which is essential later during debugging.
              </div>
            </div>

            {/* Image Section */}
            <div className=" relative grow mt-4 w-full h-auto">
              <img
                src="/images/analog/simulation.png"
                className="object-contain w-full h-auto"
                alt="Dhaka Landform"
              />
            </div>
          </div>
        </div>


        <div className="w-full">           
          <div className="relative text-section">
            {/* Text Section */}
            <div className=" relative">
              <div className="subsection-title "
                 id="Breadboard Prototype"ref={breadBoardRef}>Breadboard Prototype</div>
              <div className="section-text">
                Breadboarding a circuit is an essential part of circuit design process.

              </div>
            </div>

            {/* Image Section */}
            <div className="relative w-full pb-[56.25%] mt-8 h-0">
              <iframe
                className="absolute top-0 left-0 w-full h-full border-0"
                src="https://www.youtube.com/embed/-AepALiHQB4?si=GaaYzYrUMpk3CxyN"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>

        <div className="w-full pt-12">
          <div className="relative">
            <div
              className="subsection-title "
              id="Panel Design"
              ref={panelRef}
            >
              Panel Design
            </div>
            <div className="section-text">
              The panel is made from single-sided copper-clad board. The copper base acts as a ground.
            </div>
          </div>
          <div className="relative text-section">
            {/* Text Section */}

            <div className="relative grow w-full h-auto">
              <img
                src="/images/analog/paneldrw.png"
                className="object-contain w-full h-auto"
                alt="Dhaka Landform"
              />
            </div>

            <div className="relative grow w-full">
              <div className="relative w-full pb-[56.25%] h-0">
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/DSPrI5jOito?si=6GnRQRU5AF02xRua"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </div>
            </div>

              {/* Image Section */}
          </div>
        </div>


        <div className="w-full pt-12">
          <div className="relative">
            <div
              className="subsection-title "
              id="Vero Board Design"
              ref={veroRef}
            >
              Vero Board Design
            </div>
            <div className="section-text">
              I learned that soldering is a skill and is to be improved by practicing.
            </div>
          </div>
          
          <div className="relative text-section">
            {/* Text Section */}

            <div className="relative grow w-full h-auto">
              <img
                src="/images/analog/vero.png"
                className="object-contain w-full h-auto"
                alt="Dhaka Landform"
              />
            </div>

            <div className="relative grow w-full mt-8">
              <div className="relative w-full pb-[56.25%] h-0">
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/W2uDb4M_RMg?si=oarb8uV4lb58dhWz"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </div>
            </div>

              {/* Image Section */}
          </div>
        </div>


        <div className="w-full">           
          <div className="relative text-section">
            {/* Text Section */}
            <div className=" relative">
              <div className="subsection-title "
                 id="PCB Design"ref={pcbRef}>PCB Design</div>
              <div className="section-text">
                I am starting to design PCB though it is expensive. I am designing some modules for PCB.

              </div>
            </div>

            {/* Image Section */}
            <div className=" relative grow mt-4 w-full h-auto">
              <img
                src="/images/analog/pcb.png"
                className="object-contain w-full h-auto"
                alt="Dhaka Landform"
              />
            </div>



            <div className=" relative grow mt-4 w-full h-auto">
              <img
                src="/images/analog/hand.png"
                className="object-contain w-full h-auto"
                alt="Dhaka Landform"
              />
            </div>
            <div className="section-text pt-4">
                This is an earlier attempt of PCB manufacturing from a local shop. 

            </div>
          </div>
        </div>




        <div className='h-[100px]'></div>






        
      </div>
    </div>
  );
};

export default Analogue;
