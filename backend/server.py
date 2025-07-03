from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.quotes import router as quotes_router
from routes.contact import router as contact_router
from database.connection import db_connection

# Initialize FastAPI app
app = FastAPI(
    title="Bisão Transportes API",
    description="API para sistema de transportes e mudanças",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(quotes_router, prefix="/api", tags=["quotes"])
app.include_router(contact_router, prefix="/api", tags=["contact"])

# Root endpoint
@app.get("/")
async def root():
    return {
        "message": "Bisão Transportes API - Bem-vindos!",
        "version": "1.0.0",
        "docs": "/docs"
    }

# Health check endpoint
@app.get("/api/health")
async def health_check():
    return {
        "status": "healthy", 
        "service": "Bisão Transportes API",
        "database": "connected"
    }

# Startup event
@app.on_event("startup")
async def startup_event():
    """Initialize database connection on startup"""
    try:
        db_connection.connect()
        print("✅ Database connection established")
    except Exception as e:
        print(f"❌ Database connection failed: {e}")

# Shutdown event
@app.on_event("shutdown")
async def shutdown_event():
    """Close database connection on shutdown"""
    db_connection.close()
    print("✅ Database connection closed")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)