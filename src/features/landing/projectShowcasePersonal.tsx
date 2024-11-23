import React from 'react';
import { ROUTES } from '@/constants/routes';
import ProjectCard from './projectCard';

const ProjectShowcasePersonal = () => {
  return (
    <div className="bg-white responsive-padding py-6">
      <div className="text-4xl text-black px-4 pt-[40px]">Personal</div>
      <div className="flex flex-col space-y-16 py-8">
        <ProjectCard
          imageSrc={`./images/img_1.jpg`}
          route={ROUTES.ANALOG}
          serial="01"
          subtitle="Computational Growth of Urban Organism"
          title="Analog"
        />
        <ProjectCard
          imageSrc={`./images/img_2.jpg`}
          route={ROUTES.EMERGENCE}
          serial="02"
          subtitle="Computational Growth of Urban Organism"
          title="Tabulature"
        />
        <ProjectCard
          imageSrc={`./images/img_3.jpg`}
          route={ROUTES.EMERGENCE}
          serial="03"
          subtitle="Computational Growth of Urban Organism"
          title="Quiet Quotes"
        />
        <ProjectCard
          imageSrc={`./images/img_2.jpg`}
          route={ROUTES.EMERGENCE}
          serial="04"
          subtitle="Computational Growth of Urban Organism"
          title="Kaleidoscope"
        />
      </div>
    </div>
  );
};

export default ProjectShowcasePersonal;
