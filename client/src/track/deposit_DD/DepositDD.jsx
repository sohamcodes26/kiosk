import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import LogoutScreen from '../components/LogoutScreen';
import { useLanguage } from '../../LanguageContext';
import useSpeech from '../components/useSpeech';

const DepositDD = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();
  useSpeech(t.enterDdDetail);

  const [sessionTime, setSessionTime] = useState(0); 
  const userName = "Soham Kolte"; 
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  
  // State for form fields
  const [accountNumber, setAccountNumber] = useState(location.state?.accountNumber || '');
  const [ddNumber, setDdNumber] = useState(location.state?.ddNumber || '');
  const [ddAmount, setDdAmount] = useState(location.state?.ddAmount || '');
  const [issuingBank, setIssuingBank] = useState(location.state?.issuingBank || '');

  // Example list of banks for the dropdown
  const bankOptions = [
    "Bank of Baroda",
    "State Bank of India",
    "HDFC Bank",
    "ICICI Bank",
    "Axis Bank",
    "Punjab National Bank",
    "Bank of Maharashtra"
  ];

  // Session Timer
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
  
  const handleBack = () => navigate('/services');

  const handleDepositToSelf = () => {
    setAccountNumber('1234567890123456');
  };

  const handleConfirmDeposit = () => {
    if (!accountNumber || !ddNumber || !ddAmount || !issuingBank) {
      alert("Please fill in all the details.");
      return;
    }
    // Pass the state to the preview screen
    navigate('/deposit-dd-preview', { 
      state: { accountNumber, ddNumber, ddAmount, issuingBank } 
    });
  };

  // Reusable styling variables
  const labelStyle = "text-[#3b5b99] font-bold text-xs tracking-wider uppercase mb-1.5";
  const inputStyle = "border border-gray-300 rounded p-2.5 text-base outline-none focus:border-[#004b9b] w-full text-gray-800 font-medium";

  return (
    <div className="flex flex-col h-screen w-full font-sans bg-[#e9eff6]">
      <LogoutScreen 
        isOpen={isLogoutOpen} 
        onClose={() => setIsLogoutOpen(false)} 
      />
      
      {/* Header */}
      <header className="flex justify-between items-center bg-[#004b9b] text-white px-6 py-4 shadow-md z-10">
        <div>
          <h1 className="text-xl font-semibold tracking-wide">{t.welcome}, {userName}</h1>
        </div>
        <div>
          <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white text-sm font-medium px-4 py-1.5 rounded shadow-sm transition-colors">
            {t.logout}
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow flex flex-col items-center p-8 relative">
        
        {/* Title & Back Button */}
        <div className="w-full max-w-5xl flex items-center justify-center relative mb-6 mt-2">
          <button onClick={handleBack} className="absolute left-0 p-2 hover:bg-blue-100 rounded-full transition-colors">
            <ArrowLeft size={36} className="text-black" />
          </button>
          <h2 className="text-[34px] font-semibold text-black">
            {t.enterDdDetail}
          </h2>
        </div>

        {/* Main Card */}
        <div className="bg-white w-full max-w-5xl rounded-lg shadow-sm border border-gray-200 p-8 flex flex-col">
          
          <div className="flex pb-6">
            
            {/* Left Column: Receiver Account */}
            <div className="w-[35%] flex flex-col pr-8 border-r border-gray-200">
              <p className="text-[#3b5b99] font-bold text-sm tracking-widest uppercase mb-6">
                {t.receiverAccount}
              </p>
              
              <div className="flex flex-col gap-5">
                <div>
                  <label className={labelStyle}>{t.accountNumber}</label>
                  <input 
                    type="text" 
                    placeholder={t.enterAccountNumber}
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    className={inputStyle}
                  />
                </div>
                
                <button 
                  onClick={handleDepositToSelf}
                  className="bg-[#213f99] hover:bg-[#1a337a] text-white font-bold py-3 rounded shadow-sm transition-colors active:scale-95"
                >
                  {t.depositToSelf}
                </button>
              </div>
            </div>

            {/* Right Column: DD Details */}
            <div className="flex-1 pl-8">
              <p className="text-[#3b5b99] font-bold text-sm tracking-widest uppercase mb-6">
                {t.ddDetails}
              </p>
              
              <div className="flex flex-col gap-5">
                <div>
                  <label className={labelStyle}>{t.ddNumber}</label>
                  <input 
                    type="text" 
                    placeholder={t.enterDdNumber}
                    value={ddNumber}
                    onChange={(e) => setDdNumber(e.target.value)}
                    className={inputStyle}
                  />
                </div>

                <div>
                  <label className={labelStyle}>{t.ddAmount}</label>
                  <input 
                    type="number" 
                    placeholder={t.enterAmount}
                    value={ddAmount}
                    onChange={(e) => setDdAmount(e.target.value)}
                    className={inputStyle}
                    style={{ MozAppearance: 'textfield' }}
                  />
                  <style>{`
                    input[type=number]::-webkit-inner-spin-button, 
                    input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
                  `}</style>
                </div>

                <div>
                  <label className={labelStyle}>{t.issuingBank}</label>
                  <select 
                    value={issuingBank}
                    onChange={(e) => setIssuingBank(e.target.value)}
                    className={`${inputStyle} bg-white cursor-pointer`}
                  >
                    <option value="" disabled>{t.selectBank}</option>
                    {bankOptions.map((bank, index) => (
                      <option key={index} value={bank}>{bank}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            
          </div>

          <hr className="border-gray-200 my-4" />

          {/* Bottom Row: Confirm Button */}
          <div className="flex justify-end pt-2">
            <button 
              onClick={handleConfirmDeposit}
              className="bg-[#22c55e] hover:bg-green-600 text-white font-bold text-xl py-3.5 px-12 rounded-md shadow-md transition-all active:scale-95"
            >
              {t.confirmDeposit}
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

export default DepositDD;