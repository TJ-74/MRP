import React, { useState } from 'react';
import { Card, CardContent } from '../components/ui/card.tsx';
import { Button } from '../components/ui/button.tsx';
import { Search } from 'lucide-react';
import Navbar from "./NavBar.tsx";

// Types for our data
interface Hospital {
  id: number;
  name: string;
  price: number;
  address: string;
  contactNumber: string;
}

interface SearchFormData {
  insurancePlan: string;
  procedure: string;
}

const HealthcareSearch = () => {
  // Sample data for dropdowns
  const insurancePlans = [
    'Blue Cross Blue Shield',
    'Aetna',
    'UnitedHealthcare',
    'Cigna',
    'Medicare'
  ];

  const procedures = [
    'MRI Scan',
    'CT Scan',
    'Physical Therapy',
    'Colonoscopy',
    'Annual Check-up'
  ];

  // State management
  const [formData, setFormData] = useState<SearchFormData>({
    insurancePlan: '',
    procedure: ''
  });

  const [searchResults, setSearchResults] = useState<Hospital[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Mock search function - in real app, this would call an API
  const handleSearch = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      const mockResults: Hospital[] = [
        {
          id: 1,
          name: 'General Hospital',
          price: 1200,
          address: '123 Healthcare Ave, Medical City, MC 12345',
          contactNumber: '(555) 123-4567'
        },
        {
          id: 2,
          name: 'Community Medical Center',
          price: 950,
          address: '456 Wellness Blvd, Healing Town, HT 67890',
          contactNumber: '(555) 987-6543'
        }
      ];
      setSearchResults(mockResults);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-900">
       <Navbar />
      <div className="max-w-4xl mx-auto p-4 py-12">
        {/* Search Form */}
        <Card className="mb-6 shadow-lg bg-gray-800 border-gray-700">
          <CardContent className="pt-6 space-y-6">
            <h1 className="text-2xl font-bold text-white mb-4">Find Healthcare Services</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="mb-2 text-sm font-medium text-gray-300">Insurance Plan</label>
                <select
                  className="p-2.5 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  value={formData.insurancePlan}
                  onChange={(e) => setFormData({
                    ...formData,
                    insurancePlan: e.target.value
                  })}
                >
                  <option value="">Select Insurance Plan</option>
                  {insurancePlans.map((plan) => (
                    <option key={plan} value={plan}>{plan}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col">
                <label className="mb-2 text-sm font-medium text-gray-300">Procedure</label>
                <select
                  className="p-2.5 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  value={formData.procedure}
                  onChange={(e) => setFormData({
                    ...formData,
                    procedure: e.target.value
                  })}
                >
                  <option value="">Select Procedure</option>
                  {procedures.map((proc) => (
                    <option key={proc} value={proc}>{proc}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <Button 
                onClick={handleSearch}
                disabled={!formData.insurancePlan || !formData.procedure || isLoading}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 transition-colors px-6 py-2.5 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Search size={18} />
                {isLoading ? 'Searching...' : 'Search'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Section */}
        {searchResults.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Search Results</h2>
            {searchResults.map((hospital) => (
              <Card key={hospital.id} className="w-full bg-gray-800 border-gray-700 hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold text-white">{hospital.name}</h3>
                      <p className="text-gray-400">{hospital.address}</p>
                      <p className="text-gray-400 flex items-center gap-2">
                        <span className="font-medium text-gray-300">Contact:</span> {hospital.contactNumber}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-green-400">
                        ${hospital.price.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-400 mt-1">Estimated Cost</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HealthcareSearch;