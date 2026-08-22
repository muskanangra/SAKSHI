import React, { createContext, useContext, useState, useEffect } from 'react';
import { SakshiRole, OfficerProfile, AlertItem, CaseRecord, WomensSafetyRecord, EvidenceItem, LegalCourtRecord, ApprovalRequest, AuditLogEntry } from '../types/sakshi';
import { INITIAL_OFFICERS, INITIAL_ALERTS, INITIAL_CASES, INITIAL_WOMENS_SAFETY_RECORDS, INITIAL_EVIDENCE, INITIAL_LEGAL_RECORDS, INITIAL_APPROVAL_REQUESTS, INITIAL_AUDIT_LOGS } from '../data/mockDatabase';

interface SakshiContextType {
  currentOfficer: OfficerProfile;
  currentRole: SakshiRole;
  officers: OfficerProfile[];
  alerts: AlertItem[];
  cases: CaseRecord[];
  womensSafetyRecords: WomensSafetyRecord[];
  evidenceItems: EvidenceItem[];
  legalRecords: LegalCourtRecord[];
  approvalRequests: ApprovalRequest[];
  auditLogs: AuditLogEntry[];
  
  // Actions
  switchRole: (role: SakshiRole) => void;
  addAuditLog: (action: string, entityType: AuditLogEntry['entityType'], entityId: string, details: string) => void;
  escalateAlertToCentral: (alertId: string) => void;
  actionAlert: (alertId: string) => void;
  assignCaseIO: (caseId: string, officerId: string, officerName: string) => void;
  requestRecordModification: (caseId: string, reason: string) => void;
  approveRequest: (requestId: string, remarks: string) => void;
  rejectRequest: (requestId: string, remarks: string) => void;
  addCaseTimelineEntry: (caseId: string, stage: string, notes: string) => void;
  addWomensSafetyRecord: (record: Omit<WomensSafetyRecord, 'id'>) => string;
  linkWSToCase: (wsId: string, caseId: string, firNumber: string) => void;
  transferEvidenceCustody: (evidenceId: string, toOfficer: string, reason: string) => void;
  addCourtOrder: (legalId: string, orderSummary: string) => void;
}

const SakshiContext = createContext<SakshiContextType | undefined>(undefined);

