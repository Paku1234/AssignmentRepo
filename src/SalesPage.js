import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SalesPage.css';

const SalesPage = () => {
  const [data, setData] = useState(null);
  const [selectedStore, setSelectedStore] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedYear, setSelectedYear] = useState(2023);
  const [selectedQuarter, setSelectedQuarter] = useState(1);

  useEffect(() => {
    axios.get('http://localhost:5000/count')
      .then(response => {
        setData(response.data);
        setSelectedStore(response.data.total_Store[0]);
        setSelectedDepartment(response.data.total_Department[0]);
      })
      .catch(err => console.log(err));
  }, []);

  const handleFilterSubmit = () => {
    axios.post('http://localhost:5000/sales_data', {
      store: selectedStore,
      Department: [selectedDepartment],
      year: selectedYear,
      quarter: selectedQuarter
    })
    .then(response => console.log(response.data))
    .catch(err => console.log(err));
  };

  return (
    <div className="sales-page">
      <h1>Sales Page</h1>

      {/* Rest of your code */}

      {/* Replace hardcoded dropdown options with data from backend */}
      <div className="filters">
        <label>
          Choose Store:
          <select
            value={selectedStore}
            onChange={(e) => setSelectedStore(e.target.value)}
          >
            <option value="All">All Stores</option>
            {data && data.total_Stores.map((Store, index) => (
              <option key={index} value={Store}>{Store}</option>
            ))}
          </select>
        </label>

        <label>
          Choose Department:
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
          >
            <option value="All">All Department</option>
            {data && data.total_Department.map((department, index) => (
              <option key={index} value={department}>{department}</option>
            ))}
          </select>
        </label>

        {/* Rest of your code */}
      </div>

      {/* Submit button */}
      <button onClick={handleFilterSubmit}>Submit</button>

      {/* (iii) Multi-line graph to show sales data */}
      <h2>Sales Data Graph</h2>
      {/* Add your graph code here using a library like Chart.js */}
    </div>
  );
}

export default SalesPage;
