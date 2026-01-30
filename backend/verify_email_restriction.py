import requests
import json

BASE_URL = "http://localhost:8000/api/auth/lab-admin/signup"

def test_signup(email, password="password123", name="Test Admin"):
    payload = {
        "email": email,
        "password": password,
        "name": name
    }
    print(f"Testing signup with email: {email}")
    try:
        response = requests.post(BASE_URL, json=payload)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
    except Exception as e:
        print(f"Error: {e}")
    print("-" * 30)

if __name__ == "__main__":
    # Test 1: Invalid Email Domain
    test_signup("test@gmail.com")

    # Test 2: Valid Email Domain
    test_signup("verified_admin@sies.edu.in")
