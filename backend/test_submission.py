
import requests
import json

url = "http://localhost:8000/api/lab-complaints"

payload = {
    "name": "Test User",
    "roll_number": "12345",
    "stream": "CS",
    "phone": "9999999999",
    "email": "test@example.com",
    "lab_number": "Lab 1",
    "complaint": "This is a test complaint description that is long enough.",
    "photo_base64": None
}

try:
    print(f"Sending POST request to {url}...")
    response = requests.post(url, json=payload)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.text}")
except Exception as e:
    print(f"Error: {e}")
