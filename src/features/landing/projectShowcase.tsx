import React from 'react';
import { ROUTES } from '@/constants/routes';
import ProjectCard from './projectCard';
import { useRouter } from 'next/navigation';

const ProjectShowcase = () => {

  const router = useRouter();
  return (
    <div className="bg-white responsive-padding py-6">
      <div className="text-4xl text-black px-4 pt-[40px]">Academics</div>
      <div className="flex flex-col space-y-16 py-8">
        <ProjectCard
          imageSrc={`./images/emergence/Cover animation.gif`}
          route={ROUTES.EMERGENCE}
          serial="01"
          subtitle="Computational Growth of Urban Organism"
          title="Emergence"
          color="text-white"
        />

        <ProjectCard
          imageSrc={`/images/evolution/cover.gif`}
          route={ROUTES.EVOLUTION}
          serial="02"
          subtitle="Computational Growth of Urban Organism"
          title="Evolution"
          color="#202020"  // or "#000000"
        />

        {/* <div
          className="flex items-center w-full space-x-8 h-[180px] rounded-2xl cursor-pointer"
          onClick={() => router.push(ROUTES.EVOLUTION)}
        >
          <div className="flex items-center justify-center">
            <div className="text-[50px] md:text-[180px] text-center font-bold text-black/10">
              {serial}
            </div>
          </div>

          <div className="w-full h-[134px] relative">
            <Image
              src={imageSrc}
              fill
              className="rounded-2x object-cover"
              unoptimized
              alt=""
              loader={() => imageSrc}
            />
            <div className="absolute bottom-0 text-white px-4 pb-4 backdrop:blur space-y-2 w-full">
              <div className="text-2xl md:text-5xl font-bold ">{title}</div>
              <div className="text-base font-bold top-40 ">{subtitle}</div>
            </div>
          </div>
        </div> */}

        <ProjectCard
          imageSrc={`./images/img_3.jpg`}
          route={ROUTES.EMERGENCE}
          serial="03"
          subtitle="Computational Growth of Urban Organism"
          title="Exploration"
          color="#202020"
        />

        <ProjectCard
          imageSrc={`./images/img_2.jpg`}
          route={ROUTES.EMERGENCE}
          serial="04"
          subtitle="Computational Growth of Urban Organism"
          title="Architecture"
          color="#202020"
        />
      </div>
    </div>
  );
};

export default ProjectShowcase;
