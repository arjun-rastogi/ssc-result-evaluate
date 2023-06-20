import * as XLSX from "xlsx";

export function convertExcelToArray(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const target = event.target;
      if (target) {
        const data = new Uint8Array(target.result);
        const workbook = XLSX.read(data, { type: "array" });

        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const excelData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        const headers = excelData[0];
        const rows = excelData.slice(1);

        const result = rows.map((row) => {
          const obj = {};

          headers.forEach((header, index) => {
            obj[header] = row[index];
          });
          return obj;
        });

        resolve(result);
      }
    };

    reader.onerror = (event) => {
      reject(event.target?.error);
    };

    reader.readAsArrayBuffer(file);
  });
}
