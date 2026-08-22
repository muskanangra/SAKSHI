import React, { useState } from 'react';
import { X, ShieldAlert, CheckCircle2, ChevronRight, AlertTriangle, Download, RefreshCw, ShieldCheck } from 'lucide-react';
import { useSakshi } from '../../context/SakshiContext';


interface JudgeDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const JudgeDemoModal: React.FC<JudgeDemoModalProps> = ({ isOpen, onClose }) => {
  const {
    evidenceItems,
    simulateEvidenceTamper,
    restoreEvidenceIntegrity,
    importFromConnector,
    resolveMissingBSAField,
    generateCourtPackage
  } = useSakshi();

  const [activeStep, setActiveStep] = useState<number>(1);
  const [selectedDemoEID, setSelectedDemoEID] = useState<string>('EVD-2026-DL-9042');
  const [lastGeneratedPkgId, setLastGeneratedPkgId] = useState<string | null>(null);

  if (!isOpen) return null;

  const targetEvidence = evidenceItems.find(e => e.id === selectedDemoEID) || evidenceItems[0];

  const steps = [
    { num: 1, title: 'Multi-Modal Evidence', desc: 'CCTV, CDR, Mobile Dumps' },
    { num: 2, title: 'Canonical Ingestion', desc: 'eSakshya & CCTNS Normalization' },
    { num: 3, title: 'Integrity Verification', desc: 'SHA-256 Ledger & Drift Alarm' },
    { num: 4, title: 'Evidence Graph & AI', desc: 'Entity Links & EID Citations' },
    { num: 5, title: 'BSA 63 Compliance', desc: 'Statutory Certificate Attestation' },
    { num: 6, title: 'Court Package Dossier', desc: 'Master Judicial Package' }
  ];

  const handleRunTamper = () => {
    simulateEvidenceTamper(targetEvidence.id);
  };

  const handleRestoreIntegrity = () => {
    restoreEvidenceIntegrity(targetEvidence.id);
  };

  const handleSimulateImport = () => {
    const newId = importFromConnector('eSakshya');
    setSelectedDemoEID(newId);
  };

