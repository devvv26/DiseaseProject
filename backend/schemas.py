from pydantic import BaseModel
from typing import Optional

# --- Schemas for User Authentication ---

# Schema for creating a new user (registration)
class UserCreate(BaseModel):
    username: str
    password: str

# Schema for reading/returning user data (without the password)
class User(BaseModel):
    id: int
    username: str

    class Config:
        from_attributes = True # Pydantic V2 way to enable ORM mode

# Schema for the login token
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None