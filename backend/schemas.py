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

# ==========================================
# NEW CRUD MODULE SCHEMAS
# ==========================================

class FarmCreate(BaseModel):
    name: str
    Region: str
    Soil_Type: str
    Irrigation: str
    Soil_pH: Optional[float] = 6.5
    area_ha: Optional[float] = 10.0

class FarmUpdate(BaseModel):
    name: Optional[str] = None
    Region: Optional[str] = None
    Soil_Type: Optional[str] = None
    Irrigation: Optional[str] = None
    Soil_pH: Optional[float] = None
    area_ha: Optional[float] = None

class HarvestLogCreate(BaseModel):
    farm_id: Optional[str] = None
    Crop: str
    Previous_Crop: str
    Yield_ton_per_ha: float
    Planting_Density: Optional[float] = 20.0
    Fertilizer_Used_kg: Optional[float] = 150.0
    Pesticides_Used_kg: Optional[float] = 15.0
    season_year: Optional[str] = "2025"

class HarvestLogUpdate(BaseModel):
    Crop: Optional[str] = None
    Previous_Crop: Optional[str] = None
    Yield_ton_per_ha: Optional[float] = None
    Planting_Density: Optional[float] = None
    Fertilizer_Used_kg: Optional[float] = None
    Pesticides_Used_kg: Optional[float] = None
    season_year: Optional[str] = None

class SoilTestCreate(BaseModel):
    farm_id: Optional[str] = None
    Soil_Type: str
    Soil_pH: float
    Fertilizer_Used_kg: Optional[float] = 0.0
    test_date: Optional[str] = "2026-07-31"

class WeatherLogCreate(BaseModel):
    Region: str
    Rainfall_mm: float
    Temperature_C: float
    Humidity_pct: float
    date_recorded: Optional[str] = "2026-07-31"

class PrescriptionCreate(BaseModel):
    farm_id: Optional[str] = None
    Crop: str
    Fertilizer_Used_kg: float
    Pesticides_Used_kg: float
    notes: Optional[str] = None

# ==========================================
# AI RECOMMENDATION & RISK SCHEMAS
# ==========================================

class CropRecommendationRequest(BaseModel):
    Region: str
    Soil_Type: str
    Soil_pH: float
    Rainfall_mm: float
    Temperature_C: float
    Previous_Crop: Optional[str] = "None"

class FertilizerOptimizationRequest(BaseModel):
    Crop: str
    Soil_Type: str
    Soil_pH: float
    target_yield_ton_per_ha: float

class RiskAssessmentRequest(BaseModel):
    Crop: str
    Soil_Type: str
    Soil_pH: float
    Rainfall_mm: float
    Temperature_C: float
    Humidity_pct: float
    Irrigation: str
