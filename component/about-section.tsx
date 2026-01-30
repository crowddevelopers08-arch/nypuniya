"use client";

import React, { useState } from "react";
import {
  FaCalendarCheck,
  FaUserMd,
} from "react-icons/fa";
import "./RhinoplastyPage.css";
import ConsultationForm from "./ConsultationForm";

const RhinoplastyPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    mobileNo: "",
    email: "",
    consultant: "",
    area: "",
    mentionArea: "",
  });

  const [errors, setErrors] = useState({});

  const consultants = [
    {
      id: "dr_arun",
      name: "Dr. Arun Kumar",
      specialty: "Rhinoplasty Specialist",
    },
    {
      id: "dr_priya",
      name: "Dr. Priya Sharma",
      specialty: "Facial Plastic Surgeon",
    },
    { id: "dr_rohit", name: "Dr. Rohit Singh", specialty: "ENT & Rhinoplasty" },
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.mobileNo.trim()) {
      newErrors.mobileNo = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.mobileNo)) {
      newErrors.mobileNo = "Please enter a valid 10-digit number";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.consultant) {
      newErrors.consultant = "Please select a consultant";
    }

    if (!formData.area.trim()) {
      newErrors.area = "Area/Location is required";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();

    if (Object.keys(formErrors).length === 0) {
      const selectedConsultant = consultants.find(
        (c) => c.id === formData.consultant,
      );
      alert(
        `Thank you, ${formData.fullName}! Your consultation request has been submitted. We will contact you shortly at ${formData.mobileNo} to confirm your appointment with ${selectedConsultant.name}.`,
      );

      // Reset form and close it
      setFormData({
        fullName: "",
        mobileNo: "",
        email: "",
        consultant: "",
        area: "",
        mentionArea: "",
      });
      setShowForm(false);
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <div className="rhinoplasty-container">
      {/* Main Content */}
      <main className="rhinoplasty-main">
        <div className="content-wrapper">
          {/* Introduction Section */}
          <section className="intro-section">
            <div className="section-title">
              <h2>Best Rhinoplasty in Bangalore</h2>
              <div className="title-line"></div>
            </div>

            <div className="intro-content">
              <div className="intro-text">
                <p className="lead-text">
                  At <strong>Nypunya Aesthetics</strong>, we specialize in the
                  delicate art of
                  <span className="highlight"> rhinoplasty</span>, often
                  referred to as a<span className="highlight"> "nose job"</span>{" "}
                  or <span className="highlight">"nose reshaping."</span>
                </p>

                <p className="description-text">
                  This transformative plastic surgery procedure goes beyond mere
                  aesthetics — it's about restoring form, function, and
                  confidence. Our skilled surgeons seamlessly blend science and
                  art, addressing concerns such as removing bumps, refining
                  nostril width, adjusting angles, and correcting injuries or
                  birth defects that impact breathing.
                </p>
              </div>

              <div className="intro-image">
                <div className="image-placeholder">
                  <div className="image-content">
                    {/* <FaUserMd className="placeholder-icon" />
                    <p>Expert Rhinoplasty Care</p> */}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        
        {/* CTA Section */}
        <div className="btns">
          <button
            className="primary-cta-button"
            onClick={() => setShowForm(true)}
          >
            <FaCalendarCheck className="button-icon" />
            <span className="button-text">Schedule Your Consultation</span>
          </button>
        </div>
          <p className="flex justify-center mt-5">–0% Interest EMI Available–</p>

      </main>
      
      <ConsultationForm 
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        onSubmit={handleSubmit}
        initialData={formData}
      />
    </div>
  );
};

export default RhinoplastyPage;