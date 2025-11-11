import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
import pickle
import os
import numpy as np

print("--- Training Model on Your REAL Dataset ---")

# Define the path to your dataset
dataset_path = os.path.join('data', 'Diabetesdataset.csv.xlsx')

if not os.path.exists(dataset_path):
    print(f"\n[FATAL ERROR] The dataset was not found at '{dataset_path}'.")
    exit()

print(f"Found dataset at '{dataset_path}'. Loading...")
dataset = pd.read_excel(dataset_path)
print("Excel file loaded successfully.")

# --- Data Preparation for YOUR specific dataset ---
target_column = 'Diabetes_012'

# Create a simple binary 'Outcome' column: 0 = No Diabetes, 1 = Diabetes/Pre-diabetes
dataset['Outcome'] = np.where(dataset[target_column] > 0, 1, 0)
print(f"Target column '{target_column}' processed into a binary 'Outcome'.")

# Define the feature columns to match your frontend form
# We will use a subset of the most important features that are easy to collect
feature_columns = [
    'HighBP',
    'HighChol',
    'BMI',
    'GenHlth',
    'Age',
    'PhysActivity',
    'Fruits',
    'Veggies',
    'Sex'
]

# Ensure all required feature columns exist in the dataset
missing_cols = [col for col in feature_columns if col not in dataset.columns]
if missing_cols:
    print(f"[FATAL ERROR] The following required columns are missing from your dataset: {missing_cols}")
    exit()

features = dataset[feature_columns]
target = dataset['Outcome']

print("Features and Target have been defined.")
print("Features being used for training:", list(features.columns))

# Train the model
model = LogisticRegression(solver='liblinear', max_iter=1000)
model.fit(features, target)
print("Model training complete.")

# Save the newly trained model
output_filename = 'diabetes_model.pkl'
with open(output_filename, 'wb') as file:
    pickle.dump(model, file)

print(f"\n[SUCCESS] A new model trained on your REAL data has been saved as '{output_filename}'.")
print("Next, we will update the backend API.")
print("---------------------------------")