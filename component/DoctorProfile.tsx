"use client";

import React, { useState, useEffect } from "react";

const DoctorProfile = () => {
  const [mounted, setMounted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex items-center justify-center p-4 md:p-8 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl w-full">
        {/* Stack layout for mobile, grid for desktop */}
        <div className="flex flex-col lg:grid lg:grid-cols-12 max-sm:gap-3 gap-8 md:gap-8">
          {/* Image Section - Comes first on mobile */}
          <div className="lg:col-span-5 flex flex-col order-1 lg:order-2">
            {/* Mobile Header - Only shows on mobile */}
            <div className="lg:hidden text-center max-sm:mb-4 mb-6">
              <h1 className="text-3xl font-bold text-blue-900 max-sm:mb-0 mb-2">
                Dr. Prashantha Kesari
              </h1>
              <p className="text-gray-600">
                Senior Consultant Cosmetic Plastic Surgeon
              </p>
            </div>

            {/* Image Container */}
            <div className="relative w-full h-[320px] sm:h-[350px] md:h-[500px] lg:h-[500px] rounded-xl overflow-hidden shadow-xl">
              <div className="absolute inset-0">
                <img
                  src="/images5.jpeg"
                  alt="Dr. Prashantha Kesari"
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                    target.parentElement!.innerHTML = `
                      <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-800">
                        <div class="text-center p-6">
                          <div class="w-24 h-24 sm:w-32 sm:h-32 bg-white/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                            <svg class="w-16 h-16 sm:w-20 sm:h-20 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <h3 class="text-xl sm:text-2xl font-bold text-white">Dr. Prashantha Kesari</h3>
                          <p class="text-white/80 text-sm sm:text-base">Plastic & Aesthetic Surgeon</p>
                        </div>
                      </div>
                    `;
                  }}
                />
              </div>
            </div>

            {/* Qualification Text */}
            <div className="text-center mt-6">
              <h2 className="text-xl sm:text-2xl md:text-xl font-bold text-blue-900 mb-2">
                Advanced Fellowship in Cosmetic and Laser Surgery
              </h2>
              <p className="text-gray-600 text-sm sm:text-base md:text-base">
                | M.Ch. (Plastic Surgery)
              </p>
            </div>
          </div>

          {/* Content Section - Comes second on mobile */}
          <div className="lg:col-span-7 space-y-4 order-2 lg:order-1">
            {/* Desktop Header - Hidden on mobile */}
            <div className="hidden lg:block text-left">
              <h1 className="text-2xl md:text-4xl font-bold text-blue-900 mb-2">
                Dr. Prashantha Kesari
              </h1>
              <p className="text-gray-600 md:text-lg">
                Senior Consultant Cosmetic Plastic Surgeon
              </p>
            </div>

            {/* Content Paragraphs with Read More/Less for mobile only */}
            <div className="space-y-4 text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed">
              {/* Desktop/Tablet view - Full content */}
              <div className="hidden md:block">
                <p>
                  Dr. Prashantha Kesari is a renowned Plastic and Aesthetic
                  Surgeon with an Advanced Fellowship in Cosmetic and Laser
                  Surgery. He has received extensive training in Plastic Surgery
                  from LTM Medical College (Sion Hospital), one of the best
                  centers for plastic surgery training in India. With over nine
                  years of experience, he has worked alongside leading surgeons,
                  refining his skills and knowledge. Dr. Prashantha Kesari has
                  been consistently meritorious, winning multiple gold medals and
                  awards throughout his career.
                </p>

                <p>
                  His expertise spans cosmetic surgery, laser surgery, and
                  reconstructive procedures. He is known for his artistic
                  approach, blending creativity and precision in every procedure.
                </p>

                <p>
                  Dr. Prashantha Kesari offers personalised care tailored to the
                  unique needs of each patient, ensuring natural-looking,
                  transformative results. His dedication to excellence makes him a
                  trusted name in plastic and aesthetic surgery. He received
                  comprehensive training in Plastic surgery at LTM Medical College
                  which is famous as 'Sion Hospital'. It is widely regarded as the
                  best center for Plastic surgery training in the country.
                </p>

                <p>
                  Department of Plastic Surgery of Sion has the reputation of
                  training many luminaries in the field of plastic Surgery.
                </p>
              </div>

              {/* Mobile view - Collapsible content */}
              <div className="md:hidden">
                <div className={`${isExpanded ? '' : 'line-clamp-8'}`}>
                  <p>
                    Dr. Prashantha Kesari is a renowned Plastic and Aesthetic
                    Surgeon with an Advanced Fellowship in Cosmetic and Laser
                    Surgery. He has received extensive training in Plastic Surgery
                    from LTM Medical College (Sion Hospital), one of the best
                    centers for plastic surgery training in India. With over nine
                    years of experience, he has worked alongside leading surgeons,
                    refining his skills and knowledge. Dr. Prashantha Kesari has
                    been consistently meritorious, winning multiple gold medals and
                    awards throughout his career.
                  </p>

                  <p>
                    His expertise spans cosmetic surgery, laser surgery, and
                    reconstructive procedures. He is known for his artistic
                    approach, blending creativity and precision in every procedure.
                  </p>

                  <p>
                    Dr. Prashantha Kesari offers personalised care tailored to the
                    unique needs of each patient, ensuring natural-looking,
                    transformative results. His dedication to excellence makes him a
                    trusted name in plastic and aesthetic surgery. He received
                    comprehensive training in Plastic surgery at LTM Medical College
                    which is famous as 'Sion Hospital'. It is widely regarded as the
                    best center for Plastic surgery training in the country.
                  </p>

                  <p>
                    Department of Plastic Surgery of Sion has the reputation of
                    training many luminaries in the field of plastic Surgery.
                  </p>
                </div>

                {/* Read More/Less Button - Mobile only */}
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="mt-4 text-blue-600 font-semibold flex items-center gap-1 hover:text-blue-800 transition-colors"
                >
                  {isExpanded ? 'Read Less' : 'Read More'}
                  <svg
                    className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;