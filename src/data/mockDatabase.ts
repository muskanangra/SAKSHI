import { OfficerProfile, AlertItem, CaseRecord, WomensSafetyRecord, EvidenceItem, LegalCourtRecord, ApprovalRequest, AuditLogEntry } from '../types/sakshi';

export const INITIAL_OFFICERS: OfficerProfile[] = [
  {
    id: 'OFF-DIST-01',
    name: 'Sh. Rajeshwar Verma, IPS',
    badgeNumber: 'IPS-DL-2014-9921',
    role: 'district_admin',
    roleTitle: 'Deputy Commissioner of Police (District Operations)',
    department: 'District Headquarters Operations Command',
    district: 'New Delhi Central',
    state: 'Delhi NCT',
    clearanceLevel: 'Level 3'
  },
  {
    id: 'OFF-CENT-01',
    name: 'Dr. Ananya Sundaram, IPS',
    badgeNumber: 'IPS-MHA-2008-1102',
    role: 'central_admin',
    roleTitle: 'Director General (National Crime & Judicial Coordination)',
    department: 'Ministry of Home Affairs - NIC SAKSHI Command',
    district: 'National Capital Region',
    state: 'All India',
    clearanceLevel: 'Top Secret'
  },
  {
    id: 'OFF-IO-01',
    name: 'Insp. Vikram Pratap Singh',
    badgeNumber: 'DL-POL-8842',
    role: 'investigating_officer',
    roleTitle: 'Station House & Senior Investigating Officer',
    department: 'Cyber & Special Crimes Unit, Tilak Marg PS',
    district: 'New Delhi Central',
    state: 'Delhi NCT',
    clearanceLevel: 'Level 2'
  },
  {
    id: 'OFF-WS-01',
    name: 'SI Meenakshi Sharma',
    badgeNumber: 'DL-WSC-4491',
    role: 'womens_safety_officer',
    roleTitle: 'Helpline & Rapid Response Record In-Charge',
    department: 'Special Police Unit for Women & Children (SPUWAC)',
    district: 'New Delhi Central',
    state: 'Delhi NCT',
    clearanceLevel: 'Level 2'
  },
  {
    id: 'OFF-FOR-01',
    name: 'Dr. Sameer Kulkarni',
    badgeNumber: 'CFSL-EVD-7731',
    role: 'forensic_officer',
    roleTitle: 'Chief Forensic Scientist & Malkhana Custodian',
    department: 'Central Forensic Science Laboratory (CFSL)',
    district: 'New Delhi Central',
    state: 'Delhi NCT',
    clearanceLevel: 'Level 2'
  },
  {
    id: 'OFF-LEG-01',
    name: 'Adv. Suresh Chandran',
    badgeNumber: 'DL-BAR-9930',
    role: 'prosecuting_officer',
    roleTitle: 'Special Public Prosecutor (Directorate of Prosecution)',
    department: 'Patiala House District & Sessions Court',
    district: 'New Delhi Central',
    state: 'Delhi NCT',
    clearanceLevel: 'Level 2'
  },
  {
    id: 'OFF-SEN-01',
    name: 'Sh. Amitabh Sengupta, IPS',
    badgeNumber: 'IPS-DL-2004-0019',
    role: 'senior_officer',
    roleTitle: 'Joint Commissioner of Police (Supervisory & Oversight)',
    department: 'Headquarters Vigilance & Legal Review Board',
    district: 'New Delhi Central',
    state: 'Delhi NCT',
    clearanceLevel: 'Level 3'
  }
];

