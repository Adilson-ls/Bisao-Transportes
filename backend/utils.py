import uuid
from datetime import datetime
from typing import Dict, Any

def generate_uuid() -> str:
    """Generate a unique UUID string"""
    return str(uuid.uuid4())

def format_phone_number(phone: str) -> str:
    """Format phone number to Portuguese standard"""
    # Remove all non-digit characters
    phone_digits = ''.join(filter(str.isdigit, phone))
    
    # Add country code if missing
    if len(phone_digits) == 9 and phone_digits[0] == '9':
        phone_digits = '351' + phone_digits
    
    return f"+{phone_digits[:3]} {phone_digits[3:6]} {phone_digits[6:9]} {phone_digits[9:]}"

def validate_service_type(service: str) -> bool:
    """Validate service type"""
    valid_services = [
        'mudanca-residencial',
        'mudanca-comercial',
        'frete-rapido',
        'transporte-internacional',
        'recolha-lojas',
        'transporte-bens'
    ]
    return service in valid_services

def get_service_display_name(service: str) -> str:
    """Get display name for service type"""
    service_names = {
        'mudanca-residencial': 'Mudança Residencial',
        'mudanca-comercial': 'Mudança Comercial',
        'frete-rapido': 'Frete Rápido',
        'transporte-internacional': 'Transporte Internacional',
        'recolha-lojas': 'Recolha em Lojas',
        'transporte-bens': 'Transporte de Bens'
    }
    return service_names.get(service, service)

def format_datetime(dt: datetime) -> str:
    """Format datetime for display"""
    return dt.strftime("%d/%m/%Y %H:%M")

def create_response(message: str, data: Dict[Any, Any] = None, status: str = "success") -> Dict[str, Any]:
    """Create standardized API response"""
    response = {
        "message": message,
        "status": status,
        "timestamp": datetime.now().isoformat()
    }
    
    if data:
        response["data"] = data
    
    return response