import {
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
  CourtSubmissionPackage
} from '../types/sakshi';

export const INITIAL_OFFICERS: OfficerProfile[] = [
  {
    id: 'OFF-DIST-01',
    name: 'Sh. Rajeshwar Verma, IPS',
    badgeNumber: 'IPS-DL-4091',
    role: 'district_admin',
    roleTitle: 'District Operational Commander',
    department: 'District Police HQ & Operations',
    district: 'New Delhi Central',
    state: 'Delhi',
    clearanceLevel: 'LEVEL_2_DISTRICT',
    phone: '+91 98101 22345',
    email: 'dc.central@delhipolice.gov.in'
  },
  {
    id: 'OFF-CENT-01',
    name: 'Dr. Vivek Swaminathan, IAS',
    badgeNumber: 'MHA-NAT-1002',
    role: 'central_admin',
    roleTitle: 'National Oversight & Governance Director',
    department: 'Ministry of Home Affairs - ICJS Cyber Node',
    district: 'National Capital Region',
    state: 'India (Central Command)',
    clearanceLevel: 'LEVEL_4_APEX',
    phone: '+91 11 2309 2011',
    email: 'director.sakshi@mha.gov.in'
  },
  {
    id: 'OFF-IO-01',
    name: 'Insp. Vikram Rathore',
    badgeNumber: 'DL-POL-8821',
    role: 'investigating_officer',
    roleTitle: 'Senior Investigating Officer',
    department: 'Special Crime Branch & Cyber Cell',
    district: 'New Delhi Central',
    state: 'Delhi',
    clearanceLevel: 'LEVEL_1_FIELD',
    phone: '+91 94112 33490',
    email: 'vikram.rathore@delhipolice.gov.in'
  },
  {
    id: 'OFF-WS-01',
    name: 'W/SI Meenakshi Sharma',
    badgeNumber: 'DL-WSP-3042',
    role: 'womens_safety_officer',
    roleTitle: "Women's Safety & Distress Record Officer",
    department: 'Special Police Unit for Women and Children (SPUWAC)',
    district: 'New Delhi Central',
    state: 'Delhi',
    clearanceLevel: 'LEVEL_1_FIELD',
    phone: '+91 99100 88211',
    email: 'meenakshi.sharma@delhipolice.gov.in'
  },
  {
    id: 'OFF-FOR-01',
    name: 'Dr. Sameer Kulkarni',
    badgeNumber: 'CFSL-BIO-904',
    role: 'forensic_officer',
    roleTitle: 'Chief Forensic Examiner & Custodian',
    department: 'Central Forensic Science Laboratory (CFSL)',
    district: 'New Delhi Central',
    state: 'Delhi',
    clearanceLevel: 'LEVEL_2_DISTRICT',
    phone: '+91 11 2617 8890',
    email: 'sameer.kulkarni@cfsl.gov.in'
  },
  {
    id: 'OFF-PRO-01',
    name: 'Adv. Alok Nandan, Spl. PP',
    badgeNumber: 'DEL-BAR-7712',
    role: 'prosecuting_officer',
    roleTitle: 'Chief Public Prosecutor',
    department: 'Directorate of Prosecution, Tis Hazari Courts',
    district: 'New Delhi Central',
    state: 'Delhi',
    clearanceLevel: 'LEVEL_2_DISTRICT',
    phone: '+91 98114 55678',
    email: 'alok.nandan@prosecution.delhi.gov.in'
  },
  {
    id: 'OFF-SNR-01',
    name: 'Jt. CP Arvind Sen, IPS',
    badgeNumber: 'IPS-DL-1998',
    role: 'senior_officer',
    roleTitle: 'Supervisory Review & Vigilance Officer',
    department: 'Delhi Police Vigilance & Review Board',
    district: 'New Delhi Headquarters',
    state: 'Delhi',
    clearanceLevel: 'LEVEL_3_STATE',
    phone: '+91 11 2349 0012',
    email: 'jtcp.vigilance@delhipolice.gov.in'
  }
];

export const INITIAL_CANONICAL_EVIDENCE: CanonicalEvidenceObject[] = [
  {
    id: 'EVD-2026-DL-9042',
    title: 'CCTV Traffic Cam Feed #08 - Connaught Place Outer Circle',
    category: 'CCTV_FOOTAGE',
    sourceSystem: 'eSakshya',
    caseId: 'CASE-2026-DL-001',
    firNumber: 'FIR No. 142/2026',
    fileFormat: 'MP4 (H.265 / AVC)',
    fileSizeBytes: 48219000,
    originalHashSHA256: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08',
    currentHashSHA256: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08',
    isTampered: false,
    provenanceType: 'SECTION_63_SECONDARY_ELECTRONIC',
    collectionTimestamp: '2026-08-14 23:18:00 IST',
    collectionLocation: 'Outer Circle Pole #24, Near PVR Rivoli, New Delhi (Geo: 28.6328, 77.2197)',
    collectingOfficerName: 'Insp. Vikram Rathore',
    collectingOfficerBadge: 'DL-POL-8821',
    currentCustodian: 'Dr. Sameer Kulkarni (CFSL Lead Examiner)',
    storageVault: 'NIC Vault #DL-04 (Encrypted Storage Block A-12)',
    photographsCount: 4,
    deepfakeRiskScore: 4.2,
    deepfakeFlags: ['Continuous frame temporal cadence verified', 'No face swap or synthesis artifacts'],
    bsaCompliance: {
      overallScore: 100,
      isCertificateReady: true,
      deviceOperatingProperly: true,
      deviceOwnerIdentified: true,
      hashAlgorithmSpecified: true,
      custodianSigned: true,
      sourceDeviceIMEIOrMAC: 'MAC: 00:1B:44:11:3A:B7',
      sourceDeviceMakeModel: 'Hikvision DS-2CD2T87G2P 4K Panoramic Camera',
      acquisitionMethod: 'Bit-stream forensic export via NIC eSakshya gateway',
      missingFields: []
    },
    chainOfCustody: [
      {
        id: 'COC-01',
        fromOfficer: 'System Auto-Capture (eSakshya CCTV Node)',
        toOfficer: 'Insp. Vikram Rathore (IO)',
        transferTimestamp: '2026-08-14 23:25:00 IST',
        reason: 'Seizure of relevant video evidence under Section 105 BNSS',
        verifiedSignature: 'DIGISIGN-IO-8821-VERIFIED',
        location: 'Connaught Place Police Station'
      },
      {
        id: 'COC-02',
        fromOfficer: 'Insp. Vikram Rathore (IO)',
        toOfficer: 'Dr. Sameer Kulkarni (CFSL Custodian)',
        transferTimestamp: '2026-08-15 10:15:00 IST',
        reason: 'Forensic frame analysis, license plate optical isolation, and BSA 63 certificate packaging',
        verifiedSignature: 'DIGISIGN-CFSL-904-VERIFIED',
        location: 'Central Forensic Science Laboratory, CBI Complex, Lodhi Road'
      }
    ]
  },
  {
    id: 'EVD-2026-DL-9043',
    title: 'UFDR Mobile Extraction Report - iPhone 14 Pro (Suspect Rohan Sethi)',
    category: 'MOBILE_EXTRACTION_UFDR',
    sourceSystem: 'CFSL_Upload',
    caseId: 'CASE-2026-DL-001',
    firNumber: 'FIR No. 142/2026',
    fileFormat: 'UFDR / JSON Manifest',
    fileSizeBytes: 124800000,
    originalHashSHA256: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',
    currentHashSHA256: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',
    isTampered: false,
    provenanceType: 'SECTION_63_SECONDARY_ELECTRONIC',
    collectionTimestamp: '2026-08-15 01:10:00 IST',
    collectionLocation: 'Cyber Crime Investigation Lab, Mandir Marg',
    collectingOfficerName: 'Insp. Vikram Rathore',
    collectingOfficerBadge: 'DL-POL-8821',
    currentCustodian: 'Dr. Sameer Kulkarni (CFSL Lead Examiner)',
    storageVault: 'Malkhana Safe Locker #984 (Physical & Digital Twin)',
    photographsCount: 6,
    deepfakeRiskScore: 0.0,
    deepfakeFlags: ['Raw Cellebrite physical acquisition verified'],
    bsaCompliance: {
      overallScore: 90,
      isCertificateReady: false,
      deviceOperatingProperly: true,
      deviceOwnerIdentified: true,
      hashAlgorithmSpecified: true,
      custodianSigned: true,
      sourceDeviceIMEIOrMAC: 'IMEI: 354890119283741 / 354890119283742',
      sourceDeviceMakeModel: 'Apple iPhone 14 Pro (Model A2890, iOS 17.5.1)',
      acquisitionMethod: 'Cellebrite UFED Physical Forensic Dump',
      missingFields: ['Examiner Section 79A IT Act Notification ID']
    },
    chainOfCustody: [
      {
        id: 'COC-01',
        fromOfficer: 'Physical Seizure from Suspect Rohan Sethi',
        toOfficer: 'Insp. Vikram Rathore (IO)',
        transferTimestamp: '2026-08-15 00:45:00 IST',
        reason: 'Seized during interrogation at Police Station Barakhamba',
        verifiedSignature: 'DIGISIGN-SEIZURE-MEMO-441',
        location: 'Police Station Barakhamba Road'
      },
      {
        id: 'COC-02',
        fromOfficer: 'Insp. Vikram Rathore (IO)',
        toOfficer: 'Dr. Sameer Kulkarni (CFSL Custodian)',
        transferTimestamp: '2026-08-15 11:30:00 IST',
        reason: 'Handed over in sealed anti-static Faraday pouch for UFDR extraction',
        verifiedSignature: 'DIGISIGN-FARADAY-CFSL-VERIFIED',
        location: 'CFSL Digital Forensics Wing'
      }
    ]
  },
  {
    id: 'EVD-2026-DL-9044',
    title: 'Cellular CDR & IPDR Logs - Airtel & Jio Cell Towers (Tower ID #DL-CP-902)',
    category: 'CALL_DETAIL_RECORD_CDR',
    sourceSystem: 'CCTNS',
    caseId: 'CASE-2026-DL-001',
    firNumber: 'FIR No. 142/2026',
    fileFormat: 'CSV / Encrypted XML',
    fileSizeBytes: 890400,
    originalHashSHA256: '4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a',
    currentHashSHA256: '4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a',
    isTampered: false,
    provenanceType: 'SECTION_63_SECONDARY_ELECTRONIC',
    collectionTimestamp: '2026-08-15 03:30:00 IST',
    collectionLocation: 'Nodal Officer Server Gateway (Bharti Airtel & Reliance Jio)',
    collectingOfficerName: 'Insp. Vikram Rathore',
    collectingOfficerBadge: 'DL-POL-8821',
    currentCustodian: 'Insp. Vikram Rathore (IO)',
    storageVault: 'CCTNS Protected Legal Document Locker',
    photographsCount: 1,
    deepfakeRiskScore: 0.0,
    deepfakeFlags: ['Telecom Service Provider PGP Signature Verified'],
    bsaCompliance: {
      overallScore: 100,
      isCertificateReady: true,
      deviceOperatingProperly: true,
      deviceOwnerIdentified: true,
      hashAlgorithmSpecified: true,
      custodianSigned: true,
      sourceDeviceIMEIOrMAC: 'Tower Cell ID: 404-45-10492-3891',
      sourceDeviceMakeModel: 'Ericsson Radio Dot System BTS Node',
      acquisitionMethod: 'Subpoena Section 91 CrPC / Section 94 BNSS digital pull',
      missingFields: []
    },
    chainOfCustody: [
      {
        id: 'COC-01',
        fromOfficer: 'Airtel Legal Interception Cell',
        toOfficer: 'Insp. Vikram Rathore (IO)',
        transferTimestamp: '2026-08-15 03:30:00 IST',
        reason: 'Authorized compliance dispatch under Section 94 BNSS',
        verifiedSignature: 'DIGISIGN-TELCO-NODAL-OFFICER-VERIFIED',
        location: 'Delhi Police Cyber Cell'
      }
    ]
  },
  {
    id: 'EVD-2026-DL-9045',
    title: 'Emergency 112 Distress Call Audio & CAD Dispatch Waveform',
    category: 'AUDIO_RECORDING',
    sourceSystem: 'eSakshya',
    caseId: 'CASE-2026-DL-001',
    firNumber: 'FIR No. 142/2026',
    fileFormat: 'WAV (PCM 24-bit / 48kHz)',
    fileSizeBytes: 14200000,
    originalHashSHA256: 'ef2d127de37b942baad06145e54b0c619a1f22327b2ebbcfbec78f5564afe39d',
    currentHashSHA256: 'ef2d127de37b942baad06145e54b0c619a1f22327b2ebbcfbec78f5564afe39d',
    isTampered: false,
    provenanceType: 'SECTION_63_SECONDARY_ELECTRONIC',
    collectionTimestamp: '2026-08-14 23:08:12 IST',
    collectionLocation: 'Central Emergency Response Center (ERSS-112 Haiderpur Node)',
    collectingOfficerName: 'W/SI Meenakshi Sharma',
    collectingOfficerBadge: 'DL-WSP-3042',
    currentCustodian: 'W/SI Meenakshi Sharma',
    storageVault: 'SPUWAC Secure Cloud Storage Repository',
    photographsCount: 2,
    deepfakeRiskScore: 1.1,
    deepfakeFlags: ['Acoustic background noise consistent with street environment'],
    bsaCompliance: {
      overallScore: 100,
      isCertificateReady: true,
      deviceOperatingProperly: true,
      deviceOwnerIdentified: true,
      hashAlgorithmSpecified: true,
      custodianSigned: true,
      sourceDeviceIMEIOrMAC: 'IVR Trunk Server: 10.144.12.80',
      sourceDeviceMakeModel: 'Avaya Aura Communication Manager ERSS System',
      acquisitionMethod: 'Automatic ERSS Voice Recording Master Archival',
      missingFields: []
    },
    chainOfCustody: [
      {
        id: 'COC-01',
        fromOfficer: 'ERSS Master Audio Server',
        toOfficer: 'W/SI Meenakshi Sharma',
        transferTimestamp: '2026-08-14 23:12:00 IST',
        reason: 'Immediate evidentiary preservation for ongoing emergency distress case',
        verifiedSignature: 'DIGISIGN-ERSS-RECORD-MGR',
        location: 'SPUWAC Command Desk'
      }
    ]
  },
  {
    id: 'EVD-2026-DL-9046',
    title: 'Forensic Bit-Stream Image of Suspect Laptop SSD (Samsung 980 Pro 1TB)',
    category: 'FORENSIC_DISK_IMAGE',
    sourceSystem: 'CFSL_Upload',
    caseId: 'CASE-2026-DL-002',
    firNumber: 'FIR No. 158/2026',
    fileFormat: 'E01 (EnCase Forensic Image)',
    fileSizeBytes: 890000000000,
    originalHashSHA256: 'a1b2c3d4e5f60718293a4b5c6d7e8f901a2b3c4d5e6f708192a3b4c5d6e7f809',
    currentHashSHA256: 'a1b2c3d4e5f60718293a4b5c6d7e8f901a2b3c4d5e6f708192a3b4c5d6e7f809',
    isTampered: false,
    provenanceType: 'SECTION_63_SECONDARY_ELECTRONIC',
    collectionTimestamp: '2026-08-16 14:20:00 IST',
    collectionLocation: 'Flat 402, High-tech Residency, Okhla Phase-III',
    collectingOfficerName: 'Insp. Vikram Rathore',
    collectingOfficerBadge: 'DL-POL-8821',
    currentCustodian: 'Dr. Sameer Kulkarni (CFSL Lead Examiner)',
    storageVault: 'CFSL High-Security Evidence Server #02',
    photographsCount: 8,
    deepfakeRiskScore: 0.0,
    deepfakeFlags: ['Hardware Write-Blocker (Tableau T8u) Log Validated'],
    bsaCompliance: {
      overallScore: 100,
      isCertificateReady: true,
      deviceOperatingProperly: true,
      deviceOwnerIdentified: true,
      hashAlgorithmSpecified: true,
      custodianSigned: true,
      sourceDeviceIMEIOrMAC: 'Disk Serial: S6B0NF0R918234A',
      sourceDeviceMakeModel: 'Samsung 980 PRO PCIe 4.0 NVMe SSD 1TB',
      acquisitionMethod: 'Physical Bit-stream copy using Tableau Forensic Bridge',
      missingFields: []
    },
    chainOfCustody: [
      {
        id: 'COC-01',
        fromOfficer: 'Search and Seizure Team',
        toOfficer: 'Insp. Vikram Rathore',
        transferTimestamp: '2026-08-16 14:40:00 IST',
        reason: 'Seized under Search Warrant issued by CMM South-East',
        verifiedSignature: 'DIGISIGN-COURT-WARRANT-SEIZURE',
        location: 'Okhla Phase-III'
      },
      {
        id: 'COC-02',
        fromOfficer: 'Insp. Vikram Rathore',
        toOfficer: 'Dr. Sameer Kulkarni (CFSL)',
        transferTimestamp: '2026-08-16 18:00:00 IST',
        reason: 'Handover for malware, encrypted wallet, and ledger recovery',
        verifiedSignature: 'DIGISIGN-CFSL-RECEIPT-8812',
        location: 'CFSL Cyber Forensic Lab'
      }
    ]
  }
];

