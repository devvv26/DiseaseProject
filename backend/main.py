from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
import pickle
import numpy as np
from fastapi.middleware.cors import CORSMiddleware
import auth # <-- IMPORT THE NEW AUTH ROUTER

# --- ML Model Loading ---
try:
    model = pickle.load(open('diabetes_model.pkl', 'rb'))
except FileNotFoundError:
    print("ERROR: 'diabetes_model.pkl' not found. Please run train_model.py first.")
    model = None

app = FastAPI()

# --- Include Routers ---
app.include_router(auth.router, prefix="/auth", tags=["Authentication"]) # <-- ADD THIS LINE

# --- CORS Middleware ---
origins = ["http://localhost:5173"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Pydantic model for prediction input ---
# This MUST match the features used in train_model.py
class PredictionInput(BaseModel):
    HighBP: int
    HighChol: int
    BMI: float
    GenHlth: int
    Age: int
    PhysActivity: int
    Fruits: int
    Veggies: int
    Sex: int

# --- THE FIXED PREDICTION ENDPOINT ---
@app.post("/predict")
def predict_diabetes(data: PredictionInput):
    if model is None:
        raise HTTPException(status_code=500, detail="Machine learning model not loaded.")
    
    try:
        # Create the input array in the exact order the model was trained on
        input_data = np.array([[
            data.HighBP,
            data.HighChol,
            data.BMI,
            data.GenHlth,
            data.Age,
            data.PhysActivity,
            data.Fruits,
            data.Veggies,
            data.Sex
        ]])
        
        prediction = model.predict(input_data)
        
        # Return the prediction result (0 or 1)
        return {"prediction": int(prediction[0])}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")

# Note: Authentication endpoints are removed for clarity to focus on the prediction fix.
# We can add them back later if needed.