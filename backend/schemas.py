from pydantic import BaseModel, EmailStr
from typing import Optional, Dict, Any, List

class UserRegister(BaseModel):
    name: str
    email: EmailStr
    password: str
    role: Optional[str] = "user"

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class AdminLogin(BaseModel):
    email: EmailStr
    password: str
    passkey: Optional[str] = None

class GoogleAuthRequest(BaseModel):
    credential: Optional[str] = None
    email: Optional[EmailStr] = None
    name: Optional[str] = None
    picture: Optional[str] = None

class UserProfileUpdate(BaseModel):
    name: Optional[str] = None
    avatar: Optional[str] = None
    current_password: Optional[str] = None
    new_password: Optional[str] = None

class RoleUpdateRequest(BaseModel):
    role: str

class UserStatusUpdateRequest(BaseModel):
    status: str

class YieldPredictionInput(BaseModel):
    Crop: str
    Region: str
    Soil_Type: str
    Irrigation: str
    Previous_Crop: str
    Soil_pH: float
    Rainfall_mm: float
    Temperature_C: float
    Humidity_pct: float
    Fertilizer_Used_kg: float
    Pesticides_Used_kg: float
    Planting_Density: float
