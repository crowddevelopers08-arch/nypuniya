"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const RealPatientResults = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const images = [
    { id: "1", url: "/images1.png", alt: "Patient transformation result 1" },
    { id: "2", url: "/images2.png", alt: "Patient transformation result 2" },
    { id: "3", url: "/images.png", alt: "Patient transformation result 3" },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToSlide = (index : number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="bg-gray-50 py-8 sm:py-10 md:py-12 px-4 sm:px-6">
      {/* Title */}
      <div className="text-center mb-4 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#002171] mb-0 sm:mb-3 px-2">
          Real Patient Real Result
        </h1>
        <p className="text-gray-600 text-base sm:text-lg md:text-lg">
          See the difference for yourself
        </p>
      </div>

      {/* Mobile Carousel (only on small screens) */}
      <div className="md:hidden max-w-4xl mx-auto">
        <div className="relative bg-white rounded-2xl shadow-lg p-4">
          {/* Carousel Container */}
          <div className="relative w-full h-[210px] sm:h-[350px] overflow-hidden rounded-xl">
            <div
              className="flex transition-transform duration-300 ease-in-out h-full"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {images.map((image) => (
                <div
                  key={image.id}
                  className="w-full flex-shrink-0 h-full"
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={image.url}
                      alt={image.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 80vw, 50vw"
                      onError={(e) => {
                        // Fallback if image fails to load
                        const target = e.target as HTMLImageElement;
                        target.style.display = "none";
                        target.parentElement!.innerHTML = `
                          <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200">
                            <div class="text-center p-6">
                              <div class="w-20 h-20 sm:w-24 sm:h-24 bg-white/30 rounded-full mx-auto mb-4 flex items-center justify-center">
                                <svg class="w-10 h-10 sm:w-12 sm:h-12 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                </svg>
                              </div>
                              <p class="text-blue-800 font-medium">Patient Result</p>
                              <p class="text-blue-600 text-sm">Transformation</p>
                            </div>
                          </div>
                        `;
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-[-10] top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-200 z-10"
            aria-label="Previous image"
          >
            <FaChevronLeft className="text-blue-700" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-[-10] top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-200 z-10"
            aria-label="Next image"
          >
            <FaChevronRight className="text-blue-700" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-4">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === currentSlide
                    ? "bg-[002171] w-6"
                    : "bg-blue-200"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Desktop Grid (hidden on mobile) */}
      <div className="hidden md:block max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {images.map((image) => (
            <div
              key={image.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-4 sm:p-5 lg:p-6"
            >
              <div className="relative w-full h-[260px] sm:h-[280px] md:h-[300px] lg:h-[320px]">
                <Image
                  src={image.url}
                  alt={image.alt}
                  fill
                  className="object-cover rounded-xl"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 400px"
                  onError={(e) => {
                    // Fallback if image fails to load
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                    target.parentElement!.innerHTML = `
                      <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl">
                        <div class="text-center p-6">
                          <div class="w-24 h-24 bg-white/30 rounded-full mx-auto mb-4 flex items-center justify-center">
                            <svg class="w-12 h-12 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <p class="text-blue-800 font-medium">Patient Result</p>
                          <p class="text-blue-600 text-sm">Transformation</p>
                        </div>
                      </div>
                    `;
                  }}
                />
              </div>
              {/* Optional: Add caption or description */}
              <div className="text-center mt-4">
                <p className="text-gray-600 text-sm sm:text-base">Patient Result</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RealPatientResults;