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

  // Scroll to the section when the hash changes or on initial load if hash exists
  useEffect(() => {
    const handleHashChange = () => {
      const targetId = window.location.hash.substring(1); // Get the ID from hash
      if (targetId) {
        const element = document.getElementById(targetId);
        if (element) {
          // Scroll to the element smoothly
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    // Delay the initial scroll if the hash is present
    const initialScroll = setTimeout(() => {
      handleHashChange();
    }, 500); // Delay to ensure elements are rendered

    // Listen for hash change event
    window.addEventListener('hashchange', handleHashChange);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      clearTimeout(initialScroll);
    };
  }, []);

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
          <div id="academic-projects" className="h-[100px]"></div> {/* Make sure this section has a valid ID */}
          <AboutMe />
          <Footer />
        </>
      )}
    </div>
  );
};

export default LandingPage;
