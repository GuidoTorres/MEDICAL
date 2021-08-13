/* eslint-disable */
import React from 'react';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
const ExportarExcel = ({
  apiData,
  fileName,
  title = 'Descargar',
  myClass = '',
}) => {
  const fileType =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx';

  const exportToCSV = (apiData, fileName) => {
    const ws = XLSX.utils.json_to_sheet(apiData);
    const wb = { Sheets: { data: ws }, SheetNames: ['data', 'data2'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <button
      disabled={apiData.length > 0 ? false : true}
      className="botones"
      onClick={(e) => {
        exportToCSV(apiData, fileName);
      }}
      className={myClass}
      style={{
        background: '#009DCA',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
      }}
    >
      {title}
    </button>
  );
};

export default ExportarExcel;