export const INITIAL_EVIDENCE_GRAPH_NODES: EvidenceGraphNode[] = [
  { id: 'PERSON-01', label: 'Rohan Sethi', type: 'PERSON', details: 'Prime Accused / Suspect (Age 29)', risk: 'HIGH' },
  { id: 'PERSON-02', label: 'Pooja Verma', type: 'PERSON', details: 'Complainant & Primary Witness', risk: 'NORMAL' },
  { id: 'PERSON-03', label: 'Mohit Khurana', type: 'PERSON', details: 'Associate / Financial Co-conspirator', risk: 'HIGH' },
  { id: 'PHONE-01', label: '+91 98110 44921', type: 'PHONE', details: 'SIM linked to Suspect Rohan Sethi (Airtel)', risk: 'HIGH' },
  { id: 'DEVICE-01', label: 'iPhone 14 Pro (IMEI ..741)', type: 'DEVICE', details: 'Recovered Mobile Device', risk: 'HIGH' },
  { id: 'DEVICE-02', label: 'Hyundai Creta DL-3C-AZ-4901', type: 'DEVICE', details: 'Suspect Vehicle identified on CCTV', risk: 'HIGH' },
  { id: 'LOC-01', label: 'Connaught Place Outer Circle', type: 'LOCATION', details: 'Crime Scene (CCTV Cam #08)', risk: 'NORMAL' },
  { id: 'LOC-02', label: 'Khan Market Petrol Pump', type: 'LOCATION', details: 'Secondary Geolocation (CDR Ping at 23:42)', risk: 'NORMAL' },
  { id: 'EVD-01', label: 'EVD-2026-DL-9042', type: 'EVIDENCE', details: 'CCTV Video File (H.265 / 48MB)', risk: 'NORMAL' },
  { id: 'EVD-02', label: 'EVD-2026-DL-9043', type: 'EVIDENCE', details: 'UFDR Forensic Extraction', risk: 'NORMAL' },
  { id: 'EVD-03', label: 'EVD-2026-DL-9044', type: 'EVIDENCE', details: 'CDR Tower Logs', risk: 'NORMAL' },
  { id: 'CASE-01', label: 'FIR No. 142/2026', type: 'CASE', details: 'Special Cyber & Extortion Case', risk: 'HIGH' }
];

