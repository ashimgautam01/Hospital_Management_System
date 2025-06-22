import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';  
import Alert from '../../Components/Alert';
import { Aside } from '../../Components/aside';
import axios from 'axios';

const sampleTypes = ['Blood', 'Stool', 'Urine', 'Saliva', 'Tissue'];
 
const sampleCharges = {
  blood: 500,
  stool: 350,
  urine: 300,
  saliva: 400,
  tissue: 1200
};

const Lab = () => {
  const [appointmentId, setAppointmentId] = useState('');
  const [appointmentFound, setAppointmentFound] = useState(false);
  const [labRequests, setLabRequests] = useState([]);
  const [alert, setAlert] = useState({ show: false, type: '', message: '' });
  
  const [newLabRequest, setNewLabRequest] = useState({
    sampleType: '',
    charge: '',
    Additional: ''
  });
  
  const navigate = useNavigate();

  const showAlert = (type, message) => {
    setAlert({ show: true, type, message }); 
    setTimeout(() => setAlert({ show: false, type: '', message: '' }), 3000);
  };

  const handleAppointmentSearch = (e) => {
    e.preventDefault();

    if (appointmentId.trim() !== '') {
      setAppointmentFound(true);
      showAlert(
        "success",
        `Appointment ${appointmentId} has been located.`
      );
    } else {
      setAppointmentFound(false);
      showAlert(
        "error",
        "Please enter a valid appointment ID."
      );
    }
  };

  const handleLabReportSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:8080/api/v1/lab/request/${appointmentId}`, 
        newLabRequest,
        { withCredentials: true }
      );
      
      if (response.status === 200) {
        showAlert(
          "success",
          "The lab report has been successfully requested."
        );
      }
      
      setNewLabRequest({
        sampleType: '',
        charge: '',
        Additional: ''
      });
    } catch (error) {
      console.error("Error submitting lab report:", error);
      showAlert(
        "error",
        "Failed to request lab report."
      );
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'sampleType') { 
      const autoCharge = sampleCharges[value] || '';
      
      setNewLabRequest({
        ...newLabRequest,
        [name]: value,
        charge: autoCharge
      });
    } else { 
      setNewLabRequest({
        ...newLabRequest,
        [name]: value
      });
    }
  };

  const goToAllReportsPage = () => {
    navigate('/staff/lab-reports', { state: { labRequests } });
  };

  const handleAlertClose = () => {
    setAlert({ show: false, type: '', message: '' });
  };

  return (
    <>
      {alert.show && (
        <Alert 
          type={alert.type}
          message={alert.message}
          onClose={handleAlertClose}
        />
      )}
      <div className="flex min-h-screen mx-60">
        <Aside />
        <div className="container mx-auto p-6 space-y-8">
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={goToAllReportsPage}
              className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300"
            >
              View All Reports
            </button>
          </div>

          <div className="bg-white shadow-lg rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-green-600 mb-2">Lab Report Request</h2>
            <p className="text-sm text-gray-600 mb-4">Search for an appointment and request a lab report</p>

            <form onSubmit={handleAppointmentSearch} className="space-y-4">
              <div className="flex items-end space-x-2">
                <div className="flex-1">
                  <label htmlFor="appointmentId" className="block text-sm font-medium text-gray-700">Appointment ID</label>
                  <input
                    id="appointmentId"
                    type="text"
                    value={appointmentId}
                    onChange={(e) => setAppointmentId(e.target.value)}
                    placeholder="Enter appointment ID"
                    className="mt-1 p-3 border-2 border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200 ease-in-out"
                    required
                  />
                </div>
                <button type="submit" className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300">
                  Search
                </button>
              </div>
            </form>
          </div>

          {appointmentFound && (
            <div className="bg-white shadow-lg rounded-xl p-6">
              <h2 className="text-2xl font-semibold text-green-600 mb-2">Add Lab Report</h2>
              <p className="text-sm text-gray-600 mb-4">Enter lab report details for Appointment {appointmentId}</p>

              <form onSubmit={handleLabReportSubmit} className="space-y-6">
                <div>
                  <label htmlFor="sampleType" className="block text-sm font-medium text-gray-700">Sample Type</label>
                  <select
                    id="sampleType"
                    name="sampleType"
                    value={newLabRequest.sampleType}
                    onChange={handleChange}
                    className="mt-1 p-3 border-2 border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200 ease-in-out"
                    required
                  >
                    <option value="">Select sample type</option>
                    {sampleTypes.map((type) => (
                      <option key={type} value={type.toLowerCase()}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="charge" className="block text-sm font-medium text-gray-700">Charge</label>
                  <input
                    id="charge"
                    name="charge"
                    type="number"
                    value={newLabRequest.charge}
                    disabled
                    placeholder="Enter charge amount"
                    className="mt-1 p-3 border-2 border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200 ease-in-out"
                    required
                  />
                  {newLabRequest.sampleType && (
                    <p className="mt-1 text-sm text-gray-500">
                      Standard charge for {newLabRequest.sampleType} samples
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="Additional" className="block text-sm font-medium text-gray-700">Additional Details</label>
                  <input
                    id="Additional"
                    name="Additional"
                    type="text"
                    value={newLabRequest.Additional}
                    onChange={handleChange}
                    placeholder="Enter any additional details"
                    className="mt-1 p-3 border-2 border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200 ease-in-out"
                  />
                </div>

                <button type="submit" className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300">
                  Submit Lab Report Request
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Lab;