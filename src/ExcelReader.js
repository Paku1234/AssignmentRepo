import React from 'react';
import Papa from 'papaparse';

function ExcelReader({ onDataLoaded }) {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    Papa.parse(file, {
      complete: (results) => {
        onDataLoaded(results.data);
      },
    });
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
    </div>
  );
}

export default ExcelReader;
