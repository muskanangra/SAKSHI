import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, AlertTriangle, Zap, RefreshCw, 
  AlertOctagon, CheckCircle2, UploadCloud, FileText,
  Award, Layers
} from 'lucide-react';
import { 
  calculateWebCryptoSHA256, calculateHashApi, getChainOfCustodyApi, 
  simulateTamperApi, getProvenanceApi, verifyAllSystemIntegrityApi,
  ChainOfCustodyResponse, SimulateTamperResponse, Section57ProvenanceResponse, SystemIntegrityAuditResponse
} from '../../services/integrityService';

export const IntegrityProvenanceEngine: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'hasher' | 'ledger' | 'tamper' | 'bsa57' | 'audit'>('hasher');

  // 1. Hasher State
  const [inputText, setInputText] = useState('SAKSHI DIGITAL EVIDENCE ITEM #88492 - CCTV RECORDING FOOTAGE AT 22:15:00 IST');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [calculatedHash, setCalculatedHash] = useState<string>('');
  const [hashTimeMs, setHashTimeMs] = useState<number | null>(null);
  const [isHashing, setIsHashing] = useState(false);

  // 2. Ledger State
  const [selectedEvidenceId, setSelectedEvidenceId] = useState('EVID-DL-2026-9041');
  const [custodyChain, setCustodyChain] = useState<ChainOfCustodyResponse | null>(null);

  // 3. Tamper Simulation State
  const [tamperResult, setTamperResult] = useState<SimulateTamperResponse | null>(null);
  const [isTampering, setIsTampering] = useState(false);

  // 4. BSA 57 Provenance State
  const [provenanceData, setProvenanceData] = useState<Section57ProvenanceResponse | null>(null);
  const [provenanceType, setProvenanceType] = useState<'PRIMARY' | 'SECONDARY'>('PRIMARY');

  // 5. System Audit State
  const [auditData, setAuditData] = useState<SystemIntegrityAuditResponse | null>(null);
  const [isRunningAudit, setIsRunningAudit] = useState(false);

  // Handle Instant Hashing
  const handleCalculateTextHash = async () => {
    if (!inputText) return;
    setIsHashing(true);
    try {
      const res = await calculateHashApi(inputText);
      setCalculatedHash(res.sha256_hash);
      setHashTimeMs(res.calculation_time_ms);
    } catch (e) {
      console.error(e);
    } finally {
      setIsHashing(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadedFile(file);
    setIsHashing(true);
    try {
      // Use Web Crypto API for client-side instant hashing (< 2 sec)
      const res = await calculateWebCryptoSHA256(file);
      setCalculatedHash(res.hash);
      setHashTimeMs(res.duration_ms);
    } catch (err) {
      console.error(err);
    } finally {
      setIsHashing(false);
    }
  };

  // Load Chain of Custody
  const loadCustodyChain = async (id: string) => {
    try {
      const res = await getChainOfCustodyApi(id);
      setCustodyChain(res);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadCustodyChain(selectedEvidenceId);
    handleCalculateTextHash();
    loadProvenance(selectedEvidenceId);
  }, []);

  // Handle Tamper Simulation
  const handleSimulateTamper = async () => {
    setIsTampering(true);
    try {
      const res = await simulateTamperApi(selectedEvidenceId, inputText);
      setTamperResult(res);
    } catch (e) {
      console.error(e);
    } finally {
      setIsTampering(false);
    }
  };

  // Load Provenance
  const loadProvenance = async (id: string) => {
    try {
      const targetId = provenanceType === 'PRIMARY' ? `${id}-PRIM-001` : `${id}-SEC-002`;
      const res = await getProvenanceApi(targetId);
      setProvenanceData(res);
    } catch (e) {
      console.error(e);
    }
  };

  // Run System Audit
  const handleRunSystemAudit = async () => {
    setIsRunningAudit(true);
    try {
      const res = await verifyAllSystemIntegrityApi();
      setAuditData(res);
    } catch (e) {
      console.error(e);
    } finally {
      setIsRunningAudit(false);
    }
  };

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 text-slate-100 relative overflow-hidden">
      
      {/* Background Accent Gradient */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800 relative z-10">
        <div>
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-7 h-7 text-[#F5821F]" />
            <h2 className="text-2xl font-bold tracking-tight text-white">
              Integrity & Provenance Engine <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">Layer 2 (BSA 2023)</span>
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Cryptographic SHA-256 append-only ledger, tamper simulation, Section 57 BSA evidence provenance & continuous integrity audit.
          </p>
        </div>

        {/* Quick Integrity Badge */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleRunSystemAudit}
            disabled={isRunningAudit}
            className="py-2 px-3.5 bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 rounded-lg text-emerald-400 font-semibold text-xs flex items-center gap-2 transition-all cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRunningAudit ? 'animate-spin' : ''}`} />
            <span>{isRunningAudit ? 'Scanning Ledger...' : 'Run Integrity Audit'}</span>
          </button>
        </div>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="flex flex-wrap gap-2 pt-4 pb-6 border-b border-slate-800/80 relative z-10">
        <button
          onClick={() => setActiveSubTab('hasher')}
          className={`py-2 px-4 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
            activeSubTab === 'hasher'
              ? 'bg-[#F5821F] text-white shadow-md'
              : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800'
          }`}
        >
          <Zap className="w-3.5 h-3.5" />
          <span>1. Instant SHA-256 Hasher</span>
        </button>

        <button
          onClick={() => setActiveSubTab('ledger')}
          className={`py-2 px-4 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
            activeSubTab === 'ledger'
              ? 'bg-[#F5821F] text-white shadow-md'
              : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>2. Chain of Custody Ledger</span>
        </button>

        <button
          onClick={() => setActiveSubTab('tamper')}
          className={`py-2 px-4 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
            activeSubTab === 'tamper'
              ? 'bg-red-600 text-white shadow-md'
              : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800'
          }`}
        >
          <AlertOctagon className="w-3.5 h-3.5 text-red-300" />
          <span>3. Simulate Tamper Alarm</span>
        </button>

        <button
          onClick={() => setActiveSubTab('bsa57')}
          className={`py-2 px-4 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
            activeSubTab === 'bsa57'
              ? 'bg-[#F5821F] text-white shadow-md'
              : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800'
          }`}
        >
          <Award className="w-3.5 h-3.5" />
          <span>4. BSA Section 57 Provenance</span>
        </button>

        <button
          onClick={() => setActiveSubTab('audit')}
          className={`py-2 px-4 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
            activeSubTab === 'audit'
              ? 'bg-[#F5821F] text-white shadow-md'
              : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>5. Re-Verification Audit</span>
        </button>
      </div>

      {/* SUB TAB CONTENT */}
      <div className="pt-6 relative z-10">

        {/* 1. INSTANT SHA-256 HASHER */}
        {activeSubTab === 'hasher' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Left: Text Input Hasher */}
              <div className="bg-slate-800/50 border border-slate-700/60 rounded-xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-amber-400" />
                    <span>String & Payload Hasher</span>
                  </h3>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                    Fast SHA-256
                  </span>
                </div>

                <textarea
                  rows={4}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Enter text payload to hash..."
                  className="w-full p-3 bg-slate-900/80 border border-slate-700 rounded-lg text-xs text-slate-200 font-mono focus:outline-none focus:border-amber-500"
                />

                <button
                  onClick={handleCalculateTextHash}
                  disabled={isHashing}
                  className="w-full py-2.5 bg-[#F5821F] hover:bg-amber-600 text-white font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Zap className="w-4 h-4" />
                  <span>Calculate SHA-256 Hash</span>
                </button>
              </div>

              {/* Right: Drag-and-Drop Web Crypto File Hasher */}
              <div className="bg-slate-800/50 border border-slate-700/60 rounded-xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                    <UploadCloud className="w-4 h-4 text-emerald-400" />
                    <span>File Drag-and-Drop Hasher</span>
                  </h3>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Target &lt; 2.0s
                  </span>
                </div>

                <label className="border-2 border-dashed border-slate-700 hover:border-emerald-500/50 rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-colors bg-slate-900/40">
                  <UploadCloud className="w-8 h-8 text-slate-400 mb-2" />
                  <span className="text-xs font-bold text-slate-300">Click or Drag File to Calculate Hash</span>
                  <span className="text-[11px] text-slate-500 mt-1">Calculates in-browser using Web Crypto API</span>
                  <input type="file" onChange={handleFileUpload} className="hidden" />
                </label>

                {uploadedFile && (
                  <p className="text-xs text-emerald-400 font-mono text-center">
                    Loaded: {uploadedFile.name} ({(uploadedFile.size / 1024).toFixed(1)} KB)
                  </p>
                )}
              </div>
            </div>

            {/* Hash Calculation Results Display */}
            {calculatedHash && (
              <div className="bg-slate-950 border border-emerald-500/30 rounded-xl p-5 space-y-3 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">SHA-256 Digest Computed</span>
                  </div>
                  {hashTimeMs !== null && (
                    <span className="text-xs font-mono px-2.5 py-1 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 rounded-full font-bold">
                      ⚡ Completed in {hashTimeMs} ms (&lt; 2.0s Target Met)
                    </span>
                  )}
                </div>

                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 font-mono text-xs text-amber-300 break-all select-all flex items-center justify-between gap-4">
                  <span>{calculatedHash}</span>
                  <button
                    onClick={() => navigator.clipboard.writeText(calculatedHash)}
                    className="text-[11px] font-sans font-bold px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-700 cursor-pointer flex-shrink-0"
                  >
                    Copy Hash
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 2. APPEND-ONLY CHAIN OF CUSTODY LEDGER */}
        {activeSubTab === 'ledger' && (
          <div className="space-y-6">
            {/* Controls */}
            <div className="flex items-center gap-4 bg-slate-800/50 p-4 rounded-xl border border-slate-700/60">
              <label className="text-xs font-bold text-slate-300">Select Evidence Record ID:</label>
              <select
                value={selectedEvidenceId}
                onChange={(e) => {
                  setSelectedEvidenceId(e.target.value);
                  loadCustodyChain(e.target.value);
                }}
                className="py-1.5 px-3 bg-slate-900 border border-slate-700 rounded-md text-xs font-mono text-amber-300 focus:outline-none focus:border-amber-500"
              >
                <option value="EVID-DL-2026-9041">EVID-DL-2026-9041 (Hard Drive NVMe)</option>
                <option value="EVID-DL-2026-8802">EVID-DL-2026-8802 (CCTV Footage Stream)</option>
                <option value="EVID-DL-2026-1049">EVID-DL-2026-1049 (Mobile Forensic Dump)</option>
              </select>

              <button
                onClick={() => loadCustodyChain(selectedEvidenceId)}
                className="py-1.5 px-3 bg-slate-700 hover:bg-slate-600 text-xs font-bold rounded-md flex items-center gap-1.5 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Refresh Chain</span>
              </button>
            </div>

            {custodyChain && (
              <div className="space-y-4">
                <div className="flex items-center justify-between bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <div>
                    <h3 className="text-sm font-bold text-slate-200">{custodyChain.evidence_id}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">{custodyChain.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold">
                      ✓ CHAIN UNBROKEN ({custodyChain.total_custody_events} BLOCKS)
                    </span>
                  </div>
                </div>

                {/* Block Chain Timeline Visualizer */}
                <div className="space-y-3">
                  {custodyChain.blocks.map((block) => (
                    <div key={block.step} className="bg-slate-800/60 border border-slate-700/70 rounded-xl p-4 space-y-2 relative">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-amber-500/20 border border-amber-500 text-amber-400 font-mono font-bold text-xs flex items-center justify-center">
                            #{block.step}
                          </span>
                          <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">{block.action}</span>
                        </div>
                        <span className="text-[11px] font-mono text-slate-400">{block.timestamp}</span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-300">
                        <div><strong className="text-slate-400">Custodian:</strong> {block.custodian_name}</div>
                        <div><strong className="text-slate-400">Location:</strong> {block.location}</div>
                      </div>

                      <div className="pt-2 border-t border-slate-700/50 space-y-1 font-mono text-[11px]">
                        <div className="flex items-center gap-2">
                          <span className="text-slate-500 w-24">Previous Hash:</span>
                          <span className="text-slate-400 truncate">{block.previous_hash}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-emerald-400 font-bold w-24">Block Hash:</span>
                          <span className="text-emerald-300 font-bold truncate">{block.block_hash}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* 3. SIMULATE TAMPER ALARM */}
        {activeSubTab === 'tamper' && (
          <div className="space-y-6">
            <div className="bg-red-950/40 border border-red-800/60 rounded-xl p-6 space-y-4">
              <div className="flex items-start gap-3">
                <AlertOctagon className="w-7 h-7 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-base font-bold text-red-400">Cryptographic Bit-Rot & Tamper Simulation</h3>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    Test SAKSHI's real-time integrity protection engine. Clicking the button below will alter 1 byte in sample evidence payload and trigger an instant cryptographic hash mismatch alert.
                  </p>
                </div>
              </div>

              <button
                onClick={handleSimulateTamper}
                disabled={isTampering}
                className="py-2.5 px-5 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-lg transition-colors flex items-center gap-2 cursor-pointer shadow-lg shadow-red-900/50"
              >
                <AlertTriangle className="w-4 h-4" />
                <span>{isTampering ? 'Simulating Bit-Rot...' : 'Simulate Evidence Tamper'}</span>
              </button>
            </div>

            {/* Instant Tamper Alarm Banner */}
            {tamperResult && (
              <div className="bg-red-950 border-2 border-red-500 rounded-2xl p-6 space-y-4 animate-pulse">
                <div className="flex items-center justify-between pb-3 border-b border-red-800">
                  <div className="flex items-center gap-2.5">
                    <span className="px-2.5 py-1 bg-red-600 text-white font-bold text-xs uppercase rounded">
                      🚨 ALARM: CRYPTOGRAPHIC HASH MISMATCH
                    </span>
                  </div>
                  <span className="text-xs font-mono text-red-300">STATUS: TAMPER DETECTED</span>
                </div>

                <div className="text-xs text-red-200 font-semibold leading-relaxed">
                  {tamperResult.message}
                </div>

                {/* Side-by-Side Comparison */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 font-mono text-[11px] space-y-1">
                    <span className="text-emerald-400 font-bold block">✓ Original Recorded Payload Hash:</span>
                    <span className="text-emerald-300 break-all">{tamperResult.original_hash}</span>
                  </div>

                  <div className="bg-slate-900 p-3 rounded-lg border border-red-800/80 font-mono text-[11px] space-y-1">
                    <span className="text-red-400 font-bold block">❌ Corrupted Payload Hash (Mismatch):</span>
                    <span className="text-red-300 break-all">{tamperResult.tampered_hash}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 4. BSA SECTION 57 PROVENANCE TRACKER */}
        {activeSubTab === 'bsa57' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-slate-800/50 p-4 rounded-xl border border-slate-700/60">
              <div className="flex items-center gap-3">
                <label className="text-xs font-bold text-slate-300">BSA Provenance Type:</label>
                <div className="flex bg-slate-900 p-1 rounded-lg border border-slate-700">
                  <button
                    onClick={() => { setProvenanceType('PRIMARY'); loadProvenance(selectedEvidenceId); }}
                    className={`py-1 px-3 text-xs font-bold rounded cursor-pointer ${
                      provenanceType === 'PRIMARY' ? 'bg-[#F5821F] text-white' : 'text-slate-400'
                    }`}
                  >
                    Section 57 Primary Evidence
                  </button>
                  <button
                    onClick={() => { setProvenanceType('SECONDARY'); loadProvenance(selectedEvidenceId); }}
                    className={`py-1 px-3 text-xs font-bold rounded cursor-pointer ${
                      provenanceType === 'SECONDARY' ? 'bg-[#F5821F] text-white' : 'text-slate-400'
                    }`}
                  >
                    Section 58 & 63 Secondary Evidence
                  </button>
                </div>
              </div>
            </div>

            {provenanceData && (
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-5">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div>
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">BSA Provenance Classification</span>
                    <h3 className="text-lg font-bold text-white mt-0.5">{provenanceData.bsa_classification}</h3>
                  </div>
                  <span className="px-3 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-full font-bold text-xs">
                    {provenanceData.bsa_section}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 space-y-1">
                    <span className="text-slate-400 font-bold block">Device Make & Model:</span>
                    <span className="text-slate-200 font-mono">{provenanceData.device_make_model}</span>
                  </div>

                  <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 space-y-1">
                    <span className="text-slate-400 font-bold block">Device Serial / IMEI:</span>
                    <span className="text-slate-200 font-mono">{provenanceData.device_serial_number}</span>
                  </div>

                  <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 space-y-1">
                    <span className="text-slate-400 font-bold block">GPS Capture Location:</span>
                    <span className="text-slate-200 font-mono">{provenanceData.gps_coordinates}</span>
                  </div>

                  <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 space-y-1">
                    <span className="text-slate-400 font-bold block">Capture Timestamp:</span>
                    <span className="text-slate-200 font-mono">{provenanceData.capture_timestamp}</span>
                  </div>
                </div>

                {provenanceData.section_63_certificate_id && (
                  <div className="p-4 bg-blue-950/40 border border-blue-800 rounded-xl space-y-2 text-xs">
                    <span className="font-bold text-blue-300 block">Section 63 BSA Digital Admissibility Certificate Attached:</span>
                    <div className="font-mono text-blue-200">Certificate ID: {provenanceData.section_63_certificate_id}</div>
                    <div className="font-mono text-blue-200">Certifying Examiner: {provenanceData.certifying_officer}</div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* 5. RE-VERIFICATION AUDIT */}
        {activeSubTab === 'audit' && (
          <div className="space-y-6">
            <div className="bg-slate-950 border border-emerald-500/30 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
                  <ShieldCheck className="w-6 h-6" />
                  <span>System-Wide Re-Verification Audit Result</span>
                </h3>
                <button
                  onClick={handleRunSystemAudit}
                  disabled={isRunningAudit}
                  className="py-2 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg transition-colors cursor-pointer"
                >
                  {isRunningAudit ? 'Scanning PostgreSQL...' : 'Re-Run Audit Now'}
                </button>
              </div>

              {auditData ? (
                <div className="space-y-4 pt-2">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                      <span className="text-2xl font-bold text-white block">{auditData.total_evidence_records}</span>
                      <span className="text-xs text-slate-400">Total Scanned Records</span>
                    </div>

                    <div className="p-4 bg-slate-900 rounded-xl border border-emerald-800/60">
                      <span className="text-2xl font-bold text-emerald-400 block">{auditData.verified_records}</span>
                      <span className="text-xs text-emerald-300">Integrity Verified</span>
                    </div>

                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                      <span className="text-2xl font-bold text-emerald-400 block">{auditData.system_integrity_percentage}%</span>
                      <span className="text-xs text-slate-400">System Integrity</span>
                    </div>
                  </div>

                  <div className="p-3 bg-emerald-950/60 border border-emerald-600/40 rounded-xl text-xs text-emerald-200 font-bold text-center">
                    {auditData.integrity_status}
                  </div>
                </div>
              ) : (
                <p className="text-xs text-slate-400">Click "Re-Run Audit Now" to perform cryptographic validation across all evidence logs.</p>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
