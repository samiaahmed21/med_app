import React, { useState } from "react";
import "./ReportLayout.css";

const ReportLayout = ({ reports }) => {
  // Example reports — replace with API/props if needed
  const defaultReports = [
    {
      title: "Blood Test",
      category: "Lab",
      file: "/sample_report.pdf", // <-- points to public folder
    },
  ];
  

  const [reportData] = useState(reports || defaultReports);

  return (
    <div className="report-container">
      <h2>Reports</h2>
      <table className="report-table">
        <thead>
          <tr>
            <th>Serial Number</th>
            <th>Report Title</th>
            <th>Category</th>
            <th>View Report</th>
            <th>Download Report</th>
          </tr>
        </thead>
        <tbody>
          {reportData.map((report, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{report.title}</td>
              <td>{report.category}</td>
              <td>
                <button
                  className="view-btn"
                  onClick={() => window.open(report.file, "_blank")}
                >
                  View Report
                </button>
              </td>
              <td>
                <button
                  className="download-btn"
                  onClick={() => {
                    const link = document.createElement("a");
                    link.href = report.file;
                    link.download = `${report.title.replace(/\s+/g, "_")}.pdf`;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                >
                  Download Report
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportLayout;
