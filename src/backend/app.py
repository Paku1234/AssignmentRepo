from flask import Flask, jsonify, request, render_template, send_from_directory
import os
from flask_cors import CORS
import pandas as pd

app = Flask(__name__, template_folder='D:/multi-page-app/src/backend/templates')
CORS(app)  # Enable CORS for all routes

# Read the Assignment_Data file
df = pd.read_csv("D:/multi-page-app/src/data/Assignment_Data.csv")
# Convert the 'Date' column to datetime
df['Date'] = pd.to_datetime(df['Date'], format="%d-%m-%Y")
# Extract the year and quarter
df['Year'] = df['Date'].dt.year
df['Quarter'] = df['Date'].dt.quarter

@app.route('/')
def home():
    return render_template('home.html')


@app.route('/sales-page')
def sales_page():
    return render_template('sales.html')

# Routes for serving static files
@app.route('/static/<path:path>')
def serve_static(path):
    return send_from_directory('static', path)

# Helper function to get unique values for a column
def get_unique_values(column_name):
    return df[column_name].unique().tolist()

@app.route('/count', methods=['GET'])
def get_counts():
    # Get total unique stores and departments
    total_Store = get_unique_values('Store')
    total_Department = get_unique_values('Department')

    data = {
        'total_Store': total_Store,
        'total_Department': total_Department
    }
    return jsonify(data)

@app.route('/filter', methods=['POST'])
def filter_data():
    data = request.get_json()

    # Filter data based on selected store and department
    filtered_df = df[(df['Store'] == data['store']) & (df['Department'] == data['department']) & (df['Date'] == data['date'])]

    # Convert filtered data to dictionary format
    result = filtered_df.to_dict('records')

    return jsonify(result)

@app.route('/holiday', methods=['GET', 'POST'])
def check_holiday():
    store = request.args.get('store')
    date = request.args.get('date')
    department = request.args.get('department')

    # Check if the query result is empty before accessing elements
    query_result = df[(df['Store'] == store) & (df['Date'] == date) & (df['Department'] == department)]['IsHoliday'].values

    if len(query_result) > 0:
        is_holiday = query_result[0]
        result = {'is_holiday': is_holiday}
    else:
        result = {'is_holiday': None}

    return jsonify(result)

@app.route('/sales_data', methods=['POST'])
def get_sales_data():
    data = request.get_json()

    # Filter data based on selected store, departments, year, and quarter
    filtered_df = df[(df['Store'] == data['store']) & (df['Department'].isin(data['departments'])) & (df['Year'] == data['year']) & (df['Quarter'] == data['quarter'])]

    # Convert filtered data to dictionary format
    result = filtered_df.to_dict('records')

    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)
