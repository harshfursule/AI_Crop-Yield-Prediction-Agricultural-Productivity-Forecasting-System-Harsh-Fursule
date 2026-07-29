from database import users_collection
import bcrypt


# ==========================================
# HASH PASSWORD
# ==========================================

def hash_password(password: str):

    password_bytes = password.encode("utf-8")

    hashed_password = bcrypt.hashpw(
        password_bytes,
        bcrypt.gensalt()
    )

    return hashed_password.decode("utf-8")


# ==========================================
# VERIFY PASSWORD
# ==========================================

def verify_password(
    plain_password: str,
    hashed_password: str
):

    plain_password_bytes = plain_password.encode("utf-8")

    hashed_password_bytes = hashed_password.encode("utf-8")

    return bcrypt.checkpw(
        plain_password_bytes,
        hashed_password_bytes
    )


# ==========================================
# REGISTER USER
# ==========================================

def register_user(
    name: str,
    email: str,
    password: str
):

    # Check if user already exists
    existing_user = users_collection.find_one(
        {"email": email}
    )

    if existing_user:
        return None


    # Hash password
    hashed_password = hash_password(password)


    # Create user document
    user = {
        "name": name,
        "email": email,
        "password": hashed_password
    }


    # Insert user into MongoDB
    result = users_collection.insert_one(user)


    return result.inserted_id


# ==========================================
# JWT LOGIN CODE
# ==========================================

from jose import jwt
from datetime import datetime, timedelta
import os


SECRET_KEY = os.getenv("JWT_SECRET")
ALGORITHM = "HS256"


def login_user(
    email: str,
    password: str
):

    # Find user
    user = users_collection.find_one(
        {"email": email}
    )

    if not user:
        return None


    # Verify password
    password_correct = verify_password(
        password,
        user["password"]
    )


    if not password_correct:
        return None


    # JWT expiration
    expiration_time = datetime.utcnow() + timedelta(
        minutes=60
    )


    # JWT payload
    payload = {
        "user_id": str(user["_id"]),
        "email": user["email"],
        "exp": expiration_time
    }


    # Generate JWT
    token = jwt.encode(
        payload,
        SECRET_KEY,
        algorithm=ALGORITHM
    )


    return {
        "access_token": token,
        "token_type": "bearer",
        "user_id": str(user["_id"]),
        "name": user["name"]
    }
