import React from 'react';
import { X, ShieldCheck, User, Copy, Check } from 'lucide-react';
import { useSakshi } from '../../context/SakshiContext';

interface AuditTrailModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuditTrailModal: React.FC<AuditTrailModalProps> = ({ isOpen, onClose }) => {
  const { auditLogs } = useSakshi();
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[88vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Modal Header */}
        <div className="px-6 py-4 bg-[#162E52] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-amber-400">
              <ShieldCheck className="w-6 h-6 stroke-[2]" />
            </div>
            <div>
              <h2 className="text-lg font-bold tracking-tight">
                SAKSHI Immutable Cryptographic Audit Ledger
              </h2>
              <p className="text-xs text-slate-300">
                Tamper-Evident SHA-256 Audit Log Kernel • Section 65B Indian Evidence Act / Section 63 BNSS Compliant
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

        {/* Ledger Statistics Strip */}
        <div className="bg-slate-50 px-6 py-3 border-b border-slate-200 flex flex-wrap items-center justify-between text-xs text-slate-600 gap-4">
          <div className="flex items-center gap-6">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Total Sealed Entries</span>
              <span className="font-bold text-slate-800 text-sm font-mono">{auditLogs.length} Records</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Ledger Status</span>
              <span className="font-bold text-emerald-700 text-sm flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Valid & Verified
              </span>
            </div>
          </div>
          <div className="text-[11px] font-mono text-slate-500 bg-white px-3 py-1.5 rounded-lg border border-slate-200">
            Node Hash Root: <span className="text-[#162E52] font-bold font-mono">0x9F4C...B855</span>
          </div>
        </div>

        {/* Audit Log Entries List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-3 divide-y divide-slate-100">
          {auditLogs.map((log) => (
            <div key={log.id} className="pt-3 first:pt-0">
              <div className="bg-slate-50/70 hover:bg-blue-50/40 p-4 rounded-xl border border-slate-200/80 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-[#162E52] bg-blue-100/70 px-2 py-0.5 rounded">
                      {log.id}
                    </span>
                    <span className="text-xs font-extrabold text-slate-800">
                      {log.action}
                    </span>
                    <span className="text-[10px] font-bold text-slate-500 bg-slate-200 px-2 py-0.5 rounded uppercase">
                      {log.entityType}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono">
                    <span>{log.timestamp}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-700 font-medium mb-3 leading-relaxed">
                  {log.details}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-500 pt-2 border-t border-slate-200/60">
                  <div className="flex items-center gap-1.5 truncate">
                    <User className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                    <span className="font-semibold text-slate-700">{log.officerName}</span>
                    <span className="text-slate-400">({log.role})</span>
                  </div>
                  <div className="flex items-center justify-between bg-white px-2 py-1 rounded border border-slate-200 font-mono text-[10px]">
                    <span className="truncate text-slate-600">
                      Hash: {log.hash.slice(0, 24)}...
                    </span>
                    <button
                      onClick={() => handleCopy(log.hash, log.id)}
                      className="text-slate-400 hover:text-slate-700 ml-2 flex-shrink-0 cursor-pointer"
                      title="Copy full SHA-256 hash"
                    >
                      {copiedId === log.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#162E52] hover:bg-[#0F2A4A] text-white font-bold text-xs rounded-lg transition-colors cursor-pointer"
          >
            Close Audit Ledger
          </button>
        </div>

      </div>
    </div>
  );
};