export const INITIAL_ALERTS: AlertItem[] = [
  {
    id: 'ALT-2026-081',
    title: 'SOS Emergency Response: Women Safety Vehicle Dispatched',
    severity: 'CRITICAL',
    category: 'WOMENS_SAFETY_EMERGENCY',
    district: 'New Delhi Central',
    timestamp: '2026-08-22 17:42:10 IST',
    status: 'PENDING',
    description: 'Distress call from Connaught Place Outer Circle. ERV-14 dispatched with 2 female sub-inspectors. Response recorded in 4.2 mins.',
    linkedEntityId: 'WS-2026-DL-8821'
  },
  {
    id: 'ALT-2026-082',
    title: 'Protected Forensic Chain-of-Custody Transfer Initiated',
    severity: 'HIGH',
    category: 'EVIDENTIARY_BREACH',
    district: 'New Delhi Central',
    timestamp: '2026-08-22 16:15:00 IST',
    status: 'UNDER_REVIEW',
    description: 'Sealed hard drive containing CCTV encrypted stream transferred from Malkhana to CFSL digital lab. Signature verified with SHA-256.',
    linkedEntityId: 'EVD-2026-9042'
  },
  {
    id: 'ALT-2026-083',
    title: 'High-Value Financial Document Tamper Warning',
    severity: 'CRITICAL',
    category: 'DISTRICT_ALERT',
    district: 'New Delhi Central',
    timestamp: '2026-08-22 14:02:30 IST',
    status: 'ESCALATED_TO_CENTRAL',
    description: 'Attempted offline document timestamp modification detected on Case FIR No. 204/2026. Auto-locked by SAKSHI Kernel.',
    linkedEntityId: 'CASE-2026-DL-104'
  },
  {
    id: 'ALT-2026-084',
    title: 'Investigation Timeline Expiry Threshold Alert',
    severity: 'MEDIUM',
    category: 'OVERDUE_INVESTIGATION',
    district: 'New Delhi Central',
    timestamp: '2026-08-22 11:20:00 IST',
    status: 'PENDING',
    description: 'Charge sheet filing deadline for FIR No. 198/2026 expires in 72 hours under Section 173 CrPC / BNSS 193.',
    linkedEntityId: 'CASE-2026-DL-102'
  }
];

export const INITIAL_CASES: CaseRecord[] = [
  {
    id: 'CASE-2026-DL-104',
    firNumber: 'FIR No. 204/2026',
    policeStation: 'Tilak Marg Police Station',
    district: 'New Delhi Central',
    state: 'Delhi NCT',
    sections: ['BNS 318(4) (Fraud)', 'BNS 336(3) (Forgery)', 'IT Act 66D'],
    title: 'State vs. Cyber Forgery & Unauthorized Judicial Data Extraction Syndicate',
    complainant: 'Registrar (Judicial Administration), High Court of Delhi',
    dateFiled: '2026-08-10',
    status: 'UNDER_INVESTIGATION',
    priority: 'URGENT',
    assignedIOId: 'OFF-IO-01',
    assignedIOName: 'Insp. Vikram Pratap Singh',
    isProtectedRecord: true,
    evidenceCount: 7,
    courtCaseNumber: 'CR-COMM/2026/8841',
    timeline: [
      { date: '2026-08-10 10:30', stage: 'FIR Registration', notes: 'Electronic FIR registered upon formal complaint from Registrar.', officer: 'Insp. Vikram Pratap Singh' },
      { date: '2026-08-12 14:00', stage: 'Device Seizure', notes: 'Three suspect laptops seized under Section 105 BNSS with digital hash preservation.', officer: 'Insp. Vikram Pratap Singh' },
      { date: '2026-08-18 11:15', stage: 'Forensic Lab Dispatch', notes: 'Forensic extraction request submitted to CFSL with hash lock.', officer: 'SI Neeraj Kumar' },
      { date: '2026-08-22 14:02', stage: 'Security Kernel Check', notes: 'Kernel blocked unauthorized metadata change. Escalation raised to District & Central Admin.', officer: 'SAKSHI Kernel' }
    ],
    suspects: [
      { name: 'Kunal Mathur', age: 34, status: 'ARRESTED', notes: 'Primary system operator; mobile and hardware seized.' },
      { name: 'Sameer Alok', age: 41, status: 'WANTED', notes: 'Non-bailable warrant issued by Special Court.' }
    ],
    witnesses: [
      { name: 'Deepak Sharma (Court IT Admin)', statementDate: '2026-08-14', verified: true, statementSummary: 'Confirmed server logs showing IP breach attempts.' },
      { name: 'Pooja Nair (Senior Clerk)', statementDate: '2026-08-15', verified: true, statementSummary: 'Corroborated timeline of physical system tampering.' }
    ]
  },
  {
    id: 'CASE-2026-DL-102',
    firNumber: 'FIR No. 198/2026',
    policeStation: 'Parliament Street Police Station',
    district: 'New Delhi Central',
    state: 'Delhi NCT',
    sections: ['BNS 74 (Assault on Woman)', 'BNS 351(2) (Criminal Intimidation)'],
    title: 'State vs. Rakesh Verma (Assault & Harassment on Public Servant)',
    complainant: 'Smt. Kavita Mehra',
    dateFiled: '2026-08-02',
    status: 'CHARGE_SHEET_FILED',
    priority: 'HIGH',
    assignedIOId: 'OFF-IO-01',
    assignedIOName: 'Insp. Vikram Pratap Singh',
    isProtectedRecord: false,
    evidenceCount: 4,
    courtCaseNumber: 'CC-SPL/2026/1942',
    timeline: [
      { date: '2026-08-02 09:00', stage: 'Zero FIR Inward', notes: 'Zero FIR forwarded from Women Safety Rapid Response cell.', officer: 'SI Meenakshi Sharma' },
      { date: '2026-08-05 16:30', stage: 'Medical Examination', notes: 'MLC Report No. MLC-2026-881 attached to evidentiary dossier.', officer: 'Insp. Vikram Pratap Singh' },
      { date: '2026-08-20 12:00', stage: 'Final Charge Sheet Drafted', notes: 'Draft submitted to Public Prosecutor for legal scrutiny.', officer: 'Insp. Vikram Pratap Singh' }
    ],
    suspects: [
      { name: 'Rakesh Verma', age: 29, status: 'BAIL', notes: 'Bail with condition to report every Monday at PS.' }
    ],
    witnesses: [
      { name: 'Sunil Rao (Security Guard)', statementDate: '2026-08-03', verified: true, statementSummary: 'Eyewitness to physical altercation.' }
    ]
  }
];

