'use client';

import Image from 'next/image';
import React from 'react';

const EmergenceDetails = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Emergence Details */}
      <div className="relative h-[460px]">
        <Image
          src={'/images/img_1.jpg'}
          className="object-cover"
          alt=""
          fill
          unoptimized
        />
        <div className="absolute bottom-0 responsive-padding w-full bg-black/50">
          <div className="w-full px-4 pb-4 backdrop:blur space-y-2 ">
            <div className="text-5xl font-bold ">{`Emergence`}</div>
            <div className="text-base font-bold top-40 ">{`Computational Growth of Urban Organism`}</div>
          </div>
        </div>
      </div>
      <div className="responsive-padding text-black py-4 space-y-7">
        <div id="growth" className="flex justify-between space-x-3">
          <div id="text" className="max-w-[40%] space-y-2">
            <div className="text-3xl font-bold">
              The growth of Dhaka in last 30 years.
            </div>
            <div>
              Dhaka is one of the most densly populated cities in the world. It
              has rapid growth in last 30 years with steady decline in its
              wetland and natural landscapes. It has become an parasite. This
              project poses an alternative means of growth through simulating
              natural growth process.
            </div>
            <div id="multimedia" className="relative h-[180px]">
              <Image
                src={'/images/emergence/graph.png'}
                className="object-contain"
                alt=""
                fill
                unoptimized
              />
            </div>
          </div>
          <div id="multimedia" className="relative h-[400px] w-[60%]">
            <Image
              src={'/images/emergence/dhaka timelapse small.gif'}
              className="object-cover"
              alt=""
              fill
              unoptimized
            />
          </div>
        </div>
        <div id="growth_2" className="flex justify-between space-x-3">
          {/* <div
            id="multimedia"
            className="relative grid grid-cols-3 h-[400px] w-[40%]"
          >
            <Image
              src={'/images/emergence/dhaka timelapse small.gif'}
              className="object-cover"
              alt=""
              fill
              unoptimized
            />
            <Image
              src={'/images/emergence/dhaka timelapse small.gif'}
              className="object-cover"
              alt=""
              fill
              unoptimized
            />
            <Image
              src={'/images/emergence/dhaka timelapse small.gif'}
              className="object-cover"
              alt=""
              fill
              unoptimized
            />
            <Image
              src={'/images/emergence/dhaka timelapse small.gif'}
              className="object-cover"
              alt=""
              fill
              unoptimized
            />
          </div> */}
          <div id="text" className="max-w-[60%] space-y-2">
            <div className="text-3xl font-bold">
              The growth of Dhaka in last 30 years.
            </div>
            <div>
              Dhaka is one of the most densly populated cities in the world. It
              has rapid growth in last 30 years with steady decline in its
              wetland and natural landscapes. It has become an parasite. This
              project poses an alternative means of growth through simulating
              natural growth process.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergenceDetails;
