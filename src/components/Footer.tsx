import React from 'react';
import { AshokaEmblem, AshokaChakra } from './Emblems';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#0B1E36] text-white relative overflow-hidden pt-8 pb-7">
      
      {/* Cropped faint Ashoka Chakra watermark in bottom right corner */}
      <div className="absolute -bottom-20 -right-20 w-72 h-72 pointer-events-none opacity-[0.06] text-white select-none">
        <AshokaChakra className="w-full h-full" size={288} color="#FFFFFF" strokeWidth={1.5} />
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6">
          
          {/* Left: White Emblem + Government of India / Ministry of Home Affairs */}
          <div className="flex items-center gap-3 text-center md:text-left">
            <div className="text-white flex-shrink-0">
              <AshokaEmblem className="w-8 h-12" isWhite={true} />
            </div>
            <div className="flex flex-col">
              <span className="text-[13.5px] font-bold tracking-wide text-white leading-tight">
                Government of India
              </span>
              <span className="text-[12px] text-slate-300 font-normal leading-tight mt-0.5">
                Ministry of Home Affairs
              </span>
            </div>
          </div>

          {/* Right: Horizontal Nav Links */}
          <nav className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-[12px] font-medium text-slate-300">
            <a href="#privacy" className="hover:text-[#F5821F] transition-colors">Privacy Policy</a>
            <span className="text-slate-600">|</span>
            <a href="#terms" className="hover:text-[#F5821F] transition-colors">Terms of Use</a>
            <span className="text-slate-600">|</span>
            <a href="#accessibility" className="hover:text-[#F5821F] transition-colors">Accessibility</a>
            <span className="text-slate-600">|</span>
            <a href="#contact" className="hover:text-[#F5821F] transition-colors">Contact Us</a>
          </nav>
        </div>

        {/* Bottom Center: Copyright */}
        <div className="border-t border-slate-700/50 pt-5 text-center text-[11px] text-slate-400">
          <p>
            © 2026 SAKSHI • सुरक्षित • सत्यापित • न्याय के लिए तैयार • SECURE • VERIFIABLE • COURT-READY. All Rights Reserved.
          </p>
        </div>

      </div>
    </footer>
  );
};