export const INITIAL_WOMENS_SAFETY_RECORDS: WomensSafetyRecord[] = [
  {
    id: 'WS-2026-DL-8821',
    callerName: 'Priya Sharma (Name Masked for Privacy)',
    phoneNumber: '+91 98110 XXXXX',
    callLocation: 'Connaught Place Outer Circle, Near Metro Gate 4, New Delhi',
    callDateTime: '2026-08-22 17:38:00 IST',
    callHandler: 'Executive Pooja Rani (Emp ID: WSC-991)',
    officersDispatched: ['W/SI Meenakshi Sharma', 'W/Const. Aarti Devi'],
    vehicleDispatched: 'Emergency Response Vehicle ERV-14 (DL-1C-9921)',
    caseInCharge: 'SI Meenakshi Sharma',
    dispatchTime: '2026-08-22 17:39:15 IST',
    responseTimeMinutes: 4.2,
    firFiled: true,
    firNumber: 'FIR No. 204/2026',
    linkedCaseId: 'CASE-2026-DL-104',
    status: 'RESPONDED_ON_SITE',
    followUpActions: [
      'Immediate physical extraction and safety shelter arranged.',
      'Medical consultation provided at RML Hospital.',
      'Statements recorded in presence of Legal Aid advocate.'
    ],
    evidenceDescriptions: [
      'Geo-tagged CCTV recording from Traffic Camera CP-09',
      'Audio recording of distress call (Duration: 3m 42s)',
      'Digital hash of officer bodycam recording'
    ],
    evidencePhotographsCount: 4,
    relatedDocuments: ['Initial Incident Report (IIR)', 'Medical Assessment Sheet', 'Consent & Protection Undertaking']
  },
  {
    id: 'WS-2026-DL-8819',
    callerName: 'Anonymous Student Caller',
    phoneNumber: '+91 99580 XXXXX',
    callLocation: 'Janpath Lane, Near Metro Station, New Delhi',
    callDateTime: '2026-08-21 21:15:00 IST',
    callHandler: 'Executive Sunita Devi (Emp ID: WSC-842)',
    officersDispatched: ['W/SI Shweta Tyagi', 'Head Const. Ramesh Kumar'],
    vehicleDispatched: 'PCR Van Cheetah-08',
    caseInCharge: 'SI Shweta Tyagi',
    dispatchTime: '2026-08-21 21:16:30 IST',
    responseTimeMinutes: 3.8,
    firFiled: false,
    status: 'COUNSELING_IN_PROGRESS',
    followUpActions: [
      'Suspect vehicle intercepted and driver issued strict summons.',
      'Counseling initiated via Delhi Commission for Women representative.'
    ],
    evidenceDescriptions: [
      'Vehicle Number Plate OCR Log (DL-3C-5510)',
      'Distress Call Audio Archive'
    ],
    evidencePhotographsCount: 2,
    relatedDocuments: ['Call Center Dispatch Slip', 'On-Site Resolution Memo']
  }
];

