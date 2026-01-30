import React from 'react';

const NanbaComponent = () => {
  return (
    <div className="bg-gray-50 p-4 sm:p-6 md:p-8">
      {/* Title Section */}
      <div className="text-center mb-3 sm:mb-8">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#002171] mb-2 px-2">
          Featured in Eminent Doctors in South 2023
        </h1>
        <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto px-4">
          A recognition that highlights professional excellence, dedication to patient care, and significant contributions to the medical community.
        </p>
      </div>

      {/* Two Image Sections - Equal Width */}
      <div className="flex flex-col md:flex-row gap-4 sm:gap-6 md:gap-8 max-w-6xl mx-auto">
        
        {/* First Image Section */}
        <div className="md:w-1/2 bg-white rounded-lg sm:rounded-xl shadow-md sm:shadow-lg overflow-hidden">
          <div className="relative h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px]">
            {/* Image with fallback */}
            <img 
              src="/design-12.jpeg" 
              alt="First section" 
              className="w-full h-full object-cover"
             
            />
            {/* Fallback content in case image fails */}
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-800 hidden">
              <div className="text-center p-6">
                <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-white/20 rounded-full mx-auto mb-3 sm:mb-4 flex items-center justify-center">
                  <svg className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-white font-bold text-lg sm:text-xl md:text-2xl">Eminent Doctors Award</h3>
                <p className="text-white/80 text-sm sm:text-base">2023 Recognition</p>
              </div>
            </div>
          </div>
        </div>

        {/* Second Image Section */}
        <div className="md:w-1/2 bg-white rounded-lg sm:rounded-xl shadow-md sm:shadow-lg overflow-hidden">
          <div className="relative h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px]">
            {/* Image with fallback */}
            <img 
              src="/design-13.jpeg" 
              alt="Second section" 
              className="w-full h-full object-cover"
            
            />
            {/* Fallback content in case image fails */}
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-green-600 to-green-800 hidden">
              <div className="text-center p-6">
                <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-white/20 rounded-full mx-auto mb-3 sm:mb-4 flex items-center justify-center">
                  <svg className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-white font-bold text-lg sm:text-xl md:text-2xl">Medical Excellence</h3>
                <p className="text-white/80 text-sm sm:text-base">Professional Recognition</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default NanbaComponent;