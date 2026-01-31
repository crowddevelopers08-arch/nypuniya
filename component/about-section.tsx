"use client";

import React, { useState } from "react";
import {
  FaCalendarCheck,
  FaUserMd,
} from "react-icons/fa";
import "./RhinoplastyPage.css";
import ConsultationForm from "./ConsultationForm";

// Define types for form data
interface FormData {
  name: string;
  phone: string;
  email: string;
  area: string;
  location: string;
}

// Define types for errors
interface FormErrors {
  fullName?: string;
  mobileNo?: string;
  email?: string;
  consultant?: string;
  area?: string;
  mentionArea?: string;
}

const RhinoplastyPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    area: "",
    location: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

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

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.phone.trim()) {
      newErrors.mobileNo = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.mobileNo = "Please enter a valid 10-digit number";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.area.trim()) {
      newErrors.consultant = "Please select a consultant";
    }

    if (!formData.location.trim()) {
      newErrors.area = "Area/Location is required";
    }

    return newErrors;
  };

  // Handler for ConsultationForm
  const handleConsultationSubmit = (data: FormData) => {
    // Update local form data with submitted data
    setFormData(data);
    
    // Validate the form
    const formErrors = validateForm();

    if (Object.keys(formErrors).length === 0) {
      // Map the area field to consultant name for the alert
      let consultantName = "";
      if (data.area === "Anna Nagar") {
        consultantName = "Assistant Doctor";
      } else if (data.area === "Velachery") {
        consultantName = "Dr. Prashantha";
      }
      
      alert(
        `Thank you, ${data.name}! Your consultation request has been submitted. We will contact you shortly at ${data.phone} to confirm your appointment with ${consultantName}.`,
      );

      // Reset form and close it
      setFormData({
        name: "",
        phone: "",
        email: "",
        area: "",
        location: "",
      });
      setErrors({});
      setShowForm(false);
    } else {
      setErrors(formErrors);
      // Keep form open to show errors
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
              {/* Desktop version - shows text on left, image on right */}
              <div className="intro-text desktop-text">
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

              {/* Mobile version - image comes after lead text */}
              <div className="intro-text mobile-text">
                <div className="lead-text-container">
                  <p className="lead-text">
                    At <strong>Nypunya Aesthetics</strong>, we specialize in the
                    delicate art of
                    <span className="highlight"> rhinoplasty</span>, often
                    referred to as a<span className="highlight"> "nose job"</span>{" "}
                    or <span className="highlight">"nose reshaping."</span>
                  </p>
                </div>
              </div>

              <div className="intro-image">
                <div className="image-placeholder">
                  <div className="image-content">
                    {/* <FaUserMd className="placeholder-icon" />
                    <p>Expert Rhinoplasty Care</p> */}
                  </div>
                </div>
              </div>

              {/* Mobile version - description comes after image */}
              <div className="intro-text mobile-text">
                <p className="description-text">
                  This transformative plastic surgery procedure goes beyond mere
                  aesthetics — it's about restoring form, function, and
                  confidence. Our skilled surgeons seamlessly blend science and
                  art, addressing concerns such as removing bumps, refining
                  nostril width, adjusting angles, and correcting injuries or
                  birth defects that impact breathing.
                </p>
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
        onSubmit={handleConsultationSubmit}
        initialData={formData}
      />
    </div>
  );
};

export default RhinoplastyPage;