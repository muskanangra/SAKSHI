import React, { useState } from 'react';
import { Globe, Shield, CheckCircle, XCircle, Activity, FileText } from 'lucide-react';
import { useSakshi } from '../../context/SakshiContext';

export const CentralAdminPortal: React.FC = () => {
  const {
    currentOfficer,
    alerts,
    cases,
    approvalRequests,
    auditLogs,
    approveRequest,
    rejectRequest
  } = useSakshi();

  const [activeTab, setActiveTab] = useState<'nationwide' | 'approvals' | 'cases' | 'audit'>('nationwide');
  const [approvalRemarks, setApprovalRemarks] = useState<Record<string, string>>({});
  const [notification, setNotification] = useState<string | null>(null);

  const pendingApprovals = approvalRequests.filter(r => r.status === 'PENDING');
  const escalatedAlerts = alerts.filter(a => a.status === 'ESCALATED_TO_CENTRAL');

  const handleApprove = (reqId: string) => {
    const remarks = approvalRemarks[reqId] || 'Authorized under Central Cyber & Judicial Governance Authority';
    approveRequest(reqId, remarks);
    setNotification(`Change request ${reqId} APPROVED by Central Admin with cryptographic signature.`);
    setTimeout(() => setNotification(null), 3500);
  };

  const handleReject = (reqId: string) => {
    const remarks = approvalRemarks[reqId] || 'Rejected: Insufficient evidentiary justification';
    rejectRequest(reqId, remarks);
    setNotification(`Change request ${reqId} REJECTED by Central Admin.`);
    setTimeout(() => setNotification(null), 3500);
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Central Command Banner */}
        <div className="bg-[#162E52] text-white rounded-2xl p-6 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold text-white uppercase tracking-wider bg-red-600 px-2.5 py-0.5 rounded">
                Apex National Command
              </span>
              <span className="text-xs font-mono text-slate-300 font-bold">• Clearance: TOP SECRET</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Central Command & Monitoring Portal
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              National Oversight Director: <strong>{currentOfficer.name}</strong> • Ministry of Home Affairs
            </p>
          </div>

          {/* National Summary Metrics */}
          <div className="flex items-center gap-3">
            <div className="bg-white/10 px-4 py-2 rounded-xl text-center border border-white/10">
              <span className="block text-xl font-bold text-amber-300">{pendingApprovals.length}</span>
              <span className="text-[11px] text-slate-300">Pending Approvals</span>
            </div>
            <div className="bg-white/10 px-4 py-2 rounded-xl text-center border border-white/10">
              <span className="block text-xl font-bold text-red-300">{escalatedAlerts.length}</span>
              <span className="text-[11px] text-slate-300">Escalated Alerts</span>
            </div>
            <div className="bg-white/10 px-4 py-2 rounded-xl text-center border border-white/10">
              <span className="block text-xl font-bold text-emerald-300">{auditLogs.length}</span>
              <span className="text-[11px] text-slate-300">Sealed Logs</span>
            </div>
          </div>
        </div>

        {notification && (
          <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl text-xs font-semibold flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>{notification}</span>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('nationwide')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'nationwide' ? 'bg-[#162E52] text-white shadow-sm' : 'text-slate-600 hover:bg-slate-200/70'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>Nationwide District Monitoring</span>
          </button>

          <button
            onClick={() => setActiveTab('approvals')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'approvals' ? 'bg-[#162E52] text-white shadow-sm' : 'text-slate-600 hover:bg-slate-200/70'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>Escalation Approvals & Change Control</span>
            {pendingApprovals.length > 0 && (
              <span className="w-5 h-5 rounded-full bg-red-600 text-white text-[10px] flex items-center justify-center font-bold">
                {pendingApprovals.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('cases')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'cases' ? 'bg-[#162E52] text-white shadow-sm' : 'text-slate-600 hover:bg-slate-200/70'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>All Case Files (Read-Only)</span>
          </button>

          <button
            onClick={() => setActiveTab('audit')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'audit' ? 'bg-[#162E52] text-white shadow-sm' : 'text-slate-600 hover:bg-slate-200/70'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>Officer Activity & Security Audits</span>
          </button>
        </div>

        {/* TAB 1: NATIONWIDE MONITORING */}
        {activeTab === 'nationwide' && (
          <div className="space-y-6">
            
            {/* Escalated Issues Requiring Central Action */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-600 animate-ping" />
                  <h3 className="text-base font-bold text-[#162E52]">
                    High-Priority Escalated District Alerts
                  </h3>
                </div>
                <span className="text-xs font-mono text-slate-500">Auto-synced with National NIC Grid</span>
              </div>

              <div className="space-y-3">
                {escalatedAlerts.map(alert => (
                  <div key={alert.id} className="p-4 rounded-xl bg-red-50/70 border border-red-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-red-800">{alert.id}</span>
                        <span className="font-bold text-slate-800">{alert.title}</span>
                        <span className="bg-red-200 text-red-900 px-2 py-0.5 rounded text-[10px] font-bold">ESCALATED</span>
                      </div>
                      <p className="text-slate-700">{alert.description}</p>
                      <span className="text-[10px] text-slate-500 font-mono">District: {alert.district} • Timestamp: {alert.timestamp}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setActiveTab('approvals')}
                        className="px-3.5 py-1.5 bg-[#162E52] text-white font-bold text-xs rounded-lg hover:bg-[#0F2A4A] cursor-pointer"
                      >
                        Review in Approvals
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* National District Performance Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">New Delhi Central</span>
                <span className="text-2xl font-black text-[#162E52] block">142 Cases</span>
                <span className="text-xs text-emerald-600 font-semibold">99.4% Audit Integrity Pass Rate</span>
              </div>
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Mumbai South Command</span>
                <span className="text-2xl font-black text-[#162E52] block">189 Cases</span>
                <span className="text-xs text-emerald-600 font-semibold">100% Chain-of-Custody Compliant</span>
              </div>
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Bengaluru Tech Crime Grid</span>
                <span className="text-2xl font-black text-[#162E52] block">210 Cases</span>
                <span className="text-xs text-emerald-600 font-semibold">Zero Hash Drift Detected</span>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: APPROVALS & CHANGE CONTROL */}
        {activeTab === 'approvals' && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-4">
              <div className="space-y-1">
                <h3 className="text-base font-bold text-[#162E52]">
                  Cryptographic Change Control & District Escalations
                </h3>
                <p className="text-xs text-slate-500">
                  Protected case records cannot be altered by District Admins or IOs without explicit authorization by the Central Command.
                </p>
              </div>

              <div className="space-y-4">
                {approvalRequests.map(req => (
                  <div key={req.id} className="p-5 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-xs text-[#162E52] bg-blue-100 px-2 py-0.5 rounded">{req.id}</span>
                        <span className="font-bold text-sm text-slate-800">{req.requestType}</span>
                        <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                          req.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-800' : req.status === 'REJECTED' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {req.status}
                        </span>
                      </div>
                      <span className="text-xs text-slate-500 font-mono">{req.submittedDate}</span>
                    </div>

                    <div className="text-xs text-slate-700 bg-white p-3 rounded-lg border border-slate-200 space-y-1">
                      <span className="font-bold text-[#162E52] block">Target Entity: {req.targetEntityId}</span>
                      <p><strong>Justification:</strong> {req.reason}</p>
                      <span className="text-[11px] text-slate-500 block font-mono">Initiated By: {req.requestedByOfficerName}</span>
                    </div>

                    {req.status === 'PENDING' ? (
                      <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                        <input
                          type="text"
                          placeholder="Enter Central Admin review remarks..."
                          value={approvalRemarks[req.id] || ''}
                          onChange={(e) => setApprovalRemarks({ ...approvalRemarks, [req.id]: e.target.value })}
                          className="w-full sm:flex-1 p-2 bg-white border border-slate-300 rounded-lg text-xs"
                        />
                        <div className="flex items-center gap-2 w-full sm:w-auto">
                          <button
                            onClick={() => handleReject(req.id)}
                            className="flex-1 sm:flex-initial px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1"
                          >
                            <XCircle className="w-3.5 h-3.5" />
                            <span>Reject</span>
                          </button>
                          <button
                            onClick={() => handleApprove(req.id)}
                            className="flex-1 sm:flex-initial px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1"
                          >
                            <CheckCircle className="w-3.5 h-3.5" />
                            <span>Authorize Change</span>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-xs text-slate-500 font-mono bg-white p-2.5 rounded-lg border border-slate-200">
                        Reviewed By: <strong>{req.reviewedBy}</strong> ({req.reviewedDate}) • Remarks: {req.reviewRemarks}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: ALL CASE FILES (READ-ONLY) */}
        {activeTab === 'cases' && (
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-[#162E52]">National Master Case Repository</h3>
                <p className="text-xs text-slate-500">Central Admin possesses nationwide read-only visibility for judicial governance.</p>
              </div>
              <span className="text-xs font-mono font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded">
                Direct Modifications Disabled by Kernel
              </span>
            </div>

            <div className="space-y-3">
              {cases.map(c => (
                <div key={c.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-[#162E52]">{c.firNumber}</span>
                      <span className="font-bold text-slate-800">{c.title}</span>
                      {c.isProtectedRecord && (
                        <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded">PROTECTED</span>
                      )}
                    </div>
                    <p className="text-slate-600 mt-1">{c.policeStation} • Assigned IO: {c.assignedIOName} • Status: {c.status}</p>
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-slate-500 block">Court Ref: {c.courtCaseNumber || 'N/A'}</span>
                    <span className="text-[11px] text-slate-400">Evidence Count: {c.evidenceCount} items</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: AUDIT LOGS */}
        {activeTab === 'audit' && (
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-4">
            <h3 className="text-base font-bold text-[#162E52]">Real-Time Security Audit Stream</h3>
            <div className="space-y-2">
              {auditLogs.map(log => (
                <div key={log.id} className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-[#162E52]">{log.id}</span>
                      <span className="font-bold text-slate-800">{log.action}</span>
                      <span className="text-[10px] text-slate-500 font-mono">({log.officerName})</span>
                    </div>
                    <p className="text-slate-600">{log.details}</p>
                  </div>
                  <div className="text-right text-[11px] text-slate-400 font-mono">
                    <span>{log.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
