from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import numpy as np
import warnings

warnings.filterwarnings('ignore')

# --- 1. Initialize the FastAPI App ---
app = FastAPI()

# --- 2. Configure CORS ---
# This allows your React frontend (running on a different port) to communicate with this backend.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# --- 3. Load the Trained Model and Scaler ---
try:
    model = joblib.load("diabetes_model.pkl")
    scaler = joblib.load("scaler.pkl")
    print("Multi-class model (Frontend Features) and scaler loaded successfully.")
except FileNotFoundError:
    print("Error: Model or scaler files not found.")
    model = None
    scaler = None

# --- 4. Define the Input Data Model ---
# This Pydantic model now contains ONLY the features used in the frontend form.
class DiabetesFeatures(BaseModel):
    HighBP: float
    HighChol: float
    BMI: float
    Stroke: float
    HeartDiseaseorAttack: float
    PhysActivity: float
    Fruits: float
    Veggies: float
    AnyHealthcare: float
    NoDocbcCost: float
    GenHlth: float
    MentHlth: float
    PhysHlth: float
    DiffWalk: float
    Sex: float
    Age: float

# --- 5. Create the Prediction Endpoint ---
@app.post("/predict")
def predict_diabetes(features: DiabetesFeatures):
    if model is None or scaler is None:
        return {"error": "Model not loaded. Please check server logs."}

    try:
        # The input array now perfectly matches the training data (16 features).
        input_data = np.array([
            [
                features.HighBP, features.HighChol, features.BMI, features.Stroke,
                features.HeartDiseaseorAttack, features.PhysActivity, features.Fruits,
                features.Veggies, features.AnyHealthcare, features.NoDocbcCost,
                features.GenHlth, features.MentHlth, features.PhysHlth,
                features.DiffWalk, features.Sex, features.Age
            ]
        ])

        input_data_scaled = scaler.transform(input_data)
        prediction_raw = model.predict(input_data_scaled)
        prediction_proba = model.predict_proba(input_data_scaled)

        # Interpret the multi-class prediction
        prediction = int(prediction_raw[0])
        
        # Calculate a more nuanced risk score
        # (Probability of Prediabetes * 50) + (Probability of Diabetes * 100)
        prediabetes_proba = prediction_proba[0][1]
        diabetes_proba = prediction_proba[0][2]
        risk_score = (prediabetes_proba * 50) + (diabetes_proba * 100)

        return {
            "prediction": prediction, # Will be 0, 1, or 2
            "confidence": round(risk_score, 2),
            # We can add more details later if needed
        }
    except Exception as e:
        return {"error": f"An error occurred during prediction: {str(e)}"}

# --- 6. Root Endpoint for Testing ---
@app.get("/")
def read_root():
    return {"message": "Welcome to the Diabetes Prediction API (Multi-Class)"}