import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.core.security import verify_password, hash_password

client = TestClient(app)

def test_login_success(db_session):
    """Test successful login with sample official user ID."""
    response = client.post(
        "/api/v1/auth/login",
        json={"official_id": "CENTRAL-001", "password": "Sakshi@2026"}
    )
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert data["token_type"] == "bearer"
    assert data["user"]["official_id"] == "CENTRAL-001"
    assert data["user"]["role_name"] == "CENTRAL_ADMIN"

def test_login_invalid_password(db_session):
    """Test login failure with wrong password."""
    response = client.post(
        "/api/v1/auth/login",
        json={"official_id": "CENTRAL-001", "password": "WrongPassword123"}
    )
    assert response.status_code == 401
    assert "Invalid Official ID or Password" in response.json()["detail"]

def test_login_invalid_user(db_session):
    """Test login failure with non-existent official ID."""
    response = client.post(
        "/api/v1/auth/login",
        json={"official_id": "NON-EXISTENT-ID", "password": "Sakshi@2026"}
    )
    assert response.status_code == 401

def test_signup_success(db_session):
    """Test registering a new officer user account."""
    new_id = f"TEST-POLICE-{pytest.importorskip('uuid').uuid4().hex[:6]}"
    response = client.post(
        "/api/v1/auth/signup",
        json={
            "official_id": new_id,
            "password": "NewOfficerPassword@2026",
            "full_name": "Test Police Officer",
            "email": "test.police@sakshi.gov.in",
            "phone": "+919999900000",
            "role_name": "POLICE_OFFICER",
            "district_code": "DST-DL-CENTRAL"
        }
    )
    assert response.status_code == 201
    data = response.json()
    assert data["user"]["official_id"] == new_id
    assert data["user"]["role_name"] == "POLICE_OFFICER"

def test_get_current_user_me(db_session):
    """Test /me endpoint with valid Bearer token."""
    login_res = client.post(
        "/api/v1/auth/login",
        json={"official_id": "ADMIN-DL-01", "password": "Sakshi@2026"}
    )
    token = login_res.json()["access_token"]

    me_res = client.get(
        "/api/v1/auth/me",
        headers={"Authorization": f"Bearer {token}"}
    )
    assert me_res.status_code == 200
    user_data = me_res.json()
    assert user_data["official_id"] == "ADMIN-DL-01"
    assert user_data["role_name"] == "DISTRICT_ADMIN"
