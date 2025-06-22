  import React from "react";
  import { Aside } from "../../Components/aside";

  const staffs = [
    { name: "John Smith", role: "Nurse" },
    { name: "Sarah Johnson", role: "Administrator" },
    { name: "Mike Wilson", role: "Technician" }
  ];

  const doctors = [
    { name: "Dr. Emily Brown", specialization: "Cardiology" },
    { name: "Dr. David Lee", specialization: "Pediatrics" },
    { name: "Dr. Maria Garcia", specialization: "Surgery" }
  ];

  const Staff = () => {
    return (
      <div className="relative bg-gray-50 overflow-hidden max-h-screen">
        <Aside />

        <main className=" max-h-screen overflow-auto">
          <div className="px-6 py-8">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white shadow rounded-md p-8 border border-gray-200">
                <h1 className="text-3xl font-semibold text-gray-800 mb-10">
                  City Hospital:{" "}
                  <span className="text-teal-700">Together for a Healthier Community</span>
                </h1>

                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center">
                    <div className="text-gray-500 text-sm mr-4">Let’s get connected</div>
                    <div className="flex -space-x-2">
                      <img className="h-8 w-8 rounded-full object-cover ring-1 ring-gray-300" src="https://ui-avatars.com/api/?background=cbd5e1&color=334155&name=User+1" />
                      <img className="h-8 w-8 rounded-full object-cover ring-1 ring-gray-300" src="https://ui-avatars.com/api/?background=a7f3d0&color=064e3b&name=User+2" />
                    </div>
                  </div>
                  <div className="flex items-center gap-x-2">
                    <button className="inline-flex items-center justify-center h-9 px-4 rounded border border-teal-500 text-teal-600 hover:bg-teal-50 transition">
                      <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-chat-fill mr-1" fill="currentColor" viewBox="0 0 16 16" width="16" height="16">
                        <path d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9.06 9.06 0 0 0 8 15z" />
                      </svg>
                      Chat
                    </button>
                    <button className="inline-flex items-center justify-center h-9 px-5 rounded bg-teal-600 text-white hover:bg-teal-700 text-sm font-medium transition">
                      Open
                    </button>
                  </div>
                </div>

                <hr className="my-6 border-gray-200" />

                <div className="grid grid-cols-2 gap-8"> 
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">Staff</h2>
                    <div className="bg-gray-100 p-4 rounded border border-gray-200">
                      <h3 className="text-lg font-medium text-teal-700 mb-3">Staff Members</h3>
                      <div className="space-y-2">
                        {staffs.map((staff, index) => (
                          <div key={index} className="flex justify-between items-center bg-white p-2 rounded border border-gray-200">
                            <span className="text-gray-700">{staff.name}</span>
                            <span className="text-green-700 text-sm">{staff.role}</span>
                          </div>
                        ))}
                      </div>
                      <button className="mt-3 text-sm text-teal-600 hover:underline">See more</button>
                    </div>
                  </div>
  
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">Doctors</h2>
                    <div className="bg-gray-100 p-4 rounded border border-gray-200">
                      <h3 className="text-lg font-medium text-teal-700 mb-3">Doctor Members</h3>
                      <div className="space-y-2">
                        {doctors.map((doctor, index) => (
                          <div key={index} className="flex justify-between items-center bg-white p-2 rounded border border-gray-200">
                            <span className="text-gray-700">{doctor.name}</span>
                            <span className="text-green-700 text-sm">{doctor.specialization}</span>
                          </div>
                        ))}
                      </div>
                      <button className="mt-3 text-sm text-teal-600 hover:underline">See more</button>
                    </div>
                  </div>

                  {/* Appointments */}
                  <div className="col-span-2">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">Appointments</h2>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-white p-4 border border-gray-200 rounded shadow-sm">
                        <div className="flex justify-between text-xs text-gray-500 mb-2">
                          <span>Number 10</span>
                          <span>4h ago</span>
                        </div>
                        <div className="font-semibold text-gray-800 mb-1">Blog and social posts</div>
                        <div className="text-sm text-green-600 flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0z" />
                          </svg>
                          Deadline is today
                        </div>
                      </div>

                      <div className="bg-white p-4 border border-gray-200 rounded shadow-sm">
                        <div className="flex justify-between text-xs text-gray-500 mb-2">
                          <span>Grace Aroma</span>
                          <span>7d ago</span>
                        </div>
                        <div className="font-semibold text-gray-800 mb-1">New campaign review</div>
                        <div className="text-sm text-teal-600 flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0z" />
                          </svg>
                          New feedback
                        </div>
                      </div>

                      <div className="bg-white p-4 border border-gray-200 rounded shadow-sm">
                        <div className="flex justify-between text-xs text-gray-500 mb-2">
                          <span>Petz App</span>
                          <span>2h ago</span>
                        </div>
                        <div className="font-semibold text-gray-800">Cross-platform QA</div>
                      </div>
                    </div>
                    <button className="mt-4 text-sm text-teal-600 hover:underline">See more</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  };

  export default Staff;
