import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
import joblib
import os

def train():
    DATA_PATH = os.path.join('data', 'Diabetesdataset.csv.xlsx')
    MODEL_PATH = 'diabetes_prediction_model.joblib'

    print("--- Starting Model Training (Synchronizing with Frontend Fields) ---")
    
    # --- FIX IS HERE: Use pd.read_excel for .xlsx files ---
    df = pd.read_excel(DATA_PATH) 
    # If your Excel file has multiple sheets, you might need to specify sheet_name, e.g., df = pd.read_excel(DATA_PATH, sheet_name='Sheet1')
    
    df['Diabetes_binary'] = df['Diabetes_012'].apply(lambda x: 0 if x == 0 else 1)
    
    features = [
        'HighBP', 
        'HighChol', 
        'BMI', 
        'GenHlth', 
        'Age', 
        'PhysActivity', 
        'Fruits', 
        'Veggies', 
        'Sex',
        'Stroke', 
        'HeartDiseaseorAttack', 
        'AnyHealthcare', 
        'NoDocbcCost', 
        'MentHlth', 
        'PhysHlth', 
        'DiffWalk' 
    ]
    X = df[features]
    y = df['Diabetes_binary']

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    model = LogisticRegression(max_iter=1000)
    model.fit(X_train, y_train)
    
    joblib.dump(model, MODEL_PATH)
    print(f"Model re-trained and saved successfully to '{MODEL_PATH}'")

if __name__ == '__main__':
    train()