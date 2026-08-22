import React, { useState, useEffect } from 'react';
import { Sparkles, Search, Clock, AlertOctagon, ExternalLink, ShieldAlert } from 'lucide-react';
import { 
  semanticSearchApi, getCaseTimelineApi, getCaseAnomaliesApi, 
  SemanticSearchResponse, CaseTimelineResponse, CaseAnomaliesResponse 
} from '../../services/masterplanServices';

export const AIInvestigationWorkspace: React.FC = () => {
  const [query, setQuery] = useState('When did the suspect enter the subway intersection?');
  const [searchResult, setSearchResult] = useState<SemanticSearchResponse | null>(null);
  const [timelineData, setTimelineData] = useState<CaseTimelineResponse | null>(null);
  const [anomaliesData, setAnomaliesData] = useState<CaseAnomaliesResponse | null>(null);
  const [loadingSearch, setLoadingSearch] = useState(false);

  useEffect(() => {
    getCaseTimelineApi('CASE-0042').then(setTimelineData).catch(console.error);
    getCaseAnomaliesApi('CASE-0042').then(setAnomaliesData).catch(console.error);
  }, []);

  const handleRunSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingSearch(true);
    try {
      const res = await semanticSearchApi(query, 'CASE-0042');
      setSearchResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingSearch(false);
    }
  };

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-6 text-slate-100 shadow-2xl space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <Sparkles className="w-7 h-7 text-purple-400" />
          <div>
            <h3 className="text-xl font-bold text-white">AI Investigation & RAG Workspace</h3>
            <p className="text-xs text-slate-400">Source-grounded semantic search, timeline synthesis, and anomaly signals</p>
          </div>
        </div>

        <span className="text-xs font-mono font-bold px-3 py-1 bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded-lg">
          Zero Hallucination Guardrails
        </span>
      </div>

      {/* Semantic Search Box */}
      <form onSubmit={handleRunSearch} className="flex items-center gap-3 bg-slate-950 p-2.5 rounded-xl border border-slate-800">
        <Search className="w-5 h-5 text-slate-400 ml-2" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask natural language questions across case evidence..."
          className="flex-1 bg-transparent border-none text-slate-100 text-xs focus:outline-none"
        />
        <button
          type="submit"
          disabled={loadingSearch}
          className="py-2 px-4 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{loadingSearch ? 'Synthesizing...' : 'Query AI Workspace'}</span>
        </button>
      </form>

      {/* Search Output & Citations */}
      {searchResult && (
        <div className="bg-slate-950 border border-purple-500/30 rounded-xl p-5 space-y-4">
          <h4 className="text-xs font-bold text-purple-300 uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-400" />
            Source-Grounded Answer Summary
          </h4>
          <p className="text-xs text-slate-200 leading-relaxed bg-slate-900/90 p-4 rounded-lg border border-slate-800 font-sans">
            {searchResult.answer_summary}
          </p>

          {/* Citations List */}
          <div className="space-y-2">
            <h5 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono">Verified Supporting Evidence Citations:</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {searchResult.citations.map((cit, idx) => (
                <div key={idx} className="p-3 bg-slate-900 rounded-lg border border-slate-800 font-mono text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-amber-400 flex items-center gap-1">
                      <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
                      {cit.evidence_id}
                    </span>
                    <span className="text-[10px] text-emerald-400">Relevance: {(cit.relevance_score * 100).toFixed(0)}%</span>
                  </div>
                  <div className="text-[11px] text-slate-300 font-sans">{cit.source_title}</div>
                  <p className="text-[10px] text-slate-400 italic font-sans pt-1 border-t border-slate-800">"{cit.excerpt}"</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Timeline & Anomalies Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Timeline Synthesis */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4">
          <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider flex items-center gap-2 border-b border-slate-800 pb-2">
            <Clock className="w-4 h-4 text-blue-400" />
            Chronological Case Event Timeline
          </h4>

          <div className="space-y-3 font-mono text-xs">
            {timelineData?.timeline.map((ev) => (
              <div key={ev.step} className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 space-y-1 relative">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-amber-400 font-bold">{ev.event_title}</span>
                  <span className="text-slate-500">{new Date(ev.timestamp).toLocaleTimeString()}</span>
                </div>
                <div className="text-[11px] text-slate-300 font-sans">{ev.description}</div>
                <div className="flex items-center gap-3 text-[10px] text-slate-400 pt-1 border-t border-slate-800/60">
                  <span>EID: <strong className="text-emerald-400">{ev.evidence_id}</strong></span>
                  <span>Source: {ev.source_system}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Anomaly Signals */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4">
          <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2 border-b border-slate-800 pb-2">
            <ShieldAlert className="w-4 h-4 text-amber-400" />
            Investigative Anomaly Signals
          </h4>

          <div className="space-y-3 font-mono text-xs">
            {anomaliesData?.anomalies.map((anom) => (
              <div key={anom.id} className="p-3.5 bg-amber-500/10 rounded-lg border border-amber-500/30 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-amber-300 flex items-center gap-1.5">
                    <AlertOctagon className="w-4 h-4 text-amber-400" />
                    {anom.title}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                    {anom.severity} RISK
                  </span>
                </div>
                <p className="text-xs text-slate-300 font-sans">{anom.description}</p>
                <div className="p-2 bg-slate-900 rounded border border-slate-800 text-[11px] text-slate-400 font-sans">
                  <strong className="text-amber-400">Action:</strong> {anom.recommended_action}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
