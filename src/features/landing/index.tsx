import React, { useState, useEffect } from 'react';
import HeroSection from './heroSection';
import ProjectShowcase from './projectShowcase';
import AboutMe from './aboutMe';
import ProjectShowcasePersonal from './projectShowcasePersonal';
import ProjectShowcaseArtsMisc from './projectShowcaseArtsMisc';
import Footer from '@/layout/footer';
import Loader from './Loader';
import Header from '@/layout/header';


const LandingPage: React.FC = () => {
  const [isHeroLoaded, setIsHeroLoaded] = useState(false);

  // This function will be passed to HeroSection to notify when the sketch is ready
  const handleHeroSectionLoad = () => {
    setIsHeroLoaded(true); // Update the state when HeroSection has finished loading
  };

  return (
    <div className="bg-white">
      {/* Add another copy of the Header in the LandingPage */}
      <Header />

      <HeroSection onLoad={handleHeroSectionLoad} />
      {/* Show loader while HeroSection is loading */}
      {!isHeroLoaded && <Loader />}

      {/* Once the HeroSection is loaded, render the content */}
      {isHeroLoaded && (
        <>
          <ProjectShowcase />
          <ProjectShowcasePersonal />
          <ProjectShowcaseArtsMisc />
          <div className="h-[100px]"></div>
          <AboutMe />
          <Footer />
        </>
      )}
    </div>
  );
};

export default LandingPage;
