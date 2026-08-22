import React, { useState, useEffect } from 'react';
import { Network, User, HardDrive, FileCode, MapPin, Calendar } from 'lucide-react';
import { getCaseGraphApi, EvidenceGraphResponse, GraphNode } from '../../services/masterplanServices';

export const EvidenceGraphWidget: React.FC = () => {
  const [graphData, setGraphData] = useState<EvidenceGraphResponse | null>(null);
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);

  useEffect(() => {
    getCaseGraphApi('CASE-0042')
      .then(data => {
        setGraphData(data);
        if (data.nodes.length > 0) setSelectedNode(data.nodes[0]);
      })
      .catch(console.error);
  }, []);

  const getNodeIcon = (category: string) => {
    switch (category) {
      case 'PERSON': return <User className="w-4 h-4 text-emerald-400" />;
      case 'DEVICE': return <HardDrive className="w-4 h-4 text-purple-400" />;
      case 'FILE': return <FileCode className="w-4 h-4 text-blue-400" />;
      case 'LOCATION': return <MapPin className="w-4 h-4 text-red-400" />;
      default: return <Calendar className="w-4 h-4 text-amber-400" />;
    }
  };

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-6 text-slate-100 shadow-2xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <Network className="w-7 h-7 text-blue-400" />
          <div>
            <h3 className="text-xl font-bold text-white">Evidence Knowledge Graph & Entity Linker</h3>
            <p className="text-xs text-slate-400">Cross-evidence entity relationships, suspect links, and device provenance</p>
          </div>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs text-slate-400">
          <span>Nodes: <strong className="text-amber-400">{graphData?.total_nodes || 0}</strong></span>
          <span>Edges: <strong className="text-blue-400">{graphData?.total_edges || 0}</strong></span>
        </div>
      </div>

      {/* Graph Visualizer Canvas & Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Nodes List / Visual Canvas */}
        <div className="lg:col-span-2 bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Connected Knowledge Entities</h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {graphData?.nodes.map((node) => (
              <div
                key={node.id}
                onClick={() => setSelectedNode(node)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center gap-3 ${
                  selectedNode?.id === node.id
                    ? 'bg-blue-600/20 border-blue-500 shadow-lg scale-[1.02]'
                    : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="p-2 rounded-lg bg-slate-950 border border-slate-800">
                  {getNodeIcon(node.category)}
                </div>
                <div className="overflow-hidden">
                  <div className="text-xs font-bold text-slate-200 truncate">{node.label}</div>
                  <div className="text-[10px] text-slate-400 font-mono truncate">{node.subtitle}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Entity Inspector Panel */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4">
          <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider border-b border-slate-800 pb-2">
            Entity Inspector
          </h4>

          {selectedNode ? (
            <div className="space-y-4 text-xs font-mono">
              <div>
                <span className="text-slate-500 block uppercase text-[10px]">Entity ID</span>
                <span className="text-slate-200 font-bold">{selectedNode.id}</span>
              </div>

              <div>
                <span className="text-slate-500 block uppercase text-[10px]">Category</span>
                <span className="px-2 py-0.5 rounded bg-slate-900 text-amber-400 border border-slate-800 font-bold inline-block mt-0.5">
                  {selectedNode.category}
                </span>
              </div>

              <div>
                <span className="text-slate-500 block uppercase text-[10px]">Label</span>
                <span className="text-slate-100 font-bold">{selectedNode.label}</span>
              </div>

              <div>
                <span className="text-slate-500 block uppercase text-[10px]">Description</span>
                <span className="text-slate-300">{selectedNode.subtitle}</span>
              </div>

              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Source Evidence Citation</span>
                <span className="text-emerald-400 font-bold">{selectedNode.evidence_citation_eid}</span>
              </div>
            </div>
          ) : (
            <p className="text-xs text-slate-500 italic">Select an entity node to inspect evidence citations.</p>
          )}
        </div>

      </div>
    </div>
  );
};
