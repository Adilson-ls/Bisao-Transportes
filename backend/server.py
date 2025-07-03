from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel, EmailStr
from pymongo import MongoClient
from typing import Optional, List
import os
from datetime import datetime
import uuid
from bson import ObjectId
import json

# Initialize FastAPI app
app = FastAPI()

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database connection
MONGO_URL = os.environ.get('MONGO_URL', 'mongodb://localhost:27017/')
client = MongoClient(MONGO_URL)
db = client.bisao_transportes

# Pydantic models
class ContactForm(BaseModel):
    name: str
    email: EmailStr
    phone: str
    service: str
    message: str
    origin: Optional[str] = ""
    destination: Optional[str] = ""

class QuoteRequest(BaseModel):
    name: str
    email: EmailStr
    phone: str
    service: str
    origin: str
    destination: str
    date: str
    details: str

class Testimonial(BaseModel):
    name: str
    rating: int
    message: str
    service: str

# Custom JSON encoder for MongoDB ObjectId
class JSONEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, ObjectId):
            return str(obj)
        return super().default(obj)

# API Routes
@app.get("/api/")
async def root():
    return {"message": "Bisão Transportes API"}

@app.post("/api/contact")
async def submit_contact(contact: ContactForm):
    try:
        contact_data = contact.dict()
        contact_data['created_at'] = datetime.utcnow()
        contact_data['id'] = str(uuid.uuid4())
        
        result = db.contacts.insert_one(contact_data)
        
        return {
            "success": True,
            "message": "Mensagem enviada com sucesso! Entraremos em contato em breve.",
            "id": contact_data['id']
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao enviar mensagem: {str(e)}")

@app.post("/api/quote")
async def submit_quote(quote: QuoteRequest):
    try:
        quote_data = quote.dict()
        quote_data['created_at'] = datetime.utcnow()
        quote_data['id'] = str(uuid.uuid4())
        quote_data['status'] = 'pending'
        
        result = db.quotes.insert_one(quote_data)
        
        return {
            "success": True,
            "message": "Pedido de orçamento enviado! Receberá uma resposta em breve.",
            "id": quote_data['id']
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao enviar orçamento: {str(e)}")

@app.get("/api/testimonials")
async def get_testimonials():
    try:
        testimonials = list(db.testimonials.find().sort("created_at", -1).limit(10))
        
        # Convert ObjectId to string for JSON serialization
        for testimonial in testimonials:
            testimonial['_id'] = str(testimonial['_id'])
            
        return {"testimonials": testimonials}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao buscar depoimentos: {str(e)}")

@app.post("/api/testimonials")
async def add_testimonial(testimonial: Testimonial):
    try:
        testimonial_data = testimonial.dict()
        testimonial_data['created_at'] = datetime.utcnow()
        testimonial_data['id'] = str(uuid.uuid4())
        testimonial_data['approved'] = False
        
        result = db.testimonials.insert_one(testimonial_data)
        
        return {
            "success": True,
            "message": "Depoimento enviado! Será publicado após aprovação.",
            "id": testimonial_data['id']
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao enviar depoimento: {str(e)}")

@app.get("/api/services")
async def get_services():
    services = [
        {
            "id": "mudancas-residenciais",
            "title": "Mudanças Residenciais",
            "description": "Mudanças completas para residências com equipe especializada",
            "icon": "🏠",
            "features": ["Embalagem profissional", "Transporte seguro", "Montagem de móveis"]
        },
        {
            "id": "mudancas-comerciais",
            "title": "Mudanças Comerciais",
            "description": "Mudanças para escritórios e estabelecimentos comerciais",
            "icon": "🏢",
            "features": ["Horário flexível", "Mínimo downtime", "Equipamentos especializados"]
        },
        {
            "id": "transporte-mercadorias",
            "title": "Transporte de Mercadorias",
            "description": "Transporte de cargas e mercadorias com segurança",
            "icon": "🚛",
            "features": ["Nacional e internacional", "Rastreamento", "Seguro incluso"]
        },
        {
            "id": "recolhas-lojas",
            "title": "Recolhas em Lojas",
            "description": "Recolha de compras em lojas e entregas ao domicílio",
            "icon": "🛒",
            "features": ["Agenda flexível", "Cuidado especial", "Entrega rápida"]
        }
    ]
    
    return {"services": services}

@app.get("/api/stats")
async def get_stats():
    try:
        total_contacts = db.contacts.count_documents({})
        total_quotes = db.quotes.count_documents({})
        total_testimonials = db.testimonials.count_documents({"approved": True})
        
        return {
            "total_contacts": total_contacts,
            "total_quotes": total_quotes,
            "total_testimonials": total_testimonials,
            "years_experience": 10,
            "satisfied_clients": 500
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao buscar estatísticas: {str(e)}")

# Initialize some sample data
@app.on_event("startup")
async def startup_event():
    # Add some sample testimonials if none exist
    if db.testimonials.count_documents({}) == 0:
        sample_testimonials = [
            {
                "name": "Maria Silva",
                "rating": 5,
                "message": "Excelente serviço! Equipe muito profissional e cuidadosa com os meus móveis.",
                "service": "Mudanças Residenciais",
                "approved": True,
                "created_at": datetime.utcnow(),
                "id": str(uuid.uuid4())
            },
            {
                "name": "João Santos",
                "rating": 5,
                "message": "Recomendo muito! Fizeram a mudança do meu escritório sem problemas.",
                "service": "Mudanças Comerciais",
                "approved": True,
                "created_at": datetime.utcnow(),
                "id": str(uuid.uuid4())
            },
            {
                "name": "Ana Costa",
                "rating": 4,
                "message": "Pontuais e eficientes. Muito satisfeita com o serviço.",
                "service": "Transporte de Mercadorias",
                "approved": True,
                "created_at": datetime.utcnow(),
                "id": str(uuid.uuid4())
            }
        ]
        
        db.testimonials.insert_many(sample_testimonials)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)