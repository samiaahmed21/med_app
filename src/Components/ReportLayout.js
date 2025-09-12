import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './ReportForm.css';

const ReportForm = ({ reports }) => {
  const [reportData, setReportData] = useState(reports);
  const [formInput, setFormInput] = useState({ title: '', description: '', priority: 0 });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput({ ...formInput, [name]: value });
  };

  const handlePriorityClick = (star) => {
    setFormInput({ ...formInput, priority: star });
  };

  const handleSubmit = (e, index, closeModal) => {
    e.preventDefault();
    if (!formInput.title || !formInput.description || formInput.priority === 0) {
      alert('Please fill all fields and select a priority!');
      return;
    }

    const updatedReports = [...reportData];
    updatedReports[index] = {
      ...updatedReports[index],
      reportSubmitted: true,
      submittedReport: { ...formInput },
    };

    setReportData(updatedReports);
    setFormInput({ title: '', description: '', priority: 0 });
    closeModal();
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
            <th>Submit Report</th>
            <th>Report Submitted</th>
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
                  trigger={
                    <button
                      disabled={report.reportSubmitted}
                      className={report.reportSubmitted ? 'report-given' : ''}
                    >
                      {report.reportSubmitted ? 'Report Submitted' : 'Click Here'}
                    </button>
                  }
                  modal
                  nested
                  contentStyle={{
                    background: 'white',
                    padding: '10px',
                    boxShadow: 'none',
                    borderRadius: '0',
                    width: '350px',
                    maxWidth: '90%',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  {(close) => (
                    <div className="report-modal">
                      <h3>Submit Your Report</h3>
                      <form onSubmit={(e) => handleSubmit(e, index, close)}>
                        <div className="form-group">
                          <label>Title:</label>
                          <input
                            type="text"
                            name="title"
                            value={formInput.title}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="form-group">
                          <label>Description:</label>
                          <textarea
                            name="description"
                            value={formInput.description}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="form-group">
                          <label>Priority:</label>
                          <div className="star-rating">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <span
                                key={star}
                                className={star <= formInput.priority ? 'filled' : ''}
                                onClick={() => handlePriorityClick(star)}
                                aria-label={`${star} star`}
                              >
                                ★
                              </span>
                            ))}
                          </div>
                        </div>
                        <button type="submit" className="submit-btn">
                          Submit
                        </button>
                      </form>
                    </div>
                  )}
                </Popup>
              </td>
              <td>
                {report.reportSubmitted && report.submittedReport
                  ? report.submittedReport.description
                  : 'No'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {reportData.map(
        (report, idx) =>
          report.reportSubmitted && report.submittedReport && (
            <div key={idx} className="submitted-report">
              <h4>Report for {report.title}</h4>
              <p>
                <strong>Title:</strong> {report.submittedReport.title}
              </p>
              <p>
                <strong>Description:</strong> {report.submittedReport.description}
              </p>
              <p>
                <strong>Priority:</strong>{' '}
                {Array.from({ length: report.submittedReport.priority }, (_, i) => (
                  <span key={i} className="filled">
                    ★
                  </span>
                ))}
              </p>
            </div>
          )
      )}
    </div>
  );
};

export default ReportForm;