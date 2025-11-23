import joblib, pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score
import sys

MODEL_PATH = r'backend\diabetes_prediction_model.joblib'
DATA_PATH = r'backend\data\Diabetesdataset.csv.xlsx'

# Load model
try:
    model = joblib.load(MODEL_PATH)
except Exception as e:
    print("Error loading model:", e)
    sys.exit(1)

# Load data
try:
    df = pd.read_excel(DATA_PATH)
except Exception as e:
    print("Error loading dataset:", e)
    sys.exit(1)

# Validate and prepare label
if 'Diabetes_012' not in df.columns:
    print("Expected column 'Diabetes_012' not found in the dataset.")
    sys.exit(1)

df['Diabetes_binary'] = df['Diabetes_012'].apply(lambda x: 0 if x == 0 else 1)

# Features used by the model (must match train_model.py)
features = [
    'HighBP','HighChol','BMI','GenHlth','Age','PhysActivity','Fruits','Veggies','Sex',
    'Stroke','HeartDiseaseorAttack','AnyHealthcare','NoDocbcCost','MentHlth','PhysHlth','DiffWalk'
]

missing = [f for f in features if f not in df.columns]
if missing:
    print("Missing feature columns in dataset:", missing)
    sys.exit(1)

X = df[features]
y = df['Diabetes_binary']

# Reproduce training split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Predict and compute metrics
y_pred = model.predict(X_test)

acc = accuracy_score(y_test, y_pred)
prec = precision_score(y_test, y_pred, pos_label=1)
rec = recall_score(y_test, y_pred, pos_label=1)
f1 = f1_score(y_test, y_pred, pos_label=1)

print("=== Model Evaluation ===")
print(f"Model class: {model.__class__.__name__}")
print(f"Accuracy: {acc*100:.2f}%")
print(f"Precision (Class 1 - Diabetes): {prec:.2f}")
print(f"Recall (Class 1 - Diabetes): {rec:.2f}")
print(f"F1-Score (Class 1 - Diabetes): {f1:.2f}")
