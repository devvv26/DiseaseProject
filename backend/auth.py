from passlib.context import CryptContext
from jose import JWTError, jwt
from datetime import datetime, timedelta, timezone
from typing import Optional

# --- Password Hashing ---
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    # --- FIX: Truncate password to 72 bytes for bcrypt compatibility ---
    # Bcrypt has a maximum password length of 72 bytes.
    # We encode the password to bytes and then slice it.
    encoded_password = password.encode('utf-8')
    truncated_password = encoded_password[:72]
    return pwd_context.hash(truncated_password)

# --- JWT Token Creation (we will use this for login later) ---
# These should be secrets, but for simplicity, we'll define them here.
# In a real production app, load these from your .env file.
SECRET_KEY = "a_very_secret_key_for_jwt" # Replace with a real secret key
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt