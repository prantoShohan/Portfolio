import React from 'react';
import Image from 'next/image';

const ProjectShowcasePersonal = () => {
  const SLIDES = Array.from(Array(4).keys());
  return (
    <div className="bg-white min-h-screen responsive-padding">
      <div className="text-4xl text-black px-4 pt-[40px]">Personal Works</div>
      <div className="flex flex-col space-y-28 py-8">
        {SLIDES.map((_, i) => (
          <div
            key={i}
            className="flex items-center w-full space-x-8 h-[180px] rounded-2xl cursor-pointer"
          >
            <div className="flex items-center justify-center">
              <div className="text-[180px] text-center font-bold text-black/10">{`0${
                i + 1
              }`}</div>
            </div>

            <div className="w-full h-[134px] relative">
              <Image
                src={`./images/img_${i + 1}.jpg`}
                fill
                className="rounded-2x object-cover"
                unoptimized
                alt=""
                loader={() => `./images/img_${i + 1}.jpg`}
              />
              <div className="absolute bottom-0 text-white px-4 pb-4 backdrop:blur space-y-2 w-full">
                <div className="text-5xl font-bold ">{`Emergence`}</div>
                <div className="text-base font-bold top-40 ">{`Computational Growth of Urban Organism`}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectShowcasePersonal;
