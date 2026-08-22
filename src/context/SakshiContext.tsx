import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  SakshiRole,
  OfficerProfile,
  AlertItem,
  CaseRecord,
  WomensSafetyRecord,
  CanonicalEvidenceObject,
  LegalCourtRecord,
  ApprovalRequest,
  AuditLogEntry,
  EvidenceGraphNode,
  EvidenceGraphEdge,
  CourtSubmissionPackage,
  AISearchResult
} from '../types/sakshi';
import {
  INITIAL_OFFICERS,
  INITIAL_ALERTS,
  INITIAL_CASES,
  INITIAL_WOMENS_SAFETY_RECORDS,
  INITIAL_CANONICAL_EVIDENCE,
  INITIAL_LEGAL_RECORDS,
  INITIAL_APPROVAL_REQUESTS,
  INITIAL_AUDIT_LOGS,
  INITIAL_EVIDENCE_GRAPH_NODES,
  INITIAL_EVIDENCE_GRAPH_EDGES,
  INITIAL_COURT_PACKAGES
} from '../data/mockDatabase';

interface SakshiContextType {
  currentOfficer: OfficerProfile;
  currentRole: SakshiRole;
  officers: OfficerProfile[];
  alerts: AlertItem[];
  cases: CaseRecord[];
  womensSafetyRecords: WomensSafetyRecord[];
  evidenceItems: CanonicalEvidenceObject[];
  legalRecords: LegalCourtRecord[];
  approvalRequests: ApprovalRequest[];
  auditLogs: AuditLogEntry[];
  graphNodes: EvidenceGraphNode[];
  graphEdges: EvidenceGraphEdge[];
  courtPackages: CourtSubmissionPackage[];
  isDemoTourActive: boolean;

  // Actions
  switchRole: (role: SakshiRole) => void;
  setDemoTourActive: (active: boolean) => void;
  addAuditLog: (action: string, entityType: AuditLogEntry['entityType'], entityId: string, details: string) => void;
  
  // Evidence & Integrity Engine Actions
  simulateEvidenceTamper: (evidenceId: string) => void;
  restoreEvidenceIntegrity: (evidenceId: string) => void;
  importFromConnector: (source: 'eSakshya' | 'CCTNS' | 'ICJS') => string;
  transferEvidenceCustody: (evidenceId: string, toOfficer: string, reason: string, location: string) => void;
  
  // BSA Section 63 Compliance Actions
  runBSAComplianceCheck: (evidenceId: string) => void;
  resolveMissingBSAField: (evidenceId: string, fieldKey: string, value: string) => void;
  
  // AI Investigation & Court Package Actions
  runAISearch: (query: string) => AISearchResult;
  generateCourtPackage: (caseId: string) => CourtSubmissionPackage;
  