export const INITIAL_EVIDENCE_GRAPH_EDGES: EvidenceGraphEdge[] = [
  { id: 'EDGE-01', source: 'PERSON-01', target: 'DEVICE-01', label: 'Owns / Operated Device', confidence: 0.98, supportingEIDs: ['EVD-2026-DL-9043'] },
  { id: 'EDGE-02', source: 'PERSON-01', target: 'PHONE-01', label: 'Registered SIM Subscriber', confidence: 1.0, supportingEIDs: ['EVD-2026-DL-9044'] },
  { id: 'EDGE-03', source: 'DEVICE-01', target: 'EVD-02', label: 'Source of Digital Extraction', confidence: 1.0, supportingEIDs: ['EVD-2026-DL-9043'] },
  { id: 'EDGE-04', source: 'PERSON-01', target: 'DEVICE-02', label: 'Driver seen entering vehicle', confidence: 0.95, supportingEIDs: ['EVD-2026-DL-9042'] },
  { id: 'EDGE-05', source: 'DEVICE-02', target: 'LOC-01', label: 'Captured at Incident Spot', confidence: 0.99, supportingEIDs: ['EVD-2026-DL-9042'] },
  { id: 'EDGE-06', source: 'PHONE-01', target: 'LOC-02', label: 'Tower Ping (23:42 IST)', confidence: 0.92, supportingEIDs: ['EVD-2026-DL-9044'] },
  { id: 'EDGE-07', source: 'PERSON-01', target: 'PERSON-03', label: '3 Encrypted Calls (Signal / WhatsApp)', confidence: 0.89, supportingEIDs: ['EVD-2026-DL-9043'] },
  { id: 'EDGE-08', source: 'PERSON-01', target: 'CASE-01', label: 'Accused in FIR', confidence: 1.0, supportingEIDs: ['EVD-2026-DL-9042', 'EVD-2026-DL-9043'] }
];

