from fastapi import APIRouter, HTTPException
from models.quote import ContactRequest
from database.connection import db_connection
from datetime import datetime
import uuid

router = APIRouter()

@router.post("/contact")
async def submit_contact(contact_data: ContactRequest):
    """Submit a contact form"""
    try:
        contact_doc = {
            "id": str(uuid.uuid4()),
            "name": contact_data.name,
            "email": contact_data.email,
            "phone": contact_data.phone,
            "message": contact_data.message,
            "created_at": datetime.now(),
            "status": "new"
        }
        
        contacts_collection = db_connection.get_contacts_collection()
        result = contacts_collection.insert_one(contact_doc)
        
        if result.inserted_id:
            return {
                "message": "Mensagem enviada com sucesso!", 
                "status": "success"
            }
        else:
            raise HTTPException(status_code=500, detail="Erro ao enviar mensagem")
            
    except Exception as e:
        print(f"Error submitting contact: {e}")
        raise HTTPException(status_code=500, detail="Erro ao enviar mensagem")

@router.get("/contacts")
async def get_contacts():
    """Get all contacts (admin endpoint)"""
    try:
        contacts_collection = db_connection.get_contacts_collection()
        contacts = list(contacts_collection.find({}, {"_id": 0}).sort("created_at", -1))
        return {"contacts": contacts, "count": len(contacts)}
    except Exception as e:
        print(f"Error getting contacts: {e}")
        raise HTTPException(status_code=500, detail="Erro ao buscar contatos")