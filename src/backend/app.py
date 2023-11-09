from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes

# Replace 'Assignment_data.csv' with the name of your CSV file
df = pd.read_csv(r"D:\Assignment_Data.csv")

@app.route('/count', methods=['GET'])
def get_counts():
    total_Store = df['Store'].nunique()
    total_Department = df['Department'].nunique()
    data = {
        'total_Store': total_Store,
        'total_Department': total_Department
    }
    return jsonify(data)

@app.route('/filter', methods=['POST'])
def filter_data():
    data = request.get_json()
    filtered_df = df[(df['Store'] == data['store']) & (df['Date'] == data['date']) & (df['Department'] == data['department'])]
    result = filtered_df.to_dict('records')
    return jsonify(result)

@app.route('/holiday', methods=['GET'])
def check_holiday():
    store = request.args.get('store')
    date = request.args.get('date')
    department = request.args.get('department')
    is_holiday = df[(df['Store'] == store) & (df['Date'] == date) & (df['Department'] == department)]['IsHoliday'].values[0]
    result = {
        'is_holiday': is_holiday
    }
    return jsonify(result)

@app.route('/sales_data', methods=['POST'])
def get_sales_data():
    data = request.get_json()
    filtered_df = df[(df['Store'] == data['store']) & (df['Department'].isin(data['departments']))]
    result = {
        'x_axis': filtered_df['Date'].tolist(),
        'y_axis': filtered_df['Weekly_Sales'].tolist()
    }
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)
