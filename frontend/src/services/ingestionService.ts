const API_BASE_URL = 'http://localhost:8000/api/v1/ingestion';

export interface SampleLibraryItem {
  id: string;
  title: string;
  type: string;
  file_name: string;
  file_size: string;
  mime_type: string;
  format_badge: string;
  sha256: string;
  source: string;
  bsa_section: string;
}

export interface SampleLibraryResponse {
  total_samples: number;
  items: SampleLibraryItem[];
}

export interface DeviceInfo {
  make_model: string;
  serial_number: string;
  firmware_version?: string;
}

export interface Geolocation {
  latitude: number;
  longitude: number;
  address: string;
}

export interface CustodianInfo {
  official_id: string;
  name: string;
  rank: string;
  police_station: string;
}

export interface NormalizedMetadata {
  device: DeviceInfo;
  location: Geolocation;
  custodian: CustodianInfo;
  capture_timestamp: string;
  ingestion_timestamp: string;
  source_system: string;
  evidence_format: string;
}

export interface CanonicalEvidenceObject {
  eid: string;
  case_id?: string;
  fir_number: string;
  evidence_type: string;
  title: string;
  description: string;
  file_name: string;
  file_size_bytes: number;
  mime_type: string;
  sha256_hash: string;
  metadata: NormalizedMetadata;
  bsa_section: string;
}

export interface IngestResponse {
  status: string;
  canonical_object: CanonicalEvidenceObject;
  message: string;
}

export async function generateEidApi(districtCode: string = 'DL'): Promise<string> {
  const response = await fetch(`${API_BASE_URL}/generate-eid?district_code=${encodeURIComponent(districtCode)}`);
  if (!response.ok) throw new Error('Failed to generate Canonical EID');
  const data = await response.json();
  return data.canonical_eid;
}

export async function getSampleLibraryApi(): Promise<SampleLibraryResponse> {
  const response = await fetch(`${API_BASE_URL}/sample-library`);
  if (!response.ok) throw new Error('Failed to fetch sample evidence library');
  return response.json();
}

export async function ingestFromESakshyaApi(payload: {
  officer_id: string;
  fir_number: string;
  crime_scene_location: string;
  evidence_type?: string;
  title: string;
  device_serial?: string;
  content_payload: string;
}): Promise<IngestResponse> {
  const response = await fetch(`${API_BASE_URL}/esakshya`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error('eSakshya ingestion connector failed');
  return response.json();
}

export async function ingestFromCCTNSApi(payload: {
  fir_number: string;
  act_sections?: string[];
  district_code?: string;
  complainant_name?: string;
  incident_date?: string;
}): Promise<IngestResponse> {
  const response = await fetch(`${API_BASE_URL}/cctns-icjs`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error('CCTNS/ICJS connector failed');
  return response.json();
}

export async function ingestCanonicalObjectApi(payload: CanonicalEvidenceObject): Promise<IngestResponse> {
  const response = await fetch(`${API_BASE_URL}/ingest-canonical`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error('Persisting canonical evidence failed');
  return response.json();
}
