import React, { useState } from 'react';
import { Scale, CheckCircle, Award, AlertTriangle, ShieldCheck } from 'lucide-react';
import { 
  checkBsaReadinessApi, generateBsaCertificateApi, 
  BSAReadinessResponse, BSACertificateResponse 
} from '../../services/masterplanServices';

export const BSAComplianceWidget: React.FC = () => {
  const [evidenceId, setEvidenceId] = useState('EVD-2026-DL-9042');
  const [readiness, setReadiness] = useState<BSAReadinessResponse | null>(null);
  const [certificate, setCertificate] = useState<BSACertificateResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCheckReadiness = async () => {
    setLoading(true);
    try {
      const data = await checkBsaReadinessApi(evidenceId);
      setReadiness(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateCertificate = async () => {
    setLoading(true);
    try {
      const cert = await generateBsaCertificateApi(evidenceId);
      setCertificate(cert);
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
          <Scale className="w-7 h-7 text-[#F5821F]" />
          <div>
            <h3 className="text-xl font-bold text-white">BSA Section 63 Legal Compliance Engine</h3>
            <p className="text-xs text-slate-400">Bharatiya Sakshya Adhiniyam 2023 Statutory Readiness & Certificate Builder</p>
          </div>
        </div>

        <span className="text-xs font-mono font-bold px-3 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-lg">
          Section 63 BSA Ready
        </span>
      </div>

      {/* Input Controls */}
      <div className="flex flex-wrap items-center gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
        <div className="flex-1 min-w-[240px]">
          <label className="block text-xs font-bold text-slate-400 mb-1 uppercase tracking-wider">Target Evidence ID (EID)</label>
          <input
            type="text"
            value={evidenceId}
            onChange={(e) => setEvidenceId(e.target.value)}
            className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg font-mono text-xs text-amber-400"
          />
        </div>

        <button
          onClick={handleCheckReadiness}
          disabled={loading}
          className="py-2.5 px-4 bg-[#F5821F] hover:bg-amber-600 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-2 cursor-pointer mt-5"
        >
          <ShieldCheck className="w-4 h-4" />
          <span>{loading ? 'Evaluating...' : 'Run Section 63 Readiness Check'}</span>
        </button>

        <button
          onClick={handleGenerateCertificate}
          disabled={loading}
          className="py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-2 cursor-pointer mt-5"
        >
          <Award className="w-4 h-4" />
          <span>Generate Signed Section 63 Certificate</span>
        </button>
      </div>

      {/* Readiness Results */}
      {readiness && (
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              Statutory Evaluation Result
            </h4>
            <div className="flex items-center gap-2 font-mono text-xs">
              <span className="text-slate-400">Completeness Score:</span>
              <span className="font-bold text-emerald-400 text-sm">{readiness.readiness_score_percentage}%</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2 bg-slate-900/80 p-3 rounded-lg border border-slate-800">
              <h5 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Satisfied Statutory Criteria ({readiness.satisfied_requirements.length})</h5>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {readiness.satisfied_requirements.map((req, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2 bg-slate-900/80 p-3 rounded-lg border border-slate-800">
              <h5 className="text-xs font-bold text-amber-400 uppercase tracking-wider">Missing Statutory Criteria ({readiness.missing_requirements.length})</h5>
              {readiness.missing_requirements.length === 0 ? (
                <p className="text-xs text-slate-500 italic">None - 100% Statutory Criteria Fulfilled</p>
              ) : (
                <ul className="space-y-1 text-xs text-amber-300">
                  {readiness.missing_requirements.map((req, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Generated Certificate Display */}
      {certificate && (
        <div className="bg-slate-950 border border-emerald-500/40 rounded-2xl p-6 space-y-4 relative overflow-hidden">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Award className="w-6 h-6 text-emerald-400" />
              <div>
                <h4 className="text-sm font-bold text-emerald-400 uppercase tracking-wider">Section 63 BSA Admissibility Certificate</h4>
                <p className="text-[11px] text-slate-400">Statutory Certificate under Bharatiya Sakshya Adhiniyam, 2023</p>
              </div>
            </div>
            <span className="text-xs font-mono font-bold text-amber-400 px-3 py-1 bg-amber-500/10 rounded border border-amber-500/30">
              {certificate.certificate_id}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
            <div><strong className="text-slate-400">Target Evidence:</strong> {certificate.evidence_id}</div>
            <div><strong className="text-slate-400">Certifying Officer:</strong> {certificate.certifying_officer_name} ({certificate.certifying_officer_rank})</div>
            <div><strong className="text-slate-400">Statutory Act:</strong> {certificate.statutory_act}</div>
            <div><strong className="text-slate-400">Hash Algorithm:</strong> {certificate.hash_algorithm}</div>
          </div>

          <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-300 italic leading-relaxed">
            "{certificate.attestation_statement}"
          </div>

          <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 font-mono text-[11px] text-emerald-300 break-all">
            <strong className="text-slate-400">Cryptographic Signature Hash:</strong> {certificate.digital_signature_hash}
          </div>
        </div>
      )}

    </div>
  );
};
