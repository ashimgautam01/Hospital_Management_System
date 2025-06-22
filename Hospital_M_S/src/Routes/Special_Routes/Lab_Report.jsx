import React, { useState } from "react";
import { Aside } from "../../Components/aside";
import useLabReports from "../../hooks/useLabReports";
import LabReportForm from "../../Components/LabForm";
import axios from "axios";
import usePDFGeneration from "../../hooks/usePDFGeneration";

const LabReportsPage = () => {
  const { labReports, isSubmitting, submitLabResult, refetchLabReports } = useLabReports();
  const [pdfUrls, setPdfUrls] = useState({});  
  const [result, setResult] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [currentReport, setCurrentReport] = useState(null);
  const [processingReportId, setProcessingReportId] = useState(null); 
  const generatePDF = usePDFGeneration();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setResult((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitResult = async (e) => { 
    e && e.stopPropagation();
    
    if (!currentReport) return;
    
    setProcessingReportId(currentReport._id);
    
    try { 
      const response = await axios.post(
        "http://localhost:8080/api/v1/lab/submit",
        {
          labReportId: currentReport._id,
          sampleType: currentReport.sampleType,
          data: result,
        }
      );

      console.log("Lab result submitted successfully:", response.data);
 
      const blob = generatePDF(currentReport, result);
      const url = URL.createObjectURL(blob);
      console.log("PDF URL generated:", url);
       
      setPdfUrls(prev => ({ ...prev, [currentReport._id]: url }));
 
      if (refetchLabReports) {
        await refetchLabReports();
      }
 
      setResult({});
      setShowModal(false);
      setCurrentReport(null);
      
      alert("Lab result submitted successfully!");
      
    } catch (error) {
      console.error("Error submitting lab result:", error);
       
      const errorMessage = error.response?.data?.message || 
                          error.message || 
                          "Failed to submit lab result. Please try again.";
      alert(errorMessage);
    } finally {
      setProcessingReportId(null);
    }
  };

  const print = (reportId, e) => { 
    e && e.stopPropagation();
    
    const reportPdfUrl = pdfUrls[reportId];
    
    if (!reportPdfUrl) {
      alert("PDF not available for printing. Please submit the report first.");
      return;
    }
    
    const printWindow = window.open(reportPdfUrl, "_blank");
    if (printWindow) {
      printWindow.onload = () => {
        printWindow.print();
      };
    } else {
      alert("Please allow pop-ups to print the report");
    }
  };

  const handleModalClose = (e) => { 
    e && e.stopPropagation();
    
    setShowModal(false);
    setResult({});
    setCurrentReport(null);
  };

  const handleSubmitClick = (report, e) => { 
    e && e.stopPropagation();
    
    setCurrentReport(report);
    setResult({});  
    setShowModal(true);
  };
 
  const isReportCompleted = (status) => {
    return status === "completed" || status === "success";
  };
 
  const isResultValid = () => {
    if (!currentReport || Object.keys(result).length === 0) return false;
     
    if (currentReport.sampleType === "blood") {
      const requiredFields = ["sodium", "potassium", "calcium", "AST", "ALT"];
      return requiredFields.some(field => result[field] && result[field].trim() !== "");
    } else if (currentReport.sampleType === "stool") {
      const requiredFields = ["color", "consistency"];
      return requiredFields.some(field => result[field] && result[field].trim() !== "");
    }
    
    return Object.keys(result).length > 0;
  };

  return (
    <>
      <div className="flex min-h-screen">
        <Aside />

        <div className="flex-1 p-8 mx-60">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl md:text-3xl font-semibold text-yellow-600 mb-4">
              All Lab Reports
            </h2>
          </div>

          {labReports && labReports.length > 0 ? (
            <ul className="space-y-6">
              {labReports.map((labReport, index) =>
                labReport.lab && labReport.lab.map((report, index2) => (
                  <li
                    key={`${report._id || index}-${index2}`}
                    className="p-4 md:p-6 bg-white shadow-lg rounded-lg hover:shadow-2xl transition duration-300"
                  >
                    <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center">
                      <div className="mb-4 md:mb-0">
                        <h3 className="font-semibold text-lg text-teal-600">
                          Lab Report ID: {report._id}
                        </h3>
                        <h3 className="font-semibold text-lg text-teal-600">
                          Appointment ID: {report.appointment?.appointmentId || report.appointment}
                        </h3>
                        <h3 className="font-semibold text-lg">
                          Patient Name: {report.user?.name || 'N/A'}
                        </h3>
                        <h3 className="text-sm text-gray-500">{report.date}</h3>
                        <p className="font-semibold">
                          Sample Type: {report.sampleType}
                        </p>
                        <p className="flex items-center">
                          Charge: Rs.{" "}
                          <span className="font-bold text-red-500 ml-1">
                            {report.charge}
                          </span>
                        </p>
                        <p>
                          Status:{" "}
                          <span
                            className={`p-0.5 ml-2 rounded-md text-white ${
                              isReportCompleted(report.status)
                                ? "bg-green-500" 
                                : "bg-red-400"
                            }`}
                          >
                            {report.status}
                          </span>
                        </p>
                      </div>
                      
                      {!isReportCompleted(report.status) ? (
                        <button
                          onClick={(e) => handleSubmitClick(report, e)}
                          disabled={processingReportId === report._id}
                          className="px-6 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {processingReportId === report._id ? "Submitting..." : "Submit Result"}
                        </button>
                      ) : (
                        <button
                          onClick={(e) => print(report._id, e)}
                          className="px-6 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition duration-200"
                        >
                          Print Result
                        </button>
                      )}
                    </div>
                  </li>
                ))
              )}
            </ul>
          ) : (
            <p className="text-center text-gray-500">No lab reports found.</p>
          )}
        </div>
      </div>
 
      {showModal && currentReport && (
        <div 
          className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50 p-4 sm:p-6"
          onClick={(e) => e.stopPropagation()} 
        >
          <div 
            className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full overflow-auto max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}  
          >
            <h3 className="text-xl font-semibold mb-4">
              Submit Lab Report Result
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Lab Report ID: {currentReport._id} | 
              Patient: {currentReport.user?.name || 'N/A'} | 
              Sample: {currentReport.sampleType}
            </p>

            <LabReportForm 
              report={currentReport} 
              handleChange={handleChange}
              values={result}
            />

            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={(e) => handleModalClose(e)}
                disabled={processingReportId === currentReport._id}
                className="px-4 py-2 bg-red-400 text-white rounded-md hover:bg-red-500 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={(e) => handleSubmitResult(e)}
                disabled={processingReportId === currentReport._id || !isResultValid()}
                className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {processingReportId === currentReport._id ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LabReportsPage;