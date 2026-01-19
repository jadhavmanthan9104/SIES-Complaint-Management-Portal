
try:
    from pydantic import EmailStr
    print("EmailStr imported successfully")
except Exception as e:
    print(f"Error importing EmailStr: {e}")
