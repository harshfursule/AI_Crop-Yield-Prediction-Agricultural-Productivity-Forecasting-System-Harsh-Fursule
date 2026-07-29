from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from database import test_database_connection
from schemas import UserRegister
from auth import register_user
from schemas import UserRegister, UserLogin
from auth import register_user, login_user




# ==========================================
# CREATE FASTAPI APPLICATION
# ==========================================

app = FastAPI(
    title="YieldSense AI API",
    description="AI-based Crop Yield Prediction Platform",
    version="1.0.0"
)


# ==========================================
# CORS
# ==========================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ==========================================
# STARTUP EVENT
# ==========================================

@app.on_event("startup")
def startup_event():

    test_database_connection()


# ==========================================
# HOME API
# ==========================================

@app.get("/")
def home():

    return {
        "message": "YieldSense AI API is running",
        "database": "MongoDB"
    }


# ==========================================
# REGISTER API
# ==========================================

@app.post("/api/auth/register")
def register(
    user: UserRegister
):

    # Register user
    user_id = register_user(
        name=user.name,
        email=user.email,
        password=user.password
    )


    # Check if email already exists
    if user_id is None:

        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )


    return {
        "success": True,
        "message": "User registered successfully",
        "user_id": str(user_id)
    }
@app.post("/api/auth/login")
def login(
    user: UserLogin
):

    result = login_user(
        email=user.email,
        password=user.password
    )

    # Invalid credentials
    if result is None:

        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    return {
        "success": True,
        "message": "Login successful",
        "access_token": result["access_token"],
        "token_type": result["token_type"],
        "user_id": result["user_id"],
        "name": result["name"]
    }

