"use client";

import { Phone, Calendar } from "lucide-react";
import ConsultationForm from "./ConsultationForm";
import { useState } from "react";

export default function MobileActionBar() {
  // Define the state variables
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({});

  // Handle form submission
  const handleConsultationSubmit = (data: any) => {
    console.log("Form submitted:", data);
    // Here you would typically send the data to your API
    setShowForm(false); // Close the form after submission
    setFormData({}); // Reset form data
    // You can add a success message or redirect here
  };

  // Handle booking click
  const handleBookNow = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowForm(true);
  };

  return (
    <>
      <div
        className="
          fixed bottom-0 left-0 right-0 z-50
          bg-white border-t shadow-lg
          flex md:hidden
        "
      >
        {/* Call Now */}
        <a
          href="tel:+919380902110"
          className="
            flex-1 flex items-center justify-center gap-2
            py-4 font-semibold text-white
            text-sm
            bg-[#002171]
            hover:bg-[#002171]/90
            active:scale-95 transition
          "
        >
          <Phone className="w-4 h-4" />
          Call Now
        </a>

        {/* Book Now - changed to button for better control */}
        <button
          onClick={handleBookNow}
          className="
            flex-1 flex items-center justify-center gap-2
            py-4 font-semibold
            text-white
            bg-black
            text-sm
            border-l border-gray-200
            active:scale-95 transition
            hover:bg-gray-800
          "
        >
          <Calendar className="w-4 h-4" />
          Book Now
        </button>
      </div>

      {/* Consultation Form Modal */}
      <ConsultationForm 
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        onSubmit={handleConsultationSubmit}
        initialData={formData}
      />
    </>
  );
}