import React from 'react';
import { AshokaChakra, BirdsVector } from './Emblems';
import { LoginForm } from './LoginForm';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full min-h-[680px] lg:min-h-[720px] bg-gradient-to-br from-[#FFF3E6] via-[#FFFFFF] to-[#EEF8F1] overflow-hidden flex flex-col justify-between">
      
      {/* 1. Background Layers: Faded Blue Ashoka Chakra + Birds + Toned-Down Soft Monuments */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        
        {/* Smaller, Faded Blue Ashoka Chakra in Top-Left */}
        <div className="absolute -top-6 -left-6 sm:top-2 sm:left-6 w-[200px] h-[200px] sm:w-[260px] sm:h-[260px] opacity-[0.07] text-[#1B3A6B] select-none">
          <AshokaChakra className="w-full h-full" size={260} color="#1B3A6B" strokeWidth={1.5} />
        </div>

        {/* Flying Birds in Sky */}
        <div className="absolute top-10 left-48 sm:left-80 opacity-50 select-none">
          <BirdsVector className="w-32 sm:w-40 h-16 sm:h-20" />
        </div>

        {/* Shifted Upward Monuments Layer */}
        <div className="absolute bottom-6 sm:bottom-10 lg:bottom-12 left-0 w-full lg:w-[68%] h-[360px] sm:h-[440px] lg:h-[500px] opacity-75">
          <div
            className="w-full h-full bg-no-repeat bg-bottom bg-contain"
            style={{
              backgroundImage: `url('/monuments_blended.jpg')`,
              mixBlendMode: 'multiply',
              filter: 'saturate(0.75) brightness(1.03) contrast(0.95)',
              maskImage: 'linear-gradient(to top, rgba(0,0,0,1) 55%, rgba(0,0,0,0) 95%), linear-gradient(to right, rgba(0,0,0,1) 75%, rgba(0,0,0,0) 100%)',
              WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,1) 55%, rgba(0,0,0,0) 95%), linear-gradient(to right, rgba(0,0,0,1) 75%, rgba(0,0,0,0) 100%)',
              WebkitMaskComposite: 'destination-in',
              maskComposite: 'intersect'
            }}
          />
        </div>

        {/* Soft Ambient Tricolor Tones */}
        <div className="absolute top-0 left-0 w-[40%] h-[30%] bg-gradient-to-br from-[#F5821F]/8 to-transparent blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[45%] h-[35%] bg-gradient-to-tl from-[#138808]/8 to-transparent blur-3xl pointer-events-none" />
      </div>

      {/* 2. Main Foreground Layout */}
      <div className="max-w-7xl mx-auto w-full px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start lg:items-center relative z-10 flex-1 py-8 lg:py-10">
        
        {/* LEFT COLUMN */}
        <div className="lg:col-span-7 flex flex-col justify-start h-full pt-4 lg:pt-6 lg:pl-6 pb-20 sm:pb-28 lg:pb-0">
          <div className="space-y-4 max-w-lg">
            
            {/* System Headline */}
            <div className="space-y-0.5">
              <h2 className="text-3xl sm:text-4xl lg:text-[45px] font-extrabold tracking-tight text-[#162E52] leading-[1.12]">
                Secure. Trusted.
              </h2>
              <h2 className="text-3xl sm:text-4xl lg:text-[45px] font-extrabold tracking-tight text-[#F5821F] leading-[1.12]">
                For a Safer India.
              </h2>
            </div>

            {/* Tricolor Accent Dashes */}
            <div className="flex items-center gap-1.5 pt-0.5">
              <div className="w-9 h-1 bg-[#F5821F] rounded-full" />
              <div className="w-7 h-1 bg-[#138808] rounded-full" />
            </div>

            {/* Subtext Paragraph */}
            <p className="text-[15px] sm:text-[16px] text-slate-600 font-normal leading-relaxed max-w-[390px] pt-1.5">
              A unified platform for secure management of legal, investigation and court documents across India.
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: Elevated Login Card */}
        <div className="lg:col-span-5 flex items-center justify-center lg:justify-end">
          <LoginForm />
        </div>

      </div>
    </section>
  );
};