  // Case & Alerts Actions
  escalateAlertToCentral: (alertId: string) => void;
  actionAlert: (alertId: string) => void;
  assignCaseIO: (caseId: string, officerId: string, officerName: string) => void;
  requestRecordModification: (caseId: string, reason: string) => void;
  approveRequest: (requestId: string, remarks: string) => void;
  rejectRequest: (requestId: string, remarks: string) => void;
  addCaseTimelineEntry: (caseId: string, stage: string, notes: string) => void;
  addWomensSafetyRecord: (record: Omit<WomensSafetyRecord, 'id'>) => string;
  linkWSToCase: (wsId: string, caseId: string, firNumber: string) => void;
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
  const [evidenceItems, setEvidenceItems] = useState<CanonicalEvidenceObject[]>(INITIAL_CANONICAL_EVIDENCE);
  const [legalRecords, setLegalRecords] = useState<LegalCourtRecord[]>(INITIAL_LEGAL_RECORDS);
  const [approvalRequests, setApprovalRequests] = useState<ApprovalRequest[]>(INITIAL_APPROVAL_REQUESTS);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(INITIAL_AUDIT_LOGS);
  const [graphNodes, setGraphNodes] = useState<EvidenceGraphNode[]>(INITIAL_EVIDENCE_GRAPH_NODES);
  const [graphEdges, setGraphEdges] = useState<EvidenceGraphEdge[]>(INITIAL_EVIDENCE_GRAPH_EDGES);
  const [courtPackages, setCourtPackages] = useState<CourtSubmissionPackage[]>(INITIAL_COURT_PACKAGES);
  const [isDemoTourActive, setDemoTourActive] = useState<boolean>(false);

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
      ipAddress: '10.144.' + Math.floor(10 + Math.random() * 80) + '.' + Math.floor(10 + Math.random() * 200) + ' (Secure NIC Grid)'
    };
    setAuditLogs(prev => [newEntry, ...prev]);
  };

  // 1. Simulate Evidence Byte Tampering (Instant Hash Mismatch Alarm)
  const simulateEvidenceTamper = (evidenceId: string) => {
    const corruptedHash = 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855';
    setEvidenceItems(prev => prev.map(item => {
      if (item.id === evidenceId) {
        return {
          ...item,
          currentHashSHA256: corruptedHash,
          isTampered: true,
          tamperDetails: 'CRITICAL: Byte-level hash drift detected! Hash mismatch between original sealed fingerprint and current storage image.'
        };
      }
      return item;
    }));

    // Add high severity alert
    const newAlert: AlertItem = {
      id: `ALT-${Math.floor(100 + Math.random() * 900)}`,
      title: `SECURITY BREACH: Cryptographic Hash Mismatch on ${evidenceId}`,
      description: `Integrity daemon detected unauthorized 1-bit modification on digital evidence ${evidenceId}. Section 63 BSA compliance suspended until re-verified.`,
      severity: 'CRITICAL',
      district: currentOfficer.district,
      timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' IST',
      status: 'PENDING',
      linkedEntityId: evidenceId
    };
    setAlerts(prev => [newAlert, ...prev]);
    addAuditLog('INTEGRITY_TAMPER_DETECTED', 'EVIDENCE', evidenceId, `ALARM: Cryptographic signature failure on ${evidenceId}. Hash drift detected.`);
  };

  // 2. Restore Evidence Integrity (Zero Drift)
  const restoreEvidenceIntegrity = (evidenceId: string) => {
    setEvidenceItems(prev => prev.map(item => {
      if (item.id === evidenceId) {
        return {
          ...item,
          currentHashSHA256: item.originalHashSHA256,
          isTampered: false,
          tamperDetails: undefined
        };
      }
      return item;
    }));
    addAuditLog('INTEGRITY_RE_VERIFIED', 'EVIDENCE', evidenceId, `Re-synchronized with primary immutable hardware-locked archive. Zero hash drift confirmed.`);
  };

  // 3. Simulated Import from Connector (eSakshya / CCTNS / ICJS)
  const importFromConnector = (source: 'eSakshya' | 'CCTNS' | 'ICJS'): string => {
    const newEID = `EVD-2026-DL-${Math.floor(9100 + Math.random() * 800)}`;
    const randomSha = Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    
    const newObject: CanonicalEvidenceObject = {
      id: newEID,
      title: source === 'eSakshya' 
        ? 'Crime Scene 360° Panoramic Video Capture (eSakshya App)' 
        : source === 'CCTNS'
        ? 'Seized Digital Banking Ledger & UPI Transaction Manifest'
        : 'Inter-State Accused Forensics Docket (ICJS Cross-Pillar)',
      category: source === 'eSakshya' ? 'CRIME_SCENE_PHOTO' : 'SEIZED_DOCUMENT',
      sourceSystem: source,
      caseId: 'CASE-2026-DL-001',
      firNumber: 'FIR No. 142/2026',
      fileFormat: source === 'eSakshya' ? 'MP4 / H.265' : 'JSON / XML Data Package',
      fileSizeBytes: 28400000,
      originalHashSHA256: randomSha,
      currentHashSHA256: randomSha,
      isTampered: false,
      provenanceType: 'SECTION_63_SECONDARY_ELECTRONIC',
      collectionTimestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' IST',
      collectionLocation: 'Imported via ' + source + ' Authorized Government Gateway Node #DL-04',
      collectingOfficerName: currentOfficer.name,
      collectingOfficerBadge: currentOfficer.badgeNumber,
      currentCustodian: currentOfficer.name,
      storageVault: 'NIC National Cloud Protected Vault #DL-04',
      photographsCount: 3,
      deepfakeRiskScore: 0.5,
      deepfakeFlags: ['Authorized PKI Certificate Authenticated'],
      bsaCompliance: {
        overallScore: 85,
        isCertificateReady: false,
        deviceOperatingProperly: true,
        deviceOwnerIdentified: true,
        hashAlgorithmSpecified: true,
        custodianSigned: false,
        sourceDeviceIMEIOrMAC: 'NIC Gateway Endpoint #9021',
        sourceDeviceMakeModel: 'Government Secure Capture Node',
        acquisitionMethod: 'Direct API Stream Ingestion',
        missingFields: ['Custodian Digital Signature']
      },
      chainOfCustody: [
        {
          id: 'COC-01',
          fromOfficer: source + ' Automated Ingestion Pipeline',
          toOfficer: currentOfficer.name,
          transferTimestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' IST',
          reason: 'Authorized Case Linkage and Canonical Normalization under Section 63 BSA',
          verifiedSignature: `DIGISIGN-${source}-API-INBOUND-VERIFIED`,
          location: 'SAKSHI Ingestion Node #DL-04'
        }
      ]
    };

    setEvidenceItems(prev => [newObject, ...prev]);

    // Also add a node to the evidence graph
    const newNode: EvidenceGraphNode = {
      id: newEID,
      label: newEID,
      type: 'EVIDENCE',
      details: newObject.title,
      risk: 'NORMAL'
    };
    const newEdge: EvidenceGraphEdge = {
      id: `EDGE-${Math.floor(100 + Math.random() * 900)}`,
      source: 'CASE-01',
      target: newEID,
      label: 'Ingested via ' + source,
      confidence: 1.0,
      supportingEIDs: [newEID]
    };
    setGraphNodes(prev => [...prev, newNode]);
    setGraphEdges(prev => [...prev, newEdge]);

    addAuditLog('CONNECTOR_EVIDENCE_INGESTED', 'EVIDENCE', newEID, `Imported from ${source} connector. Canonical EID ${newEID} created with SHA-256 fingerprint.`);
    return newEID;
  };

  // 4. Run BSA Section 63 Readiness Check
  const runBSAComplianceCheck = (evidenceId: string) => {
    setEvidenceItems(prev => prev.map(item => {
      if (item.id === evidenceId) {
        const isClean = !item.isTampered && item.bsaCompliance.missingFields.length === 0;
        return {
          ...item,
          bsaCompliance: {
            ...item.bsaCompliance,
            overallScore: isClean ? 100 : item.isTampered ? 20 : 85,
            isCertificateReady: isClean
          }
        };
      }
      return item;
    }));
    addAuditLog('BSA63_COMPLIANCE_EVALUATED', 'BSA_CERTIFICATE', evidenceId, `BSA Section 63 completeness evaluated for ${evidenceId}.`);
  };

  // 5. Resolve Missing BSA Section 63 Field
  const resolveMissingBSAField = (evidenceId: string, fieldKey: string, value: string) => {
    setEvidenceItems(prev => prev.map(item => {
      if (item.id === evidenceId) {
        const updatedMissing = item.bsaCompliance.missingFields.filter(f => f !== fieldKey);
        return {
          ...item,
          bsaCompliance: {
            ...item.bsaCompliance,
            missingFields: updatedMissing,
            custodianSigned: true,
            overallScore: updatedMissing.length === 0 ? 100 : 90,
            isCertificateReady: updatedMissing.length === 0
          }
        };
      }
      return item;
    }));
    addAuditLog('BSA63_METADATA_UPDATED', 'BSA_CERTIFICATE', evidenceId, `Endorsed ${fieldKey} (${value}) on ${evidenceId}. Score elevated to 100%.`);
  };

  // 6. Source-Grounded Explainable AI Search
  const runAISearch = (query: string): AISearchResult => {
    addAuditLog('AI_SEMANTIC_SEARCH', 'CASE', 'CASE-2026-DL-001', `Explainable AI query: "${query}". Citations generated.`);
    return {
      query,
      answerSummary: `Cross-evidence intelligence synthesis across FIR No. 142/2026: Suspect Rohan Sethi (+91 98110 44921) was identified at Connaught Place Outer Circle at 23:18 IST driving Hyundai Creta (DL-3C-AZ-4901), corroborated by CCTV Cam #08 footage. UFDR chat analysis reveals 3 encrypted Signal calls to co-conspirator Mohit Khurana at 23:35 IST, followed by a CDR cell tower ping near Khan Market at 23:42 IST.`,
      confidenceScore: 0.96,
      citedEvidence: [
        {
          eid: 'EVD-2026-DL-9042',
          evidenceTitle: 'CCTV Traffic Cam Feed #08',
          excerpt: 'Creta DL-3C-AZ-4901 captured passing Rivoli Pole #24 at 23:18:14 IST with suspect exiting vehicle.',
          timestamp: '2026-08-14 23:18:14 IST',
          pageOrTimestampRef: 'Timestamp 00:18:14'
        },
        {
          eid: 'EVD-2026-DL-9043',
          evidenceTitle: 'UFDR Mobile Extraction Report (iPhone 14 Pro)',
          excerpt: 'Encrypted Signal call log with Mohit Khurana (Duration: 4m 12s) discussing meeting location.',
          timestamp: '2026-08-14 23:35:00 IST',
          pageOrTimestampRef: 'UFDR Section 4.2 / Chat DB Row #881'
        },
        {
          eid: 'EVD-2026-DL-9044',
          evidenceTitle: 'Cellular CDR Logs (Airtel/Jio)',
          excerpt: 'Handset registered tower ping at BTS Tower #DL-CP-902 (Azim Market / Khan Market sector).',
          timestamp: '2026-08-14 23:42:19 IST',
          pageOrTimestampRef: 'CSV Line 492'
        }
      ],
      suggestedGraphLinks: [
        'Rohan Sethi ↔ Creta DL-3C-AZ-4901 (High Confidence 0.98)',
        'Rohan Sethi ↔ Mohit Khurana (Co-conspirator link 0.89)'
      ]
    };
  };

  // 7. Generate One-Click Master Court Package
  const generateCourtPackage = (caseId: string): CourtSubmissionPackage => {
    const pkgId = `PKG-2026-DL-${Math.floor(100 + Math.random() * 900)}`;
    const randomSig = '0x' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    const targetCase = cases.find(c => c.id === caseId) || cases[0];
    const caseEvids = evidenceItems.filter(e => e.caseId === caseId);

    const newPackage: CourtSubmissionPackage = {
      id: pkgId,
      courtCaseNumber: targetCase.courtCaseNumber || 'CR-COMM/2026/8841',
      firNumber: targetCase.firNumber,
      courtName: 'Special Judge (CBI/Cyber), Tis Hazari Courts Complex',
      generatedDate: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' IST',
      generatedByOfficer: currentOfficer.name + ` (${currentOfficer.roleTitle})`,
      includedEIDs: caseEvids.map(e => e.id),
      totalExhibits: caseEvids.length,
      bsa63CertificateStatus: 'SIGNED_AND_ATTACHED',
      digitalSignatureHash: randomSig,
      masterArchiveChecksum: 'SHA256: ' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join(''),
      concordanceIndex: caseEvids.map((ev, idx) => ({
        exhibitNumber: `Exhibit P-${idx + 1}`,
        eid: ev.id,
        description: ev.title,
        hash: ev.originalHashSHA256,
        bsaStatus: ev.bsaCompliance.isCertificateReady ? '100% Compliant (Sec 63(4) Certified)' : 'Conditional (Certificate Pending)'
      }))
    };

    setCourtPackages(prev => [newPackage, ...prev]);
    addAuditLog('COURT_PACKAGE_ASSEMBLED', 'COURT_PACKAGE', pkgId, `Master Court Package ${pkgId} compiled for ${targetCase.firNumber} with ${caseEvids.length} digital exhibits.`);
    return newPackage;
  };

  // Standard Actions
  const transferEvidenceCustody = (evidenceId: string, toOfficer: string, reason: string, location: string) => {
    setEvidenceItems(prev => prev.map(item => {
      if (item.id === evidenceId) {
        const newCoc = {
          id: `COC-0${item.chainOfCustody.length + 1}`,
          fromOfficer: item.currentCustodian,
          toOfficer,
          transferTimestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' IST',
          reason,
          verifiedSignature: `DIGISIGN-${toOfficer.slice(0, 4).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}-VERIFIED`,
          location
        };
        return {
          ...item,
          currentCustodian: toOfficer,
          storageVault: location,
          chainOfCustody: [...item.chainOfCustody, newCoc]
        };
      }
      return item;
    }));
    addAuditLog('EVIDENCE_CUSTODY_TRANSFERRED', 'EVIDENCE', evidenceId, `Transferred to ${toOfficer} at ${location}. Reason: ${reason}`);
  };

  const escalateAlertToCentral = (alertId: string) => {
    setAlerts(prev => prev.map(a => a.id === alertId ? { ...a, status: 'ESCALATED_TO_CENTRAL' } : a));
    addAuditLog('ALERT_ESCALATED_TO_CENTRAL', 'ESCALATION', alertId, `District Admin escalated alert ${alertId} to Central Command.`);
  };

  const actionAlert = (alertId: string) => {
    setAlerts(prev => prev.map(a => a.id === alertId ? { ...a, status: 'ACTIONED' } : a));
    addAuditLog('ALERT_ACTIONED', 'ESCALATION', alertId, `Alert ${alertId} reviewed and actioned.`);
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
    addAuditLog('WOMENS_SAFETY_RECORD_CREATED', 'WOMENS_SAFETY', newId, `Caller: ${record.callerName}, Location: ${record.callLocation}`);
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
        graphNodes,
        graphEdges,
        courtPackages,
        isDemoTourActive,
        switchRole,
        setDemoTourActive,
        addAuditLog,
        simulateEvidenceTamper,
        restoreEvidenceIntegrity,
        importFromConnector,
        transferEvidenceCustody,
        runBSAComplianceCheck,
        resolveMissingBSAField,
        runAISearch,
        generateCourtPackage,
        escalateAlertToCentral,
        actionAlert,
        assignCaseIO,
        requestRecordModification,
        approveRequest,
        rejectRequest,
        addCaseTimelineEntry,
        addWomensSafetyRecord,
        linkWSToCase,
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
