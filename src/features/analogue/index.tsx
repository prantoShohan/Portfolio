import Image from 'next/image';
import React from 'react';

const Analogue = () => {
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
          <div className="w-full pb-4 backdrop:blur px-5 space-y-2 ">
            <div className="text-5xl font-bold">Analog</div>
            <div className="text-base font-bold top-40 ">
              Modular synthsizer
            </div>
          </div>
        </div>
      </div>
      <div className="text-black relative px-4 responsive-padding ">
        <div className="fixed border w-[10%] bottom-10 -left-[10%] text-black ">
          <div>
            <div>Name</div>
            <div>Title</div>
            <div>Title</div>
          </div>
        </div>
        <div className=" text-black py-10 relative space-x-3 border border-black">
          <div className="space-y-7 section-text">
            <div id="growth" className="flex justify-between space-x-3">
              {/* <div id="text" className="space-y-2">
                <div className="section-title ">Overview</div>
              </div> */}
            </div>
            <div className="flex space-x-4 justify-between">
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
                <div className="space-y-2">
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
                  <div className="pt-10">
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
                  <div className="text-section">
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
                  <div className="flex space-x-4 relative text-section">
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
                  <div className="text-section">
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
                </div>
                <div className="space-y-2">
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
