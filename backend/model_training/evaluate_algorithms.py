import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import accuracy_score, classification_report

# --- Import the different models we want to compare ---
from sklearn.linear_model import LogisticRegression
from sklearn.neighbors import KNeighborsClassifier
from sklearn.svm import SVC
from sklearn.ensemble import RandomForestClassifier

# --- Step 1: Load and Prepare Data ---
print("Loading and preparing dataset...")
try:
    # CORRECTED FILE PATH: Go up one directory ('..') then into 'data'
    df = pd.read_csv('../data/diabetes_training_data.csv')
except FileNotFoundError:
    print("Error: 'diabetes_training_data.csv' not found.")
    print("Please ensure the file is located in the 'backend/data/' folder.")
    exit()

# Separate features (X) and target (y)
X = df.drop('Diabetes_012', axis=1) # Changed 'Outcome' to 'Diabetes_012'
y = df['Diabetes_012']             # Changed 'Outcome' to 'Diabetes_012'

# Split the data into training and testing sets (70% train, 30% test)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# --- Step 2: Feature Scaling ---
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# --- Step 3: Model Training and Evaluation ---
# Initialize models
models = {
    "Logistic Regression": LogisticRegression(),
    "K-Nearest Neighbors": KNeighborsClassifier(),
    "Support Vector Classifier": SVC(),
    "Random Forest Classifier": RandomForestClassifier()
}

# Train, predict, and evaluate each model
for model_name, model in models.items():
    print(f"Training and evaluating {model_name}...")
    model.fit(X_train_scaled, y_train)
    y_pred = model.predict(X_test_scaled)
    
    # Print accuracy and classification report
    print(f"Accuracy: {accuracy_score(y_test, y_pred)}")
    print(classification_report(y_test, y_pred))