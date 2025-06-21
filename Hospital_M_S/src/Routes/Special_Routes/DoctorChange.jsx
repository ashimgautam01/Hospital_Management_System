"use client";

import { useEffect, useState } from "react";
import { Plus, Trash } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Aside } from "../../Components/aside";
import Alert from "../../Components/Alert";

const DoctorChange = () => {
  const [doctors, setDoctors] = useState([]);
  const [newDoctor, setNewDoctor] = useState({
    name: "",
    doctorid: "",
    email: "",
    password: "",
    specialization: "",
    photo: null,
  });
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo") {
      setNewDoctor({ ...newDoctor, photo: files[0] });
    } else {
      setNewDoctor({ ...newDoctor, [name]: value });
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    Object.keys(newDoctor).forEach((key) => {
      formData.append(key, newDoctor[key]);
    });

    try {
      const response = await axios.post("http://localhost:8080/api/v1/doctor/register", formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (response.status === 200) {
        Alert('success', 'Registered successfully');
        setDoctors([...doctors, response.data.data]); 
      } else {
        Alert('error', 'Something went wrong');
      }
    } catch (error) {
      Alert('error', 'Registration failed');
    }
    finally{
      setShowRegisterModal(false);
      setNewDoctor({
        name: "",
        doctorid: "",
        email: "",
        password: "",
        specialization: "",
        photo: null,
      });
    }
  };

  const fetchDoctors = async () => {
    const response = await axios.get("http://localhost:8080/api/v1/doctor/getdoctors");
    setDoctors(response.data.data);
  };
  const handleDelete = async(id) => {
    try {
      
      const response=await axios.delete(`http://localhost:8080/api/v1/doctor/delete/${id}`)
      fetchDoctors();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  return (
    <div>
      <header className="fixed right-0 top-0 left-60 bg-purple-100 py-3 px-4 h-16">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <Link to="/" className="flex items-center text-gray-600 hover:text-yellow-600 font-semibold p-2 border border-transparent hover:border-yellow-300 transition">
                <span className="inline-flex items-center justify-center w-6 h-6 text-gray-600 text-xs rounded bg-white transition mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" className="bi bi-chevron-left" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
                  </svg>
                </span>
                <span className="text-sm">Home page</span>
              </Link>
            </div>
            <div className="text-lg font-bold font-serif">Doctors</div>
            <div>
              <button type="button" className="flex items-center focus:outline-none rounded-lg text-gray-600 hover:text-yellow-600 font-semibold p-2 border border-transparent hover:border-yellow-300 transition">
                <span className="text-sm">Book</span>
                <span className="inline-flex items-center justify-center w-6 h-6 text-gray-600 text-xs rounded bg-white transition ml-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <Aside />

      <div className="flex flex-col min-h-screen bg-gradient-to-r from-teal-400 to-indigo-500 py-20">
        {showRegisterModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
              <h2 className="text-2xl font-bold mb-4 text-center text-red-950 font-serif">Register New Doctor</h2>
              <form onSubmit={handleRegister}>
                <label className="font-bold mb-2 block">Doctor Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={newDoctor.name}
                  onChange={handleInputChange}
                  placeholder="Name"
                  className="border p-2 mb-4 w-full"
                  required
                />

                <label className="font-bold mb-2 block">Photo With Clear Face</label>
                <input
                  type="file"
                  name="photo"
                  onChange={handleInputChange}
                  className="border p-2 mb-4 w-full"
                  required
                />


                <label className="font-bold mb-2 block">Doctor Specialization</label>
                <input
                  type="text"
                  name="specialization"
                  value={newDoctor.specialization}
                  onChange={handleInputChange}
                  placeholder="Specialization"
                  className="border p-2 mb-4 w-full"
                  required
                />

                <label className="font-bold mb-2 block">Doctor Email</label>
                <input
                  type="email"
                  name="email"
                  value={newDoctor.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  className="border p-2 mb-4 w-full"
                  required
                />

                <div className="flex justify-end">
                  <button
                    type="button"
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2"
                    onClick={() => setShowRegisterModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-teal-600 text-white px-4 py-2 rounded"
                  >
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="flex-grow bg-white rounded-lg shadow-lg overflow-hidden mt-4 ml-64 mr-4">
          <div className="flex items-center justify-between p-4 bg-teal-600 text-white rounded-t-lg shadow-md">
            <h2 className="text-2xl font-bold">Doctors List</h2>
            <button
              onClick={() => setShowRegisterModal(true)}
              className="text-white hover:bg-teal-500 transition-colors p-2 rounded flex items-center shadow-sm"
            >
              <Plus className="w-5 h-5 mr-1" />
              Register Doctor
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-gray-700">
              <thead>
                <tr className="bg-purple-400">
                  <th className="p-4">S.N.</th>
                  <th className="p-4">Doctor ID</th>
                  <th className="p-4">Photo</th>
                  <th className="p-4">Name</th>
                  <th className="p-4">Specialization</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {doctors.map((doctor, index) => (
                  <tr key={doctor.id} className="border-b border-gray-300 transition-transform duration-200 transform hover:bg-teal-100">
                    <td className="p-4">{index + 1}</td>
                    <td className="p-4">{doctor.doctorid}</td>
                    <td className="p-4">
                      <img src={doctor.photo} alt={doctor.name} className="w-12 h-12 rounded-full" />
                    </td>
                    <td className="p-4">{doctor.name}</td>
                    <td className="p-4">{doctor.specialization}</td>
                    <td className="p-4">{doctor.email}</td>
                    <td className="p-4">
                      <button
                        onClick={() => handleDelete(doctor._id)}
                        className="text-red-600 hover:text-red-500 transition-colors transform hover:scale-105"
                      >
                        <Trash className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorChange;
