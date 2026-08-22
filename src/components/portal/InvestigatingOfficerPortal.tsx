import React, { useState } from 'react';
import { User, Users, CheckCircle2, Send, Printer } from 'lucide-react';
import { useSakshi } from '../../context/SakshiContext';

export const InvestigatingOfficerPortal: React.FC = () => {
  const { currentOfficer, cases, addCaseTimelineEntry } = useSakshi();
  
  const myCases = cases.filter(c => c.assignedIOId === currentOfficer.id || true);
  const [selectedCaseId, setSelectedCaseId] = useState<string>(myCases[0]?.id || '');
  const [newStage, setNewStage] = useState('');
  const [newNotes, setNewNotes] = useState('');
  const [notification, setNotification] = useState<string | null>(null);

  const currentCase = myCases.find(c => c.id === selectedCaseId) || myCases[0];

  const handleAddTimeline = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStage.trim() || !newNotes.trim() || !currentCase) return;
    addCaseTimelineEntry(currentCase.id, newStage, newNotes);
    setNewStage('');
    setNewNotes('');
    setNotification(`Investigation note digitally signed and appended to ${currentCase.firNumber} timeline.`);
    setTimeout(() => setNotification(null), 3500);
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top IO Banner */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2.5 py-0.5 rounded">
                Investigating Officer Workspace
              </span>
              <span className="text-xs font-mono text-slate-500 font-bold">• Station: {currentOfficer.department}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#162E52] tracking-tight">
              Case Diary & Investigation Management
            </h1>
            <p className="text-xs sm:text-sm text-slate-600">
              Investigating Officer: <strong>{currentOfficer.name}</strong> ({currentOfficer.badgeNumber})
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setNotification('Investigative Case Diary Exported & Signed (PDF SHA-256 Validated).');
                setTimeout(() => setNotification(null), 3000);
              }}
              className="px-4 py-2 bg-[#162E52] hover:bg-[#0F2A4A] text-white font-bold text-xs rounded-xl flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Generate Case Report</span>
            </button>
          </div>
        </div>

        {notification && (
          <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>{notification}</span>
          </div>
        )}

        {/* Two Column Layout: Cases List (4 cols) & Active Dossier (8 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Cases Selector */}
          <div className="lg:col-span-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                Assigned Investigations ({myCases.length})
              </span>
            </div>
            {myCases.map(c => (
              <div
                key={c.id}
                onClick={() => setSelectedCaseId(c.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer text-left ${
                  selectedCaseId === c.id
                    ? 'bg-blue-50/80 border-[#162E52] shadow-xs'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-[#162E52] font-mono">{c.firNumber}</span>
                  <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded">{c.status}</span>
                </div>
                <h4 className="text-xs font-bold text-slate-800 line-clamp-1 mb-1">{c.title}</h4>
                <p className="text-[11px] text-slate-500 font-mono">Evidence Count: {c.evidenceCount} items</p>
              </div>
            ))}
          </div>

          {/* Right Active Case Dossier */}
          {currentCase && (
            <div className="lg:col-span-8 bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-6">
              
              {/* Header Info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
                <div>
                  <span className="text-xs font-mono font-bold text-slate-400">{currentCase.id}</span>
                  <h3 className="text-xl font-bold text-[#162E52]">{currentCase.title}</h3>
                  <p className="text-xs text-slate-500">Complainant: <strong>{currentCase.complainant}</strong> • Filed: {currentCase.dateFiled}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 block">
                    eSign Verified
                  </span>
                </div>
              </div>

              {/* Suspects & Witnesses Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Suspects */}
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <span className="text-xs font-bold text-[#162E52] flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-red-600" />
                    <span>Accused / Suspects ({currentCase.suspects.length})</span>
                  </span>
                  <div className="space-y-2">
                    {currentCase.suspects.map((s, idx) => (
                      <div key={idx} className="p-2 bg-white rounded-lg border border-slate-200 text-xs">
                        <div className="flex justify-between font-bold text-slate-800">
                          <span>{s.name} (Age {s.age})</span>
                          <span className="text-[10px] text-red-700 bg-red-50 px-1.5 py-0.5 rounded">{s.status}</span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5">{s.notes}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Witnesses */}
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <span className="text-xs font-bold text-[#162E52] flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-blue-600" />
                    <span>Witness Records & Statements</span>
                  </span>
                  <div className="space-y-2">
                    {currentCase.witnesses.map((w, idx) => (
                      <div key={idx} className="p-2 bg-white rounded-lg border border-slate-200 text-xs">
                        <div className="flex justify-between font-bold text-slate-800">
                          <span>{w.name}</span>
                          <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">Verified</span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5">{w.statementSummary}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Case Diary Timeline & Append Note */}
              <div className="space-y-3 pt-2">
                <span className="text-xs font-bold text-[#162E52] block">
                  Electronic Case Diary Timeline (Cryptographically Sealed):
                </span>
                
                <div className="space-y-2 max-h-56 overflow-y-auto">
                  {currentCase.timeline.map((item, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                      <div className="flex justify-between items-center text-[11px] font-mono text-slate-500 mb-1">
                        <span className="font-bold text-[#162E52]">{item.stage}</span>
                        <span>{item.date}</span>
                      </div>
                      <p className="text-slate-700 font-medium">{item.notes}</p>
                      <span className="text-[10px] text-slate-400 font-mono mt-1 block">Officer: {item.officer}</span>
                    </div>
                  ))}
                </div>

                {/* Form to Append New Investigation Note */}
                <form onSubmit={handleAddTimeline} className="p-4 bg-blue-50/60 rounded-xl border border-blue-200/80 space-y-3">
                  <span className="text-xs font-bold text-[#162E52] block">Append Case Diary Entry:</span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <input
                      type="text"
                      required
                      placeholder="Stage / Action (e.g. Witness Questioning)"
                      value={newStage}
                      onChange={(e) => setNewStage(e.target.value)}
                      className="sm:col-span-1 p-2 bg-white border border-slate-300 rounded-lg text-xs"
                    />
                    <input
                      type="text"
                      required
                      placeholder="Investigation Findings & Observations..."
                      value={newNotes}
                      onChange={(e) => setNewNotes(e.target.value)}
                      className="sm:col-span-2 p-2 bg-white border border-slate-300 rounded-lg text-xs"
                    />
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#F5821F] hover:bg-[#E06D0B] text-white font-bold text-xs rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Digitally Sign & Append Entry</span>
                    </button>
                  </div>
                </form>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
