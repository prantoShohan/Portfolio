import React from 'react';
import HeroSection from './heroSection';
import ProjectShowcase from './projectShowcase';
import AboutMe from './aboutMe';
import ProjectShowcasePersonal from './projectShowcasePersonal';
import ProjectShowcaseArtsMisc from './projectShowcaseArtsMisc';
import Footer from '@/layout/footer';

const LandingPage = () => {
  return (
    <div className="">
      <HeroSection />
      <ProjectShowcase />
      <ProjectShowcasePersonal />
      <ProjectShowcaseArtsMisc />
      <AboutMe />
      <Footer />
    </div>
  );
};

export default LandingPage;
