import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoutScreen from './LogoutScreen';
import { useLanguage } from '../../LanguageContext'; 

import useSpeech from './useSpeech';

const ServiceSelection = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage(); 

  const [sessionTime, setSessionTime] = useState(0);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false); 
  const userName = "Soham Kolte"; 

  // Use Custom Hook for Voice Module
  useSpeech(t.selectService);

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
    setIsLogoutOpen(true); 
  };

  const handleServiceClick = (serviceName) => {
    console.log(`Navigating to: ${serviceName}`);
    if (serviceName === 'Withdrawal') {
      navigate('/withdrawal');
    } else if (serviceName === 'Cash Deposit') {
      navigate('/deposit-cash');
    } else if (serviceName === 'Cheque Deposit') {
      navigate('/deposit-cheque');
    } else if (serviceName === 'Demand Draft') {
      navigate('/deposit-dd'); 
    }
    else if (serviceName === 'Request ATM Card') {
      navigate('/request-atm'); 
    }
    else if (serviceName === 'Request Cheque Book') { 
      navigate('/request-chequebook'); 
    }
    else if (serviceName === 'Update Mobile No.') {
      navigate('/update-mobile'); 
    }
  };

  const buttonStyle = "bg-white text-[#0B4084] font-bold py-4 px-2 rounded-md shadow-md border border-gray-200 hover:bg-blue-50 hover:shadow-lg hover:border-blue-300 transition-all active:scale-95 w-full";

  return (
    <div className="flex flex-col h-screen w-full font-sans bg-[#e9eff6]">
        <LogoutScreen 
        isOpen={isLogoutOpen} 
        onClose={() => setIsLogoutOpen(false)} 
      />
      
      {/* Header */}
      <header className="flex justify-between items-center bg-[#004b9b] text-white px-6 py-4 shadow-md">
        <div>
          <h1 className="text-xl font-semibold tracking-wide">
            {t.welcome}, {userName}
          </h1>
        </div>
        <div>
          <button 
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white text-sm font-medium px-4 py-1.5 rounded shadow-sm transition-colors"
          >
            {t.logout}
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow flex flex-col p-8 items-center">
        <h2 className="text-4xl font-semibold text-gray-900 mb-10 mt-4">
          {t.selectService}
        </h2>

        {/* 2-Column Grid Layout (Updated from 4 columns) */}
        <div className="w-full max-w-4xl grid grid-cols-2 gap-12">
          
          {/* Column 1: Cash Transactions & Deposits */}
          <div className="flex flex-col gap-3">
            <div className="bg-[#213f99] text-white text-sm font-bold py-3 px-2 text-center rounded shadow-sm uppercase tracking-wide">
              {t.cashTransaction}
            </div>
            <button onClick={() => handleServiceClick('Withdrawal')} className={buttonStyle}>
              {t.withdrawal}
            </button>

            <div className="bg-[#4261b5] text-white text-sm font-bold py-2 px-2 text-center rounded shadow-sm mt-2 uppercase tracking-wide">
              {t.depositTitle}
            </div>
            <button onClick={() => handleServiceClick('Cash Deposit')} className={buttonStyle}>
              {t.cash}
            </button>
            <button onClick={() => handleServiceClick('Cheque Deposit')} className={buttonStyle}>
              {t.cheque}
            </button>
            <button onClick={() => handleServiceClick('Demand Draft')} className={buttonStyle}>
              {t.demandDraft}
            </button>
          </div>

          {/* Column 2: Customer Request (Removed Statement Request) */}
          <div className="flex flex-col gap-3">
            <div className="bg-[#213f99] text-white text-sm font-bold py-3 px-2 text-center rounded shadow-sm uppercase tracking-wide">
              {t.customerRequest}
            </div>
            <button onClick={() => handleServiceClick('Request ATM Card')} className={buttonStyle}>
              {t.requestAtm}
            </button>
            <button onClick={() => handleServiceClick('Request Cheque Book')} className={buttonStyle}>
              {t.requestChequeBook}
            </button>
            <button onClick={() => handleServiceClick('Update Mobile No.')} className={buttonStyle}>
              {t.updateMobile}
            </button>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#004b9b] text-white px-6 py-2 flex justify-between items-center text-sm shadow-[0_-2px_10px_rgba(0,0,0,0.1)]">
        <div className="w-1/3 flex items-center">
          <span className="font-bold tracking-widest bg-white/10 px-2 py-0.5 rounded">
            {formatSessionTime(sessionTime)}
          </span>
        </div>
        <div className="w-1/3 text-center text-blue-100/90 text-xs tracking-wider">
          {t.secureSession}
        </div>
        <div className="w-1/3"></div>
      </footer>
      
    </div>
  );
};

export default ServiceSelection;