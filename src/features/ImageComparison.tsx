import React, { useState, useEffect } from 'react';

interface ImageComparisonProps {
  images: string[]; // Array of image source paths
}

const ImageComparison: React.FC<ImageComparisonProps> = ({ images }) => {
  const [imageDimensions, setImageDimensions] = useState<{ width: number; height: number }[]>([]);

  useEffect(() => {
    const loadImageDimensions = async () => {
      const dimensions = await Promise.all(
        images.map((src) =>
          new Promise<{ width: number; height: number }>((resolve) => {
            const img = new Image();
            img.src = src;
            img.onload = () => {
              resolve({ width: img.naturalWidth, height: img.naturalHeight });
            };
          })
        )
      );
      setImageDimensions(dimensions);
    };

    loadImageDimensions();
  }, [images]);

  if (imageDimensions.length === 0) {
    return <div>Loading...</div>; // Optionally add a loading state
  }

  // Find the smallest height
  const smallestHeight = Math.min(...imageDimensions.map((dim) => dim.height));

  return (
    <div className="flex flex-row w-full gap-4">
      {images.map((src, index) => {
        const aspectRatio = imageDimensions[index].width / imageDimensions[index].height;
        const containerWidth = smallestHeight * aspectRatio;

        return (
          <div
            key={index}
            style={{
              height: `${smallestHeight}px`, // Set the container height equal to the smallest image height
              width: `${containerWidth}px`, // Adjust width to match the aspect ratio
            }}
            className="relative flex items-center justify-center bg-gray-100" // Ensures background fits container size
          >
            <img
              src={src}
              className="w-full h-full object-contain"
              alt={`Image ${index + 1}`}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ImageComparison;
