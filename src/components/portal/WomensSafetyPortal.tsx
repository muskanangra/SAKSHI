import React, { useState } from 'react';
import { CheckCircle2, Plus, Link2, Camera, FileCheck } from 'lucide-react';
import { useSakshi } from '../../context/SakshiContext';

export const WomensSafetyPortal: React.FC = () => {
  const { currentOfficer, womensSafetyRecords, addWomensSafetyRecord, linkWSToCase, cases } = useSakshi();
  
  const [selectedRecordId, setSelectedRecordId] = useState<string>(womensSafetyRecords[0]?.id || '');
  const [showNewModal, setShowNewModal] = useState<boolean>(false);
  const [showLinkModal, setShowLinkModal] = useState<boolean>(false);
  const [selectedCaseToLink, setSelectedCaseToLink] = useState<string>('');
  const [notification, setNotification] = useState<string | null>(null);

  // New Record Form State
  const [callerName, setCallerName] = useState('');
  const [callLocation, setCallLocation] = useState('');
  const [vehicleDispatched, setVehicleDispatched] = useState('ERV-14 (Rapid Response)');
  const [caseInCharge, setCaseInCharge] = useState('W/SI Meenakshi Sharma');
  const [evidenceDesc, setEvidenceDesc] = useState('');

  const selectedRecord = womensSafetyRecords.find(r => r.id === selectedRecordId) || womensSafetyRecords[0];

  const handleCreateRecord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!callerName.trim() || !callLocation.trim()) return;

    const newId = addWomensSafetyRecord({
      callerName,
      phoneNumber: '+91 98XXX XXXXX',
      callLocation,
      callDateTime: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' IST',
      callHandler: `${currentOfficer.name} (Emp ID: ${currentOfficer.badgeNumber})`,
      officersDispatched: ['W/SI Meenakshi Sharma', 'W/Const. Aarti Devi'],
      vehicleDispatched,
      caseInCharge,
      dispatchTime: new Date().toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' IST',
      responseTimeMinutes: 3.5,
      firFiled: false,
      status: 'EMERGENCY_DISPATCHED',
      followUpActions: ['On-site verification initiated', 'First responder dispatch active'],
      evidenceDescriptions: evidenceDesc ? [evidenceDesc] : ['Audio dispatch transcript archived'],
      evidencePhotographsCount: 2,
      relatedDocuments: ['Emergency Dispatch Log Slip', 'Incident Initial Summary']
    });

    setShowNewModal(false);
    setSelectedRecordId(newId);
    setNotification(`New Women's Safety Record ${newId} registered with cryptographic verification.`);
    setTimeout(() => setNotification(null), 3500);
  };

  const handleLinkCase = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCaseToLink || !selectedRecord) return;
    const targetCase = cases.find(c => c.id === selectedCaseToLink);
    if (targetCase) {
      linkWSToCase(selectedRecord.id, targetCase.id, targetCase.firNumber);
      setShowLinkModal(false);
      setNotification(`WS Record ${selectedRecord.id} successfully linked to case ${targetCase.firNumber}.`);
      setTimeout(() => setNotification(null), 3500);
    }
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-pink-700 bg-pink-50 border border-pink-200 px-2.5 py-0.5 rounded">
                Digital Record-Management System
              </span>
              <span className="text-xs font-mono text-slate-500 font-bold">• SPUWAC Central Registry</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#162E52] tracking-tight">
              Women's Safety & Distress Records Portal
            </h1>
            <p className="text-xs sm:text-sm text-slate-600">
              Record In-Charge: <strong>{currentOfficer.name}</strong> ({currentOfficer.department})
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowNewModal(true)}
              className="px-4 py-2.5 bg-pink-600 hover:bg-pink-700 text-white font-bold text-xs rounded-xl flex items-center gap-2 transition-colors cursor-pointer shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Log New Incident Record</span>
            </button>
          </div>
        </div>

        {notification && (
          <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>{notification}</span>
          </div>
        )}

        {/* Two Column Layout: Records List (5 cols) & Deep Incident File (7 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: WS Case IDs List */}
          <div className="lg:col-span-5 space-y-3">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wide block mb-1">
              Registered Incident Files ({womensSafetyRecords.length})
            </span>

            {womensSafetyRecords.map(record => (
              <div
                key={record.id}
                onClick={() => setSelectedRecordId(record.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer text-left ${
                  selectedRecordId === record.id
                    ? 'bg-pink-50/70 border-pink-300 shadow-xs'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-mono font-bold text-pink-700 bg-pink-100/60 px-2 py-0.5 rounded">
                    {record.id}
                  </span>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    Response: {record.responseTimeMinutes}m
                  </span>
                </div>

                <h4 className="text-xs font-bold text-slate-800 line-clamp-1 mb-1">
                  {record.callLocation}
                </h4>

                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span>Vehicle: {record.vehicleDispatched}</span>
                  <span className="font-semibold text-slate-700">
                    {record.firFiled ? 'FIR Linked' : 'No FIR'}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Full Safety Record Dossier */}
          {selectedRecord && (
            <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-6">
              
              {/* Top Details */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
                <div>
                  <span className="text-xs font-mono font-bold text-pink-700 bg-pink-50 px-2.5 py-0.5 rounded border border-pink-200">
                    {selectedRecord.id}
                  </span>
                  <h3 className="text-lg font-bold text-[#162E52] mt-1.5">{selectedRecord.callLocation}</h3>
                  <p className="text-xs text-slate-500">Caller: {selectedRecord.callerName} • Contact: {selectedRecord.phoneNumber}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 block font-mono">
                    {selectedRecord.status}
                  </span>
                </div>
              </div>

              {/* Dispatch & Operational Timing */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Call Time</span>
                  <span className="font-semibold text-slate-800">{selectedRecord.callDateTime}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Dispatch Vehicle</span>
                  <span className="font-bold text-[#162E52]">{selectedRecord.vehicleDispatched}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Response Lag</span>
                  <span className="font-bold text-emerald-700">{selectedRecord.responseTimeMinutes} Minutes</span>
                </div>
                <div className="sm:col-span-2">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Officers Dispatched</span>
                  <span className="font-medium text-slate-700">{selectedRecord.officersDispatched.join(', ')}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Case In-Charge</span>
                  <span className="font-bold text-slate-800">{selectedRecord.caseInCharge}</span>
                </div>
              </div>

              {/* FIR & Case Linkage (Referenced Rather Than Prominently Exposed) */}
              <div className="p-4 bg-blue-50/70 rounded-xl border border-blue-200/80 flex items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-[#162E52] block">Judicial Case Association</span>
                  {selectedRecord.firFiled ? (
                    <p className="text-xs text-slate-700">
                      FIR Registered: <strong>{selectedRecord.firNumber}</strong> (Referenced Case ID: <span className="font-mono">{selectedRecord.linkedCaseId}</span>)
                    </p>
                  ) : (
                    <p className="text-xs text-slate-500">
                      No FIR registered yet. Can be linked to an existing case or created newly.
                    </p>
                  )}
                </div>

                {!selectedRecord.firFiled && (
                  <button
                    onClick={() => setShowLinkModal(true)}
                    className="px-3.5 py-1.5 bg-[#162E52] hover:bg-[#0F2A4A] text-white font-bold text-xs rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 flex-shrink-0"
                  >
                    <Link2 className="w-3.5 h-3.5" />
                    <span>Link to Case</span>
                  </button>
                )}
              </div>

              {/* Physical Evidence Descriptions & Photos */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-[#162E52] block">
                  Sealed Evidence & Document Records:
                </span>
                <div className="space-y-2">
                  {selectedRecord.evidenceDescriptions.map((desc, idx) => (
                    <div key={idx} className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-xs flex items-center gap-2">
                      <FileCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span className="text-slate-700">{desc}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-4 text-xs text-slate-500 pt-1">
                  <span className="flex items-center gap-1">
                    <Camera className="w-3.5 h-3.5 text-slate-400" />
                    <span>{selectedRecord.evidencePhotographsCount} Sealed Photographs Attached</span>
                  </span>
                  <span>•</span>
                  <span>{selectedRecord.relatedDocuments.length} Verified Documents</span>
                </div>
              </div>

              {/* Follow-Up Actions */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <span className="text-xs font-bold text-slate-700 block">Follow-Up Action Log:</span>
                <ul className="space-y-1 text-xs text-slate-600">
                  {selectedRecord.followUpActions.map((action, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#138808]" />
                      <span>{action}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          )}

        </div>

      </div>

      {/* New Safety Record Modal */}
      {showNewModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-2xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-200 space-y-4">
            <h3 className="text-base font-bold text-[#162E52]">Log New Women's Safety Incident</h3>
            <form onSubmit={handleCreateRecord} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Caller Name (Will be masked)</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Priya Sharma"
                  value={callerName}
                  onChange={(e) => setCallerName(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Call Location / Geo Coordinates</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Connaught Place Outer Circle"
                  value={callLocation}
                  onChange={(e) => setCallLocation(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Vehicle Dispatched</label>
                  <input
                    type="text"
                    value={vehicleDispatched}
                    onChange={(e) => setVehicleDispatched(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Case In-Charge</label>
                  <input
                    type="text"
                    value={caseInCharge}
                    onChange={(e) => setCaseInCharge(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg"
                  />
                </div>
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Evidence Description</label>
                <textarea
                  rows={2}
                  placeholder="Sealed audio dispatch recording / bodycam hash"
                  value={evidenceDesc}
                  onChange={(e) => setEvidenceDesc(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNewModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white font-bold rounded-lg cursor-pointer"
                >
                  Register Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Link Case Modal */}
      {showLinkModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-2xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200 space-y-4">
            <h3 className="text-base font-bold text-[#162E52]">Link Incident to Investigation Case</h3>
            <form onSubmit={handleLinkCase} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Select Active FIR / Case</label>
                <select
                  required
                  value={selectedCaseToLink}
                  onChange={(e) => setSelectedCaseToLink(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg"
                >
                  <option value="">Select FIR...</option>
                  {cases.map(c => (
                    <option key={c.id} value={c.id}>
                      {c.firNumber} - {c.title}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowLinkModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#162E52] hover:bg-[#0F2A4A] text-white font-bold rounded-lg cursor-pointer"
                >
                  Confirm Linkage
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
