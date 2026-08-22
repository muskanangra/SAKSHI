import React from 'react';
import { Lock, ArrowLeft } from 'lucide-react';
import { IndianFlagBadge } from './Emblems';


interface HeaderProps {
  currentView: 'landing' | 'login';
  onNavigate: (view: 'landing' | 'login') => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView, onNavigate }) => {
  return (
    <header className="w-full bg-white relative z-30 shadow-2xs">
      {/* Top Gov Micro-bar */}
      <div className="bg-slate-50 border-b border-slate-200/60 px-4 sm:px-8 lg:px-12 py-1 flex items-center justify-between text-[11px] text-slate-500 font-medium">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Government of India • Ministry of Home Affairs • SAKSHI Judicial Portal</span>
        </div>
        <div className="hidden sm:flex items-center gap-4">
          <span className="text-slate-400">|</span>
          <span className="hover:text-gov-navy cursor-pointer">Screen Reader Access</span>
          <span className="text-slate-400">|</span>
          <span className="hover:text-gov-navy cursor-pointer">English / हिन्दी</span>
        </div>
      </div>

      {/* Main Header Container */}
      <div className="w-full px-4 sm:px-8 lg:px-12 py-3 flex items-center justify-between min-h-[84px]">
        
        {/* Left Edge: SAKSHI Official Eye-Shield Logo + Hindi/English Brand Name + Taglines */}
        <button
          onClick={() => onNavigate('landing')}
          className="flex items-center gap-3.5 sm:gap-4 text-left group cursor-pointer focus:outline-none"
        >
          <div className="flex-shrink-0 transition-transform group-hover:scale-105">
            <img
              src="/sakshi_shield.png"
              alt="SAKSHI Official Logo"
              className="w-10 sm:w-12 h-12 sm:h-14 object-contain drop-shadow-xs"
            />
          </div>

          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-2">
              <h1 className="text-[20px] sm:text-[24px] font-black text-[#162E52] tracking-tight leading-none">
                साक्षी <span className="text-[17px] sm:text-[20px] font-bold tracking-wider text-[#162E52]">SAKSHI</span>
              </h1>
              {currentView === 'login' && (
                <span className="hidden md:inline-block text-[10px] font-bold text-white bg-[#162E52] px-2 py-0.5 rounded tracking-wide uppercase">
                  Officer Gateway
                </span>
              )}
            </div>
            <p className="text-[11px] sm:text-[12.5px] font-semibold text-[#F5821F] leading-tight mt-1">
              सुरक्षित • सत्यापित • न्याय के लिए तैयार &nbsp;<span className="text-slate-300 font-normal">|</span>&nbsp; <span className="text-slate-600 font-medium tracking-wider text-[10.5px] sm:text-[11.5px]">SECURE • VERIFIABLE • COURT-READY</span>
            </p>
          </div>


        </button>



        {/* Right Edge: Navigation Controls & Indian Flag */}
        <div className="flex items-center gap-4 sm:gap-6 pl-4 flex-shrink-0">
          
          {/* Action button based on current view */}
          {currentView === 'landing' ? (
            <div className="flex items-center gap-3">
              <button
                onClick={() => onNavigate('login')}
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 bg-[#F5821F] hover:bg-[#E06D0B] text-white font-bold text-xs rounded-lg shadow-sm transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Officer Login</span>
              </button>
            </div>
          ) : (
            <button
              onClick={() => onNavigate('landing')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#162E52] hover:text-[#F5821F] bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Portal Home</span>
            </button>
          )}

          {/* Authentic Indian Flag */}
          <IndianFlagBadge />
        </div>

      </div>

      {/* Solid Saffron to Green Gradient Bottom Border */}
      <div className="w-full h-[3.5px] bg-gradient-to-r from-[#F5821F] via-[#FFFFFF] to-[#138808]" />
    </header>
  );
};
