'use client'

import React, { useState } from 'react';
import './HeroBanner.css';
import ConsultationForm from './ConsultationForm';

const HeroBanner = () => {
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState<any>(null)

  const handleSubmit = (data: any) => {
    setFormData(data)
    setShowForm(false)
  }

  const handleWhatsAppClick = () => {
    // Replace with your WhatsApp number
    window.open('https://wa.me/+91 93809 02110', '_blank');
  };

  return (
    <>
      <div className="hero-container">
        <div className="hero-content">

          <div className="hero-left">
            <h1 className="hero-headline">
              Achieve Your <span className="underline">Dream Nose</span> in{' '}
              <span className="emphasis">Just 3 Hours</span> with{' '}
              <span className="underline">India's Top Plastic Surgeon</span> – Dr.
              Prashantha Kesari
            </h1>
            {/* Mobile-only video (hidden on desktop) */}
          <div className="mobile-video-container">
            <div className="video-container">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/DdWWzLgA3VQ"
                title="Dr. Prashantha Kesari - Best Rhinoplasty Surgeon"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="youtube-embed"
              ></iframe>
            </div>
          </div>
            <ul className="checklist">
              <li>
                <span className="check-icon"></span>
                Quick and Seamless
              </li>
              <li>
                <span className="check-icon"></span>
                Guaranteed Results
              </li>
              <li>
                <span className="check-icon"></span>
                Natural-Looking Enhancements
              </li>
              <li>
                <span className="check-icon"></span>
                Expert Care
              </li>
            </ul>
          </div>

          <div className="hero-right">
            {/* Desktop-only video (hidden on mobile) */}
            <div className="desktop-video-container">
              <div className="video-container">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/DdWWzLgA3VQ"
                  title="Dr. Prashantha Kesari - Best Rhinoplasty Surgeon"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="youtube-embed"
                ></iframe>
              </div>
            </div>

            <div className="cta-section">
              <button onClick={() => setShowForm(true)} className="book-btn">
                <svg className="calendar-icon" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                    clipRule="evenodd"
                  />
                </svg>
                Book Your Consultation
              </button>
              <p className="emi-text">–0% Interest EMI Available–</p>
            </div>
          </div>
        </div>
      </div>

      <div className="features-bar">
        <div className="feature-badge">
          <div className="badge-icon"></div>
          <div className="badge-text">
            Only the Best
            For You
          </div>
        </div>
        <div className="feature-badge">
          <div className="badge-icon"></div>
          <div className="badge-text">
            Centre Of
            Excellence
          </div>
        </div>
        <div className="feature-badge">
          <div className="badge-icon"></div>
          <div className="badge-text">
            USFDA Approved
            Procedures
          </div>
        </div>
        <div className="feature-badge">
          <div className="badge-icon"></div>
          <div className="badge-text">
            1 Day
            Procedure
          </div>
        </div>
      </div>

      <div className="whatsapp-float" onClick={handleWhatsAppClick}>
        <svg className="whatsapp-icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </div>
      <ConsultationForm 
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        onSubmit={handleSubmit}
        initialData={formData}
      />
    </>
  );
};

export default HeroBanner;