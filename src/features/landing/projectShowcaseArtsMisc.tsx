import React from 'react';
import { ROUTES } from '@/constants/routes';
import ProjectCard from './projectCard';

const ProjectShowcaseArtsMisc = () => {
  return (
    <div className="bg-white responsive-padding py-6">
      <div className="text-4xl text-black px-4 pt-[40px]">Arts and Miscellaneous</div>
      <div className="flex flex-col space-y-16 py-8">
        <ProjectCard
          imageSrc={`./images/travelsketches/cover.png`}
          route={ROUTES.TRAVELSKETCHES}
          serial="01"
          subtitle=""
          title="Travel Sketches"
          color="white"
        />
        <ProjectCard
          imageSrc={`./images/photography/cover.png`}
          route={ROUTES.PHOTOGRAPHY}
          serial="02"
          subtitle="of Nature"
          title="Observations"
          color="#202020"
        />
        <ProjectCard
          imageSrc={`./images/tabulature/Cover.png`}
          route={ROUTES.TABULATURE}
          serial="03"
          subtitle="Audio to Guitar Tab Generation"
          title="Interests"
          color="#202020"
        />
      </div>
    </div>
  );
};

export default ProjectShowcaseArtsMisc;
