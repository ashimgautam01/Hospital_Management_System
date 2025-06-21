import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import DetailsPopup from '../../Components/DetailsPopup';

const Patient_info = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, SetUser] = useState([]);
    const [patient, setPatient] = useState(null);
    const [history, setHistory] = useState('');
    const [popupIsOpen, setPopupIsOpen] = useState(false);
    const [response, setResponse] = useState('');
    const [medicine, setMedicine] = useState('');

    useEffect(() => {
        const fetchPatientDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/v1/appoint/getuser/${id}`);
                if (response.status === 200) {
                    SetUser(response.data.data.user);
                    setPatient(response.data.data.patient);  
                }
            } catch (error) {
                console.error('Error fetching patient details', error);
            }
        };

        fetchPatientDetails();
    }, [id]);

    const handleResponse = async () => {
        try {
            await axios.post(`http://localhost:8080/api/v1/users/update`, {
                id: patient.user,
                response,
                medicine,
                problem: patient.problem
            }, { withCredentials: true });
    
            await axios.post(`http://localhost:8080/api/v1/appoint/update`, {
                id: patient._id,
                medicine,
            }, { withCredentials: true });
    
            await axios.post(`http://localhost:8080/api/v1/appoint/checked/${patient._id}`, {
                doctorId: null
            }, { withCredentials: true });
    
            setResponse('');
            setMedicine('');
    
            alert('Response submitted successfully');
            navigate('/doctorpage');
        } catch (error) {
            console.error('Error submitting response', error);
            alert('Failed to submit response. Please try again.');
        }
    };
    
    const openPopup = async (userId) => {
        const response = await axios.get(`http://localhost:8080/api/v1/users/gethistory/${userId}`);
        setHistory(response.data.data.user);
        setPopupIsOpen(true);
    };

    const closePopup = () => {
        setPopupIsOpen(false);
        setHistory(null);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-semibold text-gray-800 mb-8 text-center">Patient Details</h1>

                {patient ? (
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                     
                        <div className="flex flex-col md:flex-row items-center md:items-start mb-8 pb-6 border-b border-gray-100">
                            <img
                                src={user.profile}
                                alt={patient.name}
                                className="w-24 h-24 rounded-full border-2 border-teal-500 mb-4 md:mb-0 md:mr-6"
                            />
                            <div className="text-center md:text-left">
                                <h2 className="text-2xl font-medium text-gray-800 mb-2">{patient.name}</h2>
                                <p className="text-gray-600">{patient.email}</p>
                                <p className="text-gray-600">{patient.phone}</p>
                            </div>
                            <div className="md:ml-auto mt-4 md:mt-0">
                                <button 
                                    onClick={() => openPopup(patient.user)}
                                    className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 transition-colors"
                                >
                                    Medical History
                                </button>
                            </div>
                        </div>
 
                        <div className="mb-8">
                            <h3 className="text-lg font-medium text-gray-800 mb-4">Appointment Details</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Doctor</label>
                                    <p className="text-gray-900">{patient.doctorName}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                                    <p className="text-gray-900">{patient.date}</p>
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Problem Description</label>
                                    <p className="text-gray-900 bg-gray-50 p-3 rounded border">{patient.problem}</p>
                                </div>
                            </div>
                        </div>
 
                        <div className="border-t border-gray-100 pt-8">
                            <h3 className="text-lg font-medium text-gray-800 mb-6">Medical Response</h3>
                            
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Response to Patient
                                    </label>
                                    <textarea
                                        value={response}
                                        onChange={(e) => setResponse(e.target.value)}
                                        placeholder="Enter your medical response and recommendations..."
                                        className="w-full border border-gray-300 rounded p-3 h-32 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Prescribed Medicine
                                    </label>
                                    <input
                                        type="text"
                                        value={medicine}
                                        onChange={(e) => setMedicine(e.target.value)}
                                        placeholder="Enter prescribed medications..."
                                        className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                                    />
                                </div>
                                
                                <button
                                    onClick={handleResponse}
                                    className="w-full md:w-auto px-8 py-3 bg-green-600 text-white font-medium rounded hover:bg-green-700 transition-colors"
                                >
                                    Submit Response
                                </button>
                            </div>
                        </div>

                        <DetailsPopup
                            isOpen={popupIsOpen}
                            onClose={closePopup}
                            details={history}
                        />
                    </div>
                ) : (
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                        <div className="flex items-center justify-center space-x-3">
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-teal-600"></div>
                            <p className="text-lg text-gray-600">Loading patient details...</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Patient_info;