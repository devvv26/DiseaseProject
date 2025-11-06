from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os

# --- Define the specific location for the database ---
# 1. Define the directory name
DB_DIRECTORY = "data"
# 2. Ensure this directory exists
os.makedirs(DB_DIRECTORY, exist_ok=True)
# 3. Define the full path to the database file
DATABASE_FILE_PATH = os.path.join(DB_DIRECTORY, "database.db")

# This is the path to our database file inside the 'data' folder.
SQLALCHEMY_DATABASE_URL = f"sqlite:///{DATABASE_FILE_PATH}"
# --- End of location definition ---

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# Dependency to get a DB session in our API endpoints
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()