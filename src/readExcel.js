import * as XLSX from 'xlsx';
import excelFile from './Assignment_Data.xlsx';

export default function readExcel() {
  return new Promise((resolve, reject) => {
    fetch(excelFile)
      .then(response => response.arrayBuffer())
      .then(buffer => {
        const workbook = XLSX.read(buffer, { type: 'buffer' });

        const worksheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[worksheetName];

        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        resolve(jsonData);
      })
      .catch(error => {
        reject(error);
      });
  });
}
