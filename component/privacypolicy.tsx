import React from "react";
import {
  ArrowLeft,
  Shield,
  Lock,
  Eye,
  Users,
  Cookie,
  FileText,
  Mail,
  Phone,
  MapPin,
  Home,
} from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-indigo-50">
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
          
          <a  href="tel:+919380902110"
            className="hidden sm:flex items-center space-x-2 bg-blue-900 text-white px-6 py-3 rounded-full hover:bg-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <Phone className="w-4 h-4" />
            <span className="font-semibold">+91 93809 02110</span>
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-2 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-6">
              <Shield className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-2xl sm:text-4xl lg:text-4xl font-bold mb-6">
            Privacy Policy
          </h1>
          <p className="text-lg sm:text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Nypunya Aesthetic respects your privacy and is{" "}
            <span className="font-bold text-white">committed</span> to
            protecting your personal information.
          </p>
          <p className="mt-4 text-blue-200">
            This Privacy Policy explains how we collect, use, and safeguard your
            data when you visit our website:{" "}
            
             <a href="https://nypunyaaestheticbengaluru.in"
              className="text-rose-300 hover:text-white underline underline-offset-4 font-medium transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://nypunyaaestheticbengaluru.in
            </a>
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Grid Layout for Sections */}
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 mb-12">
          {/* Section 1: Information We Collect */}
          <section className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-blue-100 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center space-x-4 mb-6">
              <div className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-full p-3">
                <FileText className="w-6 h-6 text-blue-900" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                1. Information We Collect
              </h2>
            </div>
            <p className="text-gray-600 mb-4 text-base sm:text-lg">
              We may collect the following information:
            </p>
            <ul className="space-y-3">
              {[
                "Name, age, gender",
                "Contact details: phone number, email address",
                "Health-related details (shared via consultation forms or online booking)",
                "IP address and browser information (for analytics)",
                "Appointment preferences",
              ].map((item, index) => (
                <li
                  key={index}
                  className="flex items-start space-x-3 text-gray-700"
                >
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-blue-900 flex-shrink-0"></div>
                  <span className="text-sm sm:text-base">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Section 2: How We Use Your Information */}
          <section className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl shadow-xl p-6 sm:p-8 border border-rose-100 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center space-x-4 mb-6">
              <div className="bg-white rounded-full p-3 shadow-md">
                <Eye className="w-6 h-6 text-rose-500" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                2. How We Use Your Information
              </h2>
            </div>
            <p className="text-gray-600 mb-4 text-base sm:text-lg">We use your data for:</p>
            <ul className="space-y-3">
              {[
                "Booking and managing appointments",
                "Sending confirmation or reminder emails/SMS",
                "Providing personalized treatment or consultation",
                "Customer support and follow-up",
                "Improving our services and website",
              ].map((item, index) => (
                <li
                  key={index}
                  className="flex items-start space-x-3 text-gray-700"
                >
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-rose-500 flex-shrink-0"></div>
                  <span className="text-sm sm:text-base">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Section 3: Sharing Your Data */}
          <section className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-blue-100 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center space-x-4 mb-6">
              <div className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-full p-3">
                <Users className="w-6 h-6 text-blue-900" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                3. Sharing Your Data
              </h2>
            </div>
            <p className="text-gray-700 mb-4 text-base sm:text-lg">
              We{" "}
              <span className="font-bold text-blue-900">do not sell or rent</span>{" "}
              your data. We may share your data:
            </p>
            <ul className="space-y-3">
              {[
                "With internal staff or doctors for consultation purposes",
                "With trusted third-party services (e.g. SMS/Email providers) under confidentiality",
                "If required by law or court order",
              ].map((item, index) => (
                <li
                  key={index}
                  className="flex items-start space-x-3 text-gray-700"
                >
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-blue-900 flex-shrink-0"></div>
                  <span className="text-sm sm:text-base">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Section 4: Cookies and Tracking */}
          <section className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl shadow-xl p-6 sm:p-8 border border-amber-100 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center space-x-4 mb-6">
              <div className="bg-white rounded-full p-3 shadow-md">
                <Cookie className="w-6 h-6 text-amber-600" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                4. Cookies and Tracking
              </h2>
            </div>
            <p className="text-gray-700 text-base sm:text-lg">
              We use cookies to improve website performance and user experience.
              You can disable cookies in your browser settings.
            </p>
          </section>

          {/* Section 5: Data Security */}
          <section className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-blue-100 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center space-x-4 mb-6">
              <div className="bg-gradient-to-br from-green-100 to-green-50 rounded-full p-3">
                <Lock className="w-6 h-6 text-green-700" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                5. Data Security
              </h2>
            </div>
            <p className="text-gray-700 text-base sm:text-lg">
              We use appropriate security measures to protect your personal data
              against unauthorized access or disclosure.
            </p>
          </section>

          {/* Section 6: Your Rights */}
          <section className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl shadow-xl p-6 sm:p-8 border border-purple-100 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center space-x-4 mb-6">
              <div className="bg-white rounded-full p-3 shadow-md">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">6. Your Rights</h2>
            </div>
            <p className="text-gray-600 mb-4 text-base sm:text-lg">You have the right to:</p>
            <ul className="space-y-3">
              {[
                "Request access or correction to your personal data",
                "Withdraw consent at any time",
                "Request deletion of your data (subject to regulatory or legal requirements)",
              ].map((item, index) => (
                <li
                  key={index}
                  className="flex items-start space-x-3 text-gray-700"
                >
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-purple-600 flex-shrink-0"></div>
                  <span className="text-sm sm:text-base">{item}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Section 7: Contact Us - Full Width */}
        <section className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-2xl shadow-xl p-8 sm:p-10 text-white mb-12">
          <div className="flex items-center space-x-4 mb-6">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold">7. Contact Us</h2>
          </div>
          <p className="text-blue-100 mb-8 text-base sm:text-lg">
            For questions or requests related to this privacy policy:
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Address */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-300">
              <div className="flex items-start space-x-4">
                <MapPin className="w-6 h-6 text-rose-300 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-lg mb-2">Our Location</h3>
                  <p className="text-blue-100 leading-relaxed text-sm">
                    #3, 1st Cross, Off 24th Main, 2nd Phase, J. P. Nagar,
                    Bengaluru
                  </p>
                </div>
              </div>
            </div>

            {/* Phone */}
            
           <a   href="tel:+919380902110"
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-300 flex items-start space-x-4"
            >
              <Phone className="w-6 h-6 text-rose-300 flex-shrink-0 mt-1" />
              <div>
                <p className="text-sm text-blue-100 mb-1">Call Us</p>
                <p className="font-bold text-lg">+91 93809 02110</p>
              </div>
            </a>

            {/* Email */}
            
            <a  href="mailto:clinic.nypunyaaesthetic@gmail.com"
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-300 flex items-start space-x-4"
            >
              <Mail className="w-6 h-6 text-rose-300 flex-shrink-0 mt-1" />
              <div>
                <p className="text-sm text-blue-100 mb-1">Email Us</p>
                <p className="font-bold text-sm break-all">
                  clinic.nypunyaaesthetic@gmail.com
                </p>
              </div>
            </a>
          </div>
        </section>

        {/* Back to Home Button */}
        <div className="text-center">
          
         <a   href="/"
            className="inline-flex items-center space-x-3 bg-gradient-to-r from-blue-900 to-blue-800 text-white px-8 py-4 rounded-full hover:from-blue-800 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-1"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-bold text-lg">Back to Home</span>
          </a>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-blue-950 text-white py-8 mt-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4">
            <p className="text-sm text-blue-200">
              Copyright © 2025 Nypunya Aesthetics | Powered by Grow Medico |
              This site is not a part of the Facebook website or Facebook Inc.
              Additionally, This site is NOT endorsed by Facebook in any way.
              FACEBOOK is a trademark of FACEBOOK, Inc.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PrivacyPolicy;