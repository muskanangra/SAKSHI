import React from 'react';
import { X, ShieldCheck, Printer, CheckCircle2 } from 'lucide-react';
import { CanonicalEvidenceObject } from '../../types/sakshi';

interface BSA63CertificateModalProps {
  evidence: CanonicalEvidenceObject | null;
  isOpen: boolean;
  onClose: () => void;
}

export const BSA63CertificateModal: React.FC<BSA63CertificateModalProps> = ({ evidence, isOpen, onClose }) => {
  if (!isOpen || !evidence) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Top Header */}
        <div className="px-6 py-4 bg-[#162E52] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-6 h-6 stroke-[2]" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold tracking-tight">
                Certificate under Section 63(4) Bharatiya Sakshya Adhiniyam, 2023
              </h2>
              <p className="text-xs text-slate-300">
                Statutory Certificate of Electronic Record Admissibility (Form Schedule BSA-2023)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Certificate Printable Sheet */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 text-xs text-slate-800 font-serif leading-relaxed bg-amber-50/20 border-b border-slate-200">
          
          <div className="text-center border-b border-slate-300 pb-4 space-y-1">
            <h3 className="font-bold text-sm tracking-wide text-slate-900 uppercase">
              IN THE COURT OF SPECIAL JUDGE (CBI / CYBER), TIS HAZARI COURTS COMPLEX, DELHI
            </h3>
            <p className="text-xs text-slate-600 font-sans">
              Case Ref: <strong>{evidence.firNumber}</strong> • Canonical Exhibit ID: <strong className="font-mono">{evidence.id}</strong>
            </p>
          </div>

          <div className="space-y-3 font-sans text-xs">
            <p>
              I, <strong>{evidence.currentCustodian}</strong>, having lawful control over the electronic records management and forensic custody system, do hereby certify under <strong>Section 63(4) of the Bharatiya Sakshya Adhiniyam, 2023 (BSA)</strong> as follows:
            </p>

            <div className="space-y-2 p-4 bg-white rounded-xl border border-slate-200 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <span className="font-bold text-slate-600">1. Source Device & Make:</span>
                <span className="sm:col-span-2 font-semibold text-slate-900">{evidence.bsaCompliance.sourceDeviceMakeModel}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <span className="font-bold text-slate-600">2. Unique Identifier (IMEI/MAC):</span>
                <span className="sm:col-span-2 font-mono font-bold text-slate-900">{evidence.bsaCompliance.sourceDeviceIMEIOrMAC}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <span className="font-bold text-slate-600">3. Acquisition Method:</span>
                <span className="sm:col-span-2 text-slate-800">{evidence.bsaCompliance.acquisitionMethod}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <span className="font-bold text-slate-600">4. Immutable SHA-256 Hash:</span>
                <span className="sm:col-span-2 font-mono text-[11px] text-emerald-800 font-bold break-all bg-emerald-50 p-1.5 rounded border border-emerald-200">
                  {evidence.currentHashSHA256}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <span className="font-bold text-slate-600">5. Operating State Condition:</span>
                <span className="sm:col-span-2 text-emerald-700 font-bold">
                  Device was operating properly at all material times with zero unauthorized intervention.
                </span>
              </div>
            </div>

            <p className="text-slate-600 text-[11.5px] leading-normal italic">
              "The electronic output produced herein is a true bit-stream reproduction of the original record produced in the ordinary course of lawful activities and is cryptographically sealed against unauthorized alterations."
            </p>

            <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Sealed Timestamp</span>
                <span className="font-mono text-slate-700">{evidence.collectionTimestamp}</span>
              </div>
              <div className="text-right">
                <span className="font-bold text-slate-900 block">{evidence.currentCustodian}</span>
                <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 inline-block mt-0.5">
                  eSign: DIGISIGN-BSA63-VERIFIED-OK
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-emerald-700 font-bold flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Section 63(4) Statutory Form Validated</span>
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Certificate</span>
            </button>
            <button
              onClick={onClose}
              className="px-5 py-2 bg-[#162E52] hover:bg-[#0F2A4A] text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