export const INITIAL_COURT_PACKAGES: CourtSubmissionPackage[] = [
  {
    id: 'PKG-2026-DL-001',
    courtCaseNumber: 'CR-COMM/2026/8841',
    firNumber: 'FIR No. 142/2026',
    courtName: 'Special Judge (CBI/Cyber), Tis Hazari Courts Complex',
    generatedDate: '2026-08-20 16:45:00 IST',
    generatedByOfficer: 'Adv. Alok Nandan, Spl. PP',
    includedEIDs: ['EVD-2026-DL-9042', 'EVD-2026-DL-9043', 'EVD-2026-DL-9044'],
    totalExhibits: 3,
    bsa63CertificateStatus: 'SIGNED_AND_ATTACHED',
    digitalSignatureHash: '0x9924fcae110499bcde710298a0029b31ccaa91823091238910aa984812398412',
    masterArchiveChecksum: 'SHA256: d8b2c4e6f8a0123456789abcdef0123456789abcdef0123456789abcdef01234',
    concordanceIndex: [
      {
        exhibitNumber: 'Exhibit P-1',
        eid: 'EVD-2026-DL-9042',
        description: 'CCTV Video Recording from Outer Circle Pole #24',
        hash: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08',
        bsaStatus: '100% Compliant (Sec 63(4) Certificate Attached)'
      },
      {
        exhibitNumber: 'Exhibit P-2',
        eid: 'EVD-2026-DL-9043',
        description: 'UFDR Mobile Extraction Dump of iPhone 14 Pro',
        hash: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',
        bsaStatus: 'Verified (Examiner Endorsement Added)'
      },
      {
        exhibitNumber: 'Exhibit P-3',
        eid: 'EVD-2026-DL-9044',
        description: 'Airtel/Jio Cell Tower Log Records',
        hash: '4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a',
        bsaStatus: '100% Compliant (TSP Nodal Certificate Attached)'
      }
    ]
  }
];

