import React, { useState } from 'react';

const AboutMe = () => {
  const [isCVVisible, setIsCVVisible] = useState(false);

  // Function to toggle the CV modal visibility
  const toggleCVVisibility = () => {
    setIsCVVisible((prev) => !prev);
  };

  return (
    <div id="about" className="w-full relative h-[500px]">
      <div className="w-full h-full relative">
        {/* Front image with a blur effect on the left side */}
        <div className="relative w-auto h-full">
          <img
            src="/images/about/profile.png"
            className="w-full h-full object-cover object-right "
            alt="Profile"
          />
          {/* Left-side blur overlay */}
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-transparent opacity-40 blur-right"></div>
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
          {/* CV link */}
          <div className="mt-4">
            <button
              className="text-md text-gray-400 hover:underline"
              onClick={toggleCVVisibility}
            >
              View My CV
            </button>
          </div>
        </div>
      </div>

      {/* CV Modal */}
      {isCVVisible && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={toggleCVVisibility} // This closes the modal when clicking outside
        >
          <div
  className="relative max-w-[80%] max-h-[90%] p-4 bg-white rounded-lg overflow-hidden flex justify-center items-center"
  onClick={(e) => e.stopPropagation()} // Prevent event bubbling when clicking inside modal
>
  {/* Image of CV */}
  <img
    src="/images/about/CV - Shohanur Rahman.jpg" // Update with your CV image path
    alt="CV"
    className="object-contain w-[80%] h-[80%]" // Make the image 80% of the parent's size
  />
  {/* Close Button with SVG for the close icon */}
  <button
    className="absolute top-2 right-2 p-2 text-black hover:text-red-500"
    onClick={toggleCVVisibility}
  >
    {/* SVG Close Icon */}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-6 h-6"
    >
      <path d="M6 18L18 6M6 6l12 12" />
    </svg>
  </button>
</div>


        </div>
      )}
    </div>
  );
};

export default AboutMe;
