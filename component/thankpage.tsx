import React from 'react';
import { Phone, Clock, CheckCircle, ArrowLeft } from 'lucide-react';

const ThankYouPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Logo Image - Responsive sizing */}
            <div className="max-sm:w-74 h-18 sm:w-32 sm:h-20 md:w-40 md:h-22 lg:w-110 lg:h-19">
              <img 
                src="/scaled.png" 
                alt="Nypunya Aesthetic Clinic Logo" 
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          <a 
            href="tel:+919380902110"
            className="hidden md:inline-flex items-center space-x-2 bg-blue-900 text-white px-3 py-2 sm:px-4 sm:py-2 md:px-6 md:py-3 rounded-full hover:bg-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm sm:text-base"
          >
            <Phone className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="font-semibold">+91 93809 02110</span>
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center px-4 py-4 sm:py-8">
        <div className="max-w-4xl w-full">
          {/* Success Icon */}
          <div className="flex justify-center mb-2 sm:mb-6 md:mb-4 animate-bounce-slow">
            <div className="relative">
              <div className="absolute inset-0 bg-green-400 rounded-full blur-2xl opacity-30 animate-pulse"></div>
              <CheckCircle className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-green-500 relative" strokeWidth={1.5} />
            </div>
          </div>

          {/* Thank You Message */}
          <div className="text-center space-y-1 sm:space-y-3 md:space-y-2 mb-3 sm:mb-5">
            <h2 className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 leading-tight px-2">
              Thank You for Reaching Out to Us!
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-xl text-gray-600 font-light px-2 sm:px-0">
              Your inquiry has been successfully received.
            </p>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {/* Response Time Card */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl p-4 sm:p-6 md:p-8 border border-blue-100 hover:shadow-xl sm:hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5 sm:hover:-translate-y-1">
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="bg-blue-100 rounded-full p-2 sm:p-3 flex-shrink-0">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-blue-900" />
                </div>
                <div>
                  <h3 className="font-bold text-base sm:text-lg md:text-xl text-gray-800 mb-1 sm:mb-2">Quick Response</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    Our expert team will review your details and reach out within <span className="font-bold text-blue-900">24 working hours</span> to assist you with your concerns or schedule your consultation.
                  </p>
                </div>
              </div>
            </div>

            {/* Urgent Assistance Card */}
            <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl p-4 sm:p-6 md:p-8 text-white hover:shadow-xl sm:hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5 sm:hover:-translate-y-1">
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="bg-white/20 rounded-full p-2 sm:p-3 flex-shrink-0">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-base sm:text-lg md:text-xl mb-1 sm:mb-2">Need Urgent Assistance?</h3>
                  <p className="text-blue-100 text-sm sm:text-base leading-relaxed mb-3 sm:mb-4">
                    If you need immediate help, feel free to call us directly.
                  </p>
                  <a 
                    href="tel:+919380902110"
                    className="inline-flex items-center space-x-2 bg-white text-blue-900 px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 rounded-full font-bold hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base"
                  >
                    <Phone className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>+91 93809 02110</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Message */}
          <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 text-center border border-rose-100 mb-6 sm:mb-8">
            <p className="text-gray-700 text-sm sm:text-base md:text-md leading-relaxed">
              We appreciate your interest in Nypunya Aesthetic Clinic. Our dedicated team is committed to providing you with the best aesthetic care and personalized service.
            </p>
          </div>

          {/* Back to Home Button */}
          <div className="text-center">
            <a 
              href="/"
              className="inline-flex items-center space-x-2 sm:space-x-3 bg-blue-950 text-white px-5 py-3 sm:px-6 sm:py-3.5 md:px-8 md:py-4 rounded-full hover:from-blue-800 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl sm:hover:shadow-2xl transform hover:-translate-y-0.5 sm:hover:-translate-y-1 text-sm sm:text-base md:text-lg"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="font-bold">Back to Home</span>
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-blue-950 text-white py-4 sm:py-6 md:py-8 mt-2 max-sm:mb-10 md:mt-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-0 sm:space-y-3">
            <p className="text-xs sm:text-sm text-blue-200 px-2">
              Copyright © 2025 Nypunya Aesthetics | Powered by Grow Medico | This site is not a part of the Facebook website or Facebook Inc. Additionally, This site is NOT endorsed by Facebook in any way. FACEBOOK is a trademark of FACEBOOK, Inc.
            </p>
            <a 
              href="/privacy-policy" 
              className="text-blue-300 hover:text-white transition-colors duration-200 text-xs sm:text-sm font-medium underline underline-offset-4"
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