export const INITIAL_ALERTS: AlertItem[] = [
  {
    id: 'ALT-2026-091',
    title: 'Hash Mismatch / Byte Drift Warning in Secondary Evidence Copy',
    description: 'Autonomous integrity daemon detected 1-byte discrepancy in mirror copy of EVD-2026-DL-9042 on backup node #3. Primary immutable vault unaffected.',
    severity: 'HIGH',
    district: 'New Delhi Central',
    timestamp: '2026-08-22 18:30:10 IST',
    status: 'PENDING',
    linkedEntityId: 'EVD-2026-DL-9042'
  },
  {
    id: 'ALT-2026-092',
    title: 'BSA Section 63 Certificate Pending for Newly Ingested Mobile Extraction',
    description: 'UFDR report EVD-2026-DL-9043 requires Examiner Section 79A IT Act credential endorsement before court submission deadline.',
    severity: 'MEDIUM',
    district: 'New Delhi Central',
    timestamp: '2026-08-22 19:15:00 IST',
    status: 'UNDER_REVIEW',
    linkedEntityId: 'EVD-2026-DL-9043'
  },
  {
    id: 'ALT-2026-093',
    title: 'Supervisory Escalation: Multi-District Vehicle Sighting in Creta DL-3C-AZ-4901',
    description: 'Suspect vehicle in FIR 142/2026 detected crossing DND Flyway toll plaza into Noida. Central Command coordination requested.',
    severity: 'CRITICAL',
    district: 'New Delhi Central',
    timestamp: '2026-08-22 20:00:22 IST',
    status: 'ESCALATED_TO_CENTRAL',
    linkedEntityId: 'CASE-2026-DL-001'
  }
];

