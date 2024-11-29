import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

const CompareSlider = ({
  beforeImage,
  afterImage,
}: {
  beforeImage: string;
  afterImage: string;
}) => {
  const [sliderPosition, setSliderPosition] = useState(50); // Initial slider position at 50%
  const sliderRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>(0); // Dynamic height

  // Set dynamic height based on width for aspect ratio
  useEffect(() => {
    if (sliderRef.current) {
      setHeight(sliderRef.current.offsetWidth * 0.6); // Adjust the multiplier to change aspect ratio
    }
    const handleResize = () => {
      if (sliderRef.current) {
        setHeight(sliderRef.current.offsetWidth * 0.6);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMouseMove = (event: MouseEvent | TouchEvent) => {
    if (!sliderRef.current) return;

    const sliderRect = sliderRef.current.getBoundingClientRect();
    const offsetX =
      "touches" in event
        ? event.touches[0].clientX - sliderRect.left
        : event.clientX - sliderRect.left;
    const width = sliderRect.width;
    const newSliderPosition = (offsetX / width) * 100;

    // Clamp the slider position between 0% and 100%
    setSliderPosition(Math.min(100, Math.max(0, newSliderPosition)));
  };

  const handleDragStart = () => {
    document.addEventListener("mousemove", handleMouseMove as any);
    document.addEventListener("touchmove", handleMouseMove as any);
    document.addEventListener("mouseup", handleDragEnd);
    document.addEventListener("touchend", handleDragEnd);
  };

  const handleDragEnd = () => {
    document.removeEventListener("mousemove", handleMouseMove as any);
    document.removeEventListener("touchmove", handleMouseMove as any);
    document.removeEventListener("mouseup", handleDragEnd);
    document.removeEventListener("touchend", handleDragEnd);
  };

  return (
    <div
      ref={sliderRef}
      className="relative w-full max-w-4xl mx-auto cursor-ew-resize overflow-hidden"
      style={{ height: `${height}px` }}
      onMouseDown={handleDragStart}
      onTouchStart={handleDragStart}
    >
      {/* Before Image */}
      <Image
        src={beforeImage}
        alt="Before Image"
        layout="fill"
        className="absolute top-0 left-0 h-full w-full object-cover"
        priority
      />

      {/* After Image (Revealed by Slider) */}
      <div
        className="absolute top-0 left-0 h-full overflow-hidden pointer-events-none"
        style={{ width: `${sliderPosition}%` }}
      >
        <Image
          src={afterImage}
          alt="After Image"
          layout="fill"
          className="absolute top-0 left-0 h-full w-full object-cover object-left"
          priority
        />
      </div>

      {/* Slider Line */}
      <div
        className="absolute top-0 h-full bg-blue-600 shadow-lg"
        style={{
          left: `${sliderPosition}%`,
          width: "4px",
          transform: "translateX(-50%)",
        }}
      />

      {/* Handle */}
      <div
        className="absolute z-10 w-6 h-6 bg-white rounded-full border-2 border-blue-600 cursor-pointer shadow-lg"
        style={{
          left: `${sliderPosition}%`,
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      ></div>
    </div>
  );
};

export default CompareSlider;
