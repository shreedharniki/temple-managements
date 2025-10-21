import React, { useRef } from "react";

const ReportCard = ({ logo, title, data = [] }) => {
  const printRef = useRef();

  const handlePrint = () => {
    const printContent = printRef.current.innerHTML;
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <title>${title}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            table { border-collapse: collapse; width: 100%; margin-top: 10px; }
            th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
            th { background: #f5f5f5; }
            img { max-width: 100px; display: block; margin: auto; }
            h2 { text-align: center; margin-top: 10px; }
          </style>
        </head>
        <body>${printContent}</body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="p-4 border rounded-lg shadow-md bg-white">
      <div ref={printRef}>
        {logo && <img src={logo} alt="Temple Logo" />}
        <h2>{title}</h2>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Temple Name</th>
              <th>Amount</th>
              <th>Payment Method</th>
              <th>Date</th>
              <th>Remarks</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.temple_name}</td>
                <td>₹{item.amount}</td>
                <td>{item.payment_method}</td>
                <td>{new Date(item.donation_date).toLocaleDateString()}</td>
                <td>{item.remarks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        onClick={handlePrint}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        Print Report
      </button>
    </div>
  );
};

export default ReportCard;
