# YieldSense AI: Agricultural Productivity Forecasting System

[![Python](https://img.shields.io/badge/Python-3.14%2B-blue.svg)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688.svg)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/Frontend-React%20%2B%20Vite-61dafb.svg)](https://react.dev/)
[![Scikit-Learn](https://img.shields.io/badge/ML-Scikit--Learn-orange.svg)](https://scikit-learn.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> An end-to-end intelligent agricultural intelligence platform combining machine learning yield forecasting, agro-climatic telemetry analysis, soil health monitoring, and prescriptive agronomic recommendations.

---

##  Milestone 4 Highlights: Model Validation & Forecasting Accuracy

As part of **Milestone 4 (Week 7 & 8: Testing, Deployment & Documentation)**, rigorous statistical validation and multi-model benchmarking were executed on **10,000 verified agricultural records**:

| Metric / Objective | Production Model (Random Forest) | Industry Benchmark Standard | Validation Status |
| :--- | :---: | :---: | :---: |
| **Coefficient of Determination ($R^2$)** | **0.9801** | $\ge 0.8500$ |  **PASSED (High Precision)** |
| **Mean Absolute Error (MAE)** | **4.308 tons/ha** | $\le 8.0$ tons/ha |  **PASSED** |
| **Root Mean Squared Error (RMSE)** | **5.362 tons/ha** | $\le 10.0$ tons/ha |  **PASSED** |
| **Mean Absolute % Error (MAPE)** | **4.19%** | $\le 8.0\%$ |  **PASSED (Elite Accuracy)** |
| **5-Fold Cross-Validation Stability** | **$R^2 = 0.9801 \pm 0.0005$** | $\sigma \le 0.02$ |  **PASSED (Zero Overfitting)** |
| **Forecasts within $\pm$ 10 tons/ha** | **93.90%** | $\ge 90.0\%$ |  **PASSED** |

### Multi-Model Benchmarking Leaderboard
Benchmarked on 2,000 hold-out test samples under standard preprocessors:
- **Ridge Regression (L2)**: $R^2 = 0.9821$ | $\text{MAE} = 4.076$ | $\text{MAPE} = 3.99\%$
- **Linear Regression (OLS)**: $R^2 = 0.9821$ | $\text{MAE} = 4.077$ | $\text{MAPE} = 3.99\%$
- **Gradient Boosting Regressor**: $R^2 = 0.9811$ | $\text{MAE} = 4.208$ | $\text{MAPE} = 4.12\%$
- **Random Forest Regressor (Production)**: $R^2 = 0.9801$ | $\text{MAE} = 4.308$ | $\text{MAPE} = 4.19\%$
- **Extra Trees Regressor**: $R^2 = 0.9800$ | $\text{MAE} = 4.325$ | $\text{MAPE} = 4.21\%$
- **Decision Tree Regressor**: $R^2 = 0.9651$ | $\text{MAE} = 5.642$ | $\text{MAPE} = 5.48\%$

>  **Detailed Deliverables**:
> - Formal Validation Report: [`ml/MODEL_VALIDATION_REPORT.md`](ml/MODEL_VALIDATION_REPORT.md)
> - Validation Suite Script: [`ml/validate_models.py`](ml/validate_models.py)
> - Structured JSON Metrics: [`ml/validation_results.json`](ml/validation_results.json)

---

## 🏗️ Architecture & Technology Stack

```
YieldSenseAI/
├── backend/            # FastAPI REST backend & ML inference engine
│   ├── main.py         # Endpoints for auth, prediction, admin, and ML validation
│   ├── prediction.py   # Model inference, risk calculation & heuristic fallbacks
│   ├── auth.py         # JWT security, Google OAuth, audit logging
│   └── database.py     # MongoDB & robust in-memory memory storage
├── frontend/           # Modern React + Vite responsive dashboard
│   ├── src/pages/      # Dashboard, AdminDashboard, Landing, Login, Register
│   ├── src/components/ # FarmManagement, SoilHealthLab, AgronomicAdvisor, Weather
│   └── src/styles/     # Tailored design system tokens & variables
├── ml/                 # Machine learning pipeline and validation suite
│   ├── validate_models.py       # Automated 5-fold CV & benchmark suite
│   ├── MODEL_VALIDATION_REPORT.md # Comprehensive Milestone 4 report
│   ├── validation_results.json  # Raw metric exports
│   ├── train_model.py           # Pipeline training script
│   └── model.pkl                # Trained production model artifact
└── data/               # Crop yield agricultural telemetry dataset
    └── crop_yield_dataset.csv   # 10,000 samples with soil, weather, & yield data
```

---

## 🚀 Quickstart Guide

### 1. Backend Setup & Run
```powershell
cd backend
python -m pip install -r requirements.txt
python -m uvicorn main:app --reload --port 8000
```
API Documentation will be accessible at: `http://localhost:8000/docs`

### 2. Frontend Setup & Run
```powershell
cd frontend
npm install
npm run dev
```
Web application will launch at: `http://localhost:5173`

### 3. Run Milestone 4 Model Validation Suite
```powershell
python ml/validate_models.py
```
This re-runs the full 5-fold cross-validation, subgroup analysis, and regenerates both `ml/validation_results.json` and `ml/MODEL_VALIDATION_REPORT.md`.

---

## 🔒 Security & Admin Features
- Role-based Access Control (RBAC): `admin` and `user` roles
- Real-time Security Audit Trail recording all authentication & data events
- Interactive Milestone 4 Model Validation dashboard tab in the Admin Portal with live performance charts, sub-group accuracy tables, and instant report download.

---

## 👤 Author & Credits
- **Developer**: Harsh Fursule
- **Repository**: [AI_Crop-Yield-Prediction-Agricultural-Productivity-Forecasting-System-Harsh-Fursule](https://github.com/harshfursule/AI_Crop-Yield-Prediction-Agricultural-Productivity-Forecasting-System-Harsh-Fursule)
