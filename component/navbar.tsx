"use client";

import { useEffect, useState } from "react";

interface ClinicHeaderProps {
  logoSrc?: string;
  phoneNumber?: string;
  phoneLabel?: string;
}

export default function ClinicHeader({
  logoSrc = "/scaled.png", // your uploaded logo
  phoneNumber = "+91 93809 02110",
  phoneLabel = "Call Now",
}: ClinicHeaderProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const telLink = `tel:${phoneNumber.replace(/\s+/g, "")}`;

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-22 lg:h-25 items-center justify-between">
          {/* Logo ONLY */}
          <div
            className={`transition-all duration-500 ${
              mounted ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            <img
              src={logoSrc}
              alt="Clinic Logo"
              className="h-22 sm:h-15 lg:h-23 w-auto object-contain"
            />
          </div>

          {/* Call Button */}
          <a
            href={telLink}
            className={`hidden md:inline-flex items-center space-x-3 bg-[#0d47a1] text-white px-5 py-3.5 rounded-3xl shadow-md hover:shadow-lg transition-all duration-300 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {/* Phone Icon */}
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>

            <span className="text-md font-medium">{phoneLabel}</span>
          </a>
        </div>
      </div>
    </header>
  );
}