export const SakshiProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRole, setCurrentRole] = useState<SakshiRole>('district_admin');
  const [officers] = useState<OfficerProfile[]>(INITIAL_OFFICERS);
  const [currentOfficer, setCurrentOfficer] = useState<OfficerProfile>(INITIAL_OFFICERS[0]);
  
  const [alerts, setAlerts] = useState<AlertItem[]>(INITIAL_ALERTS);
  const [cases, setCases] = useState<CaseRecord[]>(INITIAL_CASES);
  const [womensSafetyRecords, setWomensSafetyRecords] = useState<WomensSafetyRecord[]>(INITIAL_WOMENS_SAFETY_RECORDS);
  const [evidenceItems, setEvidenceItems] = useState<EvidenceItem[]>(INITIAL_EVIDENCE);
  const [legalRecords, setLegalRecords] = useState<LegalCourtRecord[]>(INITIAL_LEGAL_RECORDS);
  const [approvalRequests, setApprovalRequests] = useState<ApprovalRequest[]>(INITIAL_APPROVAL_REQUESTS);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(INITIAL_AUDIT_LOGS);

  // Sync current officer on role switch
  useEffect(() => {
    const matched = officers.find(o => o.role === currentRole);
    if (matched) {
      setCurrentOfficer(matched);
    }
  }, [currentRole, officers]);

  const switchRole = (role: SakshiRole) => {
    setCurrentRole(role);
    const matched = officers.find(o => o.role === role);
    if (matched) {
      setCurrentOfficer(matched);
      addAuditLog('SESSION_SWITCH', 'APPROVAL', matched.id, `Role switched to ${matched.roleTitle} (${role})`);
    }
  };

  const addAuditLog = (
    action: string,
    entityType: AuditLogEntry['entityType'],
    entityId: string,
    details: string
  ) => {
    const randomHex = Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    const newEntry: AuditLogEntry = {
      id: `AUD-${Math.floor(10000 + Math.random() * 90000)}`,
      timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' IST',
      officerId: currentOfficer.id,
      officerName: currentOfficer.name,
      role: currentRole,
      action,
      entityType,
      entityId,
      details,
      hash: randomHex,
      ipAddress: '10.144.' + Math.floor(10 + Math.random() * 80) + '.' + Math.floor(10 + Math.random() * 200) + ' (Secure Intranet)'
    };
    setAuditLogs(prev => [newEntry, ...prev]);
  };

  const escalateAlertToCentral = (alertId: string) => {
    setAlerts(prev => prev.map(a => a.id === alertId ? { ...a, status: 'ESCALATED_TO_CENTRAL' } : a));
    addAuditLog('ALERT_ESCALATED_TO_CENTRAL', 'ESCALATION', alertId, `District Admin escalated alert ${alertId} to Central Command for high-level monitoring.`);
  };

  const actionAlert = (alertId: string) => {
    setAlerts(prev => prev.map(a => a.id === alertId ? { ...a, status: 'ACTIONED' } : a));
    addAuditLog('ALERT_ACTIONED', 'ESCALATION', alertId, `Alert ${alertId} reviewed and marked as actioned.`);
  };

  const assignCaseIO = (caseId: string, officerId: string, officerName: string) => {
    setCases(prev => prev.map(c => c.id === caseId ? { ...c, assignedIOId: officerId, assignedIOName: officerName } : c));
    addAuditLog('CASE_ASSIGNED', 'CASE', caseId, `Assigned to IO ${officerName} (${officerId})`);
  };

  const requestRecordModification = (caseId: string, reason: string) => {
    const newReqId = `REQ-2026-${Math.floor(100 + Math.random() * 900)}`;
    const newRequest: ApprovalRequest = {
      id: newReqId,
      requestedByOfficerId: currentOfficer.id,
      requestedByOfficerName: currentOfficer.name,
      requestedByRole: currentRole,
      requestType: 'RECORD_MODIFICATION',
      targetEntityId: caseId,
      targetEntityType: 'CASE',
      reason,
      status: 'PENDING',
      submittedDate: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' IST'
    };
    setApprovalRequests(prev => [newRequest, ...prev]);
    setCases(prev => prev.map(c => c.id === caseId ? { ...c, changeRequestPending: true } : c));
    addAuditLog('CHANGE_REQUEST_SUBMITTED', 'APPROVAL', newReqId, `Modification request submitted for protected record ${caseId}: ${reason}`);
  };

  const approveRequest = (requestId: string, remarks: string) => {
    setApprovalRequests(prev => prev.map(r => r.id === requestId ? {
      ...r,
      status: 'APPROVED',
      reviewedBy: currentOfficer.name,
      reviewedDate: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' IST',
      reviewRemarks: remarks
    } : r));
    addAuditLog('REQUEST_APPROVED', 'APPROVAL', requestId, `Approved by ${currentOfficer.name}: ${remarks}`);
  };

  const rejectRequest = (requestId: string, remarks: string) => {
    setApprovalRequests(prev => prev.map(r => r.id === requestId ? {
      ...r,
      status: 'REJECTED',
      reviewedBy: currentOfficer.name,
      reviewedDate: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' IST',
      reviewRemarks: remarks
    } : r));
    addAuditLog('REQUEST_REJECTED', 'APPROVAL', requestId, `Rejected by ${currentOfficer.name}: ${remarks}`);
  };

  const addCaseTimelineEntry = (caseId: string, stage: string, notes: string) => {
    setCases(prev => prev.map(c => {
      if (c.id === caseId) {
        return {
          ...c,
          timeline: [
            ...c.timeline,
            {
              date: new Date().toISOString().slice(0, 16).replace('T', ' '),
              stage,
              notes,
              officer: currentOfficer.name
            }
          ]
        };
      }
      return c;
    }));
    addAuditLog('CASE_TIMELINE_UPDATED', 'CASE', caseId, `Stage: ${stage} - ${notes}`);
  };

  const addWomensSafetyRecord = (record: Omit<WomensSafetyRecord, 'id'>): string => {
    const newId = `WS-2026-DL-${Math.floor(1000 + Math.random() * 9000)}`;
    const fullRecord: WomensSafetyRecord = {
      id: newId,
      ...record
    };
    setWomensSafetyRecords(prev => [fullRecord, ...prev]);
    addAuditLog('WOMENS_SAFETY_RECORD_CREATED', 'WOMENS_SAFETY', newId, `Caller: ${record.callerName}, Location: ${record.callLocation}, Dispatched: ${record.vehicleDispatched}`);
    return newId;
  };

  const linkWSToCase = (wsId: string, caseId: string, firNumber: string) => {
    setWomensSafetyRecords(prev => prev.map(ws => ws.id === wsId ? {
      ...ws,
      firFiled: true,
      firNumber,
      linkedCaseId: caseId,
      status: 'CASE_REGISTERED'
    } : ws));
    addAuditLog('WS_LINKED_TO_CASE', 'WOMENS_SAFETY', wsId, `Linked to FIR ${firNumber} (Internal Case ID: ${caseId})`);
  };

  const transferEvidenceCustody = (evidenceId: string, toOfficer: string, reason: string) => {
    setEvidenceItems(prev => prev.map(item => {
      if (item.id === evidenceId) {
        const newCocEntry = {
          id: `COC-0${item.chainOfCustody.length + 1}`,
          fromOfficer: item.currentCustodian,
          toOfficer,
          transferTimestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' IST',
          reason,
          verifiedSignature: `DIGISIGN-${toOfficer.slice(0, 4).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}-VERIFIED`
        };
        return {
          ...item,
          currentCustodian: toOfficer,
          chainOfCustody: [...item.chainOfCustody, newCocEntry]
        };
      }
      return item;
    }));
    addAuditLog('EVIDENCE_CUSTODY_TRANSFERRED', 'EVIDENCE', evidenceId, `Transferred to ${toOfficer}. Reason: ${reason}`);
  };

  const addCourtOrder = (legalId: string, orderSummary: string) => {
    setLegalRecords(prev => prev.map(lr => {
      if (lr.id === legalId) {
        return {
          ...lr,
          courtOrders: [
            ...lr.courtOrders,
            {
              date: new Date().toISOString().slice(0, 10),
              orderSummary,
              signedBy: lr.presidingJudge
            }
          ]
        };
      }
      return lr;
    }));
    addAuditLog('COURT_ORDER_LOGGED', 'CASE', legalId, `Order logged: ${orderSummary}`);
  };

  return (
    <SakshiContext.Provider
      value={{
        currentOfficer,
        currentRole,
        officers,
        alerts,
        cases,
        womensSafetyRecords,
        evidenceItems,
        legalRecords,
        approvalRequests,
        auditLogs,
        switchRole,
        addAuditLog,
        escalateAlertToCentral,
        actionAlert,
        assignCaseIO,
        requestRecordModification,
        approveRequest,
        rejectRequest,
        addCaseTimelineEntry,
        addWomensSafetyRecord,
        linkWSToCase,
        transferEvidenceCustody,
        addCourtOrder
      }}
    >
      {children}
    </SakshiContext.Provider>
  );
};

export const useSakshi = (): SakshiContextType => {
  const context = useContext(SakshiContext);
  if (!context) {
    throw new Error('useSakshi must be used within a SakshiProvider');
  }
  return context;
};
