import React from 'react';
import { ROUTES } from '@/constants/routes';
import ProjectCard from './projectCard';

const ProjectShowcasePersonal = () => {
  return (
    <div id="more-projects" className="bg-white responsive-padding py-6">
      <div className="text-4xl text-black px-4 pt-[40px]">More Projects</div>
      <div className="flex flex-col space-y-8 py-8">
        <ProjectCard
          imageSrc={`./images/exploration/anima.gif`}
          route={ROUTES.EXPLORATION}
          serial="05"
          subtitle="of Parametric Forms"
          title="Exploration"
          color="#202020"
        />

        <ProjectCard
          imageSrc={`./images/architecture/Cover.png`}
          route={ROUTES.ARCHITECTURE}
          serial="06"
          subtitle="Academic Design Projects"
          title="Architecture"
          color="#202020"
        />

        <ProjectCard
          imageSrc={`./images/kaleidoscope/Cover.gif`}
          route={ROUTES.KALEIDOSCOPE}
          serial="07"
          subtitle="A toy app in OpenGL"
          title="Kaleidoscope"
          color="#202020"
        />

        <ProjectCard
          imageSrc={`./images/tabulature/Cover.png`}
          route={ROUTES.TABULATURE}
          serial="08"
          subtitle="Audio to Guitar Tab Generation"
          title="Tabulature"
          color="#202020"
        />
      </div>
    </div>
  );
};

export default ProjectShowcasePersonal;
