import React, { useState } from 'react';
import {
  Calendar,
  CheckCircle2,
  Plus,
  Bookmark,
  Download,
  ShieldCheck
} from 'lucide-react';
import { useSakshi } from '../../context/SakshiContext';
import { BSA63CertificateModal } from './BSA63CertificateModal';

export const LegalCourtPortal: React.FC = () => {
  const {
    currentOfficer,
    legalRecords,
    addCourtOrder,
    generateCourtPackage,
    evidenceItems
  } = useSakshi();
  
  const [selectedRecordId, setSelectedRecordId] = useState<string>(legalRecords[0]?.id || '');
  const [newOrderText, setNewOrderText] = useState('');
  const [showOrderModal, setShowOrderModal] = useState<boolean>(false);
  const [selectedEvidenceForCert, setSelectedEvidenceForCert] = useState<any>(null);
  const [showCertModal, setShowCertModal] = useState<boolean>(false);
  const [notification, setNotification] = useState<string | null>(null);

  const selectedRecord = legalRecords.find(r => r.id === selectedRecordId) || legalRecords[0];
  const caseEvids = evidenceItems.filter(e => e.firNumber === selectedRecord?.firNumber);

  const handleAddOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOrderText.trim() || !selectedRecord) return;
    addCourtOrder(selectedRecord.id, newOrderText);
    setShowOrderModal(false);
    setNewOrderText('');
    setNotification(`Court Order logged and digitally linked to ${selectedRecord.courtCaseNumber}.`);
    setTimeout(() => setNotification(null), 3500);
  };

  const handleGeneratePackage = () => {
    const pkg = generateCourtPackage('CASE-2026-DL-001');
    setNotification(`Master Court Package ${pkg.id} assembled with digital signatures and BSA Section 63 Schedule.`);
    setTimeout(() => setNotification(null), 4000);
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full">
                Prosecution & Judicial Interoperability
              </span>
              <span className="text-xs font-mono text-slate-500 font-bold">• Directorate of Prosecution</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#162E52] tracking-tight">
              Legal & Court Proceedings Portal
            </h1>
            <p className="text-xs sm:text-sm text-slate-600">
              Prosecuting Officer: <strong>{currentOfficer.name}</strong> ({currentOfficer.department})
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleGeneratePackage}
              className="px-4 py-2.5 bg-[#F5821F] hover:bg-[#E06D0B] text-white font-bold text-xs rounded-xl flex items-center gap-2 transition-colors cursor-pointer shadow-sm"
            >
              <Download className="w-4 h-4" />
              <span>Generate Master Court Package</span>
            </button>
            <button
              onClick={() => setShowOrderModal(true)}
              className="px-4 py-2.5 bg-[#162E52] hover:bg-[#0F2A4A] text-white font-bold text-xs rounded-xl flex items-center gap-2 transition-colors cursor-pointer shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Record Court Order</span>
            </button>
          </div>
        </div>

        {notification && (
          <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-2xl text-xs font-semibold flex items-center gap-2 animate-in fade-in duration-150">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>{notification}</span>
          </div>
        )}

        {/* Two Column Layout: Court Case Files (5 cols) & Judicial Proceeding Docket (7 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Court Cases List */}
          <div className="lg:col-span-5 space-y-3">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wide block mb-1">
              Active Trial Dockets ({legalRecords.length})
            </span>

            {legalRecords.map(item => (
              <div
                key={item.id}
                onClick={() => setSelectedRecordId(item.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer text-left ${
                  selectedRecordId === item.id
                    ? 'bg-amber-50/70 border-amber-300 shadow-xs'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-mono font-bold text-amber-900 bg-amber-100/70 px-2 py-0.5 rounded">
                    {item.courtCaseNumber}
                  </span>
                  <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded font-mono">
                    {item.firNumber}
                  </span>
                </div>

                <h4 className="text-xs font-bold text-slate-800 line-clamp-1 mb-1">
                  {item.courtName}
                </h4>

                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span>Stage: {item.currentStage}</span>
                  <span className="font-semibold text-red-700 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>Next: {item.nextHearingDate}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Full Court Proceeding Docket */}
          {selectedRecord && (
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs space-y-6">
              
              {/* Docket Top Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
                <div>
                  <span className="text-xs font-mono font-bold text-amber-900 bg-amber-50 px-2.5 py-0.5 rounded-md border border-amber-200">
                    {selectedRecord.courtCaseNumber}
                  </span>
                  <h3 className="text-base font-bold text-[#162E52] mt-1.5">{selectedRecord.courtName}</h3>
                  <p className="text-xs text-slate-500">Presiding Judge: <strong>{selectedRecord.presidingJudge}</strong></p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-amber-100 text-amber-900 block font-mono">
                    {selectedRecord.currentStage}
                  </span>
                </div>
              </div>

              {/* Digital Evidence Exhibits Concordance Table */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#162E52] flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Admissible Digital Exhibits Concordance ({caseEvids.length}):</span>
                  </span>
                </div>

                <div className="space-y-2">
                  {caseEvids.map((ev, idx) => (
                    <div key={ev.id} className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-[#162E52]">Exhibit P-{idx + 1}:</span>
                          <span className="font-mono font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded text-[11px]">{ev.id}</span>
                          <span className="text-slate-800 font-semibold">{ev.title}</span>
                        </div>
                        <span className="text-[10.5px] font-mono text-slate-500 block">
                          SHA-256: {ev.currentHashSHA256.slice(0, 32)}...
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setSelectedEvidenceForCert(ev);
                            setShowCertModal(true);
                          }}
                          className="px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-300 font-bold text-[11px] text-[#162E52] rounded-lg cursor-pointer transition-colors"
                        >
                          View Sec 63 Cert
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Accused & Charges Overview */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Accused on Trial</span>
                  <span className="font-bold text-slate-800">{selectedRecord.accused.join(', ')}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Next Hearing Date</span>
                  <span className="font-bold text-red-700 font-mono">{selectedRecord.nextHearingDate}</span>
                </div>
                <div className="sm:col-span-2">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Charges Framed</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {selectedRecord.sectionsCharged.map((sec, idx) => (
                      <span key={idx} className="bg-white px-2 py-0.5 rounded border border-slate-200 font-mono text-[11px]">
                        {sec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Prosecutor Strategy Notes */}
              <div className="p-4 bg-blue-50/70 rounded-2xl border border-blue-200/80 space-y-1.5 text-xs">
                <span className="font-bold text-[#162E52] flex items-center gap-1.5">
                  <Bookmark className="w-3.5 h-3.5 text-[#162E52]" />
                  <span>Prosecutor Trial Strategy & Case Notes:</span>
                </span>
                <p className="text-slate-700 leading-relaxed">
                  {selectedRecord.prosecutorNotes}
                </p>
              </div>

              {/* Court Orders History */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-[#162E52] block">
                  Judicial Orders & Rulings Log:
                </span>
                <div className="space-y-2">
                  {selectedRecord.courtOrders.map((order, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-1">
                      <div className="flex justify-between items-center text-[11px] font-mono text-slate-500">
                        <span className="font-bold text-amber-900">Judicial Order #{idx + 1}</span>
                        <span>Date: {order.date}</span>
                      </div>
                      <p className="text-slate-800 font-medium">{order.orderSummary}</p>
                      <span className="text-[10px] text-slate-400 font-mono block">Signed by: {order.signedBy}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

        </div>

      </div>

      {/* Record Court Order Modal */}
      {showOrderModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-2xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-xl border border-slate-200 space-y-4">
            <h3 className="text-base font-bold text-[#162E52]">Record Judicial Order</h3>
            <form onSubmit={handleAddOrder} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Case Docket</label>
                <input
                  type="text"
                  disabled
                  value={`${selectedRecord?.courtCaseNumber} - ${selectedRecord?.courtName}`}
                  className="w-full p-2 bg-slate-100 border border-slate-300 rounded-lg text-slate-600"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Order Summary & Ruling</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Enter verbatim order summary passed by the Hon'ble Court..."
                  value={newOrderText}
                  onChange={(e) => setNewOrderText(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowOrderModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg cursor-pointer"
                >
                  Record Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* BSA Section 63 Schedule Certificate Modal */}
      <BSA63CertificateModal
        evidence={selectedEvidenceForCert}
        isOpen={showCertModal}
        onClose={() => setShowCertModal(false)}
      />

    </div>
  );
};
