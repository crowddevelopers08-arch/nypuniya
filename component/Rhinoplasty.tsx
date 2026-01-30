"use client";

import React, { useState } from "react";
import {
  FaCalendarCheck,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import ConsultationForm from "./ConsultationForm";

// Define FormData interface (you should have this in a shared types file)
interface FormData {
  name: string;
  phone: string;
  email: string;
  area: string;
  location: string;
}

const RhinoplastyBenefits = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    area: "",
    location: ""
  });
  const [currentSlide, setCurrentSlide] = useState(0);

  // Define onSubmit handler for ConsultationForm
  const handleSubmit = (data: FormData) => {
    console.log("Form submitted:", data);
    // Handle form submission logic here
    setFormData({ name: "", phone: "", email: "", area: "", location: "" });
    setShowForm(false);
    alert("Thank you! We'll contact you shortly to schedule your consultation.");
  };

  const benefits = [
    {
      icon: (
        <img
          src="/image1.png"
          alt="Enhanced Facial Harmony"
          className="w-8 h-8 object-contain"
        />
      ),
      title: "Enhanced Facial Harmony",
      description:
        "Experience a newfound balance and proportion in your facial features. Rhinoplasty seamlessly aligns your nose with the contours of your face, creating a harmonious aesthetic that accentuates your unique beauty.",
    },
    {
      icon: (
        <img
          src="/image2.png"
          alt="Enhanced Facial Harmony"
          className="w-8 h-8 object-contain"
        />
      ),
      title: "Improved Breathing",
      description:
        "Breathe easy with rhinoplasty! Beyond aesthetics, our procedures address functional concerns, ensuring optimal nasal airflow and potentially alleviating breathing difficulties for a breath of fresh air in every sense.",
    },
    {
      icon: (
        <img
          src="/image3.png"
          alt="Enhanced Facial Harmony"
          className="w-8 h-8 object-contain"
        />
      ),
      title: "Long-Lasting Results",
      description:
        "Embrace enduring beauty! While the recovery period is a small chapter, the results are a lifelong narrative. Rhinoplasty offers lasting transformation, providing you with the timeless elegance you deserve.",
    },
    {
      icon: (
        <img
          src="/image4.png"
          alt="Enhanced Facial Harmony"
          className="w-8 h-8 object-contain"
        />
      ),
      title: "Personalized Aesthetics",
      description:
        "Your vision, our expertise. Rhinoplasty is a personalized journey, allowing you to sculpt your ideal nose. From refining the tip to balancing proportions, our surgeons tailor each procedure to your unique desires.",
    },
    {
      icon: (
        <img
          src="/image5.png"
          alt="Enhanced Facial Harmony"
          className="w-8 h-8 object-contain"
        />
      ),
      title: "Rejuvenation and Aging",
      description:
        "Turn back the clock gracefully. Rhinoplasty, as part of facial rejuvenation, rejuvenates the nose's appearance, countering the effects of aging and contributing to a more youthful and refreshed look.",
    },
    {
      icon: (
        <img
          src="/image6.png"
          alt="Enhanced Facial Harmony"
          className="w-8 h-8 object-contain"
        />
      ),
      title: "Correcting Nasal Deformities",
      description:
        "Bid farewell to nasal irregularities. Whether it's a hump on the bridge, a drooping tip, or asymmetry, rhinoplasty is the key to addressing deformities and unveiling a symmetrical, pleasing nasal appearance.",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % benefits.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + benefits.length) % benefits.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white font-sans">
      {/* Benefits Section */}
      <main className="container mx-auto px-4 py-4 md:py-12">
        <div className="text-center mb-4 md:mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full mb-3">
            <span className="text-sm font-semibold text-blue-700">
              Why Choose Our Rhinoplasty
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold max-sm:mb-2 mb-4 text-blue-900 px-2">
            Benefits of Rhinoplasty at Nypunya Aesthetics
          </h2>
          <p className="text-gray-600 text-sm sm:text-base md:text-md max-w-2xl mx-auto px-4">
            Each benefit is carefully crafted to enhance both form and function,
            giving you the confidence you deserve.
          </p>
        </div>

        {/* Mobile Carousel (only on small screens) */}
        <div className="md:hidden">
          <div className="relative overflow-hidden rounded-2xl bg-white border border-blue-100">
            {/* Carousel Container */}
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="w-full flex-shrink-0 p-6"
                >
                  <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center mb-5 shadow-md mx-auto">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-blue-900 text-center">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm text-center">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-[-4] top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-200"
              aria-label="Previous benefit"
            >
              <FaChevronLeft className="text-blue-900" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-[-4] top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-200"
              aria-label="Next benefit"
            >
              <FaChevronRight className="text-blue-900" />
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-6 max-sm:mt-0 pb-4">
              {benefits.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    index === currentSlide
                      ? "bg-blue-900 w-6"
                      : "bg-blue-200"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Desktop Grid (hidden on mobile) */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group relative bg-white border border-blue-100 rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl overflow-hidden"
            >
              <div className="relative z-10 w-14 h-14 rounded-xl bg-white flex items-center justify-center mb-5 shadow-md">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-blue-900">
                {benefit.title}
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                {benefit.description}
              </p>
              <div className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full bg-blue-900 transition-all duration-500"></div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-8 md:mt-10">
          <button
            className="inline-flex items-center gap-3 bg-blue-900 hover:bg-blue-800 text-white font-semibold py-3 px-6 sm:py-4 sm:px-8 rounded-full transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
            onClick={() => setShowForm(true)}
          >
            <FaCalendarCheck className="text-lg" />
            <span className="text-sm sm:text-base">
              Schedule Your Consultation
            </span>
          </button>
        </div>
        <p className="flex justify-center mt-5">–0% Interest EMI Available–</p>
      </main>

      {/* ConsultationForm with all required props */}
      <ConsultationForm
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        onSubmit={handleSubmit}
        initialData={formData}
      />
    </div>
  );
};

export default RhinoplastyBenefits;