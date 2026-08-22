import React from 'react';

/**
 * 100% Authentic Official State Emblem of India (Lion Capital of Ashoka with Satyameva Jayate)
 */
export const AshokaEmblem: React.FC<{ className?: string; isWhite?: boolean }> = ({
  className = "w-10 h-14",
  isWhite = false
}) => {
  return (
    <div className={`relative flex items-center justify-center select-none flex-shrink-0 ${className}`}>
      <img
        src="/emblem_official.jpg"
        alt="State Emblem of India - Satyameva Jayate"
        className="w-full h-full object-contain"
        style={{
          mixBlendMode: isWhite ? 'screen' : 'multiply',
          filter: isWhite ? 'invert(1) brightness(1.8)' : 'contrast(1.15)'
        }}
      />
    </div>
  );
};

/**
 * Official SAKSHI Shield Logo Mark (Shield + Eye + Fingerprint + Circuit)
 */
export const SakshiShieldMark: React.FC<{ className?: string }> = ({
  className = "w-12 h-12"
}) => {
  return (
    <div className={`relative flex items-center justify-center select-none flex-shrink-0 ${className}`}>
      <img
        src="/sakshi_logo.png"
        alt="SAKSHI Official Logo"
        className="w-full h-full object-contain drop-shadow-xs"
      />
    </div>
  );
};

/**
 * Full Official SAKSHI Brand Card (Logo + Hindi/English Name + Taglines)
 */
export const SakshiBrandBanner: React.FC<{ className?: string; compact?: boolean }> = ({
  className = "",
  compact = false
}) => {
  return (
    <div className={`flex flex-col items-center text-center ${className}`}>
      <div className={compact ? "w-20 h-20 mb-2" : "w-28 h-28 sm:w-32 sm:h-32 mb-3"}>
        <img
          src="/sakshi_logo.png"
          alt="SAKSHI Official Emblem"
          className="w-full h-full object-contain drop-shadow-sm"
        />
      </div>
      <div className="flex flex-col items-center">
        <h2 className="text-2xl sm:text-3xl font-black text-[#162E52] tracking-tight">
          साक्षी <span className="text-xl sm:text-2xl font-bold tracking-widest text-[#162E52]">SAKSHI</span>
        </h2>
        <div className="flex items-center gap-2 mt-1">
          <span className="h-[1px] w-6 bg-slate-300" />
          <span className="text-xs sm:text-sm font-bold text-[#F5821F]">
            सुरक्षित • सत्यापित • न्याय के लिए तैयार
          </span>
          <span className="h-[1px] w-6 bg-slate-300" />
        </div>
        <p className="text-[11px] sm:text-xs font-bold text-[#162E52] tracking-widest uppercase mt-0.5">
          SECURE • VERIFIABLE • COURT-READY
        </p>
      </div>
    </div>
  );
};


/**
 * 24-Spoke Official Ashoka Chakra
 */
export const AshokaChakra: React.FC<{ className?: string; size?: number; color?: string; strokeWidth?: number }> = ({
  className = "w-12 h-12",
  size = 100,
  color = "#1B3A6B",
  strokeWidth = 2
}) => {
  const spokes = Array.from({ length: 24 }, (_, i) => i * 15);

  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="50" cy="50" r="47" stroke={color} strokeWidth={strokeWidth * 1.5} />
      <circle cx="50" cy="50" r="44" stroke={color} strokeWidth={strokeWidth * 0.5} strokeDasharray="1.5 2" />
      <circle cx="50" cy="50" r="9" stroke={color} strokeWidth={strokeWidth} fill="none" />
      <circle cx="50" cy="50" r="4.5" fill={color} />

      {spokes.map((deg) => (
        <g key={deg} transform={`rotate(${deg} 50 50)`}>
          <line x1="50" y1="9" x2="50" y2="41" stroke={color} strokeWidth={strokeWidth * 0.9} strokeLinecap="round" />
          <circle cx="50" cy="10" r="1.2" fill={color} />
        </g>
      ))}
    </svg>
  );
};

/**
 * Authentic Waving Indian Tricolor Flag with Ashoka Chakra
 */