export const INITIAL_EVIDENCE: EvidenceItem[] = [
  {
    id: 'EVD-2026-9042',
    title: 'Seized Western Digital 2TB Encrypted Server Hard Drive (S/N: WDX-99021)',
    type: 'DIGITAL',
    description: 'Primary hard drive seized from rack server at syndicate hideout. Contains cryptographic key files and unauthorized court logs.',
    collectionLocation: 'Plot 44, Barakhamba Road Business Center, New Delhi',
    collectionDateTime: '2026-08-12 14:15 IST',
    collectingOfficerName: 'Insp. Vikram Pratap Singh',
    collectingOfficerBadge: 'DL-POL-8842',
    caseId: 'CASE-2026-DL-104',
    firNumber: 'FIR No. 204/2026',
    currentCustodian: 'Dr. Sameer Kulkarni (CFSL)',
    custodianLocation: 'CFSL Digital Forensics Lab, Room 302',
    status: 'UNDER_FORENSIC_EXAMINATION',
    verificationHash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    photographsCount: 6,
    chainOfCustody: [
      {
        id: 'COC-01',
        fromOfficer: 'Insp. Vikram Pratap Singh (Investigating Officer)',
        toOfficer: 'HC Balbir Singh (Malkhana In-Charge)',
        transferTimestamp: '2026-08-12 18:30 IST',
        reason: 'Initial safe deposit in temperature-controlled Malkhana.',
        verifiedSignature: 'DIGISIGN-IO-8842-SUCCESS'
      },
      {
        id: 'COC-02',
        fromOfficer: 'HC Balbir Singh (Malkhana In-Charge)',
        toOfficer: 'Dr. Sameer Kulkarni (CFSL Lead Scientist)',
        transferTimestamp: '2026-08-22 16:15 IST',
        reason: 'Forensic bit-stream disk imaging and hash verification.',
        verifiedSignature: 'DIGISIGN-CFSL-7731-SUCCESS'
      }
    ]
  },
  {
    id: 'EVD-2026-9039',
    title: 'Forensic Swab and Physical Clothing Article (Barcoded Pack E-04)',
    type: 'PHYSICAL',
    description: 'Sealed forensic packaging containing physical trace materials from scene of incident.',
    collectionLocation: 'Connaught Place Outer Circle, New Delhi',
    collectionDateTime: '2026-08-02 11:00 IST',
    collectingOfficerName: 'SI Meenakshi Sharma',
    collectingOfficerBadge: 'DL-WSC-4491',
    caseId: 'CASE-2026-DL-102',
    firNumber: 'FIR No. 198/2026',
    currentCustodian: 'Malkhana Custody Central Vault',
    custodianLocation: 'Central District Malkhana Vault #4',
    status: 'DEPOSITED_MALKHANA',
    verificationHash: '8a9f44b2075b0512808c4e09f5a7702f3a6a9b44b2075b0512808c4e09f5a770',
    photographsCount: 3,
    chainOfCustody: [
      {
        id: 'COC-01',
        fromOfficer: 'SI Meenakshi Sharma',
        toOfficer: 'HC Balbir Singh (Malkhana)',
        transferTimestamp: '2026-08-02 14:00 IST',
        reason: 'Sealed submission under court inventory mandate.',
        verifiedSignature: 'DIGISIGN-WSC-4491-SUCCESS'
      }
    ]
  }
];

