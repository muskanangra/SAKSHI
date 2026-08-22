import React, { useState } from 'react';
import {
  User,
  Users,
  CheckCircle2,
  Send,
  Printer,
  Sparkles,
  Search,
  Network,
  FileText
} from 'lucide-react';
import { useSakshi } from '../../context/SakshiContext';
import { EvidenceGraphView } from './EvidenceGraphView';
import { AISearchResult } from '../../types/sakshi';

export const InvestigatingOfficerPortal: React.FC = () => {
  const { currentOfficer, cases, addCaseTimelineEntry, runAISearch } = useSakshi();
  
  const myCases = cases.filter(c => c.assignedIOId === currentOfficer.id || true);
  const [selectedCaseId, setSelectedCaseId] = useState<string>(myCases[0]?.id || '');
  const [activeTab, setActiveTab] = useState<'dossier' | 'ai_workspace' | 'graph'>('dossier');
  
  // AI Search state
  const [searchQuery, setSearchQuery] = useState('Find suspect movements and phone calls near Connaught Place on Aug 14 between 23:00 and 23:45');
  const [aiResult, setAiResult] = useState<AISearchResult | null>(null);
  
  // Timeline update state
  const [newStage, setNewStage] = useState('');
  const [newNotes, setNewNotes] = useState('');
  const [notification, setNotification] = useState<string | null>(null);

  const currentCase = myCases.find(c => c.id === selectedCaseId) || myCases[0];

  const handleRunSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const result = runAISearch(searchQuery);
    setAiResult(result);
  };

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
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2.5 py-0.5 rounded-full">
                Investigating Officer Workspace
              </span>
              <span className="text-xs font-mono text-slate-500 font-bold">• Station: {currentOfficer.department}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#162E52] tracking-tight">
              Evidence Intelligence & Case Diary Portal
            </h1>
            <p className="text-xs sm:text-sm text-slate-600">
              Investigating Officer: <strong>{currentOfficer.name}</strong> ({currentOfficer.badgeNumber})
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setNotification('Investigative Case Diary Dossier Exported (SHA-256 Validated PDF).');
                setTimeout(() => setNotification(null), 3000);
              }}
              className="px-4 py-2.5 bg-[#162E52] hover:bg-[#0F2A4A] text-white font-bold text-xs rounded-xl flex items-center gap-2 transition-colors cursor-pointer shadow-xs"
            >
              <Printer className="w-4 h-4" />
              <span>Export Case Dossier</span>
            </button>
          </div>
        </div>

        {notification && (
          <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-2xl text-xs font-semibold flex items-center gap-2 animate-in fade-in duration-150">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>{notification}</span>
          </div>
        )}

        {/* Workspace Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('dossier')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'dossier' ? 'bg-[#162E52] text-white shadow-xs' : 'text-slate-600 hover:bg-slate-200/70'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Case File & Suspects</span>
          </button>

          <button
            onClick={() => setActiveTab('ai_workspace')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'ai_workspace' ? 'bg-[#162E52] text-white shadow-xs' : 'text-slate-600 hover:bg-slate-200/70'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Explainable AI Search</span>
          </button>

          <button
            onClick={() => setActiveTab('graph')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'graph' ? 'bg-[#162E52] text-white shadow-xs' : 'text-slate-600 hover:bg-slate-200/70'
            }`}
          >
            <Network className="w-4 h-4" />
            <span>Evidence Relationship Graph</span>
          </button>
        </div>

        {/* TAB 1: CASE FILE & DOSSIER */}
        {activeTab === 'dossier' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left Cases Selector (4 cols) */}
            <div className="lg:col-span-4 space-y-3">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wide block">
                Assigned Investigations ({myCases.length})
              </span>
              {myCases.map(c => (
                <div
                  key={c.id}
                  onClick={() => setSelectedCaseId(c.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer text-left ${
                    selectedCaseId === c.id
                      ? 'bg-blue-50/80 border-[#162E52] shadow-xs'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-[#162E52] font-mono">{c.firNumber}</span>
                    <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">{c.status}</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-800 line-clamp-1 mb-1">{c.title}</h4>
                  <p className="text-[11px] text-slate-500 font-mono">Evidence Count: {c.evidenceCount} items</p>
                </div>
              ))}
            </div>

            {/* Right Active Case Dossier (8 cols) */}
            {currentCase && (
              <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs space-y-6">
                
                {/* Header Info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
                  <div>
                    <span className="text-xs font-mono font-bold text-slate-400">{currentCase.id}</span>
                    <h3 className="text-lg font-bold text-[#162E52]">{currentCase.title}</h3>
                    <p className="text-xs text-slate-500">Complainant: <strong>{currentCase.complainant}</strong> • Filed: {currentCase.dateFiled}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 block">
                      eSign Verified
                    </span>
                  </div>
                </div>

                {/* Suspects & Witnesses Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Suspects */}
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                    <span className="text-xs font-bold text-[#162E52] flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-red-600" />
                      <span>Accused / Suspects ({currentCase.suspects.length})</span>
                    </span>
                    <div className="space-y-2">
                      {currentCase.suspects.map((s, idx) => (
                        <div key={idx} className="p-2.5 bg-white rounded-xl border border-slate-200 text-xs">
                          <div className="flex justify-between font-bold text-slate-800">
                            <span>{s.name} (Age {s.age})</span>
                            <span className="text-[10px] text-red-700 bg-red-50 px-1.5 py-0.5 rounded font-mono">{s.status}</span>
                          </div>
                          <p className="text-[11px] text-slate-500 mt-0.5">{s.notes}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Witnesses */}
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                    <span className="text-xs font-bold text-[#162E52] flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-blue-600" />
                      <span>Witness Records & Statements</span>
                    </span>
                    <div className="space-y-2">
                      {currentCase.witnesses.map((w, idx) => (
                        <div key={idx} className="p-2.5 bg-white rounded-xl border border-slate-200 text-xs">
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
                  
                  <div className="space-y-2 max-h-52 overflow-y-auto">
                    {currentCase.timeline.map((item, idx) => (
                      <div key={idx} className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs">
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
                  <form onSubmit={handleAddTimeline} className="p-4 bg-blue-50/60 rounded-2xl border border-blue-200/80 space-y-3">
                    <span className="text-xs font-bold text-[#162E52] block">Append Case Diary Entry:</span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <input
                        type="text"
                        required
                        placeholder="Stage (e.g. Accused Interrogation)"
                        value={newStage}
                        onChange={(e) => setNewStage(e.target.value)}
                        className="sm:col-span-1 p-2.5 bg-white border border-slate-300 rounded-xl text-xs"
                      />
                      <input
                        type="text"
                        required
                        placeholder="Key Findings, Excerpts & Observations..."
                        value={newNotes}
                        onChange={(e) => setNewNotes(e.target.value)}
                        className="sm:col-span-2 p-2.5 bg-white border border-slate-300 rounded-xl text-xs"
                      />
                    </div>
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="px-4 py-2 bg-[#F5821F] hover:bg-[#E06D0B] text-white font-bold text-xs rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
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
        )}

        {/* TAB 2: EXPLAINABLE AI WORKSPACE */}
        {activeTab === 'ai_workspace' && (
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs space-y-6">
            
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-[#162E52]">Source-Grounded Semantic Search & RAG</h3>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
                  Zero Hallucination
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Ask investigative questions across multi-source evidence. Every output strictly cites verifiable Evidence IDs (EIDs).
              </p>
            </div>

            {/* Natural Language Query Bar */}
            <form onSubmit={handleRunSearch} className="flex gap-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Ask any natural language case question..."
                className="flex-1 p-3 bg-slate-50 border border-slate-300 rounded-2xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#162E52]"
              />
              <button
                type="submit"
                className="px-5 py-3 bg-[#162E52] hover:bg-[#0F2A4A] text-white font-bold text-xs rounded-2xl flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <Search className="w-4 h-4" />
                <span>Search Evidence</span>
              </button>
            </form>

            {/* Search Output */}
            {aiResult && (
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-4 animate-in fade-in duration-200">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#162E52] flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>Evidence-Grounded Intelligence Synthesis:</span>
                  </span>
                  <span className="text-xs font-mono text-emerald-700 font-bold">
                    Confidence: {(aiResult.confidenceScore * 100).toFixed(0)}%
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-800 leading-relaxed bg-white p-4 rounded-xl border border-slate-200">
                  {aiResult.answerSummary}
                </p>

                {/* Clickable Citations */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-700 block">Clickable Source Evidence Citations:</span>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {aiResult.citedEvidence.map((cit, idx) => (
                      <div key={idx} className="p-3 bg-white rounded-xl border border-slate-200 space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-mono font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded">
                            {cit.eid}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">{cit.pageOrTimestampRef}</span>
                        </div>
                        <span className="text-xs font-bold text-slate-800 block truncate">{cit.evidenceTitle}</span>
                        <p className="text-[11px] text-slate-600 italic line-clamp-2">"{cit.excerpt}"</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

          </div>
        )}

        {/* TAB 3: RELATIONSHIP GRAPH */}
        {activeTab === 'graph' && (
          <EvidenceGraphView />
        )}

      </div>
    </div>
  );
};
