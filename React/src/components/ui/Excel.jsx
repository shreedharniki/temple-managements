import React from "react";
import { FaFileExcel } from "react-icons/fa";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import "./Excel.css";

function Excel({ data = [], fileName = "data.xlsx" }) {
  const handleDownload = () => {
    if (!data || data.length === 0) return;

    // Convert JSON data to worksheet
    const worksheet = XLSX.utils.json_to_sheet(data);

    // Create workbook and append worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // Generate Excel file and trigger download
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, fileName);
  };

  return (
    <button onClick={handleDownload} className="excel-btn">
      <FaFileExcel /> Export Excel
    </button>
  );
}

export default Excel;