export const INITIAL_CASES: CaseRecord[] = [
  {
    id: 'CASE-2026-DL-001',
    firNumber: 'FIR No. 142/2026',
    title: 'State vs. Rohan Sethi & Ors. (Digital Extortion & Surveillance)',
    district: 'New Delhi Central',
    policeStation: 'Police Station Barakhamba Road',
    dateFiled: '2026-08-14',
    complainant: 'Pooja Verma',
    sections: ['Sec 308(2) BNS (Extortion)', 'Sec 318(4) BNS (Cheating)', 'Sec 66E IT Act', 'Sec 63 BSA (Electronic Proof)'],
    status: 'UNDER_INVESTIGATION',
    priority: 'URGENT',
    assignedIOId: 'OFF-IO-01',
    assignedIOName: 'Insp. Vikram Rathore',
    evidenceCount: 4,
    courtCaseNumber: 'CR-COMM/2026/8841',
    isProtectedRecord: true,
    changeRequestPending: false,
    suspects: [
      { name: 'Rohan Sethi', age: 29, status: 'IN_JUDICIAL_CUSTODY', notes: 'Arrested from Connaught Place with iPhone 14 Pro and Creta vehicle' },
      { name: 'Mohit Khurana', age: 31, status: 'ABSCONDING', notes: 'Co-conspirator identified via Signal chat logs on EVD-2026-DL-9043' }
    ],
    witnesses: [
      { name: 'Pooja Verma', statementSummary: 'Received extortion threats on Telegram; corroborated by phone extraction timestamps' },
      { name: 'Surinder Singh (Parking Attendant)', statementSummary: 'Identified Creta vehicle parked near Rivoli at 23:10 on incident night' }
    ],
    timeline: [
      { date: '2026-08-14 23:08', stage: 'Distress Call Logged', notes: 'Emergency 112 distress call logged and rapid ERV dispatched', officer: 'W/SI Meenakshi Sharma' },
      { date: '2026-08-15 00:30', stage: 'FIR Registered & Evidence Ingested', notes: 'Simulated eSakshya import completed; EID EVD-2026-DL-9042 created with SHA-256 seal', officer: 'Insp. Vikram Rathore' },
      { date: '2026-08-15 11:30', stage: 'CFSL UFDR Extraction', notes: 'Physical dump completed; 3 WhatsApp chat databases extracted', officer: 'Dr. Sameer Kulkarni' },
      { date: '2026-08-20 16:45', stage: 'Court Package Assembled', notes: 'Master package PKG-2026-DL-001 generated for trial presentation with BSA 63 certificate', officer: 'Adv. Alok Nandan, Spl. PP' }
    ]
  },
  {
    id: 'CASE-2026-DL-002',
    firNumber: 'FIR No. 158/2026',
    title: 'State vs. CyberSyndicate Global (Ransomware & Cryptojacking)',
    district: 'New Delhi Central',
    policeStation: 'Cyber Crime Police Station, Mandir Marg',
    dateFiled: '2026-08-16',
    complainant: 'National Medical Data Hub Infrastructure',
    sections: ['Sec 66 IT Act', 'Sec 66F IT Act (Cyber Terrorism)', 'Sec 316 BNS (Criminal Breach of Trust)'],
    status: 'UNDER_INVESTIGATION',
    priority: 'HIGH',
    assignedIOId: 'OFF-IO-01',
    assignedIOName: 'Insp. Vikram Rathore',
    evidenceCount: 2,
    courtCaseNumber: 'CR-SPEC/2026/1092',
    isProtectedRecord: true,
    changeRequestPending: false,
    suspects: [
      { name: 'Unknown Handlers (Alias: DarkNode99)', age: 0, status: 'UNDER_SURVEILLANCE', notes: 'Encrypted Bitcoin wallet address recovered from Forensic Image EVD-2026-DL-9046' }
    ],
    witnesses: [
      { name: 'Dr. Arvind Joshi (CTO)', statementSummary: 'Observed server unauthorized encryption trigger at 03:14 AM' }
    ],
    timeline: [
      { date: '2026-08-16 14:20', stage: 'Forensic Disk Seizure', notes: 'SSD bit-stream copy captured with Tableau hardware write blocker', officer: 'Insp. Vikram Rathore' },
      { date: '2026-08-17 09:00', stage: 'Malkhana Vault Registration', notes: 'Sealed physical & digital container registered under Section 63 BSA', officer: 'Dr. Sameer Kulkarni' }
    ]
  }
];

export const INITIAL_WOMENS_SAFETY_RECORDS: WomensSafetyRecord[] = [
  {
    id: 'WS-2026-DL-8821',
    callerName: 'Pooja Verma',
    phoneNumber: '+91 98110 99482',
    callLocation: 'Connaught Place Outer Circle, Near Block L & PVR Rivoli',
    callDateTime: '2026-08-14 23:08:12 IST',
    callHandler: 'W/SI Meenakshi Sharma (Badge: DL-WSP-3042)',
    officersDispatched: ['W/SI Meenakshi Sharma', 'W/Const. Aarti Devi', 'Const. Sunil Kumar'],
    vehicleDispatched: 'ERV-14 (Rapid Response PCR)',
    caseInCharge: 'W/SI Meenakshi Sharma',
    dispatchTime: '23:09:40 IST',
    responseTimeMinutes: 3.2,
    firFiled: true,
    firNumber: 'FIR No. 142/2026',
    linkedCaseId: 'CASE-2026-DL-001',
    status: 'CASE_REGISTERED',
    followUpActions: [
      'Caller escorted safely to Police Station Barakhamba Road',
      'Accused vehicle intercepted on scene within 8 minutes of dispatch',
      'Audio recording preserved and sealed under EID EVD-2026-DL-9045'
    ],
    evidenceDescriptions: [
      'High-definition ERV dashboard camera footage (12 mins)',
      '112 CAD Emergency Call Audio Record with timestamp metadata'
    ],
    evidencePhotographsCount: 4,
    relatedDocuments: ['Emergency CAD Dispatch Slip #CAD-8819', 'On-Site Victim Safety Assessment Form']
  }
];

