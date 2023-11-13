
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './HomePage.css';

// function HomePage() {
//   const [data, setData] = useState(null);
//   const [selectedStore, setSelectedStore] = useState('');
//   const [selectedDepartment, setSelectedDepartment] = useState('');
//   const [selectedDate, setSelectedDate] = useState('');
//   const [isHoliday, setIsHoliday] = useState(false);
//   const [weeklySales, setWeeklySales] = useState(0);

//   useEffect(() => {
//     axios.get('http://localhost:5000/count')
//       .then(response => {
//         setData(response.data);
//         setSelectedStore(response.data.total_Store[0]);
//       })
//       .catch(err => console.log(err));
//   }, []);

//   const handleFilterSubmit = () => {
//     if (selectedStore && selectedDate && selectedDepartment) {
//       axios.post('http://localhost:5000/filter', {
//         store: selectedStore,
//         date: selectedDate,
//         department: selectedDepartment
//       })
//       .then(response => {
//         setIsHoliday(response.data.length === 0 ? false : response.data[0].IsHoliday);
//         setWeeklySales(response.data.length === 0 ? 0 : response.data[0].Weekly_Sales);
//       })
//       .catch(err => console.log(err));
//     }
//   };

//   return (
//     <div className="home-page">
//       <h1>Home Page</h1>

//       <div className="filters">
//         <label>
//           Choose Store:
//           <select
//             value={selectedStore}
//             onChange={(e) => setSelectedStore(e.target.value)}
//           >
//             <option value="All">All Stores</option>
//             {data && data.total_Store && Array.isArray(data.total_Store) && data.total_Store.map((store, index) => (
//               <option key={index} value={store}>{store}</option>
//             ))}
//           </select>
//         </label>

//         <label>
//           Choose Department:
//           <select
//             value={selectedDepartment}
//             onChange={(e) => setSelectedDepartment(e.target.value)}
//           >
//             <option value="All">All Departments</option>
//             {data && data.total_Department && Array.isArray(data.total_Department) && data.total_Department.map((department, index) => (
//               <option key={index} value={department}>{department}</option>
//             ))}
//           </select>
//         </label>

//         <label>
//           Choose Date:
//           <input
//             type="date"
//             value={selectedDate}
//             min="2010-01-01"
//             max="2012-12-31"
//             onChange={(e) => setSelectedDate(e.target.value)}
//           />
//         </label>

//         <button onClick={handleFilterSubmit}>Submit</button>
//       </div>

//       <div>
//         {isHoliday ? (
//           <p>The restaurant department is on holiday.</p>
//         ) : (
//           <p>The restaurant department is not on holiday.</p>
//         )}
//         <p>Weekly Sales: {weeklySales}</p>
//       </div>
//     </div>
//   );
// }

// export default HomePage;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './HomePage.css';

function HomePage() {
  const [data, setData] = useState(null);
  const [selectedStore, setSelectedStore] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [isHoliday, setIsHoliday] = useState(false);
  const [weeklySales, setWeeklySales] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:5000/count')
      .then(response => {
        setData(response.data);
        setSelectedStore(response.data.total_Store[0]);
      })
      .catch(err => console.log(err));
  }, []);

  const handleFilterSubmit = () => {
    if (selectedStore && selectedDate && selectedDepartment) {
      axios.post('http://localhost:5000/filter', {
        store: selectedStore,
        date: selectedDate,
        department: selectedDepartment
      })
      .then(response => {
        setIsHoliday(response.data.length === 0 ? false : response.data[0].IsHoliday);
        setWeeklySales(response.data.length === 0 ? 0 : response.data[0].Weekly_Sales);
      })
      .catch(err => console.log(err));
    }
  };

  return (
    <div className="home-page">
      <h1>Home Page</h1>

      <div className="filters">
        <label>
          Choose Store:
          <select
            value={selectedStore}
            onChange={(e) => setSelectedStore(e.target.value)}
          >
            <option value="All">All Stores</option>
            {data && data.total_Store && Array.isArray(data.total_Store) && data.total_Store.map((store, index) => (
              <option key={index} value={store}>{store}</option>
            ))}
          </select>
        </label>

        <label>
          Choose Department:
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
          >
            <option value="All">All Departments</option>
            {data && data.total_Department && Array.isArray(data.total_Department) && data.total_Department.map((department, index) => (
              <option key={index} value={department}>{department}</option>
            ))}
          </select>
        </label>

        <label>
          Choose Date:
          <input
            type="date"
            value={selectedDate}
            min="2010-01-01"
            max="2012-12-31"
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </label>

        <button onClick={handleFilterSubmit}>Submit</button>
      </div>

      <div>
        {isHoliday ? (
          <p>The restaurant department is on holiday.</p>
        ) : (
          <p>The restaurant department is not on holiday.</p>
        )}
        <p>Weekly Sales: {weeklySales}</p>
      </div>
    </div>
  );
}

export default HomePage;