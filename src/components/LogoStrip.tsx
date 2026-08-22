import React from 'react';

export const LogoStrip: React.FC = () => {
  return (
    <section className="w-full bg-white border-b border-slate-200/80 py-6 relative z-10">
      <div className="max-w-5xl mx-auto px-6 sm:px-10">
        {/* Balanced 3-Column Symmetric Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 items-center justify-items-center divide-y md:divide-y-0 md:divide-x divide-slate-200/80 gap-6 md:gap-0">
          
          {/* Logo 1: Digital India */}
          <div className="w-full flex items-center justify-center px-4 sm:px-8 py-2">
            <img
              src="/logo_digital_india.jpg"
              alt="Digital India - Power To Empower"
              className="h-12 sm:h-14 md:h-16 w-auto object-contain"
            />
          </div>

          {/* Logo 2: Azadi Ka Amrit Mahotsav 75 */}
          <div className="w-full flex items-center justify-center px-4 sm:px-8 py-2">
            <img
              src="/logo_azadi.jpg"
              alt="Azadi Ka Amrit Mahotsav - 75"
              className="h-12 sm:h-14 md:h-16 w-auto object-contain"
            />
          </div>

          {/* Logo 3: G20 India 2023 */}
          <div className="w-full flex items-center justify-center px-4 sm:px-8 py-2">
            <img
              src="/logo_g20.jpg"
              alt="G20 India 2023 - Vasudhaiva Kutumbakam"
              className="h-12 sm:h-14 md:h-16 w-auto object-contain"
            />
          </div>

        </div>
      </div>
    </section>
  );
};
