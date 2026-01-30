import React from 'react';
import { Phone, Clock, CheckCircle } from 'lucide-react';

const ThankYouPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            {/* Logo Image */}
            <div className="w-82 h-12 sm:w-110 sm:h-20">
              <img 
                src="/scaled.png" 
                alt="Nypunya Aesthetic Clinic Logo" 
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          <a 
            href="tel:+919380902110"
            className="hidden sm:flex items-center space-x-2 bg-blue-900 text-white px-6 py-3 rounded-full hover:bg-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <Phone className="w-4 h-4" />
            <span className="font-semibold">+91 93809 02110</span>
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center px-4 max-sm:pb-0 py-12">
        <div className="max-w-4xl w-full">
          {/* Success Icon */}
          <div className="flex justify-center max-sm:mb-4 mb-8 animate-bounce-slow">
            <div className="relative">
              <div className="absolute inset-0 bg-green-400 rounded-full blur-2xl opacity-30 animate-pulse"></div>
              <CheckCircle className="w-14 h-14 text-green-500 relative" strokeWidth={1.5} />
            </div>
          </div>

          {/* Thank You Message */}
          <div className="text-center space-y-4 max-sm:mb-2 mb-8">
            <h2 className="text-2xl sm:text-4xl lg:text-4xl font-bold text-gray-800 leading-tight max-sm:mb-1">
              Thank You for Reaching Out to Us!
            </h2>
            <p className="text-lg sm:text-2xl text-gray-600 font-light">
              Your inquiry has been successfully received.
            </p>
          </div>

          {/* Info Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Response Time Card */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-blue-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 rounded-full p-3 flex-shrink-0">
                  <Clock className="w-6 h-6 text-blue-900" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-800 mb-2">Quick Response</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Our expert team will review your details and reach out within <span className="font-bold text-blue-900">24 working hours</span> to assist you with your concerns or schedule your consultation.
                  </p>
                </div>
              </div>
            </div>

            {/* Urgent Assistance Card */}
            <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-2xl shadow-xl p-8 text-white hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-start space-x-4">
                <div className="bg-white/20 rounded-full p-3 flex-shrink-0">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Need Urgent Assistance?</h3>
                  <p className="text-blue-100 leading-relaxed mb-4">
                    If you need immediate help, feel free to call us directly.
                  </p>
                  <a 
                    href="tel:+919380902110"
                    className="inline-flex items-center space-x-2 bg-white text-blue-900 px-6 py-3 rounded-full font-bold hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <Phone className="w-4 h-4" />
                    <span>+91 93809 02110</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Message */}
          <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl p-8 text-center border border-rose-100">
            <p className="text-gray-700 text-lg leading-relaxed">
              We appreciate your interest in Nypunya Aesthetic Clinic. Our dedicated team is committed to providing you with the best aesthetic care and personalized service.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-blue-950 text-white max-sm:py-4 py-8 max-sm:mt-4 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3">
            <p className="text-sm text-blue-200">
              Copyright © 2025 Nypunya Aesthetics | Powered by Grow Medico | This site is not a part of the Facebook website or Facebook Inc. Additionally, This site is NOT endorsed by Facebook in any way. FACEBOOK is a trademark of FACEBOOK, Inc.
            </p>
            <a 
              href="/privacy-policy" 
              className="text-blue-300 hover:text-white transition-colors duration-200 text-sm font-medium underline underline-offset-4"
            >
              Privacy Policy
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ThankYouPage;