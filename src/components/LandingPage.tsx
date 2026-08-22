import React from 'react';
import { ShieldCheck, FileCheck2, Scale, Lock, ArrowRight, CheckCircle2, ChevronRight } from 'lucide-react';
import { AshokaChakra, BirdsVector } from './Emblems';

interface LandingPageProps {
  onOpenLogin: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onOpenLogin }) => {
  return (
    <div className="w-full flex flex-col bg-white">
      
      {/* 1. HERO SECTION (Grand, Panoramic with Monuments) */}
      <section className="relative w-full min-h-[640px] lg:min-h-[680px] bg-gradient-to-br from-[#FFF3E6] via-[#FFFFFF] to-[#EEF8F1] overflow-hidden flex flex-col justify-between pt-10 pb-16">
        
        {/* Background Ambient Layers */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          {/* Faded Ashoka Chakra */}
          <div className="absolute -top-10 -left-10 sm:top-0 sm:left-8 w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] opacity-[0.06] text-[#162E52] select-none">
            <AshokaChakra className="w-full h-full" size={380} color="#162E52" strokeWidth={1.5} />
          </div>

          {/* Flying Birds */}
          <div className="absolute top-12 right-32 sm:right-96 opacity-40 select-none">
            <BirdsVector className="w-36 sm:w-48 h-18 sm:h-24" />
          </div>

          {/* Panoramic Blended Monuments at the Bottom */}
          <div className="absolute bottom-0 left-0 w-full h-[320px] sm:h-[400px] lg:h-[460px] opacity-75">
            <div
              className="w-full h-full bg-no-repeat bg-bottom bg-cover sm:bg-contain"
              style={{
                backgroundImage: `url('/monuments_blended.jpg')`,
                mixBlendMode: 'multiply',
                filter: 'saturate(0.75) brightness(1.02) contrast(0.98)',
                maskImage: 'linear-gradient(to top, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 95%)',
                WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 95%)'
              }}
            />
          </div>
        </div>

        {/* Hero Content Container */}
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10 my-auto">
          {/* Initiative Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-slate-200 shadow-2xs backdrop-blur-xs text-xs font-semibold text-[#162E52] mb-6">
            <span className="w-2 h-2 rounded-full bg-[#F5821F]" />
            <span>National Inter-Agency Judicial & Law Enforcement Kernel</span>
          </div>

          {/* Main Hero Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-black text-[#162E52] tracking-tight leading-[1.15] mb-4">
            Unified Cryptographic Audit for <br className="hidden sm:inline" />
            <span className="text-[#F5821F]">Legal & Investigation Documents</span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-lg text-slate-600 font-normal max-w-2xl mx-auto mb-8 leading-relaxed">
            <strong>SAKSHI</strong> provides a tamper-proof cryptographic chain of custody, enabling seamless, authorized sharing of court records, police case diaries, and forensic evidence across India.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onOpenLogin}
              className="w-full sm:w-auto px-8 py-3.5 bg-[#F5821F] hover:bg-[#E06D0B] active:bg-[#C95B00] text-white font-bold text-base rounded-xl shadow-md flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <Lock className="w-4 h-4 stroke-[2.2]" />
              <span>Officer Portal Login</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
            <a
              href="#capabilities"
              className="w-full sm:w-auto px-7 py-3.5 bg-white/90 hover:bg-slate-100 text-[#162E52] font-bold text-base rounded-xl border border-slate-200/90 shadow-2xs transition-all flex items-center justify-center gap-2"
            >
              <span>Explore Platform</span>
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>

          {/* Live Trust Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-8 border-t border-slate-200/60 max-w-3xl mx-auto text-left">
            <div className="bg-white/80 backdrop-blur-xs p-3 rounded-lg border border-slate-200/50">
              <span className="block text-xl font-extrabold text-[#162E52]">28+ States</span>
              <span className="text-[11px] text-slate-500 font-medium">Judicial Interoperability</span>
            </div>
            <div className="bg-white/80 backdrop-blur-xs p-3 rounded-lg border border-slate-200/50">
              <span className="block text-xl font-extrabold text-[#162E52]">SHA-256</span>
              <span className="text-[11px] text-slate-500 font-medium">Immutable Hash Ledger</span>
            </div>
            <div className="bg-white/80 backdrop-blur-xs p-3 rounded-lg border border-slate-200/50">
              <span className="block text-xl font-extrabold text-[#162E52]">100% Audit</span>
              <span className="text-[11px] text-slate-500 font-medium">Chain of Custody Tracking</span>
            </div>
            <div className="bg-white/80 backdrop-blur-xs p-3 rounded-lg border border-slate-200/50">
              <span className="block text-xl font-extrabold text-[#162E52]">Tier-IV NIC</span>
              <span className="text-[11px] text-slate-500 font-medium">National Cloud Hosting</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CORE SYSTEM CAPABILITIES */}
      <section id="capabilities" className="py-16 bg-slate-50/70 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-xs font-bold text-[#F5821F] tracking-widest uppercase mb-1">
              Architecture & Trust Framework
            </h2>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#162E52] tracking-tight">
              Engineered for Highest Evidence Integrity
            </h3>
            <p className="text-sm text-slate-600 mt-2">
              Designed specifically for the Indian judicial ecosystem in compliance with the Indian Evidence Act and IT Act 2000.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 1 */}
            <div className="bg-white rounded-2xl p-7 border border-slate-200/80 shadow-2xs hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-[#F5821F] mb-5">
                <FileCheck2 className="w-6 h-6 stroke-[2]" />
              </div>
              <h4 className="text-lg font-bold text-[#162E52] mb-2">
                Tamper-Proof Case Diaries
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Automated digital signing and timestamping prevent retroactive modifications to investigating officer records and evidence logs.
              </p>
              <ul className="mt-4 space-y-2 text-xs text-slate-500">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#138808]" />
                  <span>RFC 3161 Certified Timestamps</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#138808]" />
                  <span>eSign & DSC Token Integration</span>
                </li>
              </ul>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-2xl p-7 border border-slate-200/80 shadow-2xs hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#162E52] mb-5">
                <Scale className="w-6 h-6 stroke-[2]" />
              </div>
              <h4 className="text-lg font-bold text-[#162E52] mb-2">
                e-Courts & ICJS Interoperability
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Direct integration with the Inter-operable Criminal Justice System (ICJS), linking police stations, courts, prosecution, and forensic labs.
              </p>
              <ul className="mt-4 space-y-2 text-xs text-slate-500">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#138808]" />
                  <span>Real-Time Case Dossier Dispatch</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#138808]" />
                  <span>Automated Bail & Summons Sync</span>
                </li>
              </ul>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-2xl p-7 border border-slate-200/80 shadow-2xs hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-[#138808] mb-5">
                <ShieldCheck className="w-6 h-6 stroke-[2]" />
              </div>
              <h4 className="text-lg font-bold text-[#162E52] mb-2">
                Role-Based Cryptographic Access
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Granular access permissions tailored for judges, public prosecutors, investigating officers, and forensic examiners with strict audit trails.
              </p>
              <ul className="mt-4 space-y-2 text-xs text-slate-500">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#138808]" />
                  <span>Zero-Trust Authorization Kernel</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#138808]" />
                  <span>Mandatory Multi-Factor Handshake</span>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* 3. SECURITY SPECS BANNER */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="bg-[#162E52] rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-2 max-w-xl text-left">
              <span className="text-xs font-bold uppercase tracking-widest text-[#F5821F]">
                Government of India Security Standards
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Authorized Personnel Access Only
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-normal">
                This platform is strictly restricted to designated officers of Law Enforcement Agencies, Judicial Services, and Forensic Science Laboratories. Unauthorized access attempts are monitored and punishable under Section 66 of the Information Technology Act.
              </p>
            </div>

            <div className="flex-shrink-0">
              <button
                onClick={onOpenLogin}
                className="px-6 py-3.5 bg-[#F5821F] hover:bg-[#E06D0B] text-white font-bold text-sm rounded-xl shadow-lg flex items-center gap-2 cursor-pointer transition-transform hover:scale-105"
              >
                <Lock className="w-4 h-4" />
                <span>Launch Officer Login</span>
                <ChevronRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
