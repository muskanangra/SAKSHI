const API_BASE_URL = 'http://localhost:8000/api/v1';

export interface BSAReadinessResponse {
  evidence_id: string;
  readiness_score_percentage: number;
  compliance_status: string;
  satisfied_requirements: string[];
  missing_requirements: string[];
  bsa_section: string;
  timestamp: string;
}

export interface BSACertificateResponse {
  certificate_id: string;
  evidence_id: string;
  certifying_officer_name: string;
  certifying_officer_rank: string;
  statutory_act: string;
  hash_algorithm: string;
  master_evidence_hash: string;
  attestation_statement: string;
  issue_timestamp: string;
  digital_signature_hash: string;
}

export interface GraphNode {
  id: string;
  label: string;
  category: 'PERSON' | 'DEVICE' | 'FILE' | 'LOCATION' | 'EVENT';
  subtitle: string;
  evidence_citation_eid: string;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  relationship: string;
  confidence_score: number;
}

export interface EvidenceGraphResponse {
  case_id: string;
  total_nodes: number;
  total_edges: number;
  nodes: GraphNode[];
  edges: GraphEdge[];
}

export interface SearchResultCitation {
  evidence_id: string;
  source_title: string;
  relevance_score: number;
  excerpt: string;
  timestamp: string;
}

export interface SemanticSearchResponse {
  query: string;
  answer_summary: string;
  citations: SearchResultCitation[];
}

export interface TimelineEvent {
  step: number;
  timestamp: string;
  event_title: string;
  evidence_id: string;
  source_system: string;
  description: string;
}

export interface CaseTimelineResponse {
  case_id: string;
  total_events: number;
  timeline: TimelineEvent[];
}

export interface AnomalySignal {
  id: string;
  severity: 'HIGH' | 'MEDIUM' | 'LOW';
  title: string;
  evidence_id: string;
  description: string;
  recommended_action: string;
}

export interface CaseAnomaliesResponse {
  case_id: string;
  total_anomalies: number;
  anomalies: AnomalySignal[];
}

export interface CourtPackageManifestItem {
  annexure: string;
  evidence_id: string;
  title: string;
  bsa_section: string;
  sha256_hash: string;
  status: string;
}

export interface CourtPackageResponse {
  package_id: string;
  case_id: string;
  fir_number: string;
  court_name: string;
  prosecutor_name: string;
  package_hash: string;
  total_annexures: number;
  manifest: CourtPackageManifestItem[];
  bsa_section_63_certificate_id: string;
  download_manifest_url: string;
  generated_at: string;
}

// API Calls
export async function checkBsaReadinessApi(evidenceId: string): Promise<BSAReadinessResponse> {
  const res = await fetch(`${API_BASE_URL}/compliance/check-readiness`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ evidence_id: evidenceId, fir_number: 'FIR-2026-DL-0042' })
  });
  if (!res.ok) throw new Error('Failed to check BSA readiness');
  return res.json();
}

export async function generateBsaCertificateApi(evidenceId: string): Promise<BSACertificateResponse> {
  const res = await fetch(`${API_BASE_URL}/compliance/generate-certificate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ evidence_id: evidenceId, certifying_officer_id: 'LEGAL-DL-401' })
  });
  if (!res.ok) throw new Error('Failed to generate BSA certificate');
  return res.json();
}

export async function getCaseGraphApi(caseId: string = 'CASE-0042'): Promise<EvidenceGraphResponse> {
  const res = await fetch(`${API_BASE_URL}/graph/case-graph/${caseId}`);
  if (!res.ok) throw new Error('Failed to fetch case graph');
  return res.json();
}

export async function semanticSearchApi(query: string, caseId: string = 'CASE-0042'): Promise<SemanticSearchResponse> {
  const res = await fetch(`${API_BASE_URL}/investigation/semantic-search`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, case_id: caseId })
  });
  if (!res.ok) throw new Error('Failed to run semantic search');
  return res.json();
}

export async function getCaseTimelineApi(caseId: string = 'CASE-0042'): Promise<CaseTimelineResponse> {
  const res = await fetch(`${API_BASE_URL}/investigation/timeline/${caseId}`);
  if (!res.ok) throw new Error('Failed to fetch case timeline');
  return res.json();
}

export async function getCaseAnomaliesApi(caseId: string = 'CASE-0042'): Promise<CaseAnomaliesResponse> {
  const res = await fetch(`${API_BASE_URL}/investigation/anomalies/${caseId}`);
  if (!res.ok) throw new Error('Failed to fetch case anomalies');
  return res.json();
}

export async function generateCourtPackageApi(caseId: string = 'CASE-0042'): Promise<CourtPackageResponse> {
  const res = await fetch(`${API_BASE_URL}/court-package/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      case_id: caseId,
      fir_number: 'FIR-2026-DL-0042',
      court_name: 'Sessions Court, Central Delhi Judicial District',
      prosecutor_name: 'Adv. Suresh Chandran'
    })
  });
  if (!res.ok) throw new Error('Failed to generate court package');
  return res.json();
}
