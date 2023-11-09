import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './HomePage.css';

function HomePage() {
  const [data, setData] = useState(null);
  const [selectedStore, setSelectedStore] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

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
    axios.post('http://localhost:5000/filter', {
      store: selectedStore,
      date: selectedDate,
      department: selectedDepartment
    })
    .then(response => console.log(response.data))
    .catch(err => console.log(err));
  };

  return (
    <div className="home-page">
      <h1>Home Page</h1>

      {/* Rest of your code */}

      {/* Replace hardcoded table rows with data from backend */}
      <table className="data-table">
        <thead>
          <tr>
            <th>Total Stores</th>
            <th>Total Departments</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{data && data.total_Store}</td>
            <td>{data && data.total_Department}</td>
          </tr>
        </tbody>
      </table>

      {/* Rest of your code */}
    </div>
  );
}

export default HomePage;