export const IndianFlagBadge: React.FC = () => {
  return (
    <div className="flex items-center gap-3 select-none">
      {/* Waving Indian Flag Vector */}
      <div className="relative w-11 h-7 flex-shrink-0 drop-shadow-2xs">
        <svg viewBox="0 0 44 28" className="w-full h-full" fill="none">
          {/* Top Saffron Wave */}
          <path
            d="M0 2 C10 0 16 5 26 3 C36 1 40 4 44 3 L44 11 C40 12 36 9 26 11 C16 13 10 8 0 10 Z"
            fill="#FF9933"
          />
          {/* Middle White Wave */}
          <path
            d="M0 10 C10 8 16 13 26 11 C36 9 40 12 44 11 L44 19 C40 20 36 17 26 19 C16 21 10 16 0 18 Z"
            fill="#FFFFFF"
          />
          {/* Bottom Green Wave */}
          <path
            d="M0 18 C10 16 16 21 26 19 C36 17 40 20 44 19 L44 27 C40 28 36 25 26 27 C16 29 10 24 0 26 Z"
            fill="#138808"
          />
          {/* Central Ashoka Chakra */}
          <circle cx="22" cy="15" r="3.2" stroke="#000080" strokeWidth="0.8" fill="none" />
          <circle cx="22" cy="15" r="0.8" fill="#000080" />
          {Array.from({ length: 12 }, (_, i) => i * 30).map((deg) => (
            <line
              key={deg}
              x1="22"
              y1="12.5"
              x2="22"
              y2="14.2"
              stroke="#000080"
              strokeWidth="0.4"
              transform={`rotate(${deg} 22 15)`}
            />
          ))}
        </svg>
      </div>

      {/* Stacked Bilingual Text: भारत सरकार / GOVERNMENT OF INDIA */}
      <div className="flex flex-col text-left">
        <span className="text-[13.5px] font-bold text-[#162E52] tracking-tight font-['Noto_Sans_Devanagari',sans-serif] leading-tight">
          भारत सरकार
        </span>
        <span className="text-[10px] font-semibold text-slate-500 tracking-[0.09em] uppercase leading-tight mt-0.5">
          GOVERNMENT OF INDIA
        </span>
      </div>
    </div>
  );
};

/**
 * Flocking Birds Vector SVG
 */
export const BirdsVector: React.FC<{ className?: string }> = ({ className = "w-32 h-16" }) => {
  return (
    <svg viewBox="0 0 240 120" className={className} fill="#8A9BA8">
      <path d="M30,40 Q45,26 60,38 Q75,26 90,40 Q75,34 60,44 Q45,34 30,40 Z" opacity="0.6" />
      <path d="M100,22 Q110,12 120,20 Q130,12 140,22 Q130,17 120,25 Q110,17 100,22 Z" opacity="0.45" />
      <path d="M150,45 Q160,34 172,42 Q184,34 194,45 Q184,40 172,48 Q160,40 150,45 Z" opacity="0.5" />
      <path d="M70,70 Q78,62 88,68 Q98,62 106,70 Q98,66 88,73 Q78,66 70,70 Z" opacity="0.35" />
      <path d="M200,28 Q207,20 215,26 Q223,20 230,28 Q223,24 215,30 Q207,24 200,28 Z" opacity="0.4" />
      <path d="M125,58 Q132,50 140,56 Q148,50 155,58 Q148,54 140,60 Q132,54 125,58 Z" opacity="0.3" />
    </svg>
  );
};

/**
 * Laurel Wreath with Shield Security Badge
 */
