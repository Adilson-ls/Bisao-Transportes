import os
from pymongo import MongoClient
from typing import Optional

class DatabaseConnection:
    _instance: Optional['DatabaseConnection'] = None
    _client: Optional[MongoClient] = None
    
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance
    
    def connect(self):
        if self._client is None:
            try:
                self._client = MongoClient(os.environ.get('MONGO_URL'))
                self.db = self._client['bisao_transportes']
                self.quotes_collection = self.db['quotes']
                self.contacts_collection = self.db['contacts']
                print("Connected to MongoDB successfully")
            except Exception as e:
                print(f"Error connecting to MongoDB: {e}")
                raise
    
    def get_database(self):
        if self._client is None:
            self.connect()
        return self.db
    
    def get_quotes_collection(self):
        if self._client is None:
            self.connect()
        return self.quotes_collection
    
    def get_contacts_collection(self):
        if self._client is None:
            self.connect()
        return self.contacts_collection
    
    def close(self):
        if self._client:
            self._client.close()
            self._client = None

# Global database instance
db_connection = DatabaseConnection()
db_connection.connect()