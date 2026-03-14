import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import slipImage from '../../assets/deposit.png'; 

const DepositDDPreview = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Grab the form data passed from the DD entry screen
  const { accountNumber, ddNumber, ddAmount, issuingBank } = location.state || {}; 

  const [sessionTime, setSessionTime] = useState(0); 
  const userName = "Soham Kolte"; 

  useEffect(() => {
    const timer = setInterval(() => {
      setSessionTime((prevTime) => prevTime + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatSessionTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60).toString().padStart(2, '0');
    const seconds = (timeInSeconds % 60).toString().padStart(2, '0');
    return `${minutes}.${seconds}`;
  };

  const handleLogout = () => {
    navigate('/'); 
  };

  const handleEdit = () => {
    // Pass the state BACK to the DD entry screen so data isn't lost
    navigate('/deposit-dd', { state: { accountNumber, ddNumber, ddAmount, issuingBank } });
  };

  const handleConfirm = () => {
    console.log("DD deposit slip confirmed.");
    // Navigate to the dynamic End Session screen with 'deposit' type
    navigate('/end-session', { state: { type: 'deposit' } });
  };

  return (
    <div className="flex flex-col h-screen w-full font-sans bg-[#e9eff6]">
      
      {/* Header */}
      <header className="flex justify-between items-center bg-[#004b9b] text-white px-6 py-4 shadow-md z-10">
        <div>
          <h1 className="text-xl font-semibold tracking-wide">Welcome, {userName}</h1>
        </div>
        <div>
          <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white text-sm font-medium px-4 py-1.5 rounded shadow-sm transition-colors">
            Logout
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow flex flex-col items-center p-8">
        
        <h2 className="text-[32px] font-semibold text-black mb-8 mt-2">
          Please review your deposit slip
        </h2>

        {/* Content Layout */}
        <div className="w-full max-w-6xl flex items-stretch justify-between gap-12 flex-grow mb-8">
          
          {/* Slip Image Container */}
          <div className="flex-grow bg-white p-6 shadow-md rounded-sm border border-gray-200 flex justify-center items-center h-[500px]">
            <img 
              src={slipImage} 
              alt="Deposit Slip Preview" 
              className="max-w-full max-h-full object-contain"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col justify-end gap-5 w-40 shrink-0">
            <button 
              onClick={handleEdit}
              className="bg-[#2563eb] hover:bg-blue-700 text-white font-bold text-2xl py-3 rounded-md shadow-md transition-all active:scale-95"
            >
              Edit
            </button>
            <button 
              onClick={handleConfirm}
              className="bg-[#22c55e] hover:bg-green-600 text-white font-bold text-2xl py-3 rounded-md shadow-md transition-all active:scale-95"
            >
              Confirm
            </button>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#004b9b] text-white px-6 py-2 flex justify-between items-center text-sm shadow-[0_-2px_10px_rgba(0,0,0,0.1)] mt-auto">
        <div className="w-1/3 flex items-center">
          <span className="font-bold tracking-widest bg-white/10 px-2 py-0.5 rounded">
            {formatSessionTime(sessionTime)}
          </span>
        </div>
        <div className="w-1/3 text-center text-blue-100/90 text-xs tracking-wider">
          2026 Bank Kiosk Secure Session
        </div>
        <div className="w-1/3"></div>
      </footer>
      
    </div>
  );
};

export default DepositDDPreview;