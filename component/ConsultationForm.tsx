"use client";

import React, { useState, useEffect } from "react";
import { FaCalendarCheck } from "react-icons/fa";

const EMPTY_FORM = {
  name: "",
  phone: "",
  email: "",
  area: "",
  location: "",
};

const ConsultationForm = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState(EMPTY_FORM);

  // ✅ Safely hydrate form when modal opens / data changes
  useEffect(() => {
    if (isOpen) {
      setFormData({
        ...EMPTY_FORM,
        ...(initialData || {}),
      });
    }
  }, [isOpen, initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-md w-full p-8 animate-slideUp">
        <div className="flex justify-between items-center mb-2">
          <div className="flex flex-col items-right">
            <h3 className="text-2xl font-bold text-gray-800">
              Book Your Consultation
            </h3>
            <p className="text-gray-600 mt-1">
              Please enter your details below
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl flex items-right"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Your Full Name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mobile Number
            </label>
            <input
              type="tel"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="10-digit mobile number"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="example@gmail.com"
            />
          </div>

          {/* ✅ DROPDOWN FIELD ADDED (Area) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Consultant
            </label>
            <select
              name="area"
              required
              value={formData.area}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
            >
              <option value="">Select Consultant</option>
              <option value="Anna Nagar">Consultation with Assistant Doctor</option>
              <option value="Velachery">Consultation with Dr. Prashantha</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Area / Location 
            </label>
            <input
              type="location"
              name="location"
              required
              value={formData.location}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="example@gmail.com"
            />
          </div>
{/* 
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl">
            <div className="flex items-center gap-3">
              <FaShieldAlt className="text-blue-600 text-xl" />
              <div>
                <div className="font-semibold text-blue-700">
                  0% Interest EMI Available
                </div>
                <div className="text-sm text-blue-600">
                  Flexible payment plans
                </div>
              </div>
            </div>
          </div> */}

          <button
            type="submit"
            className="w-full mt-2 bg-[#002171] hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-6 cursor-pointer rounded-xl text-lg transition-all duration-300 hover:scale-[1.02] shadow-lg"
          >
            <FaCalendarCheck className="inline mr-3" />
            Schedule Appointment
          </button>
        </form>
      </div>
    </div>
  );
};

export default ConsultationForm;
