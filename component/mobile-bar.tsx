"use client";

import { Phone, Calendar } from "lucide-react";

export default function MobileActionBar() {
  return (
    <div
      className="
        fixed bottom-0 left-0 right-0 z-50
        bg-white border-t shadow-lg
        flex md:hidden
      "
    >
      {/* Call Now */}
      <a
        href="tel:+9193809 02110"
        className="
          flex-1 flex items-center justify-center gap-2
          py-4 font-semibold text-white
          bg-black
          text-sm
          bg-gradient-to-r from-purple-600 to-pink-500
          hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-500
          active:scale-95 transition
        "
      >
        <Phone className="w-4 h-4" />
        Call Now
      </a>

      {/* Book Now */}
      <a
        href="#about"
        className="
          flex-1 flex items-center justify-center gap-2
          py-4 font-semibold
          text-[#f7deba]
          bg-black
          text-sm
          border-l border-gray-200
          active:scale-95 transition
        "
      >
        <Calendar className="w-4 h-4" />
        Book Now
      </a>
    </div>
  );
}
