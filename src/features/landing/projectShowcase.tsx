import React from 'react';
import { ROUTES } from '@/constants/routes';
import ProjectCard from './projectCard';

const ProjectShowcase = () => {
  return (
    <div className="bg-white responsive-padding py-6">
      <div className="text-4xl text-black px-4 pt-[40px]">Academics</div>
      <div className="flex flex-col space-y-16 py-8">
        <ProjectCard
          imageSrc={`./images/img_1.jpg`}
          route={ROUTES.EMERGENCE}
          serial="01"
          subtitle="Computational Growth of Urban Organism"
          title="Emergence"
        />

        <ProjectCard
          imageSrc={`./images/img_2.jpg`}
          route={ROUTES.EMERGENCE}
          serial="02"
          subtitle="Computational Growth of Urban Organism"
          title="Evolution"
        />

        <ProjectCard
          imageSrc={`./images/img_3.jpg`}
          route={ROUTES.EMERGENCE}
          serial="03"
          subtitle="Computational Growth of Urban Organism"
          title="Exploration"
        />

        <ProjectCard
          imageSrc={`./images/img_2.jpg`}
          route={ROUTES.EMERGENCE}
          serial="04"
          subtitle="Computational Growth of Urban Organism"
          title="Architecture"
        />
      </div>
    </div>
  );
};

export default ProjectShowcase;
