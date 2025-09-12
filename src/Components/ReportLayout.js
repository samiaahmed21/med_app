import React, { useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "./ReportLayout.css";

const ReportLayout = ({ reports }) => {
  // Example existing reports (replace with API/props later)
  const defaultReports = [
    {
      title: "Blood Test",
      category: "Lab",
      submittedReport: {
        title: "CBC Report",
        description: "Blood count analysis",
        priority: 4,
      },
    },
    {
      title: "X-Ray",
      category: "Radiology",
      submittedReport: {
        title: "Chest X-Ray",
        description: "Mild infection detected",
        priority: 3,
      },
    },
    {
      title: "MRI Scan",
      category: "Radiology",
      submittedReport: {
        title: "Brain MRI",
        description: "No abnormalities found",
        priority: 5,
      },
    },
  ];

  const [reportData] = useState(reports || defaultReports);

  // 📥 Download report as .txt
  const handleDownload = (report) => {
    const content = `
Report Title: ${report.submittedReport.title}
Description: ${report.submittedReport.description}
Priority: ${"★".repeat(report.submittedReport.priority)}
`;
    const blob = new Blob([content], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${report.title}_report.txt`;
    link.click();
  };

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
                <Popup
                  trigger={<button className="view-btn">View Report</button>}
                  modal
                  nested
                  contentStyle={{
                    background: "white",
                    padding: "20px",
                    borderRadius: "10px",
                    width: "400px",
                    maxWidth: "90%",
                  }}
                >
                  <div>
                    <h3>{report.submittedReport.title}</h3>
                    <p>
                      <strong>Description:</strong>{" "}
                      {report.submittedReport.description}
                    </p>
                    <p>
                      <strong>Priority:</strong>{" "}
                      {"★".repeat(report.submittedReport.priority)}
                    </p>
                  </div>
                </Popup>
              </td>
              <td>
                <button
                  className="download-btn"
                  onClick={() => handleDownload(report)}
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
