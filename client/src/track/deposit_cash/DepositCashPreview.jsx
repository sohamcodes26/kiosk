import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import DepositCashSlip from './DepositCashSlip'; // using the newly created React slip component
import { useLanguage } from '../../LanguageContext';
import useSpeech from '../components/useSpeech';
import LogoutScreen from '../components/LogoutScreen';

const DepositCashPreview = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();
  useSpeech(t.reviewDepositSlip);
  
  // Grab the data passed from the previous screen
  const { accountNumber, notes, totalAmount, accountName, mobileNumber, email, panNumber } = location.state || {}; 

  const [sessionTime, setSessionTime] = useState(0); 
  const userName = location.state?.accountName || "Soham Kolte"; 
  const [isLogoutOpen, setIsLogoutOpen] = useState(false); // Added state for Logout modal

  // Example preview data for the deposit slip
  const previewData = {
    branch: 'Pune Central',
    date: '19032026',
    accountNumber: accountNumber || '1234567890123',
    accountHolderName: userName,
    panNumber: panNumber || '',
    mobileNumber: mobileNumber || '9876543210',
    email: email || '',
    amount: totalAmount || (notes ? Object.entries(notes).reduce((acc, [denom, count]) => acc + (parseInt(denom) * count || 0), 0) : '10000'),
    amountInWords: totalAmount ? `${totalAmount} Only` : (notes ? `${Object.entries(notes).reduce((acc, [denom, count]) => acc + (parseInt(denom) * count || 0), 0)} Only` : '10000 Only'),
    notes2000: notes?.['2000']?.toString() || '0',
    notes500: notes?.['500']?.toString() || '0',
    notes200: notes?.['200']?.toString() || '0',
    notes100: notes?.['100']?.toString() || '0',
    notes50: notes?.['50']?.toString() || '0',
    notes20: notes?.['20']?.toString() || '0',
    notes10: notes?.['10']?.toString() || '0',
    notes5: notes?.['5']?.toString() || '0',
    coins: '0'
  };

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
    setIsLogoutOpen(true); // Open the logout modal
  };

  const handleEdit = () => {
    // Pass the state BACK to the deposit screen so it isn't lost
    navigate('/deposit-cash', { state: { accountNumber, notes } });
  };

  const handleConfirm = () => {
    console.log("Deposit slip confirmed.");
    // Navigate to the dynamic End Session screen with 'deposit' type
    navigate('/end-session', { state: { type: 'deposit' } });
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
          <h1 className="text-xl font-semibold tracking-wide">
            {t.welcome}, {userName}
          </h1>
        </div>
        <div>
          <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white text-sm font-medium px-4 py-1.5 rounded shadow-sm transition-colors">
            {t.logout}
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow flex flex-col items-center p-8">
        
        <h2 className="text-[32px] font-semibold text-black mb-8 mt-2">
          {t.reviewDepositSlip}
        </h2>

        {/* Content Layout: Changed to items-stretch to match heights */}
        <div className="w-full max-w-[90rem] flex items-stretch justify-between gap-12 flex-grow mb-8 px-12">
          
          {/* Slip Content Container */}
          <div className="flex-grow flex justify-center items-center mr-16">
            <div className="scale-[1.0] transform origin-center">
              <DepositCashSlip {...previewData} />
            </div>
          </div>

          {/* Action Buttons: Changed to justify-end to push buttons to the bottom */}
          <div className="flex flex-col justify-end gap-5 w-48 shrink-0 pb-12">
            <button 
              onClick={handleEdit}
              className="bg-[#2563eb] hover:bg-blue-700 text-white font-bold text-2xl py-3 rounded-md shadow-md transition-all active:scale-95"
            >
              {t.edit}
            </button>
            <button 
              onClick={handleConfirm}
              className="bg-[#22c55e] hover:bg-green-600 text-white font-bold text-2xl py-3 rounded-md shadow-md transition-all active:scale-95"
            >
              {t.confirm}
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
          {t.secureSession}
        </div>
        <div className="w-1/3"></div>
      </footer>
      
    </div>
  );
};

export default DepositCashPreview;