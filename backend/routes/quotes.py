from fastapi import APIRouter, HTTPException
from models.quote import QuoteRequest, QuoteResponse, QuoteStatusUpdate
from database.connection import db_connection
from datetime import datetime
import uuid

router = APIRouter()

@router.post("/quote", response_model=dict)
async def submit_quote(quote_request: QuoteRequest):
    """Submit a new quote request"""
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
        quotes_collection = db_connection.get_quotes_collection()
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

@router.get("/quotes")
async def get_quotes():
    """Get all quotes (admin endpoint)"""
    try:
        quotes_collection = db_connection.get_quotes_collection()
        quotes = list(quotes_collection.find({}, {"_id": 0}).sort("created_at", -1))
        return {"quotes": quotes, "count": len(quotes)}
    except Exception as e:
        print(f"Error getting quotes: {e}")
        raise HTTPException(status_code=500, detail="Erro ao buscar orçamentos")

@router.get("/quote/{quote_id}")
async def get_quote(quote_id: str):
    """Get quote by ID"""
    try:
        quotes_collection = db_connection.get_quotes_collection()
        quote = quotes_collection.find_one({"id": quote_id}, {"_id": 0})
        if not quote:
            raise HTTPException(status_code=404, detail="Orçamento não encontrado")
        return quote
    except Exception as e:
        print(f"Error getting quote: {e}")
        raise HTTPException(status_code=500, detail="Erro ao buscar orçamento")

@router.patch("/quote/{quote_id}/status")
async def update_quote_status(quote_id: str, status_update: QuoteStatusUpdate):
    """Update quote status"""
    try:
        valid_statuses = ["pending", "processing", "completed", "cancelled"]
        if status_update.status not in valid_statuses:
            raise HTTPException(status_code=400, detail="Status inválido")
        
        quotes_collection = db_connection.get_quotes_collection()
        result = quotes_collection.update_one(
            {"id": quote_id},
            {"$set": {"status": status_update.status, "updated_at": datetime.now()}}
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Orçamento não encontrado")
        
        return {
            "message": "Status atualizado com sucesso", 
            "quote_id": quote_id, 
            "status": status_update.status
        }
    except Exception as e:
        print(f"Error updating quote status: {e}")
        raise HTTPException(status_code=500, detail="Erro ao atualizar status")

@router.get("/stats")
async def get_stats():
    """Get services statistics"""
    try:
        quotes_collection = db_connection.get_quotes_collection()
        
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