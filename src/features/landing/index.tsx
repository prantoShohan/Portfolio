import React, { useState, useEffect } from 'react';
import HeroSection from './heroSection';
import ProjectShowcase from './projectShowcase';
import AboutMe from './aboutMe';
import ProjectShowcasePersonal from './projectShowcasePersonal';
import ProjectShowcaseArtsMisc from './projectShowcaseArtsMisc';
import Footer from '@/layout/footer';
import Loader from './Loader'; // Import the Loader component

const LandingPage = () => {
  const [isHeroLoaded, setIsHeroLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading for 2 seconds
    const timer = setTimeout(() => {
      setIsHeroLoaded(true); // After 2 seconds, set the hero section as loaded
    }, 2000); // Adjust the delay as needed

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-white">
      {/* Show loader while the page is loading */}
      {!isHeroLoaded && <Loader />}

      {/* Once the HeroSection is loaded, render the content */}
      {isHeroLoaded && (
        <>
          <HeroSection />
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
