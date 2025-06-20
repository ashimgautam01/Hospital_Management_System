import React, { useState, useEffect } from "react";

const MedicineSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [medicines, setMedicines] = useState([]);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [showRecommendations, setShowRecommendations] = useState(false);

  useEffect(() => {
    const fetchMedicines = async () => {
      if (searchTerm.length > 0) {
        try {
          const response = await fetch(
            `https://api.fda.gov/drug/label.json?search=openfda.brand_name:${searchTerm}*&limit=5`
          );
          const data = await response.json();
          setMedicines(data.results || []);
          setShowRecommendations(true);
        } catch (error) {
          console.error("Error fetching data:", error);
          setMedicines([]);
          setShowRecommendations(false);
        }
      } else {
        setMedicines([]);
        setShowRecommendations(false);
      }
    };

    const debounce = setTimeout(() => {
      fetchMedicines();
    }, 300);

    return () => clearTimeout(debounce);
  }, [searchTerm]);

  const handleMedicineClick = (medicine) => {
    setSelectedMedicine(medicine);
    setShowRecommendations(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-emerald-50 to-green-100 mt-20">
 
      <div className="bg-gradient-to-r from-teal-600 to-emerald-600 shadow-lg">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <h1 className="text-4xl font-bold text-white text-center mb-2">🏥 Medicine Search</h1>
          <p className="text-teal-100 text-center text-lg">
            Find detailed information about medicines and medications
          </p>
        </div>
      </div>
 
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-8 max-w-2xl mx-auto space-y-6">
     
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for a medicine..."
              className="w-full pl-12 pr-4 py-4 text-lg border-2 border-teal-200 rounded-2xl 
                        focus:outline-none focus:ring-4 focus:ring-teal-300 focus:border-teal-500 
                        bg-white shadow-lg transition-all duration-300 hover:shadow-xl"
            />
          </div>
 
          {showRecommendations && medicines.length > 0 && (
            <div className="bg-white rounded-3xl shadow-xl border border-teal-100 overflow-hidden">
              <div className="bg-gradient-to-r from-teal-500 to-emerald-500 px-6 py-4 rounded-t-3xl">
                <h2 className="text-2xl font-bold text-white flex items-center">💊 Recommendations</h2>
              </div>
              <div className="p-6 space-y-3">
                {medicines.map((medicine, index) => (
                  <div
                    key={index}
                    onClick={() => handleMedicineClick(medicine)}
                    className="cursor-pointer p-4 rounded-xl bg-gradient-to-r from-teal-50 to-emerald-50 
                              border border-teal-100 hover:from-teal-100 hover:to-emerald-100 
                              hover:border-teal-300 transition-all duration-300 hover:shadow-md
                              transform hover:scale-105"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-gradient-to-r from-teal-400 to-emerald-400 rounded-full"></div>
                      <span className="text-teal-800 font-medium text-lg">
                        {medicine.openfda?.brand_name?.[0] || "No name available"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
 
        {selectedMedicine && (
          <div className="bg-white rounded-3xl shadow-xl border border-emerald-100 overflow-hidden mt-10">
            <div className="bg-gradient-to-r from-emerald-600 to-green-600 px-6 py-4">
              <h2 className="text-2xl font-bold text-white flex items-center">📋 Medicine Details</h2>
            </div>
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
                <div className="space-y-4">
                  <InfoCard title="Medicine Name" content={selectedMedicine.openfda?.brand_name?.[0]} />
                  <InfoCard title="Manufacturer" content={selectedMedicine.openfda?.manufacturer_name?.[0]} />
                  <InfoCard title="Drug Class" content={selectedMedicine.openfda?.substance_name?.join(", ")} />
                </div>
 
                <div className="space-y-4">
                  <InfoCard title="Active Ingredients" content={
                    selectedMedicine.active_ingredients?.map((ing, i) => `${ing.name}${i < selectedMedicine.active_ingredients.length - 1 ? ", " : ""}`) || []
                  } />
                  <InfoCard title="Side Effects" content={selectedMedicine.warnings_and_cautions?.[0]} />
                </div>
              </div>
 
              <div className="mt-6 space-y-4">
                <InfoCard title="Purpose" content={selectedMedicine.indications_and_usage?.[0]} />
                <div className="bg-gradient-to-r from-teal-50 to-emerald-50 p-6 rounded-xl border border-teal-100">
                  <h3 className="text-teal-700 font-semibold text-sm uppercase tracking-wide mb-3">Indications and Usage</h3>
                  <div className="text-gray-800 leading-relaxed">
                    {selectedMedicine.indications_and_usage?.[0]?.length > 200 ? (
                      <>
                        <p>{selectedMedicine.indications_and_usage[0].slice(0, 200)}...</p>
                        <button
                          onClick={() => alert(selectedMedicine.indications_and_usage[0])}
                          className="mt-3 inline-flex items-center px-4 py-2 bg-gradient-to-r from-teal-500 to-emerald-500 
                                    text-white font-medium rounded-lg hover:from-teal-600 hover:to-emerald-600 
                                    transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                        >
                          Read more
                          <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </>
                    ) : (
                      <p>{selectedMedicine.indications_and_usage?.[0] || "No information available"}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
 
        {!showRecommendations && !selectedMedicine && (
          <div className="text-center py-16">
            <div className="bg-white rounded-3xl shadow-xl border border-teal-100 p-12 max-w-2xl mx-auto">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-teal-700 mb-2">Start Your Search</h3>
              <p className="text-teal-600 text-lg">
                Enter a medicine name above to find detailed information and recommendations
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const InfoCard = ({ title, content }) => (
  <div className="bg-gradient-to-r from-teal-50 to-emerald-50 p-4 rounded-xl border border-teal-100">
    <h3 className="text-teal-700 font-semibold text-sm uppercase tracking-wide mb-2">{title}</h3>
    <p className="text-gray-800">{content || "No information available"}</p>
  </div>
);

export default MedicineSearch;
