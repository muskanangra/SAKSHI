import React, { useState } from 'react';
import { PackageCheck, CheckCircle2 } from 'lucide-react';
import { generateCourtPackageApi, CourtPackageResponse } from '../../services/masterplanServices';

export const CourtPackageGenerator: React.FC = () => {
  const [caseId] = useState('CASE-0042');
  const [packageData, setPackageData] = useState<CourtPackageResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGeneratePackage = async () => {
    setLoading(true);
    try {
      const res = await generateCourtPackageApi(caseId);
      setPackageData(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-6 text-slate-100 shadow-2xl space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <PackageCheck className="w-7 h-7 text-emerald-400" />
          <div>
            <h3 className="text-xl font-bold text-white">Court Package Generator</h3>
            <p className="text-xs text-slate-400">One-Click e-Court Bundle Assembly with BSA Section 63 Certificate & Master Evidence Index</p>
          </div>
        </div>

        <button
          onClick={handleGeneratePackage}
          disabled={loading}
          className="py-2.5 px-5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-colors flex items-center gap-2 cursor-pointer shadow-lg"
        >
          <PackageCheck className="w-4 h-4" />
          <span>{loading ? 'Assembling Package...' : 'Generate Court-Ready Bundle'}</span>
        </button>
      </div>

      {/* Package Output Display */}
      {packageData && (
        <div className="bg-slate-950 border border-emerald-500/40 rounded-2xl p-6 space-y-5">
          
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span className="text-sm font-bold text-white uppercase tracking-wider">Court Submission Package Assembled</span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">{packageData.court_name}</p>
            </div>

            <div className="text-right font-mono">
              <span className="text-[10px] text-slate-500 uppercase block">Package ID</span>
              <span className="text-xs font-bold text-emerald-400">{packageData.package_id}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
            <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
              <span className="text-slate-500 block text-[10px] uppercase">FIR Reference</span>
              <span className="text-slate-200 font-bold">{packageData.fir_number}</span>
            </div>
            <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
              <span className="text-slate-500 block text-[10px] uppercase">Prosecutor / Officer</span>
              <span className="text-slate-200 font-bold">{packageData.prosecutor_name}</span>
            </div>
            <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
              <span className="text-slate-500 block text-[10px] uppercase">BSA Section 63 Cert ID</span>
              <span className="text-amber-400 font-bold">{packageData.bsa_section_63_certificate_id}</span>
            </div>
          </div>

          {/* Master Evidence Manifest */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">Master Evidence Annexure Index ({packageData.total_annexures} Items)</h4>
            
            <div className="space-y-2 font-mono text-xs">
              {packageData.manifest.map((item, idx) => (
                <div key={idx} className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold text-[10px] border border-emerald-500/30">
                        {item.annexure}
                      </span>
                      <span className="font-bold text-slate-200 text-xs">{item.title}</span>
                    </div>
                    <div className="text-[10px] text-slate-400 mt-1">EID: {item.evidence_id} • {item.bsa_section}</div>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950 px-2 py-1 rounded border border-emerald-500/30">
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Master Package Cryptographic Hash */}
          <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs space-y-1">
            <div className="text-[10px] font-bold text-slate-400 uppercase">Master Package SHA-256 Hash Digest:</div>
            <div className="text-emerald-400 break-all">{packageData.package_hash}</div>
          </div>

        </div>
      )}

    </div>
  );
};
