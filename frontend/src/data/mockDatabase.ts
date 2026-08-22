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

export const INITIAL_ALERTS: AlertItem[] = [];
export const INITIAL_CASES: CaseRecord[] = [];
export const INITIAL_WOMENS_SAFETY_RECORDS: WomensSafetyRecord[] = [];
export const INITIAL_EVIDENCE: EvidenceItem[] = [];
export const INITIAL_LEGAL_RECORDS: LegalCourtRecord[] = [];
export const INITIAL_APPROVAL_REQUESTS: ApprovalRequest[] = [];
export const INITIAL_AUDIT_LOGS: AuditLogEntry[] = [];
