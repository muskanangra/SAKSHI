import os
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    PROJECT_NAME: str = "SAKSHI - Secure Audit & Kernel for Shared High-integrity Investigations"
    VERSION: str = "1.0.0"
    ENVIRONMENT: str = "development"
    
    DATABASE_URL: str = "postgresql://localhost:5432/sakshi_db"
    JWT_SECRET: str = "dev-secret-key-change-in-production-sakshi-2026"
    OTP_SECRET: str = "dev-otp-secret-key-sakshi"

    model_config = SettingsConfigDict(
        env_file=os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), ".env"),
        env_file_encoding="utf-8",
        extra="ignore"
    )

settings = Settings()
