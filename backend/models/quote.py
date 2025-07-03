from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional

class QuoteRequest(BaseModel):
    name: str
    email: EmailStr
    phone: str
    service: str
    origin: str
    destination: str
    description: str

class QuoteResponse(BaseModel):
    id: str
    name: str
    email: str
    phone: str
    service: str
    origin: str
    destination: str
    description: str
    created_at: datetime
    status: str
    updated_at: Optional[datetime] = None

class QuoteStatusUpdate(BaseModel):
    status: str

class ContactRequest(BaseModel):
    name: str
    email: EmailStr
    phone: str
    message: str