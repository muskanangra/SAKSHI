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
  clearanceLevel: 'LEVEL_1_FIELD' | 'LEVEL_2_DISTRICT' | 'LEVEL_3_STATE' | 'LEVEL_4_APEX';
  phone: string;
  email: string;
}

export type EvidenceCategory = 
  | 'CCTV_FOOTAGE'
  | 'CALL_DETAIL_RECORD_CDR'
  | 'MOBILE_EXTRACTION_UFDR'
  | 'AUDIO_RECORDING'
  | 'BODYCAM_FOOTAGE'
  | 'FORENSIC_DISK_IMAGE'
  | 'SEIZED_DOCUMENT'
  | 'CRIME_SCENE_PHOTO';

export interface BSA63ComplianceCheck {
  overallScore: number; // 0 to 100
  isCertificateReady: boolean;
  deviceOperatingProperly: boolean;
  deviceOwnerIdentified: boolean;
  hashAlgorithmSpecified: boolean;
  custodianSigned: boolean;
  sourceDeviceIMEIOrMAC: string;
  sourceDeviceMakeModel: string;
  acquisitionMethod: string;
  missingFields: string[];
}

export interface CustodyTransferRecord {
  id: string;
  fromOfficer: string;
  toOfficer: string;
  transferTimestamp: string;
  reason: string;
  verifiedSignature: string;
  location: string;
}

export interface CanonicalEvidenceObject {
  id: string; // EID (e.g. EVD-2026-DL-9042)
  title: string;
  category: EvidenceCategory;
  sourceSystem: 'eSakshya' | 'CCTNS' | 'ICJS' | 'Direct_Seizure' | 'CFSL_Upload';
  caseId: string;
  firNumber: string;
  fileFormat: string;
  fileSizeBytes: number;
  originalHashSHA256: string;
  currentHashSHA256: string;
  isTampered: boolean;
  tamperDetails?: string;
  provenanceType: 'SECTION_57_PRIMARY' | 'SECTION_63_SECONDARY_ELECTRONIC';
  collectionTimestamp: string;
  collectionLocation: string;
  collectingOfficerName: string;
  collectingOfficerBadge: string;
  currentCustodian: string;
  storageVault: string;
  photographsCount: number;
  deepfakeRiskScore?: number; // 0 to 100
  deepfakeFlags?: string[];
  bsaCompliance: BSA63ComplianceCheck;
  chainOfCustody: CustodyTransferRecord[];
}

export interface EvidenceGraphNode {
  id: string;
  label: string;
  type: 'PERSON' | 'PHONE' | 'DEVICE' | 'EVIDENCE' | 'LOCATION' | 'CASE' | 'EVENT';
  details: string;
  risk?: 'HIGH' | 'MEDIUM' | 'NORMAL';
}

export interface EvidenceGraphEdge {
  id: string;
  source: string;
  target: string;
  label: string;
  confidence: number;
  supportingEIDs: string[];
}

export interface AISearchResult {
  query: string;
  answerSummary: string;
  confidenceScore: number;
  citedEvidence: {
    eid: string;
    evidenceTitle: string;
    excerpt: string;
    timestamp: string;
    pageOrTimestampRef: string;
  }[];
  suggestedGraphLinks: string[];
}

export interface CourtSubmissionPackage {
  id: string;
  courtCaseNumber: string;
  firNumber: string;
  courtName: string;
  generatedDate: string;
  generatedByOfficer: string;
  includedEIDs: string[];
  totalExhibits: number;
  bsa63CertificateStatus: 'SIGNED_AND_ATTACHED' | 'DRAFT';
  digitalSignatureHash: string;
  masterArchiveChecksum: string;
  concordanceIndex: {
    exhibitNumber: string;
    eid: string;
    description: string;
    hash: string;
    bsaStatus: string;
  }[];
}

export interface AlertItem {
  id: string;
  title: string;
  description: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  district: string;
  timestamp: string;
  status: 'PENDING' | 'UNDER_REVIEW' | 'ACTIONED' | 'ESCALATED_TO_CENTRAL';
  linkedEntityId?: string;
}

export interface CaseRecord {
  id: string;
  firNumber: string;
  title: string;
  district: string;
  policeStation: string;
  dateFiled: string;
  complainant: string;
  sections: string[];
  status: 'UNDER_INVESTIGATION' | 'CHARGE_SHEET_FILED' | 'IN_TRIAL' | 'CLOSED';
  priority: 'URGENT' | 'HIGH' | 'NORMAL';
  assignedIOId: string;
  assignedIOName: string;
  evidenceCount: number;
  courtCaseNumber?: string;
  isProtectedRecord?: boolean;
  changeRequestPending?: boolean;
  suspects: { name: string; age: number; status: string; notes: string }[];
  witnesses: { name: string; statementSummary: string }[];
  timeline: { date: string; stage: string; notes: string; officer: string }[];
}

export interface WomensSafetyRecord {
  id: string; // WS Case ID e.g. WS-2026-DL-8821
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
  linkedCaseId?: string;
  status: 'EMERGENCY_DISPATCHED' | 'CASE_REGISTERED' | 'RESOLVED_ON_SITE';
  followUpActions: string[];
  evidenceDescriptions: string[];
  evidencePhotographsCount: number;
  relatedDocuments: string[];
}

export interface LegalCourtRecord {
  id: string;
  courtCaseNumber: string;
  firNumber: string;
  courtName: string;
  presidingJudge: string;
  currentStage: 'ARGUMENTS_ON_CHARGE' | 'EVIDENCE_RECORDING' | 'FINAL_ARGUMENTS' | 'BAIL_HEARING';
  nextHearingDate: string;
  accused: string[];
  sectionsCharged: string[];
  prosecutorNotes: string;
  courtOrders: { date: string; orderSummary: string; signedBy: string }[];
}

export interface ApprovalRequest {
  id: string;
  requestedByOfficerId: string;
  requestedByOfficerName: string;
  requestedByRole: SakshiRole;
  requestType: 'RECORD_MODIFICATION' | 'CUSTODY_TRANSFER' | 'SPECIAL_ACCESS' | 'BSA_RE_CERTIFICATION';
  targetEntityId: string;
  targetEntityType: 'CASE' | 'EVIDENCE' | 'WOMENS_SAFETY';
  reason: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  submittedDate: string;
  reviewedBy?: string;
  reviewedDate?: string;
  reviewRemarks?: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  officerId: string;
  officerName: string;
  role: SakshiRole;
  action: string;
  entityType: 'CASE' | 'EVIDENCE' | 'APPROVAL' | 'ESCALATION' | 'WOMENS_SAFETY' | 'BSA_CERTIFICATE' | 'COURT_PACKAGE';
  entityId: string;
  details: string;
  hash: string;
  ipAddress: string;
}
