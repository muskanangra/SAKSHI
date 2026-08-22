import React, { useState } from 'react';
import { Network, User, Phone, HardDrive, FileText, MapPin, Sparkles } from 'lucide-react';
import { useSakshi } from '../../context/SakshiContext';

export const EvidenceGraphView: React.FC = () => {
  const { graphNodes, graphEdges } = useSakshi();
  const [selectedNodeId, setSelectedNodeId] = useState<string>(graphNodes[0]?.id || '');
  const [filterType, setFilterType] = useState<string>('ALL');

  const selectedNode = graphNodes.find(n => n.id === selectedNodeId) || graphNodes[0];
  const connectedEdges = graphEdges.filter(e => e.source === selectedNodeId || e.target === selectedNodeId);

  const filteredNodes = filterType === 'ALL' 
    ? graphNodes 
    : graphNodes.filter(n => n.type === filterType);

  const getNodeIcon = (type: string) => {
    switch (type) {
      case 'PERSON': return <User className="w-4 h-4 text-red-600" />;
      case 'PHONE': return <Phone className="w-4 h-4 text-indigo-600" />;
      case 'DEVICE': return <HardDrive className="w-4 h-4 text-purple-600" />;
      case 'EVIDENCE': return <FileText className="w-4 h-4 text-emerald-600" />;
      case 'LOCATION': return <MapPin className="w-4 h-4 text-amber-600" />;
      default: return <Network className="w-4 h-4 text-blue-600" />;
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-[#162E52]">Evidence Relationship Intelligence Graph</h3>
            <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-full flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              <span>Multi-Source Corroboration</span>
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Interconnected network linking suspects, devices (IMEI), evidence files (EID), and telecom locations.
          </p>
        </div>

        {/* Filter Pill */}
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {['ALL', 'PERSON', 'DEVICE', 'EVIDENCE', 'LOCATION'].map(t => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                filterType === t ? 'bg-[#162E52] text-white shadow-2xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Visual Network Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Nodes Canvas (8 cols) */}
        <div className="lg:col-span-8 p-6 bg-slate-50/80 rounded-2xl border border-slate-200 min-h-[380px] flex flex-col justify-between">
          <div className="flex flex-wrap gap-3">
            {filteredNodes.map(node => {
              const isSelected = node.id === selectedNodeId;
              return (
                <div
                  key={node.id}
                  onClick={() => setSelectedNodeId(node.id)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center gap-2.5 ${
                    isSelected
                      ? 'bg-white border-[#162E52] shadow-md ring-2 ring-[#162E52]/20 scale-105'
                      : 'bg-white/90 border-slate-200/80 hover:border-slate-300 hover:shadow-2xs'
                  }`}
                >
                  <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                    {getNodeIcon(node.type)}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-slate-800">{node.label}</span>
                      {node.risk === 'HIGH' && (
                        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                      )}
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono block uppercase">{node.type}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Canvas Bottom Legend */}
          <div className="pt-4 border-t border-slate-200/60 flex flex-wrap items-center justify-between text-[11px] text-slate-500">
            <span className="font-mono">Total Nodes: {graphNodes.length} • Total Corroborated Edges: {graphEdges.length}</span>
            <span className="text-emerald-700 font-bold">100% Cites Source Evidence IDs</span>
          </div>
        </div>

        {/* Selected Node Relationship Dossier (4 cols) */}
        {selectedNode && (
          <div className="lg:col-span-4 bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-slate-200">
              <div className="p-2 bg-white rounded-xl border border-slate-200">
                {getNodeIcon(selectedNode.type)}
              </div>
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">{selectedNode.type}</span>
                <h4 className="text-sm font-bold text-[#162E52]">{selectedNode.label}</h4>
              </div>
            </div>

            <p className="text-xs text-slate-700 font-medium leading-relaxed bg-white p-3 rounded-xl border border-slate-200">
              {selectedNode.details}
            </p>

            {/* Connected Edges */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-700 block">Corroborated Connections ({connectedEdges.length}):</span>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {connectedEdges.map(edge => {
                  const targetLabel = edge.source === selectedNodeId ? edge.target : edge.source;
                  return (
                    <div key={edge.id} className="p-2.5 bg-white rounded-xl border border-slate-200 text-xs space-y-1">
                      <div className="flex items-center justify-between font-bold text-[#162E52]">
                        <span>{targetLabel}</span>
                        <span className="text-[10px] text-emerald-700 font-mono">{(edge.confidence * 100).toFixed(0)}% Conf</span>
                      </div>
                      <p className="text-slate-600 text-[11px]">{edge.label}</p>
                      <div className="text-[10px] text-indigo-700 font-mono">
                        Cites: {edge.supportingEIDs.join(', ')}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
