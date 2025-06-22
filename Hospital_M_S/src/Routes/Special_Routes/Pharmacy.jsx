import { useState } from "react";
import axios from "axios";
import Alert from "../../Components/Alert";
import { Aside } from "../../Components/aside";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  return date.toLocaleDateString('en-GB', options);
};

const Pharmacy = () => {
  const [appointmentId, setAppointmentId] = useState("");
  const [appointmentData, setAppointmentData] = useState(null);
  const [medicines, setMedicines] = useState([]);
  const [billAmount, setBillAmount] = useState(0);
  const [labCharges, setLabCharges] = useState(0);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/appoint/pharmacy/${appointmentId}`);
      const data = response.data.data;
      
      setAppointmentData(data);
      setLabCharges(data.labCharges || 0);
      setMedicines([]);
      
      // Calculate initial bill with lab charges only
      setBillAmount(data.labCharges || 0);
    } catch (error) {
      Alert('error', 'Appointment not found or an error occurred');
      setAppointmentData(null);
      setLabCharges(0);
      setBillAmount(0);
    }
  };

  const addMedicine = () => {
    setMedicines([...medicines, { name: '', quantity: 0, price: 0 }]);
  };

  const handleMedicineChange = (index, field, value) => {
    const updatedMedicines = [...medicines];
    if (field === "quantity") {
      updatedMedicines[index][field] = parseInt(value) || 0; 
    } else if (field === "price") {
      updatedMedicines[index][field] = parseFloat(value) || 0; 
    } else {
      updatedMedicines[index][field] = value; 
    }
    setMedicines(updatedMedicines);
    calculateBill(updatedMedicines);
  };

  const calculateBill = (medicines) => {
    const medicineTotal = medicines.reduce((sum, medicine) => sum + (medicine.price || 0) * (medicine.quantity || 0), 0);
    const total = medicineTotal + labCharges;
    setBillAmount(total);
  };

  const handlePrintBill = () => {
    const medicineTotal = medicines.reduce((sum, medicine) => sum + (medicine.price || 0) * (medicine.quantity || 0), 0);
    
    const win = window.open("");
    win.document.write(`
      <html>
      <head>
        <title>Print Bill</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          .header { text-align: center; margin-bottom: 20px; }
          .table { width: 100%; border-collapse: collapse; margin: 20px 0; }
          .table th, .table td { border: 1px solid #333; padding: 8px; text-align: left; }
          .table th { background-color: #4CAF50; color: white; }
          .section-title { font-weight: bold; font-size: 1.1em; margin: 20px 0 10px 0; color: #333; }
          .total-row { font-weight: bold; background-color: #f0f0f0; }
          .grand-total { font-weight: bold; font-size: 1.3em; margin: 20px 0; text-align: right; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>City Hospital</h1>
          <h2>Pokhara, Nepal</h2>
          <p>Phone: +977-9864452384</p>
          <hr />
          <h2>Bill Receipt</h2>
        </div>
        <p><strong>Patient Name:</strong> ${appointmentData.name}</p>
        <p><strong>Problem:</strong> ${appointmentData.problem}</p>
        <p><strong>Date:</strong> ${formatDate(appointmentData.date)}</p>
        <p><strong>Doctor:</strong> ${appointmentData.doctorName}</p>
        <p><strong>Prescribed Medicines:</strong> ${appointmentData.medicine || 'N/A'}</p>
        
        ${medicines.length > 0 ? `
        <div class="section-title">Medicine Bill</div>
        <table class="table">
          <thead>
            <tr>
              <th>Medicine Name</th>
              <th>Quantity</th>
              <th>Unit Price (Rs.)</th>
              <th>Total (Rs.)</th>
            </tr>
          </thead>
          <tbody>
            ${medicines.map(medicine => `
              <tr>
                <td>${medicine.name}</td>
                <td>${medicine.quantity}</td>
                <td>${medicine.price.toFixed(2)}</td>
                <td>${(medicine.price * medicine.quantity).toFixed(2)}</td>
              </tr>
            `).join('')}
            <tr class="total-row">
              <td colspan="3"><strong>Medicine Subtotal:</strong></td>
              <td><strong>Rs.${medicineTotal.toFixed(2)}</strong></td>
            </tr>
          </tbody>
        </table>
        ` : ''}
        
        ${appointmentData.labTests && appointmentData.labTests.length > 0 ? `
        <div class="section-title">Lab Test Charges</div>
        <table class="table">
          <thead>
            <tr>
              <th>Test Type</th>
              <th>Description</th>
              <th>Charge (Rs.)</th>
            </tr>
          </thead>
          <tbody>
            ${appointmentData.labTests.map(test => `
              <tr>
                <td>${test.sampleType}</td>
                <td>${test.Additional || '-'}</td>
                <td>${test.charge.toFixed(2)}</td>
              </tr>
            `).join('')}
            <tr class="total-row">
              <td colspan="2"><strong>Lab Tests Subtotal:</strong></td>
              <td><strong>Rs.${labCharges.toFixed(2)}</strong></td>
            </tr>
          </tbody>
        </table>
        ` : ''}
        
        <div class="grand-total">
          <strong>TOTAL AMOUNT: Rs.${billAmount.toFixed(2)}</strong>
        </div>
        <hr />
        <p style="text-align: center;">Thank you for visiting City Hospital!</p>
      </body>
      </html>
    `);
    win.document.close();
    win.print();
    window.location.reload();
  };

  return (
    <div className="flex min-h-screen">
      <Aside />
      <div className="flex-1 p-8 bg-gradient-to-r from-green-400 to-blue-500 mx-60 mr-0">
        <h1 className="text-4xl font-bold mb-6 text-white text-center">Pharmacy Management</h1>

        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Search Appointment by ID</h2>
          <input
            type="text"
            id="appointmentId"
            name="appointmentId"
            value={appointmentId}
            onChange={(e) => setAppointmentId(e.target.value)}
            placeholder="Enter Appointment ID"
            className="border p-2 mb-4 w-full rounded shadow focus:border-green-500 focus:ring focus:ring-green-200 transition"
          />
          <button
            onClick={handleSearch}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500 transition"
          >
            Search
          </button>
        </div>

        {appointmentData && (
          <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Appointment Details</h2>
            <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
              <p><strong>Patient Name:</strong> {appointmentData.name}</p>
              <p><strong>Problem:</strong> {appointmentData.problem}</p>
              <p><strong>Date:</strong> {formatDate(appointmentData.date)}</p>
              <p><strong>Doctor:</strong> {appointmentData.doctorName}</p>
              <p className="col-span-2"><strong>Prescribed Medicines:</strong> {appointmentData.medicine || 'N/A'}</p>
            </div>

            {/* Lab Tests Section */}
            {appointmentData.labTests && appointmentData.labTests.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3 text-gray-800">Lab Test Charges</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden">
                    <thead>
                      <tr className="bg-blue-100">
                        <th className="border border-gray-300 p-3 text-left">Test Type</th>
                        <th className="border border-gray-300 p-3 text-left">Description</th>
                        <th className="border border-gray-300 p-3 text-right">Charge</th>
                      </tr>
                    </thead>
                    <tbody>
                      {appointmentData.labTests.map((test, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="border border-gray-300 p-3">{test.sampleType}</td>
                          <td className="border border-gray-300 p-3">{test.Additional || '-'}</td>
                          <td className="border border-gray-300 p-3 text-right font-medium">Rs.{test.charge.toFixed(2)}</td>
                        </tr>
                      ))}
                      <tr className="bg-blue-50 font-semibold">
                        <td className="border border-gray-300 p-3" colSpan="2">Lab Tests Subtotal:</td>
                        <td className="border border-gray-300 p-3 text-right">Rs.{labCharges.toFixed(2)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Medicine Section */}
            <h3 className="text-lg font-semibold mt-4">Medicine Bill</h3>
            <table className="min-w-full mt-2 border-collapse border border-red-300">
              <thead>
                <tr className="bg-purple-200">
                  <th className="border border-gray-300 p-2">Medicine Name</th>
                  <th className="border border-gray-300 p-2">Quantity</th>
                  <th className="border border-gray-300 p-2">Unit Price</th>
                  <th className="border border-gray-300 p-2">Total</th>
                </tr>
              </thead>
              <tbody>
                {medicines.map((medicine, index) => (
                  <tr key={index} className="hover:bg-red-100">
                    <td className="border border-gray-300 p-2">
                      <input
                        type="text"
                        placeholder="Medicine Name"
                        value={medicine.name}
                        onChange={(e) => handleMedicineChange(index, "name", e.target.value)}
                        className="border p-1 rounded w-full focus:border-green-500 focus:ring focus:ring-green-200 transition"
                      />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <input
                        type="number"
                        placeholder="Quantity"
                        value={medicine.quantity || ''}
                        onChange={(e) => handleMedicineChange(index, "quantity", e.target.value)}
                        className="border p-1 rounded w-full focus:border-green-500 focus:ring focus:ring-green-200 transition"
                      />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <input
                        type="number"
                        step="0.01"
                        placeholder="Price"
                        value={medicine.price || ''}
                        onChange={(e) => handleMedicineChange(index, "price", e.target.value)}
                        className="border p-1 rounded w-full focus:border-green-500 focus:ring focus:ring-green-200 transition"
                      />
                    </td>
                    <td className="border border-gray-300 p-2 text-right font-medium">
                      Rs.{((medicine.price || 0) * (medicine.quantity || 0)).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            <button onClick={addMedicine} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500 transition mb-4 mt-4">
              Add Medicine
            </button>

            {/* Bill Summary */}
            <div className="bg-gray-50 p-4 rounded-lg mt-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Medicine Total:</span>
                  <span className="font-medium">Rs.{(billAmount - labCharges).toFixed(2)}</span>
                </div>
                {labCharges > 0 && (
                  <div className="flex justify-between">
                    <span>Lab Test Total:</span>
                    <span className="font-medium">Rs.{labCharges.toFixed(2)}</span>
                  </div>
                )}
                <hr className="my-2" />
                <div className="flex justify-between text-xl font-bold text-green-600">
                  <span>TOTAL BILL:</span>
                  <span>Rs.{billAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <button
              onClick={handlePrintBill}
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500 transition w-full"
            >
              Print Bill
            </button>
            
          </div>
        )}

        {appointmentData && (
          <div id="bill" className="hidden"></div>
        )}
      </div>
    </div>
  );
};

export default Pharmacy;