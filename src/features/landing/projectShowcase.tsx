import React from 'react';
import { ROUTES } from '@/constants/routes';
import ProjectCard from './projectCard';
import { useRouter } from 'next/navigation';

const ProjectShowcase = () => {
  const router = useRouter();
  return (
    <div id="featured-projects" className="bg-white responsive-padding py-6">
      <div className="text-4xl text-black px-4 pt-[40px]">Featured Projects</div>
      <div className="flex flex-col space-y-8 py-8">
        <ProjectCard
          imageSrc={`./images/forest/cover.gif`}
          route={ROUTES.FOREST}
          serial="01"
          subtitle="A Grasshopper Plugin for Urban Growth Exploration"
          title="Forest"
          color="text-white"
        />

        <ProjectCard
          imageSrc={`./images/emergence/Cover animation.gif`}
          route={ROUTES.EMERGENCE}
          serial="02"
          subtitle="Computational Growth of Urban Organism"
          title="Emergence"
          color="text-white"
        />

        <ProjectCard
          imageSrc={`./images/analog/cover.gif`}
          route={ROUTES.ANALOG}
          serial="03"
          subtitle="Modular Synthesizer from Scratch"
          title="Analog"
          color="white"
        />

        <ProjectCard
          imageSrc={`/images/evolution/cover.gif`}
          route={ROUTES.EVOLUTION}
          serial="04"
          subtitle="Designing Building Form in Natural System"
          title="Evolution"
          color="#202020"
        />
      </div>
    </div>
  );
};

export default ProjectShowcase;
