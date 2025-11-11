from pydantic import BaseModel
from typing import Optional

# --- Schemas for User Authentication ---

# Base schema for user, shared attributes
class UserBase(BaseModel):
    username: str # Changed from email

# Schema for creating a new user (registration)
class UserCreate(UserBase):
    password: str

# Schema for reading/returning user data (without the password)
class User(UserBase):
    id: int

    class Config:
        from_attributes = True # Pydantic V2 way to enable ORM mode

# Schema for the login token
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None