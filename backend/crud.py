from sqlalchemy.orm import Session

# Ensure these imports are absolute (no dots)
import models
import schemas
from security import get_password_hash

def get_user_by_username(db: Session, username: str): # Renamed function
    return db.query(models.User).filter(models.User.username == username).first()

def create_user(db: Session, user: schemas.UserCreate):
    # Hash the password before saving it to the database
    hashed_password = get_password_hash(user.password)
    db_user = models.User(username=user.username, hashed_password=hashed_password) # Changed from email
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user