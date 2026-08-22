import React, { useState } from 'react';
import { ShieldAlert, FileText, Truck, CheckCircle2, ArrowUpRight, Clock, Send, ShieldCheck, Lock } from 'lucide-react';
import { useSakshi } from '../../context/SakshiContext';

export const DistrictAdminPortal: React.FC = () => {
  const {
    currentOfficer,
    alerts,
    cases,
    womensSafetyRecords,
    officers,
    approvalRequests,
    escalateAlertToCentral,
    actionAlert,
    assignCaseIO,
    requestRecordModification
  } = useSakshi();

  const [activeTab, setActiveTab] = useState<'alerts' | 'cases' | 'safety' | 'dispatches' | 'approvals'>('alerts');
  const [selectedCaseId, setSelectedCaseId] = useState<string>(cases[0]?.id || '');
  const [selectedIOId, setSelectedIOId] = useState<string>('');
  const [modReason, setModReason] = useState<string>('');
  const [showModModal, setShowModModal] = useState<boolean>(false);
  const [notification, setNotification] = useState<string | null>(null);

  const selectedCase = cases.find(c => c.id === selectedCaseId) || cases[0];
  const pendingAlerts = alerts.filter(a => a.status === 'PENDING' || a.status === 'UNDER_REVIEW');

  const handleAssign = (caseId: string) => {
    if (!selectedIOId) return;
    const ioOfficer = officers.find(o => o.id === selectedIOId);
    if (ioOfficer) {
      assignCaseIO(caseId, ioOfficer.id, ioOfficer.name);
      setNotification(`Case assigned to ${ioOfficer.name} successfully.`);
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const handleRequestMod = (e: React.FormEvent) => {
    e.preventDefault();
    if (!modReason.trim() || !selectedCase) return;
    requestRecordModification(selectedCase.id, modReason);
    setShowModModal(false);
    setModReason('');
    setNotification(`Change request for ${selectedCase.firNumber} submitted to Central Admin for cryptographic authorization.`);
    setTimeout(() => setNotification(null), 4000);
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 p-4 sm:p-8">
      {/* District Header Overview */}
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top District Banner */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold text-[#F5821F] uppercase tracking-wider bg-orange-50 px-2.5 py-0.5 rounded border border-orange-200">
                Level 1 Operational Control
              </span>
              <span className="text-xs font-mono text-slate-500 font-bold">• District: {currentOfficer.district}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#162E52] tracking-tight">
              District Operations Command Portal
            </h1>
            <p className="text-xs sm:text-sm text-slate-600">
              Command In-Charge: <strong>{currentOfficer.name}</strong> ({currentOfficer.badgeNumber})
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-3">
            <div className="bg-blue-50 border border-blue-200 px-4 py-2 rounded-xl text-center">
              <span className="block text-xl font-bold text-[#162E52]">{cases.length}</span>
              <span className="text-[11px] text-slate-600 font-medium">Active Cases</span>
            </div>
            <div className="bg-amber-50 border border-amber-200 px-4 py-2 rounded-xl text-center">
              <span className="block text-xl font-bold text-amber-700">{pendingAlerts.length}</span>
              <span className="text-[11px] text-slate-600 font-medium">Open Alerts</span>
            </div>
            <div className="bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-xl text-center">
              <span className="block text-xl font-bold text-emerald-700">{womensSafetyRecords.length}</span>
              <span className="text-[11px] text-slate-600 font-medium">WS Dispatches</span>
            </div>
          </div>
        </div>

        {notification && (
          <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl text-xs font-semibold flex items-center justify-between animate-in fade-in duration-200">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>{notification}</span>
            </div>
          </div>
        )}

        {/* Operational Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('alerts')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'alerts'
                ? 'bg-[#162E52] text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-200/70'
            }`}
          >
            <ShieldAlert className="w-4 h-4" />
            <span>District Alerts & Escalations</span>
            {pendingAlerts.length > 0 && (
              <span className="w-5 h-5 rounded-full bg-[#F5821F] text-white text-[10px] flex items-center justify-center font-bold">
                {pendingAlerts.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('cases')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'cases'
                ? 'bg-[#162E52] text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-200/70'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Case Management & Assignment</span>
          </button>

          <button
            onClick={() => setActiveTab('safety')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'safety'
                ? 'bg-[#162E52] text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-200/70'
            }`}
          >
            <Truck className="w-4 h-4" />
            <span>Women's Safety & Dispatches</span>
          </button>

          <button
            onClick={() => setActiveTab('approvals')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'approvals'
                ? 'bg-[#162E52] text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-200/70'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Change Requests & Approvals</span>
          </button>
        </div>

        {/* TAB 1: DISTRICT ALERTS & ESCALATION FLOW */}
        {activeTab === 'alerts' && (
          <div className="space-y-4">
            
            {/* Escalation Workflow Diagram Banner */}
            <div className="bg-gradient-to-r from-blue-50 to-orange-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="font-bold text-[#162E52]">Standard Response Workflow:</span>
                <div className="flex items-center gap-2 font-mono text-[11px]">
                  <span className="bg-white px-2 py-0.5 rounded border border-slate-200 font-semibold">1. Incoming Alert</span>
                  <span>→</span>
                  <span className="bg-white px-2 py-0.5 rounded border border-slate-200 font-semibold">2. District Review</span>
                  <span>→</span>
                  <span className="bg-white px-2 py-0.5 rounded border border-slate-200 font-semibold">3. Action / Escalate</span>
                  <span>→</span>
                  <span className="bg-white px-2 py-0.5 rounded border border-slate-200 font-semibold text-[#F5821F]">4. Central Admin</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {alerts.map(alert => (
                <div
                  key={alert.id}
                  className={`bg-white rounded-2xl p-5 border transition-all ${
                    alert.severity === 'CRITICAL'
                      ? 'border-red-200 shadow-xs'
                      : 'border-slate-200 shadow-2xs'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2.5">
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                        alert.severity === 'CRITICAL' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {alert.severity}
                      </span>
                      <span className="text-xs font-mono font-bold text-slate-400">
                        {alert.id}
                      </span>
                      <span className="text-sm font-bold text-[#162E52]">
                        {alert.title}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{alert.timestamp}</span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 mb-4">
                    {alert.description}
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400">Status:</span>
                      <span className={`font-bold px-2 py-0.5 rounded text-[11px] ${
                        alert.status === 'ESCALATED_TO_CENTRAL'
                          ? 'bg-purple-100 text-purple-800 font-bold'
                          : alert.status === 'ACTIONED'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-orange-100 text-orange-800'
                      }`}>
                        {alert.status}
                      </span>
                      {alert.linkedEntityId && (
                        <span className="font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                          Linked: {alert.linkedEntityId}
                        </span>
                      )}
                    </div>

                    {/* Operational Action Buttons */}
                    <div className="flex items-center gap-2">
                      {alert.status !== 'ACTIONED' && (
                        <button
                          onClick={() => actionAlert(alert.id)}
                          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg transition-colors cursor-pointer"
                        >
                          Mark Actioned
                        </button>
                      )}

                      {alert.status !== 'ESCALATED_TO_CENTRAL' && (
                        <button
                          onClick={() => escalateAlertToCentral(alert.id)}
                          className="px-3 py-1.5 bg-[#F5821F] hover:bg-[#E06D0B] text-white font-bold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <span>Escalate to Central Admin</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: CASE MANAGEMENT & ASSIGNMENT */}
        {activeTab === 'cases' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left Case List (5 cols) */}
            <div className="lg:col-span-5 space-y-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                  District Active Cases ({cases.length})
                </span>
              </div>
              {cases.map(caseItem => (
                <div
                  key={caseItem.id}
                  onClick={() => setSelectedCaseId(caseItem.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer text-left ${
                    selectedCaseId === caseItem.id
                      ? 'bg-blue-50/80 border-[#162E52] shadow-xs'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-[#162E52] font-mono">
                      {caseItem.firNumber}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      caseItem.priority === 'URGENT' ? 'bg-red-100 text-red-800' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {caseItem.priority}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-800 line-clamp-1 mb-1">
                    {caseItem.title}
                  </h4>
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span>IO: {caseItem.assignedIOName}</span>
                    <span className="font-mono">{caseItem.dateFiled}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Case Detail & Assignment Panel (7 cols) */}
            {selectedCase && (
              <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
                  <div>
                    <span className="text-xs font-mono font-bold text-slate-400">{selectedCase.id}</span>
                    <h3 className="text-lg font-bold text-[#162E52]">{selectedCase.title}</h3>
                    <p className="text-xs text-slate-500">{selectedCase.policeStation} • Complainant: {selectedCase.complainant}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {selectedCase.isProtectedRecord && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-1 rounded-md">
                        <Lock className="w-3 h-3" />
                        <span>Protected Record</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Statutory Sections Charged */}
                <div>
                  <span className="text-xs font-bold text-slate-700 block mb-1.5">Applicable Sections:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedCase.sections.map((sec, idx) => (
                      <span key={idx} className="bg-slate-100 text-slate-800 text-xs font-mono px-2.5 py-1 rounded-md border border-slate-200">
                        {sec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Case IO Assignment Controls */}
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                  <span className="text-xs font-bold text-[#162E52] block">
                    Assign / Reassign Investigating Officer:
                  </span>
                  <div className="flex flex-col sm:flex-row items-center gap-2">
                    <select
                      value={selectedIOId || selectedCase.assignedIOId}
                      onChange={(e) => setSelectedIOId(e.target.value)}
                      className="w-full sm:flex-1 py-2 px-3 bg-white border border-slate-300 rounded-lg text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#162E52]"
                    >
                      <option value="">Select Investigating Officer</option>
                      {officers.filter(o => o.role === 'investigating_officer').map(io => (
                        <option key={io.id} value={io.id}>
                          {io.name} ({io.badgeNumber}) - {io.department}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={() => handleAssign(selectedCase.id)}
                      className="w-full sm:w-auto px-4 py-2 bg-[#162E52] hover:bg-[#0F2A4A] text-white font-bold text-xs rounded-lg transition-colors cursor-pointer"
                    >
                      Update Assignment
                    </button>
                  </div>
                </div>

                {/* Request Changes to Protected Record */}
                <div className="p-4 bg-amber-50/70 rounded-xl border border-amber-200/80 flex items-center justify-between gap-4">
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-amber-900 block">Protected Record Governance</span>
                    <p className="text-[11.5px] text-amber-800">
                      Modifications require cryptographic approval from Central Admin.
                    </p>
                  </div>
                  <button
                    onClick={() => setShowModModal(true)}
                    className="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-lg transition-colors cursor-pointer flex-shrink-0"
                  >
                    Request Modification
                  </button>
                </div>

                {/* Case Timeline Summary */}
                <div>
                  <span className="text-xs font-bold text-slate-700 block mb-2">Investigation Milestones:</span>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {selectedCase.timeline.map((entry, idx) => (
                      <div key={idx} className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-xs">
                        <div className="flex items-center justify-between text-slate-500 font-mono text-[11px] mb-1">
                          <span className="font-bold text-[#162E52]">{entry.stage}</span>
                          <span>{entry.date}</span>
                        </div>
                        <p className="text-slate-700 font-medium">{entry.notes}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: WOMEN'S SAFETY & DISPATCHES */}
        {activeTab === 'safety' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {womensSafetyRecords.map(ws => (
                <div key={ws.id} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-pink-700 bg-pink-50 border border-pink-200 px-2.5 py-0.5 rounded">
                      {ws.id}
                    </span>
                    <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                      Response: {ws.responseTimeMinutes} mins
                    </span>
                  </div>

                  <div>
                    <span className="text-sm font-bold text-slate-800 block">{ws.callLocation}</span>
                    <span className="text-xs text-slate-500">Caller: {ws.callerName} • Phone: {ws.phoneNumber}</span>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Vehicle Dispatched:</span>
                      <span className="font-bold text-[#162E52]">{ws.vehicleDispatched}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Case In-Charge:</span>
                      <span className="font-semibold text-slate-700">{ws.caseInCharge}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">FIR Registered:</span>
                      <span className="font-semibold text-slate-700">{ws.firFiled ? `Yes (${ws.firNumber})` : 'No'}</span>
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-500 font-mono">
                    Dispatch Timestamp: {ws.dispatchTime}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: CHANGE REQUESTS & APPROVAL STATUS */}
        {activeTab === 'approvals' && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-4">
              <h3 className="text-base font-bold text-[#162E52]">
                District Change Requests Log
              </h3>
              <div className="space-y-3">
                {approvalRequests.map(req => (
                  <div key={req.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-[#162E52]">{req.id}</span>
                        <span className="font-bold text-slate-800">{req.requestType}</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          req.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-800' : req.status === 'REJECTED' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {req.status}
                        </span>
                      </div>
                      <p className="text-slate-600">{req.reason}</p>
                      <span className="text-[10px] text-slate-400 font-mono">Submitted: {req.submittedDate} by {req.requestedByOfficerName}</span>
                    </div>
                    {req.reviewedBy && (
                      <div className="text-right text-[11px] text-slate-500 font-mono bg-white p-2 rounded border border-slate-200">
                        <span className="font-bold text-slate-700 block">Reviewed by: {req.reviewedBy}</span>
                        <span>Remarks: {req.reviewRemarks}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Record Modification Modal */}
      {showModModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-2xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-200 space-y-4">
            <h3 className="text-base font-bold text-[#162E52]">
              Request Protected Case Record Modification
            </h3>
            <p className="text-xs text-slate-600">
              Submit justification to Central Command for cryptographic authorization on <strong>{selectedCase?.firNumber}</strong>.
            </p>
            <form onSubmit={handleRequestMod} className="space-y-4">
              <textarea
                required
                rows={4}
                value={modReason}
                onChange={(e) => setModReason(e.target.value)}
                placeholder="Provide detailed statutory/investigative justification for requested change..."
                className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#162E52]"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#F5821F] hover:bg-[#E06D0B] text-white font-bold text-xs rounded-lg cursor-pointer flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit to Central Admin</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
