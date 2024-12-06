import React from 'react';
import { ROUTES } from '@/constants/routes';
import ProjectCard from './projectCard';

const ProjectShowcasePersonal = () => {
  return (
    <div className="bg-white responsive-padding py-6">
      <div className="text-4xl text-black px-4 pt-[40px]">Personal</div>
      <div className="flex flex-col space-y-16 py-8">
        <ProjectCard
          imageSrc={`./images/analog/cover.png`}
          route={ROUTES.ANALOG}
          serial="01"
          subtitle="Computational Growth of Urban Organism"
          title="Analog"
          color="white"
        />
        <ProjectCard
          imageSrc={`./images/kaleidoscope/Cover.gif`}
          route={ROUTES.KALEIDOSCOPE}
          serial="02"
          subtitle="A toy app in OpenGL"
          title="Kaleidoscope"
          color="#202020"
        />
        <ProjectCard
          imageSrc={`./images/tabulature/Cover.png`}
          route={ROUTES.TABULATURE}
          serial="03"
          subtitle="Audio to Guitar Tab Generation"
          title="Tabulature"
          color="#202020"
        />
        <ProjectCard
          imageSrc={`./images/img_2.jpg`}
          route={ROUTES.QUOTES}
          serial="04"
          subtitle="Computational Growth of Urban Organism"
          title="Quiet Quotes"
          color="white"
        />
      </div>
    </div>
  );
};

export default ProjectShowcasePersonal;
