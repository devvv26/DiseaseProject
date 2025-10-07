import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler
import joblib
import warnings

warnings.filterwarnings('ignore')

print("--- Starting Final Model Training (Targeted Features) ---")

# --- 1. Load the Dataset ---
try:
    df = pd.read_csv('../data/diabetes_training_data.csv')
    print("Dataset loaded successfully.")
except FileNotFoundError:
    print("Error: 'diabetes_training_data.csv' not found in 'backend/data/'.")
    exit()

# --- 2. Define EXACT Features Used in the Frontend ---
# This list MUST match the features sent from the frontend form.
features_to_use = [
    'HighBP', 'HighChol', 'BMI', 'Stroke', 'HeartDiseaseorAttack', 
    'PhysActivity', 'Fruits', 'Veggies', 'AnyHealthcare', 'NoDocbcCost', 
    'GenHlth', 'MentHlth', 'PhysHlth', 'DiffWalk', 'Sex', 'Age'
]

# The target column remains the same
target_column = 'Diabetes_binary'

X = df[features_to_use]
y = df[target_column]

# --- 3. Create and Save the Scaler ---
# The scaler will now be trained ONLY on the 16 features we are using.
scaler = StandardScaler()
scaler.fit(X)

scaler_filename = "../scaler.pkl"
joblib.dump(scaler, scaler_filename)
print(f"Data scaler for {len(features_to_use)} features saved to '{scaler_filename}'")

# Scale the features
X_scaled = scaler.transform(X)

# --- 4. Train the Final Model ---
print(f"Training RandomForestClassifier on {len(features_to_use)} features...")
final_model = RandomForestClassifier(random_state=42)
final_model.fit(X_scaled, y)
print("Model training complete.")

# --- 5. Save the Final Model ---
model_filename = "../diabetes_model.pkl"
joblib.dump(final_model, model_filename)

print(f"Final trained model saved to '{model_filename}'")
print("--- Process Complete ---")