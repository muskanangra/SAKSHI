import React, { useState, useEffect } from 'react';
import { 
  Database, Camera, 
  Link, CheckCircle2, RefreshCw, Zap
} from 'lucide-react';
import { 
  generateEidApi, getSampleLibraryApi, ingestFromESakshyaApi, 
  ingestFromCCTNSApi, ingestCanonicalObjectApi, SampleLibraryItem, CanonicalEvidenceObject 
} from '../../services/ingestionService';

export const EvidenceIngestionHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'sample_lib' | 'esakshya' | 'cctns'>('sample_lib');

  // Generator & Ingestion State
  const [currentEid, setCurrentEid] = useState<string>('EVD-2026-DL-9042');
  const [districtCode, setDistrictCode] = useState<string>('DL');
  const [isGenerating, setIsGenerating] = useState(false);

  // Sample Library State
  const [sampleItems, setSampleItems] = useState<SampleLibraryItem[]>([]);
  const [ingestedResult, setIngestedResult] = useState<CanonicalEvidenceObject | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  // eSakshya Form State
  const [esakshyaOfficerId, setEsakshyaOfficerId] = useState('POLICE-DL-101');
  const [esakshyaFirNumber, setEsakshyaFirNumber] = useState('FIR-2026-DL-0042');
  const [esakshyaLocation, setEsakshyaLocation] = useState('Sector 4, Central Delhi');
  const [esakshyaTitle, setEsakshyaTitle] = useState('Crime Scene Photos & Surveillance Stream');
  const [esakshyaDeviceSerial, setEsakshyaDeviceSerial] = useState('AXN-49201-DL-88');
  const [isSubmittingESakshya, setIsSubmittingESakshya] = useState(false);

  // CCTNS Form State
  const [cctnsFirNumber, setCctnsFirNumber] = useState('FIR-2026-DL-0042');
  const [cctnsSections, setCctnsSections] = useState('BNS Section 303, BNS Section 111');
  const [cctnsComplainant, setCctnsComplainant] = useState('Sh. Vikram Malhotra');
  const [isSubmittingCCTNS, setIsSubmittingCCTNS] = useState(false);

  // Load sample library & generate initial EID
  const loadSamples = async () => {
    try {
      const res = await getSampleLibraryApi();
      setSampleItems(res.items);
    } catch (e) {
      console.error(e);
    }
  };

  const handleGenerateNewEid = async () => {
    setIsGenerating(true);
    try {
      const eid = await generateEidApi(districtCode);
      setCurrentEid(eid);
    } catch (e) {
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    loadSamples();
    handleGenerateNewEid();
  }, []);

  // Ingest sample item into canonical object
  const handleIngestSample = async (item: SampleLibraryItem) => {
    const freshEid = await generateEidApi(districtCode);
    setCurrentEid(freshEid);

    const canonical: CanonicalEvidenceObject = {
      eid: freshEid,
      fir_number: 'FIR-2026-DL-0042',
      evidence_type: 'DIGITAL',
      title: item.title,
      description: `Ingested from ${item.source} (${item.bsa_section})`,
      file_name: item.file_name,
      file_size_bytes: 52428800,
      mime_type: item.mime_type,
      sha256_hash: item.sha256,
      metadata: {
        device: {
          make_model: "National Forensic Registry Node",
          serial_number: "NFR-2026-NODE-01",
          firmware_version: "v4.2-sec"
        },
        location: {
          latitude: 28.6139,
          longitude: 77.2090,
          address: "Central Delhi District Headquarters"
        },
        custodian: {
          official_id: "POLICE-DL-101",
          name: "Insp. Rajesh Kumar",
          rank: "Investigating Officer",
          police_station: "Tilak Marg Police Station"
        },
        capture_timestamp: new Date().toISOString(),
        ingestion_timestamp: new Date().toISOString(),
        source_system: item.source,
        evidence_format: item.type
      },
      bsa_section: item.bsa_section
    };

    try {
      const res = await ingestCanonicalObjectApi(canonical);
      setIngestedResult(res.canonical_object);
      setNotification(`Canonical Evidence Object '${freshEid}' persisted in PostgreSQL!`);
      setTimeout(() => setNotification(null), 4000);
    } catch (err: any) {
      console.error(err);
    }
  };

  // Submit eSakshya Ingestion
  const handleESakshyaSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingESakshya(true);
    try {
      const res = await ingestFromESakshyaApi({
        officer_id: esakshyaOfficerId,
        fir_number: esakshyaFirNumber,
        crime_scene_location: esakshyaLocation,
        title: esakshyaTitle,
        device_serial: esakshyaDeviceSerial,
        content_payload: "ESAKSHYA_CRIME_SCENE_MEDIA_STREAM"
      });
      setIngestedResult(res.canonical_object);
      setCurrentEid(res.canonical_object.eid);
      setNotification(res.message);
      setTimeout(() => setNotification(null), 4000);
    } catch (err: any) {
      console.error(err);
    } finally {
      setIsSubmittingESakshya(false);
    }
  };

  // Submit CCTNS Ingestion
  const handleCCTNSSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingCCTNS(true);
    try {
      const res = await ingestFromCCTNSApi({
        fir_number: cctnsFirNumber,
        act_sections: cctnsSections.split(',').map(s => s.trim()),
        district_code: districtCode,
        complainant_name: cctnsComplainant
      });
      setIngestedResult(res.canonical_object);
      setCurrentEid(res.canonical_object.eid);
      setNotification(res.message);
      setTimeout(() => setNotification(null), 4000);
    } catch (err: any) {
      console.error(err);
    } finally {
      setIsSubmittingCCTNS(false);
    }
  };

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 text-slate-100 relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800 relative z-10">
        <div>
          <div className="flex items-center gap-2.5">
            <Database className="w-7 h-7 text-[#F5821F]" />
            <h2 className="text-2xl font-bold tracking-tight text-white">
              Evidence Ingestion & Adapters <span className="text-xs font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">Layer 1</span>
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Simulated eSakshya & CCTNS/ICJS connectors, Canonical EID generator, and normalized metadata schema.
          </p>
        </div>

        {/* EID Generator Badge */}
        <div className="flex items-center gap-3 bg-slate-950 p-2.5 rounded-xl border border-slate-800">
          <div className="text-right">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Active Canonical EID</span>
            <span className="text-xs font-mono font-bold text-amber-400">{currentEid}</span>
          </div>
          
          <select
            value={districtCode}
            onChange={(e) => setDistrictCode(e.target.value)}
            className="py-1 px-2 bg-slate-900 border border-slate-700 rounded text-xs font-mono text-slate-300"
          >
            <option value="DL">DL (Delhi)</option>
            <option value="MH">MH (Mumbai)</option>
            <option value="KA">KA (Bengaluru)</option>
          </select>

          <button
            onClick={handleGenerateNewEid}
            disabled={isGenerating}
            className="p-2 bg-[#F5821F] hover:bg-amber-600 text-white rounded-lg transition-colors cursor-pointer"
            title="Generate New Canonical EID"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {notification && (
        <div className="mt-4 p-3.5 bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 rounded-xl text-xs font-semibold flex items-center gap-2 relative z-10">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 pt-6 pb-6 border-b border-slate-800/80 relative z-10">
        <button
          onClick={() => setActiveTab('sample_lib')}
          className={`py-2 px-4 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'sample_lib'
              ? 'bg-[#F5821F] text-white shadow-md'
              : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800'
          }`}
        >
          <Database className="w-3.5 h-3.5" />
          <span>1. Sample Evidence Library (5 Files)</span>
        </button>

        <button
          onClick={() => setActiveTab('esakshya')}
          className={`py-2 px-4 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'esakshya'
              ? 'bg-[#F5821F] text-white shadow-md'
              : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800'
          }`}
        >
          <Camera className="w-3.5 h-3.5" />
          <span>2. eSakshya Connector (Crime Scene Media)</span>
        </button>

        <button
          onClick={() => setActiveTab('cctns')}
          className={`py-2 px-4 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'cctns'
              ? 'bg-[#F5821F] text-white shadow-md'
              : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800'
          }`}
        >
          <Link className="w-3.5 h-3.5" />
          <span>3. CCTNS / ICJS FIR Linker</span>
        </button>
      </div>

      {/* TAB CONTENTS */}
      <div className="pt-6 relative z-10">

        {/* 1. SAMPLE EVIDENCE LIBRARY */}
        {activeTab === 'sample_lib' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sampleItems.map((item) => (
                <div key={item.id} className="bg-slate-800/60 border border-slate-700/70 hover:border-amber-500/50 rounded-xl p-4 flex flex-col justify-between gap-4 transition-all">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-slate-900 text-amber-400 border border-slate-700">
                        {item.format_badge}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">{item.file_size}</span>
                    </div>

                    <h4 className="text-xs font-bold text-slate-100 leading-snug">{item.title}</h4>
                    <p className="text-[11px] text-slate-400">{item.source}</p>

                    <div className="p-2 bg-slate-950 rounded border border-slate-800 font-mono text-[10px] text-slate-400 truncate">
                      SHA-256: <span className="text-emerald-400">{item.sha256.substring(0, 24)}...</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleIngestSample(item)}
                    className="w-full py-2 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Zap className="w-3.5 h-3.5" />
                    <span>Ingest as Canonical EID</span>
                  </button>
                </div>
              ))}
            </div>

            {/* Ingested Canonical Preview Card */}
            {ingestedResult && (
              <div className="bg-slate-950 border border-emerald-500/40 rounded-2xl p-5 space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Persisted Canonical Evidence Object</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-amber-400">{ingestedResult.eid}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                  <div><strong className="text-slate-400">FIR Number:</strong> {ingestedResult.fir_number}</div>
                  <div><strong className="text-slate-400">BSA Classification:</strong> {ingestedResult.bsa_section}</div>
                  <div><strong className="text-slate-400">Source Network:</strong> {ingestedResult.metadata.source_system}</div>
                  <div><strong className="text-slate-400">File Name:</strong> {ingestedResult.file_name}</div>
                </div>

                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 font-mono text-[11px] text-emerald-300 break-all">
                  SHA-256 Digest: {ingestedResult.sha256_hash}
                </div>
              </div>
            )}
          </div>
        )}

        {/* 2. eSAKSHYA CONNECTOR */}
        {activeTab === 'esakshya' && (
          <div className="bg-slate-800/50 border border-slate-700/60 rounded-2xl p-6 space-y-5">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
              <Camera className="w-6 h-6 text-amber-400" />
              <div>
                <h3 className="text-base font-bold text-white">eSakshya National Ingestion Connector</h3>
                <p className="text-xs text-slate-400">Import crime-scene photo/video streams with device serial & GPS metadata</p>
              </div>
            </div>

            <form onSubmit={handleESakshyaSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-slate-300 mb-1">Officer Official ID</label>
                <input
                  type="text"
                  required
                  value={esakshyaOfficerId}
                  onChange={(e) => setEsakshyaOfficerId(e.target.value)}
                  className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-slate-200"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">FIR Number</label>
                <input
                  type="text"
                  required
                  value={esakshyaFirNumber}
                  onChange={(e) => setEsakshyaFirNumber(e.target.value)}
                  className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-slate-200"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">Crime Scene Geolocation</label>
                <input
                  type="text"
                  required
                  value={esakshyaLocation}
                  onChange={(e) => setEsakshyaLocation(e.target.value)}
                  className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-slate-200"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">Camera / Device Serial Number</label>
                <input
                  type="text"
                  required
                  value={esakshyaDeviceSerial}
                  onChange={(e) => setEsakshyaDeviceSerial(e.target.value)}
                  className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-slate-200"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block font-bold text-slate-300 mb-1">Capture Title & Description</label>
                <input
                  type="text"
                  required
                  value={esakshyaTitle}
                  onChange={(e) => setEsakshyaTitle(e.target.value)}
                  className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-slate-200"
                />
              </div>

              <div className="md:col-span-2 pt-2">
                <button
                  type="submit"
                  disabled={isSubmittingESakshya}
                  className="w-full py-3 bg-[#F5821F] hover:bg-amber-600 text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Camera className="w-4 h-4" />
                  <span>{isSubmittingESakshya ? 'Ingesting from eSakshya...' : 'Ingest eSakshya Crime-Scene Stream'}</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* 3. CCTNS / ICJS CONNECTOR */}
        {activeTab === 'cctns' && (
          <div className="bg-slate-800/50 border border-slate-700/60 rounded-2xl p-6 space-y-5">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
              <Link className="w-6 h-6 text-blue-400" />
              <div>
                <h3 className="text-base font-bold text-white">CCTNS / ICJS FIR & Case Linker</h3>
                <p className="text-xs text-slate-400">Connect to national CCTNS database, import FIR metadata & legal sections</p>
              </div>
            </div>

            <form onSubmit={handleCCTNSSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-300 mb-1">FIR Number</label>
                <input
                  type="text"
                  required
                  value={cctnsFirNumber}
                  onChange={(e) => setCctnsFirNumber(e.target.value)}
                  className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-slate-200 font-mono"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">Legal Sections (BNS / BSA)</label>
                <input
                  type="text"
                  required
                  value={cctnsSections}
                  onChange={(e) => setCctnsSections(e.target.value)}
                  className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-slate-200"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">Complainant / Victim Name</label>
                <input
                  type="text"
                  required
                  value={cctnsComplainant}
                  onChange={(e) => setCctnsComplainant(e.target.value)}
                  className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-slate-200"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmittingCCTNS}
                className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Link className="w-4 h-4" />
                <span>{isSubmittingCCTNS ? 'Fetching from CCTNS Network...' : 'Link FIR & Case Docket from CCTNS'}</span>
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
