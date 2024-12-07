import React, { useState } from 'react';

interface ImageGridProps {
  images: string[];
}

const ImageGrid: React.FC<ImageGridProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);

  const openModal = (index: number) => {
    setSelectedImage(images[index]);
    setCurrentIndex(index);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setCurrentIndex(-1);
  };

  const nextImage = () => {
    if (currentIndex < images.length - 1) {
      setSelectedImage(images[currentIndex + 1]);
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevImage = () => {
    if (currentIndex > 0) {
      setSelectedImage(images[currentIndex - 1]);
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="container mx-auto p-4">
      {/* Image Grid */}
      <div className="grid grid-cols-4 gap-2">
        {images.map((image, index) => (
          <div key={index} className="relative cursor-pointer">
            <img
              src={image}
              alt={`Image ${index + 1}`}
              className="w-full h-auto rounded-lg transition-transform transform hover:scale-105"
              onClick={() => openModal(index)}
            />
          </div>
        ))}
      </div>

      {/* Modal for Enlarged Image */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
          <div className="relative">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white bg-gray-700 bg-opacity-50 p-2 rounded-full"
            >
              ✕
            </button>
            {/* Prev Button */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white bg-gray-700 bg-opacity-50 p-3 rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            {/* Next Button */}
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-gray-700 bg-opacity-50 p-3 rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            {/* Enlarged Image */}
            <img
              src={selectedImage}
              alt="Enlarged"
              className="max-w-full max-h-screen object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGrid;
