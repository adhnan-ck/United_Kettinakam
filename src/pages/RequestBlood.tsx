'use client'
import Navbar from '@/components/Navbar';
import React, { useState } from 'react';

const UserIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="red" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const CheckIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="red" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20,6 9,17 4,12"></polyline>
  </svg>
);

const ArrowRightIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="red" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14"></path>
    <path d="m12 5 7 7-7 7"></path>
  </svg>
);

const ArrowLeftIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="red" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5"></path>
    <path d="m12 19-7-7 7-7"></path>
  </svg>
);

// Main Component
const RequestBlood: React.FC = () => {
  const [hospital, setHospital] = useState<string>('');
  const [bloodGroup, setBloodGroup] = useState<string>('');
  const [fullName, setFullName] = useState<string>('');
  const [age, setAge] = useState<number | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1);

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const message = `🩸 Blood Request 🩸%0A
Name: ${fullName}%0A
Age: ${age}%0A
Blood Group: ${bloodGroup}%0A
Hospital: ${hospital}`;

    const phoneNumber = "+918129686221"; 
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

    // redirect to WhatsApp
    window.open(whatsappUrl, "_blank");

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background">
        <Navbar/>
    <div className="flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-medium text-black">Step {step} of 3</span>
            <span className="text-sm text-black">{Math.round((step / 3) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              className="bg-red-600 h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full mb-4">
              <UserIcon />
            </div>
            <h1 className="text-2xl font-semibold text-black mb-2">
              Need Blood? Submit Your Request
            </h1>
            <p className="text-sm text-black">
              {step === 1 && "Let's start with your basic information"}
              {step === 2 && "Provide your blood group and hospital details"}
              {step === 3 && "Almost done! Review your details"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Step 1: Personal Info */}
            {step === 1 && (
              <div className="space-y-4">
                {/* Full Name */}
                <div className="space-y-2">
                  <label htmlFor="fullName" className="text-sm font-medium text-black">Full Name</label>
                  <input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                  />
                </div>

                {/* Age */}
                <div className="space-y-2">
                  <label htmlFor="age" className="text-sm font-medium text-black">Age</label>
                  <input
                    id="age"
                    type="number"
                    value={age || ""}
                    onChange={(e) => setAge(Number(e.target.value))}
                    placeholder="Enter your age"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!fullName || !age}
                  className="w-full bg-red-600 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-red-700 transition-all duration-200 disabled:opacity-50"
                >
                  Next Step <ArrowRightIcon />
                </button>
              </div>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <div className="space-y-4">
                {/* Blood Group */}
                <div className="space-y-2">
                  <label htmlFor="bloodGroup" className="text-sm font-medium text-black">Blood Group</label>
                  <select
                    id="bloodGroup"
                    value={bloodGroup}
                    onChange={(e) => setBloodGroup(e.target.value)}
                    className="w-full pl-3 pr-8 py-2 border border-gray-300 rounded-md text-sm text-black focus:outline-none focus:ring-2 focus:ring-red-600"
                  >
                    <option value="">Select your blood group</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                  </select>
                </div>

                {/* Hospital */}
                <div className="space-y-2">
                  <label htmlFor="hospital" className="text-sm font-medium text-black">Hospital</label>
                  <input
                    id="hospital"
                    type="text"
                    value={hospital}
                    onChange={(e) => setHospital(e.target.value)}
                    placeholder="Enter hospital name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!bloodGroup || !hospital}
                  className="w-full bg-red-600 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-red-700 transition-all duration-200 disabled:opacity-50"
                >
                  Next Step <ArrowRightIcon />
                </button>
              </div>
            )}

            {/* Step 3: Review & Submit */}
            {step === 3 && (
              <div className="space-y-4">
                <div className="bg-gray-50 border p-4 rounded-md">
                  <h3 className="font-medium text-black mb-3 flex items-center gap-2">
                    <CheckIcon /> Review Details
                  </h3>
                  <p><strong>Name:</strong> {fullName}</p>
                  <p><strong>Age:</strong> {age}</p>
                  <p><strong>Blood Group:</strong> {bloodGroup}</p>
                  <p><strong>Hospital:</strong> {hospital}</p>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-red-600 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-red-700 transition-all duration-200"
                >
                  {isLoading ? "Sending..." : "Submit Request"}
                </button>
              </div>
            )}
          </form>

          {/* Back Button */}
          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              className="mt-4 w-full text-black hover:text-red-600 transition-colors text-sm font-medium flex items-center justify-center gap-2"
            >
              <ArrowLeftIcon /> Back to previous step
            </button>
          )}
        </div>
      </div>
    </div>
    </div>
  );
};

export default RequestBlood;