export const SecurityBadge: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center relative">
      <div className="relative w-24 h-16 flex items-center justify-center">
        <svg viewBox="0 0 120 80" className="absolute inset-0 w-full h-full" fill="#C69214">
          <g opacity="0.95">
            <path d="M48 66 C32 64 20 52 16 38 C14 30 16 20 22 14 C21 20 24 26 29 30 C22 34 20 42 23 50 C28 57 36 62 48 66 Z" />
            <ellipse cx="16" cy="24" rx="4.5" ry="2.5" transform="rotate(-40 16 24)" />
            <ellipse cx="22" cy="38" rx="5" ry="2.8" transform="rotate(-25 22 38)" />
            <ellipse cx="32" cy="52" rx="5.5" ry="3" transform="rotate(-10 32 52)" />
            <ellipse cx="25" cy="18" rx="4" ry="2.2" transform="rotate(-55 25 18)" />
            <ellipse cx="15" cy="32" rx="4.5" ry="2.4" transform="rotate(-30 15 32)" />
          </g>
          <g opacity="0.95">
            <path d="M72 66 C88 64 100 52 104 38 C106 30 104 20 98 14 C99 20 96 26 91 30 C98 34 100 42 97 50 C92 57 84 62 72 66 Z" />
            <ellipse cx="104" cy="24" rx="4.5" ry="2.5" transform="rotate(40 104 24)" />
            <ellipse cx="98" cy="38" rx="5" ry="2.8" transform="rotate(25 98 38)" />
            <ellipse cx="88" cy="52" rx="5.5" ry="3" transform="rotate(10 88 52)" />
            <ellipse cx="95" cy="18" rx="4" ry="2.2" transform="rotate(55 95 18)" />
            <ellipse cx="105" cy="32" rx="4.5" ry="2.4" transform="rotate(30 105 32)" />
          </g>
        </svg>

        <div className="relative z-10 w-11 h-13 flex items-center justify-center">
          <svg viewBox="0 0 100 120" className="w-11 h-13 drop-shadow-sm">
            <path
              d="M50 4 L14 18 C14 62 30 96 50 114 C70 96 86 62 86 18 Z"
              fill="#162E52"
              stroke="#0D1E36"
              strokeWidth="2"
            />
            <rect x="36" y="52" width="28" height="24" rx="4" fill="#FFFFFF" />
            <path
              d="M42 52 L42 38 C42 33 45 29 50 29 C55 29 58 33 58 38 L58 52"
              stroke="#FFFFFF"
              strokeWidth="4.5"
              strokeLinecap="round"
              fill="none"
            />
            <circle cx="50" cy="62" r="2.5" fill="#162E52" />
            <path d="M50 64.5 L50 70" stroke="#162E52" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      <div className="w-12 h-1 rounded-full flex overflow-hidden mt-1 shadow-2xs">
        <div className="w-1/3 bg-[#F5821F]" />
        <div className="w-1/3 bg-white border-y border-slate-200" />
        <div className="w-1/3 bg-[#138808]" />
      </div>
    </div>
  );
};

/**
 * Bottom Card Tricolor Wave Ribbon with Central Ashoka Chakra Medal
 */
export const TricolorRibbonMedal: React.FC = () => {
  return (
    <div className="w-full relative flex flex-col items-center justify-center overflow-hidden pointer-events-none select-none">
      <div className="w-full max-w-sm mb-1 opacity-25">
        <svg viewBox="0 0 400 60" fill="none" stroke="#64748B" strokeWidth="1" className="w-full h-10">
          <line x1="80" y1="58" x2="80" y2="10" strokeWidth="1.2" />
          <rect x="76" y="8" width="8" height="4" />
          <polygon points="80,2 84,8 76,8" fill="#64748B" />
          <path d="M120 58 L120 35 Q140 18 160 35 L160 58" />
          <line x1="140" y1="18" x2="140" y2="8" />
          <path d="M160 58 L160 30 Q200 0 240 30 L240 58" strokeWidth="1.2" />
          <circle cx="200" cy="18" r="10" />
          <line x1="200" y1="8" x2="200" y2="0" strokeWidth="1.5" />
          <path d="M240 58 L240 35 Q260 18 280 35 L280 58" />
          <line x1="260" y1="18" x2="260" y2="8" />
          <line x1="320" y1="58" x2="320" y2="10" strokeWidth="1.2" />
          <rect x="316" y="8" width="8" height="4" />
          <polygon points="320,2 324,8 316,8" fill="#64748B" />
        </svg>
      </div>

      <div className="relative w-full flex items-center justify-center">
        <div className="w-full flex flex-col gap-[1.5px] items-center">
          <svg viewBox="0 0 500 24" className="w-full h-3" fill="none">
            <path
              d="M0 12 Q125 24 250 12 T500 12"
              stroke="#F5821F"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
          </svg>
          <div className="h-0.5" />
          <svg viewBox="0 0 500 24" className="w-full h-3" fill="none">
            <path
              d="M0 12 Q125 0 250 12 T500 12"
              stroke="#138808"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <div className="absolute z-10 w-9 h-9 rounded-full bg-white shadow-md border-2 border-slate-100 flex items-center justify-center">
          <AshokaChakra className="w-6 h-6" color="#000080" strokeWidth={1.8} />
        </div>
      </div>
    </div>
  );
};