export const INITIAL_LEGAL_RECORDS: LegalCourtRecord[] = [
  {
    id: 'LEG-2026-8841',
    courtCaseNumber: 'CR-COMM/2026/8841',
    courtName: 'Special CBI & Cyber Court, Patiala House Courts, New Delhi',
    firNumber: 'FIR No. 204/2026',
    caseId: 'CASE-2026-DL-104',
    accused: ['Kunal Mathur', 'Sameer Alok (Absconding)'],
    sectionsCharged: ['BNS 318(4)', 'BNS 336(3)', 'IT Act 66D'],
    presidingJudge: 'Hon\'ble Special Judge Sh. S. K. Rastogi, DJS',
    publicProsecutor: 'Adv. Suresh Chandran, Special PP',
    nextHearingDate: '2026-08-28',
    currentStage: 'FRAMING_OF_CHARGES',
    prosecutorNotes: 'Custodial interrogation of accused Kunal Mathur extended by 4 days. CFSL hash verification certificate under Section 65B/63 BNSS submitted.',
    courtOrders: [
      {
        date: '2026-08-16',
        orderSummary: 'Accused Kunal Mathur remanded to judicial custody for 14 days. Production warrant issued for co-accused.',
        signedBy: 'Hon\'ble Special Judge Sh. S. K. Rastogi'
      }
    ],
    timeline: [
      { date: '2026-08-11', event: 'First Remand Application', outcome: 'Police Custody granted for 5 days.' },
      { date: '2026-08-16', event: 'Bail Opposition Argument', outcome: 'Bail dismissed citing risk of digital tampering.' },
      { date: '2026-08-28', event: 'Framing of Charges Hearing', outcome: 'Scheduled.' }
    ]
  }
];

export const INITIAL_APPROVAL_REQUESTS: ApprovalRequest[] = [
  {
    id: 'REQ-2026-019',
    requestedByOfficerId: 'OFF-DIST-01',
    requestedByOfficerName: 'Sh. Rajeshwar Verma, IPS (District Admin)',
    requestedByRole: 'district_admin',
    requestType: 'RECORD_MODIFICATION',
    targetEntityId: 'CASE-2026-DL-104',
    targetEntityType: 'CASE',
    reason: 'Supplementary Section 111 (Organized Crime) addition to FIR No. 204/2026 following intelligence input.',
    status: 'PENDING',
    submittedDate: '2026-08-22 15:30 IST'
  },
  {
    id: 'REQ-2026-018',
    requestedByOfficerId: 'OFF-IO-01',
    requestedByOfficerName: 'Insp. Vikram Pratap Singh (IO)',
    requestedByRole: 'investigating_officer',
    requestType: 'SPECIAL_RESOURCE_DISPATCH',
    targetEntityId: 'CASE-2026-DL-104',
    targetEntityType: 'CASE',
    reason: 'Request for CERT-In Specialized Cyber Forensics Team deployment.',
    status: 'APPROVED',
    submittedDate: '2026-08-19 10:00 IST',
    reviewedBy: 'Dr. Ananya Sundaram, IPS (Central Admin)',
    reviewedDate: '2026-08-19 12:45 IST',
    reviewRemarks: 'Approved under Fast-Track Cyber Investigation Protocol.'
  }
];

export const INITIAL_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: 'AUD-99812',
    timestamp: '2026-08-22 17:42:10 IST',
    officerId: 'OFF-WS-01',
    officerName: 'SI Meenakshi Sharma',
    role: 'womens_safety_officer',
    action: 'DISPATCH_LOGGED',
    entityType: 'WOMENS_SAFETY',
    entityId: 'WS-2026-DL-8821',
    details: 'Emergency Response Vehicle ERV-14 dispatched to Connaught Place Outer Circle.',
    hash: '7c8d9e01a2b3c4d5e6f708192a3b4c5d6e7f8091a2b3c4d5e6f7a8b9c0d1e2f3',
    ipAddress: '10.144.12.89 (National Police Grid)'
  },
  {
    id: 'AUD-99811',
    timestamp: '2026-08-22 16:15:00 IST',
    officerId: 'OFF-FOR-01',
    officerName: 'Dr. Sameer Kulkarni',
    role: 'forensic_officer',
    action: 'CUSTODY_TRANSFER_VERIFIED',
    entityType: 'EVIDENCE',
    entityId: 'EVD-2026-9042',
    details: 'Digital evidence received and SHA-256 seal integrity verified.',
    hash: 'a1b2c3d4e5f60718293a4b5c6d7e8f901a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d',
    ipAddress: '10.144.20.104 (CFSL Secure Intranet)'
  },
  {
    id: 'AUD-99810',
    timestamp: '2026-08-22 14:02:30 IST',
    officerId: 'SYS-KERNEL',
    officerName: 'SAKSHI Cryptographic Kernel',
    role: 'central_admin',
    action: 'UNAUTHORIZED_MUTATION_BLOCKED',
    entityType: 'CASE',
    entityId: 'CASE-2026-DL-104',
    details: 'Immutable ledger prevented retroactive timestamp alteration on case diary entry.',
    hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    ipAddress: '10.92.123.195 (NIC Core Gateway)'
  }
];
