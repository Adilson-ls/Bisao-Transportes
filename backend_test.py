#!/usr/bin/env python3
import requests
import json
import unittest
import os
import sys
from datetime import datetime

# Get the backend URL from frontend/.env
BACKEND_URL = "https://78144ea7-8cdb-4456-9d5d-6ac7970ff5db.preview.emergentagent.com"
API_BASE_URL = f"{BACKEND_URL}/api"

class BisaoTransportesAPITest(unittest.TestCase):
    """Test suite for Bisão Transportes API"""
    
    def setUp(self):
        """Setup for each test"""
        self.quote_id = None
        
        # Sample quote request data with Portuguese content
        self.quote_data = {
            "name": "João Silva",
            "email": "joao.silva@example.com",
            "phone": "+351 912 345 678",
            "service": "mudanca-residencial",
            "origin": "Lisboa, Portugal",
            "destination": "Porto, Portugal",
            "description": "Mudança de apartamento de 2 quartos com móveis e eletrodomésticos."
        }
        
        # Alternative quote data for additional tests
        self.quote_data_2 = {
            "name": "Maria Santos",
            "email": "maria.santos@example.com",
            "phone": "+351 923 456 789",
            "service": "frete-rapido",
            "origin": "Coimbra, Portugal",
            "destination": "Braga, Portugal",
            "description": "Transporte urgente de mercadorias para loja comercial."
        }

    def test_1_health_check(self):
        """Test the health check endpoint"""
        print("\n1. Testing Health Check API...")
        
        try:
            response = requests.get(f"{API_BASE_URL}/health")
            
            # Check status code
            self.assertEqual(response.status_code, 200, 
                            f"Health check failed with status code {response.status_code}")
            
            # Check response content
            data = response.json()
            self.assertEqual(data["status"], "healthy", 
                            "Health check did not return 'healthy' status")
            self.assertEqual(data["service"], "Bisão Transportes API", 
                            "Health check did not return correct service name")
            
            print("✅ Health Check API is working correctly")
        except Exception as e:
            print(f"❌ Health Check API test failed: {str(e)}")
            raise

    def test_2_database_connection(self):
        """Test database connection by submitting and retrieving a quote"""
        print("\n2. Testing Database Connection...")
        
        try:
            # Submit a quote to test database write
            response = requests.post(f"{API_BASE_URL}/quote", json=self.quote_data)
            
            # Check status code
            self.assertEqual(response.status_code, 200, 
                            f"Quote submission failed with status code {response.status_code}")
            
            # Get the quote ID from the response
            data = response.json()
            self.assertIn("quote_id", data, "Response does not contain quote_id")
            self.quote_id = data["quote_id"]
            
            # Retrieve the quote to test database read
            response = requests.get(f"{API_BASE_URL}/quote/{self.quote_id}")
            
            # Check status code
            self.assertEqual(response.status_code, 200, 
                            f"Quote retrieval failed with status code {response.status_code}")
            
            # Verify the retrieved data matches what we submitted
            quote = response.json()
            self.assertEqual(quote["name"], self.quote_data["name"], "Name mismatch in retrieved quote")
            self.assertEqual(quote["email"], self.quote_data["email"], "Email mismatch in retrieved quote")
            self.assertEqual(quote["service"], self.quote_data["service"], "Service mismatch in retrieved quote")
            
            print("✅ Database Connection is working correctly")
        except Exception as e:
            print(f"❌ Database Connection test failed: {str(e)}")
            raise

    def test_3_quote_request_api(self):
        """Test the quote request API with various scenarios"""
        print("\n3. Testing Quote Request API...")
        
        try:
            # Test successful quote submission
            response = requests.post(f"{API_BASE_URL}/quote", json=self.quote_data_2)
            
            # Check status code
            self.assertEqual(response.status_code, 200, 
                            f"Quote submission failed with status code {response.status_code}")
            
            # Check response content
            data = response.json()
            self.assertIn("message", data, "Response does not contain message")
            self.assertIn("quote_id", data, "Response does not contain quote_id")
            self.assertEqual(data["status"], "success", "Quote submission did not return success status")
            
            # Store the quote ID for later tests
            quote_id_2 = data["quote_id"]
            
            # Test retrieving all quotes
            response = requests.get(f"{API_BASE_URL}/quotes")
            
            # Check status code
            self.assertEqual(response.status_code, 200, 
                            f"Quotes retrieval failed with status code {response.status_code}")
            
            # Check that we have at least the quotes we submitted
            data = response.json()
            self.assertIn("quotes", data, "Response does not contain quotes list")
            self.assertGreaterEqual(data["count"], 2, "Expected at least 2 quotes in the database")
            
            # Test retrieving a specific quote
            response = requests.get(f"{API_BASE_URL}/quote/{quote_id_2}")
            
            # Check status code
            self.assertEqual(response.status_code, 200, 
                            f"Quote retrieval failed with status code {response.status_code}")
            
            # Verify the retrieved data matches what we submitted
            quote = response.json()
            self.assertEqual(quote["name"], self.quote_data_2["name"], "Name mismatch in retrieved quote")
            self.assertEqual(quote["email"], self.quote_data_2["email"], "Email mismatch in retrieved quote")
            self.assertEqual(quote["service"], self.quote_data_2["service"], "Service mismatch in retrieved quote")
            
            # Test invalid quote ID
            response = requests.get(f"{API_BASE_URL}/quote/invalid-id")
            self.assertEqual(response.status_code, 404, 
                            "Expected 404 for invalid quote ID but got {response.status_code}")
            
            print("✅ Quote Request API is working correctly")
        except Exception as e:
            print(f"❌ Quote Request API test failed: {str(e)}")
            raise

    def test_4_quote_validation(self):
        """Test quote request validation"""
        print("\n4. Testing Quote Request Validation...")
        
        try:
            # Test with missing required field
            invalid_data = self.quote_data.copy()
            del invalid_data["email"]
            
            response = requests.post(f"{API_BASE_URL}/quote", json=invalid_data)
            
            # Should return 422 Unprocessable Entity for validation error
            self.assertEqual(response.status_code, 422, 
                            f"Expected 422 for missing required field but got {response.status_code}")
            
            # Test with invalid email format
            invalid_data = self.quote_data.copy()
            invalid_data["email"] = "invalid-email"
            
            response = requests.post(f"{API_BASE_URL}/quote", json=invalid_data)
            
            # Should return 422 Unprocessable Entity for validation error
            self.assertEqual(response.status_code, 422, 
                            f"Expected 422 for invalid email format but got {response.status_code}")
            
            print("✅ Quote Request Validation is working correctly")
        except Exception as e:
            print(f"❌ Quote Request Validation test failed: {str(e)}")
            raise

