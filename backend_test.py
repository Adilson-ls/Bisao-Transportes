import requests
import json
import unittest
import os

# Get the backend URL from the frontend .env file
BACKEND_URL = "https://3404513a-a6f3-4fb7-ac34-38efc97de271.preview.emergentagent.com"
API_URL = f"{BACKEND_URL}/api"

class TestBisaoTransportesAPI(unittest.TestCase):
    """Test suite for Bisão Transportes API endpoints"""

    def test_root_endpoint(self):
        """Test the root endpoint GET /api/"""
        response = requests.get(f"{API_URL}/")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data["message"], "Bisão Transportes API")
        print("✅ Root endpoint test passed")

    def test_services_endpoint(self):
        """Test the services endpoint GET /api/services"""
        response = requests.get(f"{API_URL}/services")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn("services", data)
        self.assertEqual(len(data["services"]), 4)  # Should have 4 services
        
        # Check if all required services are present
        service_ids = [service["id"] for service in data["services"]]
        expected_ids = ["mudancas-residenciais", "mudancas-comerciais", 
                        "transporte-mercadorias", "recolhas-lojas"]
        for service_id in expected_ids:
            self.assertIn(service_id, service_ids)
            
        # Check service structure
        for service in data["services"]:
            self.assertIn("id", service)
            self.assertIn("title", service)
            self.assertIn("description", service)
            self.assertIn("icon", service)
            self.assertIn("features", service)
            self.assertTrue(isinstance(service["features"], list))
            
        print("✅ Services endpoint test passed")

    def test_contact_endpoint(self):
        """Test the contact endpoint POST /api/contact"""
        contact_data = {
            "name": "João Silva",
            "email": "joao@email.com",
            "phone": "+351912345678",
            "service": "mudancas-residenciais",
            "message": "Preciso de mudança para apartamento"
        }
        
        response = requests.post(f"{API_URL}/contact", json=contact_data)
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertTrue(data["success"])
        self.assertIn("message", data)
        self.assertIn("id", data)
        print("✅ Contact endpoint test passed")

    def test_quote_endpoint(self):
        """Test the quote endpoint POST /api/quote"""
        quote_data = {
            "name": "Maria Santos",
            "email": "maria@email.com",
            "phone": "+351987654321",
            "service": "mudancas-comerciais",
            "origin": "Lisboa",
            "destination": "Porto",
            "date": "2024-01-15",
            "details": "Mudança de escritório com 50m²"
        }
        
        response = requests.post(f"{API_URL}/quote", json=quote_data)
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertTrue(data["success"])
        self.assertIn("message", data)
        self.assertIn("id", data)
        print("✅ Quote endpoint test passed")

    def test_get_testimonials_endpoint(self):
        """Test the get testimonials endpoint GET /api/testimonials"""
        response = requests.get(f"{API_URL}/testimonials")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn("testimonials", data)
        self.assertTrue(isinstance(data["testimonials"], list))
        
        # Check if we have at least the 3 sample testimonials
        self.assertTrue(len(data["testimonials"]) >= 3)
        
        # Check testimonial structure if any exist
        if data["testimonials"]:
            testimonial = data["testimonials"][0]
            self.assertIn("name", testimonial)
            self.assertIn("rating", testimonial)
            self.assertIn("message", testimonial)
            self.assertIn("service", testimonial)
            
        print("✅ Get testimonials endpoint test passed")

    def test_add_testimonial_endpoint(self):
        """Test the add testimonial endpoint POST /api/testimonials"""
        testimonial_data = {
            "name": "Carlos Oliveira",
            "rating": 5,
            "message": "Excelente serviço!",
            "service": "Transporte de Mercadorias"
        }
        
        response = requests.post(f"{API_URL}/testimonials", json=testimonial_data)
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertTrue(data["success"])
        self.assertIn("message", data)
        self.assertIn("id", data)
        print("✅ Add testimonial endpoint test passed")

    def test_stats_endpoint(self):
        """Test the stats endpoint GET /api/stats"""
        response = requests.get(f"{API_URL}/stats")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        
        # Check if all required stats are present
        required_fields = ["total_contacts", "total_quotes", "total_testimonials", 
                          "years_experience", "satisfied_clients"]
        for field in required_fields:
            self.assertIn(field, data)
            
        # Check data types
        self.assertTrue(isinstance(data["total_contacts"], int))
        self.assertTrue(isinstance(data["total_quotes"], int))
        self.assertTrue(isinstance(data["total_testimonials"], int))
        self.assertTrue(isinstance(data["years_experience"], int))
        self.assertTrue(isinstance(data["satisfied_clients"], int))
        
        print("✅ Stats endpoint test passed")

    def test_invalid_contact_data(self):
        """Test validation for contact endpoint with invalid data"""
        # Missing required fields
        invalid_data = {
            "name": "Test User",
            # Missing email and other required fields
        }
        
        response = requests.post(f"{API_URL}/contact", json=invalid_data)
        self.assertEqual(response.status_code, 422)  # Validation error
        print("✅ Contact validation test passed")

    def test_invalid_quote_data(self):
        """Test validation for quote endpoint with invalid data"""
        # Missing required fields
        invalid_data = {
            "name": "Test User",
            # Missing email and other required fields
        }
        
        response = requests.post(f"{API_URL}/quote", json=invalid_data)
        self.assertEqual(response.status_code, 422)  # Validation error
        print("✅ Quote validation test passed")

    def test_invalid_testimonial_data(self):
        """Test validation for testimonial endpoint with invalid data"""
        # Invalid rating (should be an integer)
        invalid_data = {
            "name": "Test User",
            "rating": "not-a-number",
            "message": "Test message",
            "service": "Test service"
        }
        
        response = requests.post(f"{API_URL}/testimonials", json=invalid_data)
        self.assertEqual(response.status_code, 422)  # Validation error
        print("✅ Testimonial validation test passed")

if __name__ == "__main__":
    print(f"Testing Bisão Transportes API at: {API_URL}")
    unittest.main(argv=['first-arg-is-ignored'], exit=False)