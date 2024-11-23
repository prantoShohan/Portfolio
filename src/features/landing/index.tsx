import React from 'react';
import HeroSection from './heroSection';
import ProjectShowcase from './projectShowcase';
import AboutMe from './aboutMe';
import ProjectShowcasePersonal from './projectShowcasePersonal';

const LandingPage = () => {
  return (
    <div className="">
      <HeroSection />
      <ProjectShowcase />
      <ProjectShowcasePersonal />
      <AboutMe />
    </div>
  );
};

export default LandingPage;
