from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib # Ensure joblib is imported
import pandas as pd
from pathlib import Path

app = FastAPI()
origins = ["http://localhost:5173", "http://127.0.0.1:5173"]
app.add_middleware(CORSMiddleware, allow_origins=origins, allow_credentials=True, allow_methods=["*"], allow_headers=["*"])

# The input model now EXACTLY matches the features used in train_model.py
class DiabetesFeatures(BaseModel):
    HighBP: int
    HighChol: int
    BMI: float
    GenHlth: int
    Age: int
    PhysActivity: int
    Fruits: int
    Veggies: int
    Sex: int
    Stroke: int 
    HeartDiseaseorAttack: int 
    AnyHealthcare: int 
    NoDocbcCost: int 
    MentHlth: int 
    PhysHlth: int 
    DiffWalk: int 

MODEL_PATH = Path(__file__).parent / "diabetes_prediction_model.joblib"
model = None # Initialize model to None

# --- CORRECTED DEBUGGING CODE ---
print(f"Attempting to load model from: {MODEL_PATH.resolve()}")
if MODEL_PATH.exists():
    try:
        model = joblib.load(MODEL_PATH) # FIX: Use joblib.load
        print("Model loaded successfully.")
    except Exception as e:
        print(f"Error loading model: {e}")
        print("Model will remain None, predictions will fail.")
else:
    print(f"Model file NOT FOUND at: {MODEL_PATH.resolve()}")
    print("Please ensure train_model.py has been run and the model file exists at this location.")
# --- END CORRECTED DEBUGGING CODE ---

@app.post("/predict")
def predict_diabetes(features: DiabetesFeatures):
    if model is None:
        raise HTTPException(status_code=500, detail="Model not loaded. Check backend logs for details.")
    
    input_data = pd.DataFrame([features.dict()])
    prediction = model.predict(input_data)
    probability = model.predict_proba(input_data)
    
    # Update factors based on the full set of fields
    factors = []
    if features.HighBP == 1: factors.append("High Blood Pressure")
    if features.HighChol == 1: factors.append("High Cholesterol")
    if features.BMI >= 30: factors.append("High BMI (Obesity)")
    if features.PhysActivity == 0: factors.append("Low Physical Activity")
    if features.GenHlth >= 4: factors.append("Poor General Health")
    if features.Stroke == 1: factors.append("History of Stroke")
    if features.HeartDiseaseorAttack == 1: factors.append("History of Heart Disease/Attack")
    if features.DiffWalk == 1: factors.append("Difficulty Walking")
    if features.MentHlth > 15: factors.append("Frequent Mental Distress")
    if features.PhysHlth > 15: factors.append("Frequent Physical Distress")
    
    return {
        "prediction": int(prediction[0]),
        "probability": float(probability[0][1]),
        "factors": factors
    }

@app.get("/generate-diet-plan")
def generate_diet_plan(risk_level: int = Query(..., description="Risk level (0: Low, 1: Prediabetes, 2: High)")):
    if risk_level == 2: # High Risk
        diet_plan = [
            "Focus on whole, unprocessed foods.",
            "Limit sugary drinks and refined carbohydrates.",
            "Increase intake of non-starchy vegetables (e.g., leafy greens, broccoli).",
            "Choose lean proteins (e.g., chicken, fish, beans).",
            "Incorporate healthy fats (e.g., avocado, nuts, olive oil).",
            "Monitor portion sizes carefully.",
            "Consult a registered dietitian for a personalized plan."
        ]
    elif risk_level == 1: # Potential Risk (Prediabetes)
        diet_plan = [
            "Prioritize balanced meals with complex carbohydrates.",
            "Reduce intake of processed foods and added sugars.",
            "Eat plenty of fruits and vegetables.",
            "Choose whole grains over refined grains.",
            "Stay hydrated with water.",
            "Regular physical activity is crucial."
        ]
    else: # Low Risk (0)
        diet_plan = [
            "Maintain a balanced and varied diet.",
            "Continue to eat plenty of fruits and vegetables.",
            "Limit occasional treats and fast food.",
            "Stay physically active.",
            "Regular health check-ups are recommended."
        ]
    
    return {"diet_plan": diet_plan}

@app.get("/")
def read_root():
    return {"message": "Welcome to the Diabetes Prediction API!"}