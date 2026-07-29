import pandas as pd
import joblib

from sklearn.model_selection import train_test_split
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder
from sklearn.impute import SimpleImputer
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score


# ==========================================
# 1. LOAD DATASET
# ==========================================

df = pd.read_csv("../data/crop_yield_dataset.csv")

print("Dataset loaded successfully!")
print("Shape:", df.shape)


# ==========================================
# 2. DEFINE FEATURES AND TARGET
# ==========================================

X = df.drop("Yield_ton_per_ha", axis=1)

y = df["Yield_ton_per_ha"]


# ==========================================
# 3. DEFINE CATEGORICAL AND NUMERICAL FEATURES
# ==========================================

categorical_features = [
    "Crop",
    "Region",
    "Soil_Type",
    "Irrigation",
    "Previous_Crop"
]

numerical_features = [
    "Soil_pH",
    "Rainfall_mm",
    "Temperature_C",
    "Humidity_pct",
    "Fertilizer_Used_kg",
    "Pesticides_Used_kg",
    "Planting_Density"
]


# ==========================================
# 4. NUMERICAL DATA PIPELINE
# ==========================================

numerical_pipeline = Pipeline(
    steps=[
        (
            "imputer",
            SimpleImputer(strategy="median")
        )
    ]
)


# ==========================================
# 5. CATEGORICAL DATA PIPELINE
# ==========================================

categorical_pipeline = Pipeline(
    steps=[
        (
            "imputer",
            SimpleImputer(strategy="most_frequent")
        ),
        (
            "encoder",
            OneHotEncoder(
                handle_unknown="ignore"
            )
        )
    ]
)


# ==========================================
# 6. PREPROCESSING
# ==========================================

preprocessor = ColumnTransformer(
    transformers=[
        (
            "num",
            numerical_pipeline,
            numerical_features
        ),
        (
            "cat",
            categorical_pipeline,
            categorical_features
        )
    ]
)


# ==========================================
# 7. MACHINE LEARNING MODEL
# ==========================================

model = RandomForestRegressor(
    n_estimators=200,
    random_state=42,
    n_jobs=-1
)


# ==========================================
# 8. CREATE COMPLETE ML PIPELINE
# ==========================================

ml_pipeline = Pipeline(
    steps=[
        (
            "preprocessor",
            preprocessor
        ),
        (
            "model",
            model
        )
    ]
)


# ==========================================
# 9. TRAIN TEST SPLIT
# ==========================================

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)


print("\nTraining data:", X_train.shape)
print("Testing data:", X_test.shape)


# ==========================================
# 10. TRAIN MODEL
# ==========================================

print("\nTraining model...")

ml_pipeline.fit(
    X_train,
    y_train
)

print("Model training completed!")


# ==========================================
# 11. MAKE PREDICTIONS
# ==========================================

y_pred = ml_pipeline.predict(X_test)


# ==========================================
# 12. EVALUATE MODEL
# ==========================================

mae = mean_absolute_error(
    y_test,
    y_pred
)

mse = mean_squared_error(
    y_test,
    y_pred
)

rmse = mse ** 0.5

r2 = r2_score(
    y_test,
    y_pred
)


print("\n================================")
print("MODEL PERFORMANCE")
print("================================")

print("MAE:", mae)
print("RMSE:", rmse)
print("R2 Score:", r2)


# ==========================================
# 13. SAVE MODEL
# ==========================================

joblib.dump(
    ml_pipeline,
    "model.pkl"
)

print("\nModel saved successfully!")

print("File created:")
print("ml/model.pkl")
