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
    print("Model and scaler re-loaded successfully.")
except FileNotFoundError:
    print("Error: Model or scaler files not found.")
    model = None
    scaler = None

# --- 4. Define the Input Data Model ---
# This Pydantic model now contains ONLY the features used in the form.
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
        # The input array now perfectly matches the training data.
        # We explicitly cast values to floats to ensure correct data types.
        input_data = np.array([[
            float(features.HighBP), float(features.HighChol), float(features.BMI), float(features.Stroke),
            float(features.HeartDiseaseorAttack), float(features.PhysActivity), float(features.Fruits),
            float(features.Veggies), float(features.AnyHealthcare), float(features.NoDocbcCost),
            float(features.GenHlth), float(features.MentHlth), float(features.PhysHlth),
            float(features.DiffWalk), float(features.Sex), float(features.Age)
        ]])

        # Scale the input data using the loaded scaler
        input_data_scaled = scaler.transform(input_data)

        # Make a prediction
        prediction_raw = model.predict(input_data_scaled)
        prediction_proba = model.predict_proba(input_data_scaled)

        # Determine the result
        # The model outputs 0 (No Diabetes) or 1 (Diabetes).
        # We want the probability of having diabetes, which is the probability of class 1.
        prediction = int(prediction_raw[0])
        risk_percentage = float(prediction_proba[0][1]) # Always get probability of class 1

        # Return the result in a JSON format
        return {
            "prediction": prediction,
            "confidence": round(risk_percentage * 100, 2)
        }
    except Exception as e:
        return {"error": f"An error occurred during prediction: {str(e)}"}

# --- 6. Root Endpoint for Testing ---
@app.get("/")
def read_root():
    return {"message": "Welcome to the Diabetes Prediction API"}