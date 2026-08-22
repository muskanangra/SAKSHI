const API_BASE_URL = 'http://localhost:8000/api/v1/auth';

export interface UserResponse {
  id: string;
  official_id: string;
  full_name: string;
  email?: string;
  phone?: string;
  role_name: string;
  role_title: string;
  district_id?: string;
  district_code?: string;
  district_name?: string;
  is_active: boolean;
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
  user: UserResponse;
}

export async function loginApi(official_id: string, password: string): Promise<TokenResponse> {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ official_id, password }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.detail || 'Authentication failed. Please check credentials.');
  }

  return data;
}

export async function signupApi(payload: {
  official_id: string;
  password: string;
  full_name: string;
  email?: string;
  phone?: string;
  role_name: string;
  district_code?: string;
}): Promise<TokenResponse> {
  const response = await fetch(`${API_BASE_URL}/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.detail || 'Registration failed. Please check official details.');
  }

  return data;
}

export async function getMeApi(token: string): Promise<UserResponse> {
  const response = await fetch(`${API_BASE_URL}/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.detail || 'Session expired.');
  }

  return data;
}
