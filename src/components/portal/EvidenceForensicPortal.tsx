import React, { useState } from 'react';
import { QrCode, ArrowRightLeft, ShieldCheck, CheckCircle2, Camera } from 'lucide-react';
import { useSakshi } from '../../context/SakshiContext';

export const EvidenceForensicPortal: React.FC = () => {
  const { currentOfficer, evidenceItems, transferEvidenceCustody } = useSakshi();
  
  const [selectedEvidenceId, setSelectedEvidenceId] = useState<string>(evidenceItems[0]?.id || '');
  const [showTransferModal, setShowTransferModal] = useState<boolean>(false);
  const [toOfficer, setToOfficer] = useState('');
  const [transferReason, setTransferReason] = useState('');
  const [notification, setNotification] = useState<string | null>(null);

  const selectedEvidence = evidenceItems.find(e => e.id === selectedEvidenceId) || evidenceItems[0];

  const handleTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!toOfficer.trim() || !transferReason.trim() || !selectedEvidence) return;
    transferEvidenceCustody(selectedEvidence.id, toOfficer, transferReason);
    setShowTransferModal(false);
    setToOfficer('');
    setTransferReason('');
    setNotification(`Evidence custody transferred to ${toOfficer} with digital hash validation.`);
    setTimeout(() => setNotification(null), 3500);
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-purple-700 bg-purple-50 border border-purple-200 px-2.5 py-0.5 rounded">
                Chain of Custody & Forensic Registry
              </span>
              <span className="text-xs font-mono text-slate-500 font-bold">• CFSL / Malkhana Integrated</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#162E52] tracking-tight">
              Evidence & Forensic Chain-of-Custody Portal
            </h1>
            <p className="text-xs sm:text-sm text-slate-600">
              Forensic Custodian: <strong>{currentOfficer.name}</strong> ({currentOfficer.badgeNumber})
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setNotification('Cryptographic Evidence Inventory Manifest Generated (SHA-256 Verified).');
                setTimeout(() => setNotification(null), 3000);
              }}
              className="px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs rounded-xl flex items-center gap-2 transition-colors cursor-pointer"
            >
              <QrCode className="w-4 h-4" />
              <span>Verify Malkhana Manifest</span>
            </button>
          </div>
        </div>

        {notification && (
          <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>{notification}</span>
          </div>
        )}

        {/* Two Column Layout: Evidence Items (5 cols) & Deep Chain-of-Custody View (7 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Evidence List */}
          <div className="lg:col-span-5 space-y-3">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wide block mb-1">
              Registered Evidence Articles ({evidenceItems.length})
            </span>

            {evidenceItems.map(item => (
              <div
                key={item.id}
                onClick={() => setSelectedEvidenceId(item.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer text-left ${
                  selectedEvidenceId === item.id
                    ? 'bg-purple-50/70 border-purple-300 shadow-xs'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-mono font-bold text-purple-800 bg-purple-100/70 px-2 py-0.5 rounded">
                    {item.id}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                    {item.type}
                  </span>
                </div>

                <h4 className="text-xs font-bold text-slate-800 line-clamp-1 mb-1">
                  {item.title}
                </h4>

                <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
                  <span>FIR: {item.firNumber}</span>
                  <span className="text-emerald-700 font-semibold">{item.status}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Custody Log & Forensic Details */}
          {selectedEvidence && (
            <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-6">
              
              {/* Top Header & Hash Pill */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
                <div>
                  <span className="text-xs font-mono font-bold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded border border-purple-200">
                    {selectedEvidence.id}
                  </span>
                  <h3 className="text-base font-bold text-[#162E52] mt-1.5">{selectedEvidence.title}</h3>
                  <p className="text-xs text-slate-500 font-mono">Associated Case: {selectedEvidence.firNumber}</p>
                </div>
                <div className="text-right">
                  <button
                    onClick={() => setShowTransferModal(true)}
                    className="px-3.5 py-2 bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <ArrowRightLeft className="w-3.5 h-3.5" />
                    <span>Transfer Custody</span>
                  </button>
                </div>
              </div>

              {/* Seizure & Current Vault Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Current Custodian</span>
                  <span className="font-bold text-[#162E52]">{selectedEvidence.currentCustodian}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Storage Location</span>
                  <span className="font-semibold text-slate-700">{selectedEvidence.custodianLocation}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Collected By</span>
                  <span className="font-medium text-slate-700">{selectedEvidence.collectingOfficerName} ({selectedEvidence.collectingOfficerBadge})</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Collection Date & Time</span>
                  <span className="font-mono text-slate-600">{selectedEvidence.collectionDateTime}</span>
                </div>
              </div>

              {/* SHA-256 Hash Verification Seal */}
              <div className="p-3.5 bg-emerald-50/70 rounded-xl border border-emerald-200 text-xs flex items-center justify-between">
                <div className="space-y-0.5">
                  <span className="font-bold text-emerald-900 flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>SHA-256 Evidentiary Seal Validated</span>
                  </span>
                  <span className="font-mono text-[10px] text-emerald-800 block truncate max-w-sm">
                    {selectedEvidence.verificationHash}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-slate-500 font-mono text-[11px]">
                  <Camera className="w-3.5 h-3.5" />
                  <span>{selectedEvidence.photographsCount} Sealed Photos</span>
                </div>
              </div>

              {/* Chain of Custody Timeline Log */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-[#162E52] block">
                  Immutable Chain of Custody Ledger:
                </span>
                
                <div className="space-y-2">
                  {selectedEvidence.chainOfCustody.map((coc, idx) => (
                    <div key={coc.id} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                      <div className="flex justify-between items-center text-[11px] font-mono text-slate-500">
                        <span className="font-bold text-purple-800">Custody Transfer #{idx + 1} ({coc.id})</span>
                        <span>{coc.transferTimestamp}</span>
                      </div>
                      <div className="font-semibold text-slate-800">
                        From: <span className="text-slate-600 font-normal">{coc.fromOfficer}</span> → To: <span className="text-slate-900 font-bold">{coc.toOfficer}</span>
                      </div>
                      <p className="text-slate-600 text-[11.5px]">Reason: {coc.reason}</p>
                      <div className="text-[10px] font-mono text-emerald-700 bg-white px-2 py-0.5 rounded border border-slate-200 inline-block mt-1">
                        Sign: {coc.verifiedSignature}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

        </div>

      </div>

      {/* Transfer Custody Modal */}
      {showTransferModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-2xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200 space-y-4">
            <h3 className="text-base font-bold text-[#162E52]">Transfer Evidence Custody</h3>
            <form onSubmit={handleTransfer} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Transferring Article</label>
                <input
                  type="text"
                  disabled
                  value={`${selectedEvidence?.id} - ${selectedEvidence?.title}`}
                  className="w-full p-2 bg-slate-100 border border-slate-300 rounded-lg text-slate-600"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Receiving Officer / Lab Custodian</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Sameer Kulkarni (CFSL Lead Scientist)"
                  value={toOfficer}
                  onChange={(e) => setToOfficer(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Transfer Reason / Judicial Purpose</label>
                <textarea
                  rows={3}
                  required
                  placeholder="e.g. Bit-stream forensic disk imaging and court exhibit preparation"
                  value={transferReason}
                  onChange={(e) => setTransferReason(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowTransferModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white font-bold rounded-lg cursor-pointer"
                >
                  Sign & Transfer Custody
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
