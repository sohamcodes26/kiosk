import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import LogoutScreen from '../components/LogoutScreen';

const WithdrawalCash = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Pre-fill amount if it was passed back from the preview screen!
  const [amount, setAmount] = useState(location.state?.amount || '');
  const [sessionTime, setSessionTime] = useState(0); 
  const userName = "Soham Kolte"; 
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);

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
    // 3. Instead of navigating, just open the popup!
    setIsLogoutOpen(true); 
  };

  const handleBack = () => {
    navigate('/services');
  };

  const handleQuickSelect = (value) => {
    setAmount(value.toString());
  };

  const handleConfirm = () => {
    // Pass the current amount to the next screen through the router state
    navigate('/withdrawal-preview', { state: { amount } });
  };

  return (
    <div className="flex flex-col h-screen w-full font-sans bg-[#e9eff6]">
      <LogoutScreen 
        isOpen={isLogoutOpen} 
        onClose={() => setIsLogoutOpen(false)} 
      />
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
      <main className="flex-grow flex flex-col items-center relative p-8">
        
        {/* Title & Back Button Row */}
        <div className="w-full max-w-5xl flex items-center justify-center relative mb-12 mt-4">
          <button onClick={handleBack} className="absolute left-0 p-2 hover:bg-blue-100 rounded-full transition-colors">
            <ArrowLeft size={36} className="text-black" />
          </button>
          <h2 className="text-[34px] font-semibold text-black">
            Please enter amount for withdrawal
          </h2>
        </div>

        {/* Amount Input Box */}
        <div className="w-full max-w-2xl bg-white border border-gray-200 rounded-lg shadow-sm mb-10 h-24 flex items-center px-8">
          <span className="text-gray-500 text-2xl font-medium mr-2">₹</span>
          <input 
            type="number"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full text-right text-3xl text-[#5b78a0] font-medium outline-none bg-transparent"
          />
        </div>

        {/* Quick Select Divider */}
        <p className="text-[#849bc0] font-bold text-sm tracking-widest mb-6">SELECT AMOUNT</p>

        {/* Quick Select Buttons */}
        <div className="w-full max-w-3xl flex gap-6 mb-12">
          {[1000, 2000, 5000, 10000].map((val) => (
            <button 
              key={val}
              onClick={() => handleQuickSelect(val)}
              className="flex-1 bg-white text-[#1a4a8c] font-bold text-xl py-6 rounded-lg shadow-sm border border-gray-200 hover:bg-blue-50 hover:border-blue-300 transition-all active:scale-95 flex items-center justify-center gap-1"
            >
              <span className="text-lg">₹</span>
              {val.toLocaleString('en-IN')}
            </button>
          ))}
        </div>

        {/* Confirm Button */}
        <button 
          onClick={handleConfirm}
          className="bg-[#27ae60] hover:bg-[#219653] text-white font-bold text-2xl py-4 px-32 rounded-lg shadow-md transition-all active:scale-95"
        >
          Confirm
        </button>

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

export default WithdrawalCash;