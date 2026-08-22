import React from 'react';
import { AshokaEmblem, IndianFlagBadge } from './Emblems';

export const Header: React.FC = () => {
  return (
    <header className="w-full bg-white relative z-30">
      {/* Full-width container extending from left to right edge */}
      <div className="w-full px-4 sm:px-8 lg:px-12 py-3 flex items-center justify-between min-h-[86px]">
        
        {/* Left Edge: Authentic State Emblem of India + SAKSHI Title & Full Subtitle */}
        <div className="flex items-center gap-3.5 sm:gap-4.5">
          <div className="flex-shrink-0">
            <AshokaEmblem className="w-10 sm:w-11 h-14 sm:h-16" />
          </div>

          <div className="flex flex-col justify-center text-left">
            <h1 className="text-[19px] sm:text-[23px] lg:text-[25px] font-extrabold text-[#162E52] tracking-tight leading-tight">
              SAKSHI
            </h1>
            <p className="text-[12px] sm:text-[13.5px] text-slate-600 font-medium leading-tight mt-0.5">
              Secure Audit & Kernel for Shared High-integrity Investigations
            </p>
          </div>
        </div>

        {/* Right Edge: Authentic Indian Flag + भारत सरकार / GOVERNMENT OF INDIA */}
        <div className="flex items-center pl-4 flex-shrink-0">
          <IndianFlagBadge />
        </div>

      </div>

      {/* Solid Saffron to Green Gradient Bottom Border */}
      <div className="w-full h-[3.5px] bg-gradient-to-r from-[#F5821F] via-[#FFFFFF] to-[#138808]" />
    </header>
  );
};
