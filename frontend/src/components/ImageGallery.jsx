import { useState } from 'react';
import { RiGalleryView2 } from "react-icons/ri";

const ImageGallery = (props) => {
  const info = props.info;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  return (
    <div className=" bg-gray-50">
      <div className='my-5'>
        <div className="flex md:gap-2 sm:h-120 overflow-hidden shadow-lg">
          {/* Main large image on the left */}
          <div className="flex-1 relative hidden lg:block">
            <img 
              src={info.images[0]} 
              alt="Main property view"
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Grid of smaller images on the right */}
          <div className="flex flex-col gap-2 md:w-full lg:w-120  ">
            {/* Top row */}
            <div className="flex gap-2 h-1/2">
              <div className="flex-1 relative">
                <img 
                  src={info.images[1]} 
                  alt="Property view 2"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 relative">
                <img 
                  src={info.images[2]} 
                  alt="Property view 3"
                  className="w-full h-full object-cover "
                />
              </div>
            </div>
            
            {/* Bottom row */}
            <div className="flex gap-2 h-1/2">
              <div className="flex-1 relative">
                <img 
                  src={info.images[3]} 
                  alt="Property view 4"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 relative">
                <img 
                  src={info.images[4]} 
                  alt="Property view 5"
                  className="w-full h-full object-cover"
                />
                
                {/* Show all photos button overlay */}
                <div className="absolute bottom-3 right-3">
                  <button onClick={() => setIsModalOpen(true)} 
                  className="bg-white px-1 sm:px-3 py-1 sm:py-2 rounded-sm flex items-center gap-2 text-sm text-[#201E1F] hover:text-black">
                    <RiGalleryView2 />
                    <p className='hidden sm:block'>Show all photos</p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Modal for all photos */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center">
            {/* Close button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 text-white hover:text-gray-300 z-10"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* Image counter */}
            <div className="absolute top-6 left-6 text-white text-lg font-medium z-10">
              {currentImageIndex + 1} / {info.images.length}
            </div>
            
            {/* Previous button */}
            {currentImageIndex > 0 && (
              <button
                onClick={() => setCurrentImageIndex(currentImageIndex - 1)}
                className="absolute left-6 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10"
              >
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}
            
            {/* Next button */}
            {currentImageIndex < info.images.length - 1 && (
              <button
                onClick={() => setCurrentImageIndex(currentImageIndex + 1)}
                className="absolute right-6 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10"
              >
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
            
            {/* Main image display */}
            <div className="max-w-5xl max-h-5xl w-full h-full flex items-center justify-center p-16">
              <img
                src={info.images[currentImageIndex]}
                alt={`Property view ${currentImageIndex + 1}`}
                className="max-w-full max-h-full object-contain"
              />
            </div>
            
            {/* Thumbnail strip at bottom */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 bg-black bg-opacity-50 p-3 rounded-lg max-w-4xl overflow-x-auto">
              {info.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`flex-shrink-0 w-16 h-12 rounded overflow-hidden border-2 transition-all ${
                    index === currentImageIndex 
                      ? 'border-white' 
                      : 'border-transparent hover:border-gray-400'
                  }`}
                >
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageGallery;