import React, { useState } from 'react';
import readExcel from './readExcel';


function ExcelReader({ onDataLoaded }) {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    readExcel(file).then((data) => {
      onDataLoaded(data);
    });
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
    </div>
  );
}

export default ExcelReader;

