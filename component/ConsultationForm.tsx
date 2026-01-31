"use client";

import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { FaCalendarCheck } from "react-icons/fa";

// Define types
interface FormData {
  name: string;
  phone: string;
  email: string;
  area: string;
  location: string;
}

interface ConsultationFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: FormData) => void;
  initialData?: Partial<FormData>;
}

const EMPTY_FORM: FormData = {
  name: "",
  phone: "",
  email: "",
  area: "",
  location: "",
};

const ConsultationForm = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  initialData 
}: ConsultationFormProps) => {
  const [formData, setFormData] = useState<FormData>(EMPTY_FORM);

  // ✅ Safely hydrate form when modal opens / data changes
  useEffect(() => {
    if (isOpen) {
      setFormData({
        ...EMPTY_FORM,
        ...(initialData || {}),
      });
    }
  }, [isOpen, initialData]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 z-50 animate-fadeIn">
      <div className="bg-white rounded-xl sm:rounded-2xl max-w-xs xs:max-w-sm sm:max-w-md md:max-w-lg w-full p-4 sm:p-6 md:p-8 animate-slideUp">
        <div className="flex justify-between items-center mb-4 sm:mb-2">
          <div className="flex flex-col">
            <h3 className="text-xl sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-0">
              Book Your Consultation
            </h3>
            <p className="text-gray-600  text-sm sm:text-base">
              Please enter your details below
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl sm:text-2xl md:text-3xl"
            type="button"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-1 sm:space-y-2">
          <div>
            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1 sm:mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2.5 sm:px-4 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm sm:text-base"
              placeholder="Your Full Name"
            />
          </div>

          <div>
            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1 sm:mb-2">
              Mobile Number
            </label>
            <input
              type="tel"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-3 py-2.5 sm:px-4 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm sm:text-base"
              placeholder="10-digit mobile number"
              pattern="[0-9]{10}"
              maxLength={10}
            />
          </div>

          <div>
            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1 sm:mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2.5 sm:px-4 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm sm:text-base"
              placeholder="example@gmail.com"
            />
          </div>

          <div>
            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1 sm:mb-2">
              Select Consultant
            </label>
            <select
              name="area"
              required
              value={formData.area}
              onChange={handleChange}
              className="w-full px-3 py-2.5 sm:px-4 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white text-sm sm:text-base"
            >
              <option value="">Select Consultant</option>
              <option value="Anna Nagar">Consultation with Assistant Doctor</option>
              <option value="Velachery">Consultation with Dr. Prashantha</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1 sm:mb-2">
              Area / Location 
            </label>
            <input
              type="text"
              name="location"
              required
              value={formData.location}
              onChange={handleChange}
              className="w-full px-3 py-2.5 sm:px-4 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm sm:text-base"
              placeholder="Enter your location"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-4 sm:mt-6 bg-[#002171] hover:bg-blue-900 text-white font-semibold sm:font-bold py-3 sm:py-4 px-4 sm:px-6 cursor-pointer rounded-lg sm:rounded-xl text-base sm:text-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
          >
            <FaCalendarCheck className="inline mr-2 sm:mr-3 w-4 h-4 sm:w-5 sm:h-5" />
            Schedule Appointment
          </button>
        </form>
      </div>
    </div>
  );
};

export default ConsultationForm;