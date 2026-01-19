
try:
    import fastapi
    print("fastapi imported")
    import uvicorn
    print("uvicorn imported")
    import motor.motor_asyncio
    print("motor imported")
    import dotenv
    print("dotenv imported")
    import bcrypt
    print("bcrypt imported")
    import jwt
    print("jwt imported")
    import email_validator
    print("email_validator imported")
    import multipart
    print("python-multipart imported")
    import pydantic
    print("pydantic imported")
except ImportError as e:
    print(f"IMPORT ERROR: {e}")
except Exception as e:
    print(f"ERROR: {e}")
