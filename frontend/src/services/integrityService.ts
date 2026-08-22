const API_BASE_URL = 'http://localhost:8000/api/v1/integrity';

export interface HashResponse {
  sha256_hash: string;
  calculation_time_ms: number;
  algorithm: string;
  timestamp: string;
}

export interface CustodyBlock {
  step: number;
  event_id: string;
  action: string;
  custodian_name: string;
  location: string | null;
  timestamp: string;
  previous_hash: string | null;
  block_hash: string;
  is_valid: boolean;
}

export interface ChainOfCustodyResponse {
  evidence_id: string;
  description: string;
  current_status: string;
  total_custody_events: number;
  is_chain_unbroken: boolean;
  blocks: CustodyBlock[];
}

export interface SimulateTamperResponse {
  evidence_id: string;
  original_payload: string;
  tampered_payload: string;
  original_hash: string;
  tampered_hash: string;
  is_tampered: boolean;
  alarm_status: string;
  message: string;
}

export interface Section57ProvenanceResponse {
  evidence_id: string;
  bsa_classification: string;
  bsa_section: string;
  device_make_model: string;
  device_serial_number: string;
  gps_coordinates: string;
  capture_timestamp: string;
  original_hash: string;
  current_hash: string;
  hash_match: boolean;
  section_63_certificate_id: string | null;
  certifying_officer: string | null;
}

export interface SystemIntegrityAuditResponse {
  total_evidence_records: number;
  verified_records: number;
  tampered_records: number;
  system_integrity_percentage: number;
  audit_timestamp: string;
  integrity_status: string;
}

/** Client-side instant SHA-256 hasher using Web Crypto API (< 2 sec duration) */
export async function calculateWebCryptoSHA256(file: File): Promise<{ hash: string; duration_ms: number }> {
  const startTime = performance.now();
  const arrayBuffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  const duration = performance.now() - startTime;

  return {
    hash: hashHex,
    duration_ms: Math.round(duration * 100) / 100
  };
}

export async function calculateHashApi(content: string): Promise<HashResponse> {
  const response = await fetch(`${API_BASE_URL}/calculate-hash`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content }),
  });
  if (!response.ok) throw new Error('Hash calculation failed');
  return response.json();
}

export async function getChainOfCustodyApi(evidenceId: string): Promise<ChainOfCustodyResponse> {
  const response = await fetch(`${API_BASE_URL}/chain/${encodeURIComponent(evidenceId)}`);
  if (!response.ok) throw new Error('Failed to retrieve chain of custody');
  return response.json();
}

export async function simulateTamperApi(evidenceId?: string, sampleContent?: string): Promise<SimulateTamperResponse> {
  const response = await fetch(`${API_BASE_URL}/simulate-tamper`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ evidence_id: evidenceId, sample_content: sampleContent }),
  });
  if (!response.ok) throw new Error('Tamper simulation failed');
  return response.json();
}

export async function getProvenanceApi(evidenceId: string): Promise<Section57ProvenanceResponse> {
  const response = await fetch(`${API_BASE_URL}/provenance/${encodeURIComponent(evidenceId)}`);
  if (!response.ok) throw new Error('Failed to fetch Section 57 BSA provenance metadata');
  return response.json();
}

export async function verifyAllSystemIntegrityApi(): Promise<SystemIntegrityAuditResponse> {
  const response = await fetch(`${API_BASE_URL}/verify-all`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
  if (!response.ok) throw new Error('System integrity audit failed');
  return response.json();
}
