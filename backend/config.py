import os
from typing import Optional

class Settings:
    """Application settings"""
    
    # Database settings
    MONGO_URL: str = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
    DATABASE_NAME: str = 'bisao_transportes'
    
    # API settings
    API_V1_STR: str = '/api'
    PROJECT_NAME: str = 'Bisão Transportes API'
    VERSION: str = '1.0.0'
    
    # CORS settings
    BACKEND_CORS_ORIGINS: list = ["*"]
    
    # Email settings (for future implementation)
    SMTP_HOST: Optional[str] = os.environ.get('SMTP_HOST')
    SMTP_PORT: int = int(os.environ.get('SMTP_PORT', 587))
    SMTP_USER: Optional[str] = os.environ.get('SMTP_USER')
    SMTP_PASSWORD: Optional[str] = os.environ.get('SMTP_PASSWORD')
    
    # Admin settings
    ADMIN_EMAIL: str = os.environ.get('ADMIN_EMAIL', 'info@bisaotransportes.pt')
    
    class Config:
        case_sensitive = True

settings = Settings()