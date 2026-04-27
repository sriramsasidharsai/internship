import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import LabelEncoder
import matplotlib.pyplot as plt
import seaborn as sns

# -- 1. PROBLEM STATEMENT --
# Internship mentors find it difficult to track and predict the performance of multiple interns 
# based purely on manual logs. This system aims to analyze historical data (work hours, task complexity, 
# and previous completion rates) to predict task completion time and analyze productivity.

# -- 2. DATASET CREATION (Synthetic) --
def generate_sample_data():
    data = {
        'intern_id': [i for i in range(1, 101)],
        'hours_worked': np.random.randint(4, 10, 100),
        'task_complexity': np.random.choice(['Low', 'Medium', 'High'], 100),
        'experience_weeks': np.random.randint(1, 12, 100),
        'prev_completion_rate': np.random.uniform(0.5, 1.0, 100),
        'feedback_score': np.random.randint(1, 6, 100),
        'completion_days': [] # Target Variable
    }
    
    # Simple logic for target variable (completion_days)
    for i in range(100):
        base = 2
        if data['task_complexity'][i] == 'Medium': base += 2
        if data['task_complexity'][i] == 'High': base += 5
        
        # Adjust based on experience and rate
        days = base - (data['experience_weeks'][i] * 0.1) - (data['prev_completion_rate'][i] * 0.5)
        data['completion_days'].append(max(1, round(days, 2)))
        
    return pd.DataFrame(data)

# -- 3. DATA PREPROCESSING --
print("--- Starting Data Preprocessing ---")
df = generate_sample_data()

# Encoding categorical data
le = LabelEncoder()
df['task_complexity_enc'] = le.fit_transform(df['task_complexity'])

# Feature Selection
X = df[['hours_worked', 'task_complexity_enc', 'experience_weeks', 'prev_completion_rate', 'feedback_score']]
y = df['completion_days']

# Splitting dataset
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
print("Data split into 80:20 ratio.")

# -- 4. MODEL BUILDING --
print("\n--- Training Model (Random Forest Regressor) ---")
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train, y_train)
print("Model training completed.")

# -- 5. TESTING & EVALUATION --
predictions = model.predict(X_test)
mse = np.mean((predictions - y_test)**2)
print(f"Mean Squared Error: {round(mse, 4)}")

# -- 6. VISUALIZATION --
def visualize_results(df, y_test, predictions):
    plt.figure(figsize=(10, 6))
    
    # 1. Actual vs Predicted
    plt.subplot(1, 2, 1)
    plt.scatter(y_test, predictions, color='blue', alpha=0.5)
    plt.plot([y_test.min(), y_test.max()], [y_test.min(), y_test.max()], 'k--', lw=2)
    plt.xlabel('Actual Days')
    plt.ylabel('Predicted Days')
    plt.title('Actual vs Predicted Completion Days')

    # 2. Feature Importance
    plt.subplot(1, 2, 2)
    importances = model.feature_importances_
    features = X.columns
    sns.barplot(x=importances, y=features)
    plt.title('Feature Importance Analysis')
    
    plt.tight_layout()
    plt.savefig('analysis_output.png')
    print("\nGraphs saved as 'analysis_output.png'")
    # plt.show() # Uncomment if running in notebook

if __name__ == "__main__":
    visualize_results(df, y_test, predictions)
    
    # Sample Prediction
    sample_intern = [[8, 1, 4, 0.85, 4]] # 8hrs, Medium(1), 4 weeks exp, 85% rate, 4 score
    p_time = model.predict(sample_intern)
    print(f"\nExample Prediction: Estimated completion time is {round(p_time[0], 2)} days.")

# -- EXECUTION GUIDE --
# 1. Install dependencies: pip install pandas numpy scikit-learn matplotlib seaborn
# 2. Run the script: python internship_analysis.py
# 3. View the generated 'analysis_output.png' for results.
