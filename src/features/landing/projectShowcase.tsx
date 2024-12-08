import React from 'react';
import { ROUTES } from '@/constants/routes';
import ProjectCard from './projectCard';
import { useRouter } from 'next/navigation';

const ProjectShowcase = () => {

  const router = useRouter();
  return (
    <div className="bg-white responsive-padding py-6">
      <div className="text-4xl text-black px-4 pt-[40px]">Academics</div>
      <div className="flex flex-col space-y-8 py-8">
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
          subtitle="Designing Building Form in Natural System"
          title="Evolution"
          color="#202020"  // or "#000000"
        />




        <ProjectCard
          imageSrc={`./images/exploration/anima.gif`}
          route={ROUTES.EXPLORATION}
          serial="03"
          subtitle="of Parametric Forms"
          title="Exploration"
          color="#202020"
        />

        <ProjectCard
          imageSrc={`./images/architecture/Cover.png`}
          route={ROUTES.ARCHITECTURE}
          serial="04"
          subtitle="Academic Design Projects"
          title="Architecture"
          color="#202020"
        />
      </div>
    </div>
  );
};

export default ProjectShowcase;