export const INITIAL_LEGAL_RECORDS: LegalCourtRecord[] = [
  {
    id: 'LEG-2026-DL-001',
    courtCaseNumber: 'CR-COMM/2026/8841',
    firNumber: 'FIR No. 142/2026',
    courtName: 'Special Judge (CBI/Cyber), Tis Hazari Courts Complex',
    presidingJudge: 'Hon\'ble Sh. D. K. Bhattacharya, Special Judge',
    currentStage: 'EVIDENCE_RECORDING',
    nextHearingDate: '2026-08-28',
    accused: ['Rohan Sethi (A-1)', 'Mohit Khurana (A-2, Absconding)'],
    sectionsCharged: ['Sec 308(2) BNS', 'Sec 318(4) BNS', 'Sec 66E IT Act', 'Sec 63 BSA (Admissibility)'],
    prosecutorNotes: 'All 3 digital exhibits (CCTV, UFDR, CDR) have 100% BSA 63 certificate compliance. CFSL expert witness examination scheduled for next hearing date.',
    courtOrders: [
      {
        date: '2026-08-16',
        orderSummary: 'Accused Rohan Sethi remanded to 14 days Judicial Custody. Mobile phone and vehicle forensic reports called from CFSL.',
        signedBy: 'Hon\'ble Sh. D. K. Bhattacharya'
      },
      {
        date: '2026-08-20',
        orderSummary: 'SAKSHI Digital Master Submission Package PKG-2026-DL-001 taken on judicial record under Section 63(4) BSA.',
        signedBy: 'Hon\'ble Sh. D. K. Bhattacharya'
      }
    ]
  }
];

export const INITIAL_APPROVAL_REQUESTS: ApprovalRequest[] = [
  {
    id: 'REQ-2026-101',
    requestedByOfficerId: 'OFF-DIST-01',
    requestedByOfficerName: 'Sh. Rajeshwar Verma, IPS (District Admin)',
    requestedByRole: 'district_admin',
    requestType: 'BSA_RE_CERTIFICATION',
    targetEntityId: 'EVD-2026-DL-9043',
    targetEntityType: 'EVIDENCE',
    reason: 'Endorsement of Section 79A IT Act Examiner credential to elevate UFDR extraction BSA 63 score to 100%.',
    status: 'PENDING',
    submittedDate: '2026-08-22 17:30:00 IST'
  }
];

export const INITIAL_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: 'AUD-99104',
    timestamp: '2026-08-22 21:00:15 IST',
    officerId: 'OFF-FOR-01',
    officerName: 'Dr. Sameer Kulkarni',
    role: 'forensic_officer',
    action: 'EVIDENCE_INTEGRITY_VERIFIED',
    entityType: 'EVIDENCE',
    entityId: 'EVD-2026-DL-9042',
    details: 'Automated SHA-256 continuous verification: Hash match verified with zero drift (0x9f86d...0a08). Section 65B/63 BNSS compliant.',
    hash: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08',
    ipAddress: '10.144.42.10 (CFSL Secure Intranet)'
  },
  {
    id: 'AUD-99103',
    timestamp: '2026-08-22 20:15:30 IST',
    officerId: 'OFF-PRO-01',
    officerName: 'Adv. Alok Nandan, Spl. PP',
    role: 'prosecuting_officer',
    action: 'COURT_PACKAGE_ASSEMBLED',
    entityType: 'COURT_PACKAGE',
    entityId: 'PKG-2026-DL-001',
    details: 'Master Court Package generated with 3 verified exhibits, digital signatures, and Section 63 BSA Schedule Certificate.',
    hash: 'd8b2c4e6f8a0123456789abcdef0123456789abcdef0123456789abcdef01234',
    ipAddress: '10.144.18.99 (Tis Hazari Prosecution Gateway)'
  },
  {
    id: 'AUD-99102',
    timestamp: '2026-08-22 19:40:12 IST',
    officerId: 'OFF-IO-01',
    officerName: 'Insp. Vikram Rathore',
    role: 'investigating_officer',
    action: 'AI_SEARCH_AND_GRAPH_QUERY',
    entityType: 'CASE',
    entityId: 'CASE-2026-DL-001',
    details: 'Semantic search executed: "Find suspect CDR pings near CP between 23:00 and 23:45". Cited EIDs: EVD-2026-DL-9042, EVD-2026-DL-9044.',
    hash: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',
    ipAddress: '10.144.88.21 (Cyber Crime Desk)'
  },
  {
    id: 'AUD-99101',
    timestamp: '2026-08-22 18:20:00 IST',
    officerId: 'OFF-DIST-01',
    officerName: 'Sh. Rajeshwar Verma, IPS',
    role: 'district_admin',
    action: 'ALERT_ESCALATED_TO_CENTRAL',
    entityType: 'ESCALATION',
    entityId: 'ALT-2026-093',
    details: 'District Admin escalated inter-state vehicle tracking alert ALT-2026-093 to Central Command for NCR-wide surveillance coordination.',
    hash: '4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a',
    ipAddress: '10.144.10.1 (District Command Server)'
  }
];
