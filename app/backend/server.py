from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from pymongo import MongoClient
from datetime import datetime
import os
import uuid

# Initialize FastAPI app
app = FastAPI(title="Bisão Transportes API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB connection
try:
    client = MongoClient(os.environ.get('MONGO_URL'))
    db = client['bisao_transportes']
    quotes_collection = db['quotes']
    print("Connected to MongoDB successfully")
except Exception as e:
    print(f"Error connecting to MongoDB: {e}")

# Pydantic models
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

# Root endpoint
@app.get("/")
async def root():
    return {"message": "Bisão Transportes API - Bem-vindos!"}

# Health check endpoint
@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "service": "Bisão Transportes API"}

# Submit quote request
@app.post("/api/quote", response_model=dict)
async def submit_quote(quote_request: QuoteRequest):
    try:
        # Generate unique ID
        quote_id = str(uuid.uuid4())
        
        # Create quote document
        quote_doc = {
            "id": quote_id,
            "name": quote_request.name,
            "email": quote_request.email,
            "phone": quote_request.phone,
            "service": quote_request.service,
            "origin": quote_request.origin,
            "destination": quote_request.destination,
            "description": quote_request.description,
            "created_at": datetime.now(),
            "status": "pending"
        }
        
        # Insert into MongoDB
        result = quotes_collection.insert_one(quote_doc)
        
        if result.inserted_id:
            return {
                "message": "Orçamento solicitado com sucesso!",
                "quote_id": quote_id,
                "status": "success"
            }
        else:
            raise HTTPException(status_code=500, detail="Erro ao salvar orçamento")
            
    except Exception as e:
        print(f"Error submitting quote: {e}")
        raise HTTPException(status_code=500, detail="Erro interno do servidor")

# Get all quotes (admin endpoint)
@app.get("/api/quotes")
async def get_quotes():
    try:
        quotes = list(quotes_collection.find({}, {"_id": 0}).sort("created_at", -1))
        return {"quotes": quotes, "count": len(quotes)}
    except Exception as e:
        print(f"Error getting quotes: {e}")
        raise HTTPException(status_code=500, detail="Erro ao buscar orçamentos")

# Get quote by ID
@app.get("/api/quote/{quote_id}")
async def get_quote(quote_id: str):
    try:
        quote = quotes_collection.find_one({"id": quote_id}, {"_id": 0})
        if not quote:
            raise HTTPException(status_code=404, detail="Orçamento não encontrado")
        return quote
    except Exception as e:
        print(f"Error getting quote: {e}")
        raise HTTPException(status_code=500, detail="Erro ao buscar orçamento")

# Update quote status
@app.patch("/api/quote/{quote_id}/status")
async def update_quote_status(quote_id: str, status: str):
    try:
        valid_statuses = ["pending", "processing", "completed", "cancelled"]
        if status not in valid_statuses:
            raise HTTPException(status_code=400, detail="Status inválido")
        
        result = quotes_collection.update_one(
            {"id": quote_id},
            {"$set": {"status": status, "updated_at": datetime.now()}}
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Orçamento não encontrado")
        
        return {"message": "Status atualizado com sucesso", "quote_id": quote_id, "status": status}
    except Exception as e:
        print(f"Error updating quote status: {e}")
        raise HTTPException(status_code=500, detail="Erro ao atualizar status")

# Get services statistics
@app.get("/api/stats")
async def get_stats():
    try:
        # Count quotes by service type
        pipeline = [
            {"$group": {
                "_id": "$service",
                "count": {"$sum": 1}
            }},
            {"$sort": {"count": -1}}
        ]
        
        service_stats = list(quotes_collection.aggregate(pipeline))
        
        # Count quotes by status
        status_pipeline = [
            {"$group": {
                "_id": "$status",
                "count": {"$sum": 1}
            }}
        ]
        
        status_stats = list(quotes_collection.aggregate(status_pipeline))
        
        # Total quotes
        total_quotes = quotes_collection.count_documents({})
        
        return {
            "total_quotes": total_quotes,
            "services": service_stats,
            "status": status_stats
        }
    except Exception as e:
        print(f"Error getting stats: {e}")
        raise HTTPException(status_code=500, detail="Erro ao buscar estatísticas")

# Contact form endpoint
@app.post("/api/contact")
async def submit_contact(contact_data: dict):
    try:
        contact_doc = {
            "id": str(uuid.uuid4()),
            "name": contact_data.get("name"),
            "email": contact_data.get("email"),
            "phone": contact_data.get("phone"),
            "message": contact_data.get("message"),
            "created_at": datetime.now(),
            "status": "new"
        }
        
        # You can create a separate collection for contacts
        # For now, we'll just return success
        return {"message": "Mensagem enviada com sucesso!", "status": "success"}
    except Exception as e:
        print(f"Error submitting contact: {e}")
        raise HTTPException(status_code=500, detail="Erro ao enviar mensagem")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)