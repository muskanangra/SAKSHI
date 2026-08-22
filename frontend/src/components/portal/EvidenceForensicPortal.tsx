import React, { useState } from 'react';
import {
  ArrowRightLeft,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Download,
  FileCheck,
  ShieldAlert
} from 'lucide-react';
import { useSakshi } from '../../context/SakshiContext';
import { BSA63CertificateModal } from './BSA63CertificateModal';

export const EvidenceForensicPortal: React.FC = () => {
  const {
    currentOfficer,
    evidenceItems,
    transferEvidenceCustody,
    simulateEvidenceTamper,
    restoreEvidenceIntegrity,
    importFromConnector,
    resolveMissingBSAField
  } = useSakshi();
  
  const [selectedEvidenceId, setSelectedEvidenceId] = useState<string>(evidenceItems[0]?.id || '');
  const [showTransferModal, setShowTransferModal] = useState<boolean>(false);
  const [showCertModal, setShowCertModal] = useState<boolean>(false);
  const [toOfficer, setToOfficer] = useState('');
  const [transferReason, setTransferReason] = useState('');
  const [transferLocation, setTransferLocation] = useState('CFSL Central Vault Room #304');
  const [notification, setNotification] = useState<string | null>(null);

  const selectedEvidence = evidenceItems.find(e => e.id === selectedEvidenceId) || evidenceItems[0];

  const handleTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!toOfficer.trim() || !transferReason.trim() || !selectedEvidence) return;
    transferEvidenceCustody(selectedEvidence.id, toOfficer, transferReason, transferLocation);
    setShowTransferModal(false);
    setToOfficer('');
    setTransferReason('');
    setNotification(`Evidence custody transferred to ${toOfficer} with digital hash validation.`);
    setTimeout(() => setNotification(null), 3500);
  };

  const handleImport = (source: 'eSakshya' | 'CCTNS' | 'ICJS') => {
    const newEID = importFromConnector(source);
    setSelectedEvidenceId(newEID);
    setNotification(`Imported canonical evidence ${newEID} via ${source} adapter.`);
    setTimeout(() => setNotification(null), 4000);
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-purple-700 bg-purple-50 border border-purple-200 px-2.5 py-0.5 rounded-full">
                Chain of Custody & Forensic Registry
              </span>
              <span className="text-xs font-mono text-slate-500 font-bold">• CFSL / Malkhana Integrated</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#162E52] tracking-tight">
              Evidence & Forensic Chain-of-Custody Portal
            </h1>
            <p className="text-xs sm:text-sm text-slate-600">
              Forensic Custodian: <strong>{currentOfficer.name}</strong> ({currentOfficer.badgeNumber}) • {currentOfficer.department}
            </p>
          </div>

          {/* Ingestion Stream Adapter Quick Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => handleImport('eSakshya')}
              className="px-3.5 py-2 bg-[#162E52] hover:bg-[#0F2A4A] text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <Download className="w-3.5 h-3.5 text-amber-300" />
              <span>Import from eSakshya</span>
            </button>
            <button
              onClick={() => handleImport('CCTNS')}
              className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-300"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span>Import CCTNS Exhibit</span>
            </button>
          </div>
        </div>

        {notification && (
          <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-2xl text-xs font-semibold flex items-center gap-2 animate-in fade-in duration-150">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>{notification}</span>
          </div>
        )}

        {/* Two Column Layout: Evidence List (5 cols) & Deep Integrity Dossier (7 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Evidence Articles List */}
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                Canonical Evidence Objects ({evidenceItems.length})
              </span>
              <span className="text-[11px] font-mono text-slate-400">Section 63 BSA</span>
            </div>

            {evidenceItems.map(item => (
              <div
                key={item.id}
                onClick={() => setSelectedEvidenceId(item.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer text-left ${
                  selectedEvidenceId === item.id
                    ? 'bg-purple-50/70 border-purple-400 shadow-xs'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-mono font-bold text-purple-800 bg-purple-100/70 px-2 py-0.5 rounded">
                      {item.id}
                    </span>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 uppercase">
                      {item.sourceSystem}
                    </span>
                  </div>
                  {item.isTampered ? (
                    <span className="text-[10px] font-extrabold bg-red-100 text-red-800 px-2 py-0.5 rounded-full flex items-center gap-1 animate-pulse">
                      <AlertTriangle className="w-3 h-3" />
                      <span>TAMPER DETECTED</span>
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full">
                      BSA 63: {item.bsaCompliance.overallScore}%
                    </span>
                  )}
                </div>

                <h4 className="text-xs font-bold text-slate-800 line-clamp-1 mb-1">
                  {item.title}
                </h4>

                <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
                  <span>{item.firNumber}</span>
                  <span className="truncate max-w-[140px]">{item.fileFormat}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Custody Log & Forensic Details */}
          {selectedEvidence && (
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs space-y-6">
              
              {/* Top Header & Interactive Demo Controls */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-md border border-purple-200">
                      {selectedEvidence.id}
                    </span>
                    <span className="text-xs font-bold text-slate-500 font-mono">
                      {selectedEvidence.provenanceType}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-[#162E52] mt-1.5">{selectedEvidence.title}</h3>
                  <p className="text-xs text-slate-500 font-mono">Associated Case: {selectedEvidence.firNumber}</p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {/* Simulate Tamper Button */}
                  {!selectedEvidence.isTampered ? (
                    <button
                      onClick={() => simulateEvidenceTamper(selectedEvidence.id)}
                      className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 font-bold text-xs rounded-xl flex items-center gap-1 transition-colors cursor-pointer"
                      title="Simulate 1-bit malicious modification to prove hash mismatch alarm"
                    >
                      <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
                      <span>Simulate Tamper</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => restoreEvidenceIntegrity(selectedEvidence.id)}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Restore Vault Copy</span>
                    </button>
                  )}

                  <button
                    onClick={() => setShowTransferModal(true)}
                    className="px-3.5 py-1.5 bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <ArrowRightLeft className="w-3.5 h-3.5" />
                    <span>Transfer Custody</span>
                  </button>
                </div>
              </div>

              {/* Tamper Alert Warning Banner (If Tampered) */}
              {selectedEvidence.isTampered && (
                <div className="p-4 bg-red-50 border-2 border-red-300 rounded-2xl space-y-1.5 animate-pulse">
                  <div className="flex items-center gap-2 text-red-900 font-bold text-xs">
                    <ShieldAlert className="w-4 h-4 text-red-600" />
                    <span>HASH MISMATCH DETECTED: Storage copy has deviated from original sealed fingerprint!</span>
                  </div>
                  <p className="text-[11.5px] text-red-800 font-mono">
                    Expected: {selectedEvidence.originalHashSHA256}
                    <br />
                    Computed: {selectedEvidence.currentHashSHA256}
                  </p>
                  <span className="text-[10.5px] font-bold text-red-700 block">
                    Admissibility Status: REJECTED under Section 63(2) BSA until provenance is re-attested.
                  </span>
                </div>
              )}

              {/* SHA-256 Hash Verification & BSA Section 63 Scorecard */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Hash Integrity Box */}
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#162E52] flex items-center gap-1">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>Cryptographic Fingerprint</span>
                    </span>
                    <span className="text-[10px] font-mono font-bold bg-white px-2 py-0.5 rounded border border-slate-200">
                      SHA-256
                    </span>
                  </div>
                  <p className="text-[10.5px] font-mono text-slate-700 break-all bg-white p-2 rounded-xl border border-slate-200">
                    {selectedEvidence.currentHashSHA256}
                  </p>
                  <span className="text-[11px] text-slate-500 block">
                    File Size: {(selectedEvidence.fileSizeBytes / (1024 * 1024)).toFixed(2)} MB
                  </span>
                </div>

                {/* BSA 63 Readiness Box */}
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#162E52]">BSA Section 63 Readiness</span>
                    <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                      selectedEvidence.bsaCompliance.isCertificateReady
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {selectedEvidence.bsaCompliance.overallScore}% Ready
                    </span>
                  </div>

                  {selectedEvidence.bsaCompliance.missingFields.length > 0 ? (
                    <div className="space-y-1.5 pt-1">
                      <span className="text-[11px] text-amber-800 block">
                        Missing: {selectedEvidence.bsaCompliance.missingFields.join(', ')}
                      </span>
                      <button
                        onClick={() => resolveMissingBSAField(selectedEvidence.id, selectedEvidence.bsaCompliance.missingFields[0], 'CERT-EXAMINER-79A-VERIFIED')}
                        className="px-2.5 py-1 bg-[#F5821F] hover:bg-[#E06D0B] text-white font-bold text-[11px] rounded-lg transition-colors cursor-pointer"
                      >
                        Endorse Section 79A IT Act Credential
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-1.5 pt-1">
                      <span className="text-[11px] text-emerald-700 font-semibold block">
                        All Section 63(4) statutory fields complete.
                      </span>
                      <button
                        onClick={() => setShowCertModal(true)}
                        className="px-3 py-1 bg-[#162E52] hover:bg-[#0F2A4A] text-white font-bold text-[11px] rounded-lg transition-colors cursor-pointer flex items-center gap-1"
                      >
                        <FileCheck className="w-3.5 h-3.5" />
                        <span>View Section 63 Schedule Certificate</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Seizure & Current Vault Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Current Custodian</span>
                  <span className="font-bold text-[#162E52]">{selectedEvidence.currentCustodian}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Storage Vault / Node</span>
                  <span className="font-semibold text-slate-700">{selectedEvidence.storageVault}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Source Device / Hardware</span>
                  <span className="font-medium text-slate-800">{selectedEvidence.bsaCompliance.sourceDeviceMakeModel}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Device IMEI / MAC</span>
                  <span className="font-mono text-slate-700">{selectedEvidence.bsaCompliance.sourceDeviceIMEIOrMAC}</span>
                </div>
              </div>

              {/* Chain of Custody Timeline Log */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-[#162E52] block">
                  Immutable Chain of Custody Ledger (IT Act Section 5 Compliant):
                </span>
                
                <div className="space-y-2">
                  {selectedEvidence.chainOfCustody.map((coc, idx) => (
                    <div key={coc.id} className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-1">
                      <div className="flex justify-between items-center text-[11px] font-mono text-slate-500">
                        <span className="font-bold text-purple-800">Custody Event #{idx + 1} ({coc.id})</span>
                        <span>{coc.transferTimestamp}</span>
                      </div>
                      <div className="font-semibold text-slate-800">
                        From: <span className="text-slate-600 font-normal">{coc.fromOfficer}</span> → To: <span className="text-slate-900 font-bold">{coc.toOfficer}</span>
                      </div>
                      <p className="text-slate-600 text-[11.5px]">Reason: {coc.reason} • Location: {coc.location}</p>
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
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-xl border border-slate-200 space-y-4">
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
                <label className="block font-bold text-slate-700 mb-1">Receiving Officer / Custodian</label>
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
                <label className="block font-bold text-slate-700 mb-1">New Vault / Location</label>
                <input
                  type="text"
                  required
                  value={transferLocation}
                  onChange={(e) => setTransferLocation(e.target.value)}
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

      {/* BSA Section 63 Schedule Certificate Modal */}
      <BSA63CertificateModal
        evidence={selectedEvidence}
        isOpen={showCertModal}
        onClose={() => setShowCertModal(false)}
      />

    </div>
  );
};
