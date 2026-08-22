import React from 'react';

export const FeatureStrip: React.FC = () => {
  return (
    <section className="w-full bg-white border-y border-slate-200/80 py-8 relative z-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-200 gap-y-6 sm:gap-y-0">
          
          {/* Feature 1: Secure & Encrypted */}
          <div className="flex items-center gap-3.5 px-3 sm:px-6">
            <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center">
              <svg viewBox="0 0 48 48" className="w-11 h-11" fill="none">
                <path
                  d="M24 4 L8 10 C8 28 14 40 24 44 C34 40 40 28 40 10 Z"
                  fill="#FFF7ED"
                  stroke="#F5821F"
                  strokeWidth="2.5"
                />
                <circle cx="24" cy="24" r="5" fill="#F5821F" />
                <path d="M21 24 L23 26 L27 22" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="flex flex-col text-left">
              <h3 className="text-[14px] font-bold text-[#162E52] leading-tight">
                Secure & Encrypted
              </h3>
              <p className="text-[12px] text-slate-500 font-normal leading-snug mt-1">
                End-to-end encryption and role-based access control
              </p>
            </div>
          </div>

          {/* Feature 2: Audit & Traceable */}
          <div className="flex items-center gap-3.5 px-3 sm:px-6 pt-4 sm:pt-0">
            <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center">
              <svg viewBox="0 0 48 48" className="w-11 h-11" fill="none">
                <rect x="10" y="8" width="28" height="34" rx="4" fill="#F0F6FF" stroke="#1B68D2" strokeWidth="2.5" />
                <rect x="18" y="4" width="12" height="6" rx="2" fill="#1B68D2" />
                <line x1="16" y1="18" x2="19" y2="18" stroke="#1B68D2" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="23" y1="18" x2="32" y2="18" stroke="#1B68D2" strokeWidth="2" strokeLinecap="round" />
                <line x1="16" y1="26" x2="19" y2="26" stroke="#1B68D2" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="23" y1="26" x2="32" y2="26" stroke="#1B68D2" strokeWidth="2" strokeLinecap="round" />
                <line x1="16" y1="34" x2="19" y2="34" stroke="#1B68D2" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="23" y1="34" x2="32" y2="34" stroke="#1B68D2" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <div className="flex flex-col text-left">
              <h3 className="text-[14px] font-bold text-[#162E52] leading-tight">
                Audit & Traceable
              </h3>
              <p className="text-[12px] text-slate-500 font-normal leading-snug mt-1">
                Every action is recorded and tamper-proof
              </p>
            </div>
          </div>

          {/* Feature 3: Role Based Access */}
          <div className="flex items-center gap-3.5 px-3 sm:px-6 pt-4 sm:pt-0">
            <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center">
              <svg viewBox="0 0 48 48" className="w-11 h-11" fill="none">
                <circle cx="20" cy="16" r="6" stroke="#138808" strokeWidth="2.5" fill="#F0FDF4" />
                <path d="M10 36 C10 28 15 26 20 26 C25 26 30 28 30 36" stroke="#138808" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M28 12 C31 13 33 16 33 20" stroke="#138808" strokeWidth="2" strokeLinecap="round" />
                <path d="M32 26 C36 27 38 29 38 35" stroke="#138808" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <div className="flex flex-col text-left">
              <h3 className="text-[14px] font-bold text-[#162E52] leading-tight">
                Role Based Access
              </h3>
              <p className="text-[12px] text-slate-500 font-normal leading-snug mt-1">
                Access only what you are authorized for
              </p>
            </div>
          </div>

          {/* Feature 4: Trusted Platform */}
          <div className="flex items-center gap-3.5 px-3 sm:px-6 pt-4 sm:pt-0">
            <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center">
              <svg viewBox="0 0 48 48" className="w-11 h-11" fill="none">
                <path
                  d="M24 4 L8 10 C8 28 14 40 24 44 C34 40 40 28 40 10 Z"
                  fill="#162E52"
                  stroke="#0D1E36"
                  strokeWidth="1.5"
                />
                <circle cx="24" cy="24" r="9" stroke="#FFFFFF" strokeWidth="1.8" fill="none" />
                <path d="M20 24 L23 27 L28 21" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="flex flex-col text-left">
              <h3 className="text-[14px] font-bold text-[#162E52] leading-tight">
                Trusted Platform
              </h3>
              <p className="text-[12px] text-slate-500 font-normal leading-snug mt-1">
                Built for Indian Law Enforcement & Judicial Ecosystem
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
