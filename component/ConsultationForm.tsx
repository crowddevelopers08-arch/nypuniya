// components/ConsultationForm.tsx - Complete updated component with router

"use client";

import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { FaCalendarCheck } from "react-icons/fa";
import { useRouter } from "next/navigation"; // Import useRouter

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
  onSubmit?: (formData: FormData) => void;
  initialData?: Partial<FormData>;
  pageUrl?: string;
  referrerUrl?: string;
  redirectPath?: string; // Optional custom redirect path
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
  onSubmit: externalOnSubmit,
  initialData,
  pageUrl,
  referrerUrl,
  redirectPath = "/thank-you" // Default thank-you page path
}: ConsultationFormProps) => {
  const [formData, setFormData] = useState<FormData>(EMPTY_FORM);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const router = useRouter(); // Initialize router

  useEffect(() => {
    if (isOpen) {
      setFormData({
        ...EMPTY_FORM,
        ...(initialData || {}),
      });
      setError(null);
    }
  }, [isOpen, initialData]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.email || !formData.area || !formData.location) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const leadData = {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        area: formData.area,
        location: formData.location,
        formName: "nypuniya-form",
        source: "Website",
        consent: true,
        message: `Consultation appointment requested with ${formData.area} from ${formData.location}`,
        pageUrl: pageUrl || (typeof window !== 'undefined' ? window.location.href : ''),
        referrerUrl: referrerUrl || (typeof document !== 'undefined' ? document.referrer : null),
      };
      
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(leadData),
      });
      
      const result = await response.json();
      
      if (result.success) {
        console.log('Lead submitted successfully:', result);
        
        // Call external onSubmit if provided
        if (externalOnSubmit) {
          externalOnSubmit(formData);
        }
        
        // Close the modal first
        onClose();
        
        // Redirect to thank-you page using Next.js router (no page reload)
        router.push(redirectPath);
        
        // Alternative: Use window.location if you prefer full page reload
        // window.location.href = redirectPath;
        
      } else {
        setError(result.details || 'Failed to submit. Please try again.');
        setLoading(false);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setError('Network error. Please check your connection and try again.');
      setLoading(false);
    }
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
            <p className="text-gray-600 text-sm sm:text-base">
              Please enter your details below
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl sm:text-2xl md:text-3xl"
            type="button"
            aria-label="Close"
            disabled={loading}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-1 sm:space-y-2">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-lg text-sm">
              {error}
            </div>
          )}
          
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
              disabled={loading}
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
              disabled={loading}
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
              disabled={loading}
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
              disabled={loading}
            >
              <option value="">Select Consultant</option>
              <option value="Consultation with Assistant Doctor">Consultation with Assistant Doctor</option>
              <option value="Consultation with Dr. Prashantha">Consultation with Dr. Prashantha</option>
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
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 sm:mt-6 bg-[#002171] hover:bg-blue-900 text-white font-semibold sm:font-bold py-3 sm:py-4 px-4 sm:px-6 cursor-pointer rounded-lg sm:rounded-xl text-base sm:text-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              <>
                <FaCalendarCheck className="inline mr-2 sm:mr-3 w-4 h-4 sm:w-5 sm:h-5" />
                Schedule Appointment
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ConsultationForm;