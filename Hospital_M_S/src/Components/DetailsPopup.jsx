import React, { useState } from 'react';

const DetailsPopup = ({ isOpen, onClose, details }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date'); // 'date' or 'doctor'

  if (!isOpen) return null;

  const hasDetails = Array.isArray(details) && details.length > 0;
  
  // Filter and sort details
  const filteredDetails = hasDetails 
    ? details
        .filter(item => item.response) // Only show items with responses
        .filter(item => {
          if (!searchTerm) return true;
          const searchLower = searchTerm.toLowerCase();
          return (
            (item.doctorname || '').toLowerCase().includes(searchLower) ||
            (item.problem || '').toLowerCase().includes(searchLower) ||
            (item.response || '').toLowerCase().includes(searchLower) ||
            (item.medicine || '').toLowerCase().includes(searchLower)
          );
        })
        .sort((a, b) => {
          if (sortBy === 'date') {
            return new Date(b.Date) - new Date(a.Date); // Most recent first
          } else {
            return (a.doctorname || '').localeCompare(b.doctorname || '');
          }
        })
    : [];

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return 'Invalid Date';
    }
  };

  const getInitials = (name) => {
    if (!name) return 'Dr';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] relative z-10 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">Medical History</h2>
            <p className="text-sm text-gray-600 mt-1">
              {filteredDetails.length} {filteredDetails.length === 1 ? 'record' : 'records'} found
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl font-light w-8 h-8 flex items-center justify-center"
          >
            ×
          </button>
        </div>

        {/* Search and Filter Controls */}
        <div className="p-6 border-b border-gray-100 bg-gray-50">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search by doctor, problem, treatment, or medicine..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
              />
            </div>
            <div className="sm:w-48">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
              >
                <option value="date">Sort by Date</option>
                <option value="doctor">Sort by Doctor</option>
              </select>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          {filteredDetails.length > 0 ? (
            <div className="h-full overflow-y-scroll p-6" style={{ maxHeight: 'calc(90vh - 200px)' }}>
              <div className="space-y-4">
                {filteredDetails.map((item, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    {/* Record Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                          <span className="text-teal-700 font-medium text-sm">
                            {getInitials(item.doctorname)}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">
                            {item.doctorname || 'Unknown Doctor'}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {formatDate(item.Date)}
                          </p>
                        </div>
                      </div>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Completed
                      </span>
                    </div>

                    {/* Record Content */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Problem
                          </label>
                          <p className="text-gray-900 bg-gray-50 p-3 rounded border text-sm">
                            {item.problem || 'No problem description available'}
                          </p>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Prescribed Medicine
                          </label>
                          <p className="text-gray-900 bg-blue-50 p-3 rounded border text-sm">
                            {item.medicine || 'No medicine prescribed'}
                          </p>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Doctor's Response
                        </label>
                        <p className="text-gray-900 bg-green-50 p-3 rounded border text-sm h-32 overflow-y-auto">
                          {item.response || 'No response available'}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full p-8">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Medical Records Found</h3>
              <p className="text-gray-500 text-center max-w-sm">
                {searchTerm 
                  ? `No records match your search for "${searchTerm}"`
                  : "This patient doesn't have any completed medical consultations yet."
                }
              </p>
            </div>
          )}
        </div>

    
      </div>
    </div>
  );
};

export default DetailsPopup;