def run_tests():
    """Run all tests and print summary"""
    print("=" * 80)
    print("BISÃO TRANSPORTES API TEST SUITE")
    print("=" * 80)
    print(f"Testing API at: {API_BASE_URL}")
    print("-" * 80)
    
    # Create test suite
    suite = unittest.TestSuite()
    suite.addTest(BisaoTransportesAPITest('test_1_health_check'))
    suite.addTest(BisaoTransportesAPITest('test_2_database_connection'))
    suite.addTest(BisaoTransportesAPITest('test_3_quote_request_api'))
    suite.addTest(BisaoTransportesAPITest('test_4_quote_validation'))
    
    # Run tests
    runner = unittest.TextTestRunner(verbosity=2)
    result = runner.run(suite)
    
    # Print summary
    print("\n" + "=" * 80)
    print("TEST SUMMARY")
    print("-" * 80)
    print(f"Total tests: {result.testsRun}")
    print(f"Failures: {len(result.failures)}")
    print(f"Errors: {len(result.errors)}")
    print(f"Skipped: {len(result.skipped)}")
    
    if not result.wasSuccessful():
        print("\nFAILED TESTS:")
        for failure in result.failures:
            print(f"- {failure[0]}")
        for error in result.errors:
            print(f"- {error[0]}")
    else:
        print("\n✅ All tests passed successfully!")
    
    print("=" * 80)
    
    # Return success status
    return result.wasSuccessful()

if __name__ == "__main__":
    success = run_tests()
    sys.exit(0 if success else 1)