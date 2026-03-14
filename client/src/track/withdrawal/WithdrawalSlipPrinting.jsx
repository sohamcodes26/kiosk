import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const WithdrawalSlipPrinting = () => {
  const navigate = useNavigate();
  const [sessionTime, setSessionTime] = useState(0); 
  
  // Changed initial countdown state from 10 to 60
  const [countdown, setCountdown] = useState(60);
  const userName = "Soham Kolte"; 

  // Session Time Tracker
  useEffect(() => {
    const timer = setInterval(() => {
      setSessionTime((prevTime) => prevTime + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // 60-Second Countdown & Auto-Redirect
  useEffect(() => {
    if (countdown <= 0) {
      navigate('/'); // Go back to StartScreen when timer hits 0
      return;
    }
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [countdown, navigate]);

  const formatSessionTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60).toString().padStart(2, '0');
    const seconds = (timeInSeconds % 60).toString().padStart(2, '0');
    return `${minutes}.${seconds}`;
  };

  const handleLogout = () => {
    navigate('/'); 
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
      <main className="flex-grow flex flex-col items-center justify-center p-8 relative">
        
        <div className="flex flex-col items-center w-full max-w-3xl -mt-20">
          <h2 className="text-[36px] font-semibold text-black mb-10">
            Printing Withdrawal Slip
          </h2>

          <div className="text-[22px] text-gray-800 space-y-2 w-full pl-10">
            <p>1. Please do a signature on front and at the back of slip.</p>
            <p>2. Submit the slip to the counter number 3</p>
          </div>
        </div>

        {/* Countdown Timer in empty space */}
        <div className="absolute bottom-24 flex flex-col items-center">
          <p className="text-gray-500 text-xl font-medium">
            Ending session in <span className="text-[#004b9b] font-bold text-2xl">{countdown}s</span>
          </p>
          <div className="w-64 h-2 bg-gray-400 rounded-full mt-3 overflow-hidden">
            <div 
              className="h-full bg-[#004b9b] transition-all duration-1000 ease-linear"
              // Updated the math here to divide by 60 instead of 10
              style={{ width: `${(countdown / 60) * 100}%` }}
            ></div>
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

export default WithdrawalSlipPrinting;