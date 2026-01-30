"use client";

import React, { useState } from "react";
import { FaHeart, FaCalendarCheck, FaChevronRight, FaShieldAlt } from "react-icons/fa";
import ConsultationForm from "./ConsultationForm";
import FooterAlternative from "./endfooter";

const NypunyaAesthetics = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    area: "",
    location: ""
  });

  const handleSubmit = (data) => {
    console.log("Form submitted:", data);
    setFormData({ name: "", phone: "", email: "", area: "", location: "" });
    setShowForm(false);
    alert("Thank you! We'll contact you shortly to schedule your consultation.");
  };

  return (
    <div className="bg-white">
      {/* Main Content */}
      <main className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-8">
        {/* CTA Section */}
        <div className="bguse rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-12 text-white relative overflow-hidden">
          {/* Background Decorations */}
          <div className="absolute top-0 right-0 w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-64 lg:h-64 bg-white/5 rounded-full -translate-y-16 translate-x-16 sm:-translate-y-20 sm:translate-x-20 md:-translate-y-24 md:translate-x-24 lg:-translate-y-32 lg:translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-64 lg:h-64 bg-white/5 rounded-full translate-y-16 -translate-x-16 sm:translate-y-20 sm:-translate-x-20 md:translate-y-24 md:-translate-x-24 lg:translate-y-32 lg:-translate-x-32"></div>
          
          <div className="relative z-10 max-w-3xl mx-auto text-center px-2 sm:px-4">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-full mb-4 sm:mb-6">
              <FaHeart className="text-rose-300 text-sm sm:text-base" />
              <span className="text-xs sm:text-sm font-semibold">Limited Time Offer</span>
            </div>
            
            {/* Main Heading */}
            <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 px-2">
              Ready to Begin Your Transformation Journey?
            </h3>
            
            {/* Description */}
            <p className="text-blue-100 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto px-2 sm:px-0">
              Take the first step towards enhanced confidence and natural beauty. Our expert surgeons are ready to guide you through every step of your rhinoplasty journey.
            </p>
            
            {/* CTA Buttons and Info */}
            <div className="flex flex-col gap-4 sm:gap-6 justify-center items-center">
              {/* Main Button */}
              <button 
                onClick={() => setShowForm(true)}
                className="group bg-white text-blue-900 hover:bg-blue-50 font-bold py-3 px-6 sm:py-4 sm:px-8 rounded-full text-sm sm:text-base md:text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-lg inline-flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-center"
              >
                <FaCalendarCheck className="text-lg sm:text-xl" />
                <span>Book Your Consultation</span>
                <FaChevronRight className="group-hover:translate-x-1 sm:group-hover:translate-x-2 transition-transform text-sm sm:text-base" />
              </button>
              
              {/* Payment Info */}
              <div className="text-center">
                <div className="text-xs sm:text-sm text-cyan-300 font-semibold mb-1 inline-flex items-center gap-1 sm:gap-2">
                  <FaShieldAlt className="text-xs sm:text-sm" />
                  0% Interest EMI Available
                </div>
                <div className="text-xs sm:text-sm text-blue-200">
                  Flexible payment options | Guaranteed results
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Consultation Form Modal */}
      <ConsultationForm 
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        onSubmit={handleSubmit}
        initialData={formData}
      />
      
      {/* Footer */}
      <FooterAlternative />
    </div>
  );
};

export default NypunyaAesthetics;