import React from 'react';

const AboutMe = () => {
  return (
    <div id="about-me" className="w-full relative h-[500px]">
      {/* Background image with custom blur level */}
      {/* <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(/images/about/profile.png)',
          filter: 'blur(5px)',  // Custom blur level for the background
        }}
      ></div> */}

      <div className="w-full h-full relative">
        {/* Front image with a blur effect on the left side */}
        <div className="relative w-auto h-full">
          <img
            src="/images/about/profile.png"
            className="w-full h-full object-cover object-right "
            alt="Profile"
          />
          {/* Left-side blur overlay */}
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-transparent  opacity-40 blur-right"></div>
        </div>

        {/* Text Container - Positioned at the left middle of the image */}
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white responsive-padding">
          <div className="text-6xl font-bold">About</div>
          <p className="text-xl">Shohanur Rahman Pranto</p>
          <div className="max-w-[400px] italic text-[12px]">
            I am fascinated by design of Nature and Computational approaches to
            Architecture and Urban Design. I study organisms and explore the
            emergent behavior with creative coding. I am curious, learn fast and
            want to further my understanding of Nature, Computation and Human
            Sustainability.
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