  const handleGenerateCourtPkg = () => {
    const pkg = generateCourtPackage('CASE-2026-DL-001');
    setLastGeneratedPkgId(pkg.id);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-5xl max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="px-6 py-4 bg-[#162E52] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500/20 border border-orange-400/40 flex items-center justify-center text-[#F5821F]">
              <ShieldCheck className="w-6 h-6 stroke-[2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold tracking-tight">SAKSHI: Operational Workflow & Verification Tour</h2>
                <span className="bg-[#138808] text-white text-[10px] font-extrabold px-2 py-0.5 rounded uppercase">MHA Certified</span>
              </div>
              <p className="text-xs text-slate-300">
                End-to-End Evidence Intelligence, Provenance Verification & Court-Readiness Pipeline
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

        {/* 6 Step Progress Navigation Bar */}
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-3 overflow-x-auto">
          <div className="flex items-center gap-2 min-w-[700px]">
            {steps.map(s => {
              const isCurrent = activeStep === s.num;
              const isPast = activeStep > s.num;
              return (
                <button
                  key={s.num}
                  onClick={() => setActiveStep(s.num)}
                  className={`flex-1 p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                    isCurrent
                      ? 'bg-[#162E52] text-white border-[#162E52] shadow-sm'
                      : isPast
                      ? 'bg-emerald-50/80 text-emerald-900 border-emerald-200'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono mb-0.5">
                    <span className="font-bold">Stage {s.num}</span>
                  </div>
                  <span className="text-xs font-bold block truncate">{s.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step Interactive Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          
          {/* STEP 1: MULTI-MODAL EVIDENCE */}
          {activeStep === 1 && (
            <div className="space-y-6">
              <div className="bg-blue-50/70 border border-blue-200 p-5 rounded-2xl">
                <span className="text-xs font-extrabold text-[#162E52] uppercase tracking-wider block mb-1">
                  Stage 1 • Multi-Modal Evidence Overview
                </span>
                <h3 className="text-xl font-bold text-[#162E52] mb-2">
                  Unified Ingestion of Heterogeneous Judicial Digital Evidence
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Electronic evidence in criminal investigations comprises diverse digital artifacts: CCTV video feeds, cellular CDR/IPDR dumps, UFDR phone extractions, and emergency dispatch voice recordings. SAKSHI unifies them under a single cryptographic governance framework.
                </p>
              </div>

              {/* Multi-modal Evidence Sample Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-2">
                  <span className="text-xs font-bold text-slate-400 block uppercase font-mono">Exhibit 1</span>
                  <h4 className="text-xs font-bold text-slate-800">CCTV Traffic Cam Feed #08</h4>
                  <span className="text-[11px] font-mono text-slate-500 block">48 MB • MP4 (H.265)</span>
                  <span className="text-[10px] bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-bold">eSakshya Gateway Node</span>
                </div>
                <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-2">
                  <span className="text-xs font-bold text-slate-400 block uppercase font-mono">Exhibit 2</span>
                  <h4 className="text-xs font-bold text-slate-800">UFDR iPhone 14 Pro Extraction</h4>
                  <span className="text-[11px] font-mono text-slate-500 block">124 MB • JSON / SQLite</span>
                  <span className="text-[10px] bg-purple-100 text-purple-800 px-2 py-0.5 rounded font-bold">CFSL Digital Repository</span>
                </div>
                <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-2">
                  <span className="text-xs font-bold text-slate-400 block uppercase font-mono">Exhibit 3</span>
                  <h4 className="text-xs font-bold text-slate-800">Airtel / Jio CDR Cell Tower Logs</h4>
                  <span className="text-[11px] font-mono text-slate-500 block">890 KB • CSV Encrypted</span>
                  <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-bold">CCTNS Subpoena Channel</span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: INGESTION ADAPTER & EID GENERATION */}
          {activeStep === 2 && (
            <div className="space-y-6">
              <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl space-y-2">
                <span className="text-xs font-extrabold text-[#162E52] uppercase tracking-wider block">
                  Stage 2 • Canonical Evidence Normalization
                </span>
                <h3 className="text-lg font-bold text-[#162E52]">
                  Automated Canonical Evidence Object (EID) Generation
                </h3>
                <p className="text-xs text-slate-600">
                  SAKSHI serves as an interoperable evidence intelligence layer above CCTNS and eSakshya, generating immutable SHA-256 fingerprints, capturing device hardware parameters, and establishing chain-of-custody ledgers.
                </p>
              </div>

              {/* Interactive Ingestion Trigger */}
              <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-4">
                <span className="text-xs font-bold text-slate-700 block">Evidence Ingestion Pipeline:</span>
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={handleSimulateImport}
                    className="px-5 py-2.5 bg-[#162E52] hover:bg-[#0F2A4A] text-white font-bold text-xs rounded-xl flex items-center gap-2 transition-colors cursor-pointer shadow-sm"
                  >
                    <Download className="w-4 h-4 text-amber-300" />
                    <span>Inbound eSakshya Evidence Stream</span>
                  </button>
                </div>

                <div className="p-4 bg-emerald-50/70 rounded-xl border border-emerald-200 text-xs font-mono space-y-1">
                  <span className="font-bold text-emerald-900 block">Active Canonical Evidence: {targetEvidence.id}</span>
                  <p className="text-emerald-800">Source: {targetEvidence.sourceSystem} • Format: {targetEvidence.fileFormat}</p>
                  <p className="text-emerald-800 truncate">SHA-256: {targetEvidence.currentHashSHA256}</p>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: PROVENANCE & TAMPER SIMULATION */}
          {activeStep === 3 && (
            <div className="space-y-6">
              <div className="bg-amber-50/70 border border-amber-200 p-5 rounded-2xl space-y-2">
                <span className="text-xs font-extrabold text-amber-900 uppercase tracking-wider block">
                  Stage 3 • Cryptographic Integrity & Tamper Alarm
                </span>
                <h3 className="text-lg font-bold text-[#162E52]">
                  Autonomous Bit-Level Hash Drift Detection
                </h3>
                <p className="text-xs text-slate-700">
                  Continuous cryptographic verification detects any unauthorized alteration in storage copies, instantly raising an alarm and halting judicial admissibility.
                </p>
              </div>

              <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700">Selected Target Exhibit: {targetEvidence.id}</span>
                  <div className="flex items-center gap-2">
                    {!targetEvidence.isTampered ? (
                      <button
                        onClick={handleRunTamper}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <AlertTriangle className="w-4 h-4" />
                        <span>Run Hash Drift Test</span>
                      </button>
                    ) : (
                      <button
                        onClick={handleRestoreIntegrity}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <RefreshCw className="w-4 h-4" />
                        <span>Re-Verify Immutable Vault Copy</span>
                      </button>
                    )}
                  </div>
                </div>

                {targetEvidence.isTampered ? (
                  <div className="p-4 bg-red-50 border-2 border-red-400 rounded-xl space-y-2 animate-pulse">
                    <span className="text-xs font-extrabold text-red-900 flex items-center gap-1.5">
                      <ShieldAlert className="w-4 h-4 text-red-600" />
                      <span>INTEGRITY ALARM: Hash Drift Detected!</span>
                    </span>
                    <p className="text-xs text-red-800 font-mono">
                      Expected: {targetEvidence.originalHashSHA256.slice(0, 32)}...
                      <br />
                      Current: &nbsp;{targetEvidence.currentHashSHA256.slice(0, 32)}...
                    </p>
                    <span className="text-[11px] text-red-700 block font-semibold">
                      Admissibility Status: SUSPENDED (Section 63 Certificate Invalidated)
                    </span>
                  </div>
                ) : (
                  <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-900 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>100% Hash Match Verified (Zero Drift)</span>
                    </span>
                    <span className="text-[11px] font-mono text-emerald-700 bg-white px-2.5 py-1 rounded border border-emerald-200">
                      SHA-256 Validated
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 4: EXPLAINABLE AI INVESTIGATION WORKSPACE */}
          {activeStep === 4 && (
            <div className="space-y-6">
              <div className="bg-indigo-50/70 border border-indigo-200 p-5 rounded-2xl space-y-2">
                <span className="text-xs font-extrabold text-indigo-900 uppercase tracking-wider block">
                  Stage 4 • Source-Grounded Explainable AI
                </span>
                <h3 className="text-lg font-bold text-[#162E52]">
                  Semantic Evidence Search with Strict Legal Citations
                </h3>
                <p className="text-xs text-slate-700">
                  Every investigative finding resolves back to verifiable EIDs, timestamps, and certified document sections.
                </p>
              </div>

              <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-4">
                <div className="p-3 bg-slate-100 rounded-xl text-xs font-mono text-slate-700">
                  <strong>Query:</strong> "Synthesize all movements and communication of Suspect Rohan Sethi between 23:00 and 23:45 on incident night."
                </div>

                <div className="p-4 bg-blue-50/60 rounded-xl border border-blue-200/80 text-xs text-slate-800 space-y-3">
                  <span className="font-bold text-[#162E52] block">Synthesized Investigative Timeline:</span>
                  <p className="leading-relaxed">
                    Accused <strong>Rohan Sethi</strong> was visually captured at Connaught Place at 23:18 IST driving Creta DL-3C-AZ-4901. Mobile extraction confirms 3 encrypted Signal calls to associate Mohit Khurana at 23:35 IST, corroborated by cellular CDR pings at Khan Market tower at 23:42 IST.
                  </p>

                  <div className="space-y-1.5 pt-2 border-t border-blue-200/60">
                    <span className="text-[11px] font-bold text-slate-600 uppercase">Clickable Verifiable Citations:</span>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2.5 py-1 bg-white rounded-lg border border-slate-300 font-mono font-bold text-[#162E52] text-[11px]">
                        [EVD-2026-DL-9042] CCTV Timestamp 00:18:14
                      </span>
                      <span className="px-2.5 py-1 bg-white rounded-lg border border-slate-300 font-mono font-bold text-[#162E52] text-[11px]">
                        [EVD-2026-DL-9043] UFDR Row #881
                      </span>
                      <span className="px-2.5 py-1 bg-white rounded-lg border border-slate-300 font-mono font-bold text-[#162E52] text-[11px]">
                        [EVD-2026-DL-9044] CDR Line #492
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: BSA SECTION 63 COMPLIANCE */}
          {activeStep === 5 && (
            <div className="space-y-6">
              <div className="bg-emerald-50/70 border border-emerald-200 p-5 rounded-2xl space-y-2">
                <span className="text-xs font-extrabold text-emerald-900 uppercase tracking-wider block">
                  Stage 5 • Statutory Judicial Admissibility
                </span>
                <h3 className="text-lg font-bold text-[#162E52]">
                  Bharatiya Sakshya Adhiniyam (BSA) Section 63 Certificate Generation
                </h3>
                <p className="text-xs text-slate-700">
                  Automated validation of Section 63(4) conditions: device operating status, lawful custodian identity, and cryptographic hash attestation.
                </p>
              </div>

              <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800 font-mono">Exhibit: {targetEvidence.id}</span>
                  <span className="text-xs font-bold px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full">
                    Compliance Score: {targetEvidence.bsaCompliance.overallScore}%
                  </span>
                </div>

                {targetEvidence.bsaCompliance.missingFields.length > 0 ? (
                  <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl flex items-center justify-between text-xs">
                    <span className="text-amber-900 font-medium">
                      Missing Attestation: <strong>{targetEvidence.bsaCompliance.missingFields[0]}</strong>
                    </span>
                    <button
                      onClick={() => resolveMissingBSAField(targetEvidence.id, targetEvidence.bsaCompliance.missingFields[0], 'CERT-EXAMINER-79A-VERIFIED')}
                      className="px-3 py-1.5 bg-[#F5821F] hover:bg-[#E06D0B] text-white font-bold rounded-lg cursor-pointer"
                    >
                      Endorse & Validate
                    </button>
                  </div>
                ) : (
                  <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 font-semibold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Statutory Section 63 Schedule Certificate fully compiled and ready for signature.</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 6: MASTER COURT PACKAGE */}
          {activeStep === 6 && (
            <div className="space-y-6">
              <div className="bg-[#162E52] text-white p-5 rounded-2xl space-y-2">
                <span className="text-xs font-extrabold text-[#F5821F] uppercase tracking-wider block">
                  Stage 6 • Master Judicial Submission
                </span>
                <h3 className="text-lg font-bold">
                  One-Click Court Submission Dossier Generation
                </h3>
                <p className="text-xs text-slate-300">
                  Comprehensive judicial bundle with certified exhibits, Section 63 Schedule Certificates, and provenance ledgers.
                </p>
              </div>

              <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-slate-800 block">Master Case Dossier: FIR No. 142/2026</span>
                    <span className="text-xs text-slate-500">Tis Hazari Special Cyber Court Docket</span>
                  </div>
                  <button
                    onClick={handleGenerateCourtPkg}
                    className="px-5 py-2.5 bg-[#F5821F] hover:bg-[#E06D0B] text-white font-bold text-xs rounded-xl flex items-center gap-2 transition-colors cursor-pointer shadow-sm"
                  >
                    <Download className="w-4 h-4" />
                    <span>Generate Master Court Package</span>
                  </button>
                </div>

                {lastGeneratedPkgId && (
                  <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs space-y-2 font-mono text-emerald-900">
                    <div className="flex justify-between font-bold">
                      <span>Package ID: {lastGeneratedPkgId}</span>
                      <span className="text-emerald-700">Digital Signature Verified</span>
                    </div>
                    <p className="text-[11px] text-emerald-800">
                      Contains: 3 Digital Exhibits • BSA Section 63 Schedule Certificate • Signed Chain-of-Custody Ledger • Exhibit Concordance Index
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

        </div>

        {/* Footer Navigation */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={() => setActiveStep(prev => Math.max(1, prev - 1))}
            disabled={activeStep === 1}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 disabled:opacity-50 text-slate-700 font-bold text-xs rounded-lg cursor-pointer transition-colors"
          >
            Previous Stage
          </button>

          <span className="text-xs font-mono text-slate-500 font-bold">
            Stage {activeStep} of 6
          </span>

          {activeStep < 6 ? (
            <button
              onClick={() => setActiveStep(prev => Math.min(6, prev + 1))}
              className="px-5 py-2 bg-[#162E52] hover:bg-[#0F2A4A] text-white font-bold text-xs rounded-lg cursor-pointer flex items-center gap-1.5 transition-colors"
            >
              <span>Next Stage</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={onClose}
              className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-lg cursor-pointer transition-colors"
            >
              Close Tour
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
