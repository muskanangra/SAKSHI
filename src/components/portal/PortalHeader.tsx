import React, { useState } from 'react';
import { Shield, ChevronDown, LogOut, CheckCircle2, User, RefreshCw } from 'lucide-react';
import { useSakshi } from '../../context/SakshiContext';
import { IndianFlagBadge } from '../Emblems';
import { SakshiRole } from '../../types/sakshi';


interface PortalHeaderProps {
  onLogout: () => void;
  onOpenAuditLogs: () => void;
}

export const PortalHeader: React.FC<PortalHeaderProps> = ({ onLogout, onOpenAuditLogs }) => {
  const { currentOfficer, currentRole, officers, switchRole } = useSakshi();
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);

  const roleLabels: Record<SakshiRole, { label: string; order: number; color: string }> = {
    district_admin: { label: 'District Admin', order: 1, color: 'bg-orange-500' },
    central_admin: { label: 'Central Admin', order: 2, color: 'bg-blue-600' },
    investigating_officer: { label: 'Investigating Officer', order: 3, color: 'bg-indigo-600' },
    womens_safety_officer: { label: "Women's Safety Officer", order: 4, color: 'bg-pink-600' },
    forensic_officer: { label: 'Evidence & Forensic', order: 5, color: 'bg-purple-600' },
    prosecuting_officer: { label: 'Legal / Prosecuting', order: 6, color: 'bg-amber-600' },
    senior_officer: { label: 'Senior Supervisory', order: 7, color: 'bg-emerald-600' },
  };

  return (
    <header className="w-full bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
      {/* Top Gov Security Banner */}
      <div className="bg-[#162E52] text-white px-4 sm:px-8 py-1 flex items-center justify-between text-[11px] font-medium">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-semibold">SAKSHI Secure Operating Environment</span>
          <span className="text-slate-400 hidden sm:inline">•</span>
          <span className="text-slate-300 hidden sm:inline">NIC National Cloud Node #DL-04</span>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={onOpenAuditLogs}
            className="flex items-center gap-1.5 text-xs text-amber-300 hover:text-amber-200 font-semibold cursor-pointer underline"
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Immutable Audit Trail</span>
          </button>
          <span className="text-slate-400">|</span>
          <span className="bg-emerald-800 text-emerald-200 text-[10px] px-2 py-0.5 rounded font-mono font-bold">
            TLS 1.3 AES-256
          </span>
        </div>
      </div>

      {/* Main App Navigation Bar */}
      <div className="px-4 sm:px-8 py-2.5 flex items-center justify-between">
        
        {/* Left: SAKSHI Eye-Shield Logo + Title + Role Tag */}
        <div className="flex items-center gap-3">
          <img
            src="/sakshi_shield.png"
            alt="SAKSHI Official Logo"
            className="w-8 h-10 object-contain"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-black text-[#162E52] tracking-tight">साक्षी <span className="text-base font-bold">SAKSHI</span></span>
              <span className="text-xs font-bold text-white bg-[#F5821F] px-2 py-0.5 rounded shadow-2xs">
                {roleLabels[currentRole]?.label}
              </span>
            </div>
            <p className="text-[11px] font-semibold text-[#F5821F]">
              सुरक्षित • सत्यापित • न्याय के लिए तैयार &nbsp;<span className="text-slate-300 font-normal">|</span>&nbsp; <span className="text-slate-600 font-medium text-[10px]">SECURE • VERIFIABLE • COURT-READY</span>
            </p>
          </div>
        </div>



        {/* Center/Right: Role Switcher & Active Officer Profile */}
        <div className="flex items-center gap-3 sm:gap-4">
          
          {/* Quick Role Switcher (Crucial for Demonstration) */}
          <div className="relative">
            <button
              onClick={() => setShowRoleDropdown(!showRoleDropdown)}
              className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg text-xs font-bold text-slate-700 transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5 text-gov-navy" />
              <span className="hidden md:inline">Switch Portal:</span>
              <span className="text-[#162E52]">{roleLabels[currentRole]?.label}</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            {showRoleDropdown && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-slate-400 border-b border-slate-100">
                  Select Official Role & Portal
                </div>
                {officers.map(officer => {
                  const roleMeta = roleLabels[officer.role];
                  const isSelected = officer.role === currentRole;
                  return (
                    <button
                      key={officer.id}
                      onClick={() => {
                        switchRole(officer.role);
                        setShowRoleDropdown(false);
                      }}
                      className={`w-full px-3 py-2 text-left flex items-start gap-2.5 hover:bg-slate-50 transition-colors cursor-pointer ${
                        isSelected ? 'bg-blue-50/80 border-l-4 border-[#162E52]' : ''
                      }`}
                    >
                      <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${roleMeta?.color || 'bg-slate-400'}`} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-800 truncate">{roleMeta?.label}</span>
                          <span className="text-[10px] font-mono text-slate-400">#{roleMeta?.order}</span>
                        </div>
                        <p className="text-[11px] text-slate-500 truncate">{officer.name}</p>
                      </div>
                      {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-[#138808] mt-1 flex-shrink-0" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Active Officer Identity Pill */}
          <div className="hidden lg:flex items-center gap-2.5 pl-3 border-l border-slate-200">
            <div className="w-8 h-8 rounded-full bg-[#162E52] text-white flex items-center justify-center text-xs font-bold shadow-2xs">
              <User className="w-4 h-4" />
            </div>
            <div className="text-left text-xs">
              <span className="font-bold text-slate-800 block truncate max-w-[160px]">
                {currentOfficer.name}
              </span>
              <span className="text-[10.5px] text-slate-500 font-mono block">
                {currentOfficer.badgeNumber}
              </span>
            </div>
          </div>

          {/* Indian Flag Badge */}
          <div className="hidden sm:block">
            <IndianFlagBadge />
          </div>

          {/* Logout Button */}
          <button
            onClick={onLogout}
            className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
            title="Sign out of SAKSHI Portal"
          >
            <LogOut className="w-4 h-4" />
          </button>

        </div>
      </div>

      {/* Tricolor Bottom Accent Line */}
      <div className="w-full h-[2.5px] bg-gradient-to-r from-[#F5821F] via-[#FFFFFF] to-[#138808]" />
    </header>
  );
};
