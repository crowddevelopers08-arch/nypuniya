import React from "react"

type ClinicHeaderProps = {
  logoSrc?: string
  clinicName?: string
  tagline?: string
  phoneLabel?: string
  onCallNow?: () => void
}

export default function ClinicHeader({
  logoSrc = "/logo.png",
  clinicName = "NYPUNYA AESTHETIC CLINIC",
  tagline = "ONLY THE BEST FOR YOU",
  phoneLabel = "Call Now",
  onCallNow,
}: ClinicHeaderProps) {
  return (
    <header className="w-full bg-white border-y border-neutral-200">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="h-[74px] sm:h-[88px] lg:h-[98px] flex items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-4 min-w-0">
            <img
              src={logoSrc}
              alt={clinicName}
              className="h-10 sm:h-12 lg:h-14 w-auto object-contain shrink-0"
              draggable={false}
            />

            <div className="min-w-0 leading-none">
              <div className="text-[#0A2EA6] font-semibold tracking-[0.4px] text-[16px] sm:text-[20px] lg:text-[28px] truncate">
                {clinicName}
              </div>
              <div className="mt-1 sm:mt-1.5 text-[#D28C97] uppercase tracking-[2px] text-[10px] sm:text-[12px] lg:text-[13px] font-medium truncate">
                {tagline}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onCallNow}
            className="shrink-0 h-9 sm:h-10 lg:h-11 px-4 sm:px-5 lg:px-6 bg-[#1E4FA8] text-white rounded-md flex items-center gap-2 shadow-sm active:scale-[0.99] transition"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              className="shrink-0"
              aria-hidden="true"
            >
              <path
                d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 011 1V20a1 1 0 01-1 1C10.07 21 3 13.93 3 5a1 1 0 011-1h3.5a1 1 0 011 1c0 1.24.2 2.45.57 3.57a1 1 0 01-.24 1.02l-2.2 2.2z"
                fill="currentColor"
              />
            </svg>
            <span className="text-sm sm:text-[15px] font-semibold">{phoneLabel}</span>
          </button>
        </div>
      </div>
    </header>
  )
}