/**
 * Official Digital India Logo
 */
export const DigitalIndiaLogo: React.FC = () => {
  return (
    <div className="flex items-center gap-2.5 px-3 py-1">
      <div className="w-8 h-8 flex-shrink-0">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path d="M50 12 A38 38 0 0 1 88 50" stroke="#F5821F" strokeWidth="8" strokeLinecap="round" fill="none" />
          <path d="M88 50 A38 38 0 0 1 50 88" stroke="#138808" strokeWidth="8" strokeLinecap="round" fill="none" />
          <path d="M50 88 A38 38 0 0 1 12 50" stroke="#162E52" strokeWidth="8" strokeLinecap="round" fill="none" />
          <circle cx="50" cy="50" r="15" fill="#162E52" />
          <circle cx="50" cy="50" r="6" fill="#FFFFFF" />
        </svg>
      </div>
      <div className="flex flex-col text-left">
        <span className="text-[14px] font-extrabold tracking-tight text-[#162E52] leading-tight">
          Digital India
        </span>
        <span className="text-[9.5px] font-medium text-slate-500 tracking-wider uppercase">
          Power To Empower
        </span>
      </div>
    </div>
  );
};

/**
 * Official Azadi Ka Amrit Mahotsav 75 Logo
 */
export const AzadiLogo: React.FC = () => {
  return (
    <div className="flex items-center gap-2.5 px-3 py-1">
      <div className="flex items-center">
        <div className="font-black text-2xl tracking-tighter text-[#F5821F] flex items-baseline">
          7<span className="text-[#138808]">5</span>
        </div>
        <div className="w-4 h-5 ml-1 flex flex-col justify-center gap-0.5">
          <div className="h-1 bg-[#F5821F] rounded-xs" />
          <div className="h-1 bg-slate-300 rounded-xs" />
          <div className="h-1 bg-[#138808] rounded-xs" />
        </div>
      </div>
      <div className="flex flex-col text-left ml-1">
        <span className="text-[12px] font-bold text-[#F5821F] leading-tight font-['Noto_Sans_Devanagari',sans-serif]">
          आज़ादी का अमृत महोत्सव
        </span>
        <span className="text-[9px] font-semibold text-slate-600 tracking-wider uppercase">
          Azadi Ka Amrit Mahotsav
        </span>
      </div>
    </div>
  );
};

/**
 * Official G20 India Logo
 */
export const G20Logo: React.FC = () => {
  return (
    <div className="flex items-center gap-2.5 px-3 py-1">
      <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center">
        <svg viewBox="0 0 60 60" className="w-full h-full">
          <path d="M30 8 C37 18 46 22 52 33 C44 35 35 31 30 39 C25 31 16 35 8 33 C14 22 23 18 30 8 Z" fill="#F5821F" />
          <path d="M30 20 C35 26 42 28 46 35 C40 37 34 34 30 41 C26 34 20 37 14 35 C18 28 25 26 30 20 Z" fill="#138808" />
          <circle cx="30" cy="22" r="7.5" fill="#162E52" />
          <ellipse cx="30" cy="22" rx="4" ry="7.5" stroke="#FFFFFF" strokeWidth="0.8" fill="none" />
          <line x1="23" y1="22" x2="37" y2="22" stroke="#FFFFFF" strokeWidth="0.8" />
        </svg>
      </div>
      <div className="flex flex-col text-left">
        <div className="flex items-center gap-1">
          <span className="text-[15px] font-black text-[#162E52] tracking-tight">G20</span>
        </div>
        <span className="text-[8.5px] font-semibold text-slate-600 font-['Noto_Sans_Devanagari',sans-serif] tracking-tight">
          भारत 2023 INDIA
        </span>
      </div>
    </div>
  );
};
