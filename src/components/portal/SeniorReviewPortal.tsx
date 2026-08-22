import React, { useState } from 'react';
import { CheckCircle2, Send, MessageSquare } from 'lucide-react';
import { useSakshi } from '../../context/SakshiContext';

export const SeniorReviewPortal: React.FC = () => {
  const { currentOfficer, cases, addAuditLog } = useSakshi();
  
  const [selectedCaseId, setSelectedCaseId] = useState<string>(cases[0]?.id || '');
  const [reviewComment, setReviewComment] = useState('');
  const [notification, setNotification] = useState<string | null>(null);

  const selectedCase = cases.find(c => c.id === selectedCaseId) || cases[0];
  const urgentCases = cases.filter(c => c.priority === 'URGENT');

  const handleForwardReview = (target: 'District Admin' | 'Central Admin') => {
    if (!reviewComment.trim() || !selectedCase) return;
    addAuditLog('SUPERVISORY_REVIEW_FORWARDED', 'CASE', selectedCase.id, `Supervisory Review Note forwarded to ${target} by ${currentOfficer.name}: ${reviewComment}`);
    setReviewComment('');
    setNotification(`Supervisory directions on ${selectedCase.firNumber} forwarded to ${target}.`);
    setTimeout(() => setNotification(null), 3500);
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded">
                Supervisory & Vigilance Oversight
              </span>
              <span className="text-xs font-mono text-slate-500 font-bold">• Headquarters Review Board</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#162E52] tracking-tight">
              Senior Supervisory Review & Oversight Portal
            </h1>
            <p className="text-xs sm:text-sm text-slate-600">
              Supervisory Officer: <strong>{currentOfficer.name}</strong> ({currentOfficer.badgeNumber})
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-xl text-center">
              <span className="block text-xl font-bold text-emerald-800">{urgentCases.length}</span>
              <span className="text-[11px] text-slate-600 font-medium">Critical Reviews</span>
            </div>
            <div className="bg-blue-50 border border-blue-200 px-4 py-2 rounded-xl text-center">
              <span className="block text-xl font-bold text-[#162E52]">{cases.length}</span>
              <span className="text-[11px] text-slate-600 font-medium">Monitored Dockets</span>
            </div>
          </div>
        </div>

        {notification && (
          <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>{notification}</span>
          </div>
        )}

        {/* Two Column Layout: Review Queue (5 cols) & Supervisory Docket Inspection (7 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Review Queue */}
          <div className="lg:col-span-5 space-y-3">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wide block mb-1">
              Investigations Under Supervisory Review ({cases.length})
            </span>

            {cases.map(item => (
              <div
                key={item.id}
                onClick={() => setSelectedCaseId(item.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer text-left ${
                  selectedCaseId === item.id
                    ? 'bg-emerald-50/70 border-emerald-300 shadow-xs'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-mono font-bold text-[#162E52]">
                    {item.firNumber}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    item.priority === 'URGENT' ? 'bg-red-100 text-red-800' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {item.priority}
                  </span>
                </div>

                <h4 className="text-xs font-bold text-slate-800 line-clamp-1 mb-1">
                  {item.title}
                </h4>

                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span>IO: {item.assignedIOName}</span>
                  <span className="font-semibold text-emerald-700">Audit Status: PASS</span>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Supervisory Inspection & Forwarding Controls */}
          {selectedCase && (
            <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-6">
              
              {/* Top Inspection Details */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
                <div>
                  <span className="text-xs font-mono font-bold text-slate-400">{selectedCase.id}</span>
                  <h3 className="text-base font-bold text-[#162E52] mt-1">{selectedCase.title}</h3>
                  <p className="text-xs text-slate-500">Assigned IO: <strong>{selectedCase.assignedIOName}</strong> • Status: {selectedCase.status}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-900 block font-mono">
                    Oversight Active
                  </span>
                </div>
              </div>

              {/* Integrity & Compliance Scorecard */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Investigation Pacing</span>
                  <span className="font-bold text-emerald-700">On-Track (72h Margin)</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Evidence Hash Drift</span>
                  <span className="font-bold text-[#162E52]">0.0% (Immutable)</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Witness Statements</span>
                  <span className="font-bold text-slate-800">{selectedCase.witnesses.length} Recorded</span>
                </div>
              </div>

              {/* Supervisory Remarks & Directions */}
              <div className="p-4 bg-emerald-50/70 rounded-xl border border-emerald-200/80 space-y-3">
                <span className="text-xs font-bold text-[#162E52] flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-800" />
                  <span>Issue Supervisory Directions / Comments:</span>
                </span>
                
                <textarea
                  rows={3}
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="Enter supervisory instructions for District Admin or Central Command..."
                  className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-xs"
                />

                <div className="flex flex-wrap justify-end gap-2 pt-1">
                  <button
                    onClick={() => handleForwardReview('District Admin')}
                    className="px-3.5 py-2 bg-[#162E52] hover:bg-[#0F2A4A] text-white font-bold text-xs rounded-lg transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <Send className="w-3 h-3" />
                    <span>Forward to District Admin</span>
                  </button>

                  <button
                    onClick={() => handleForwardReview('Central Admin')}
                    className="px-3.5 py-2 bg-[#F5821F] hover:bg-[#E06D0B] text-white font-bold text-xs rounded-lg transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <Send className="w-3 h-3" />
                    <span>Escalate to Central Command</span>
                  </button>
                </div>
              </div>

              {/* Historical Timeline Milestone Summary */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-700 block">Case Milestone Audit:</span>
                <div className="space-y-1.5">
                  {selectedCase.timeline.map((entry, idx) => (
                    <div key={idx} className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-xs flex justify-between items-center">
                      <div>
                        <span className="font-bold text-[#162E52]">{entry.stage}</span>: <span className="text-slate-600">{entry.notes}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono flex-shrink-0 ml-2">{entry.date}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
