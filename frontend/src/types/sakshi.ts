export type SakshiRole = 
  | 'district_admin'
  | 'central_admin'
  | 'investigating_officer'
  | 'womens_safety_officer'
  | 'forensic_officer'
  | 'prosecuting_officer'
  | 'senior_officer';

export interface OfficerProfile {
  id: string;
  name: string;
  badgeNumber: string;
  role: SakshiRole;
  roleTitle: string;
  department: string;
  district: string;
  state: string;
  avatar?: string;
  clearanceLevel: 'Level 1' | 'Level 2' | 'Level 3' | 'Top Secret';
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  officerId: string;
  officerName: string;
  role: SakshiRole;
  action: string;
  entityType: 'CASE' | 'EVIDENCE' | 'WOMENS_SAFETY' | 'DISPATCH' | 'APPROVAL' | 'ESCALATION';
  entityId: string;
  details: string;
  hash: string;
  ipAddress: string;
}

export interface AlertItem {
  id: string;
  title: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  category: 'DISTRICT_ALERT' | 'EVIDENTIARY_BREACH' | 'WOMENS_SAFETY_EMERGENCY' | 'OVERDUE_INVESTIGATION' | 'ESCALATION';
  district: string;
  timestamp: string;
  status: 'PENDING' | 'UNDER_REVIEW' | 'ACTIONED' | 'ESCALATED_TO_CENTRAL';
  description: string;
  linkedEntityId?: string;
  assignedOfficerId?: string;
}

export interface CaseRecord {
  id: string;
  firNumber: string;
  policeStation: string;
  district: string;
  state: string;
  sections: string[];
  title: string;
  complainant: string;
  dateFiled: string;
  status: 'UNDER_INVESTIGATION' | 'CHARGE_SHEET_FILED' | 'COURT_TRIAL' | 'PENDING_APPROVAL' | 'CLOSED';
  priority: 'URGENT' | 'HIGH' | 'NORMAL';
  assignedIOId: string;
  assignedIOName: string;
  timeline: {
    date: string;
    stage: string;
    notes: string;
    officer: string;
  }[];
  suspects: {
    name: string;
    age: number;
    status: 'ARRESTED' | 'WANTED' | 'QUESTIONED' | 'BAIL';
    notes: string;
  }[];
  witnesses: {
    name: string;
    statementDate: string;
    verified: boolean;
    statementSummary: string;
  }[];
  evidenceCount: number;
  courtCaseNumber?: string;
  isProtectedRecord: boolean;
  changeRequestPending?: boolean;
}

export interface WomensSafetyRecord {
  id: string; // WS Case ID (e.g. WS-2026-DL-8821)
  callerName: string;
  phoneNumber: string;
  callLocation: string;
  callDateTime: string;
  callHandler: string;
  officersDispatched: string[];
  vehicleDispatched: string;
  caseInCharge: string;
  dispatchTime: string;
  responseTimeMinutes: number;
  firFiled: boolean;
  firNumber?: string;
  linkedCaseId?: string; // Referenced internally
  status: 'EMERGENCY_DISPATCHED' | 'RESPONDED_ON_SITE' | 'COUNSELING_IN_PROGRESS' | 'CASE_REGISTERED' | 'RESOLVED_CLOSED';
  followUpActions: string[];
  evidenceDescriptions: string[];
  evidencePhotographsCount: number;
  relatedDocuments: string[];
}

export interface EvidenceItem {
  id: string; // E.g. EVD-2026-9042
  title: string;
  type: 'PHYSICAL' | 'DIGITAL' | 'FORENSIC_SAMPLE' | 'DOCUMENTARY';
  description: string;
  collectionLocation: string;
  collectionDateTime: string;
  collectingOfficerName: string;
  collectingOfficerBadge: string;
  caseId: string;
  firNumber: string;
  currentCustodian: string;
  custodianLocation: string;
  status: 'COLLECTED' | 'IN_TRANSIT' | 'UNDER_FORENSIC_EXAMINATION' | 'DEPOSITED_MALKHANA' | 'PRODUCED_IN_COURT';
  verificationHash: string;
  photographsCount: number;
  chainOfCustody: {
    id: string;
    fromOfficer: string;
    toOfficer: string;
    transferTimestamp: string;
    reason: string;
    verifiedSignature: string;
  }[];
}

export interface LegalCourtRecord {
  id: string;
  courtCaseNumber: string;
  courtName: string;
  firNumber: string;
  caseId: string;
  accused: string[];
  sectionsCharged: string[];
  presidingJudge: string;
  publicProsecutor: string;
  nextHearingDate: string;
  currentStage: 'BAIL_HEARING' | 'FRAMING_OF_CHARGES' | 'PROSECUTION_EVIDENCE' | 'DEFENCE_EVIDENCE' | 'FINAL_ARGUMENTS' | 'JUDGMENT_RESERVED';
  courtOrders: {
    date: string;
    orderSummary: string;
    signedBy: string;
    documentUrl?: string;
  }[];
  prosecutorNotes: string;
  timeline: {
    date: string;
    event: string;
    outcome: string;
  }[];
}

export interface ApprovalRequest {
  id: string;
  requestedByOfficerId: string;
  requestedByOfficerName: string;
  requestedByRole: SakshiRole;
  requestType: 'RECORD_MODIFICATION' | 'SPECIAL_RESOURCE_DISPATCH' | 'HIGH_RISK_WARRANT' | 'INTER_DISTRICT_TRANSFER' | 'CASE_CLOSURE';
  targetEntityId: string;
  targetEntityType: 'CASE' | 'EVIDENCE' | 'OFFICER_RECORDS';
  reason: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  submittedDate: string;
  reviewedBy?: string;
  reviewedDate?: string;
  reviewRemarks?: string;
}
