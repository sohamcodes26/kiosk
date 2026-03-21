import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
// Adjust the path to your LogoutScreen and LanguageContext based on folder depth!
import LogoutScreen from '../../components/LogoutScreen'; 
import { useLanguage } from '../../../LanguageContext';
import useSpeech from '../../components/useSpeech';

const UpdateMobileNumber = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  useSpeech(t.changePhoneNumberTitle);
  
  const [sessionTime, setSessionTime] = useState(0);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const userName = "Soham Kolte"; 
  
  // Form State
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState('');

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

  const handleBack = () => navigate('/services');
  const handleLogout = () => setIsLogoutOpen(true);

  const handleSendOTP = () => {
    if (mobileNumber.length !== 10) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }
    console.log(`Sending OTP to ${mobileNumber}...`);
    // Here you would typically trigger an API call to send the OTP
  };

const handleConfirmChange = () => {
    if (!mobileNumber || !otp) {
      alert("Please enter the mobile number and OTP.");
      return;
    }
    
    // We pass a mock 'oldNumber' here since the kiosk would normally fetch it from the inserted card/account data
    navigate('/end-session', { 
      state: { 
        type: 'update-mobile',
        oldNumber: '1234567890',
        newNumber: mobileNumber
      } 
    });
  };

  // Reusable styles
  const labelStyle = "text-[#3b5b99] font-bold text-base tracking-widest uppercase mb-1.5 block";
  const inputStyle = "border border-gray-300 rounded p-4 text-xl outline-none focus:border-[#004b9b] w-full text-gray-800 font-medium mb-4";

  return (
    <div className="flex flex-col h-screen w-full font-sans bg-[#e9eff6]">
      <LogoutScreen isOpen={isLogoutOpen} onClose={() => setIsLogoutOpen(false)} />
      
      {/* Header */}
      <header className="flex justify-between items-center bg-[#004b9b] text-white px-6 py-4 shadow-md z-10">
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
      <main className="flex-grow flex flex-col items-center p-8 relative">
        
        {/* Title & Back Button */}
        <div className="w-full max-w-2xl flex items-center justify-center relative mb-8 mt-2">
          <button onClick={handleBack} className="absolute left-0 p-2 hover:bg-blue-100 rounded-full transition-colors">
            <ArrowLeft size={36} className="text-black" />
          </button>
          <h2 className="text-[34px] font-semibold text-black">
            {t.changePhoneNumberTitle}
          </h2>
        </div>

        {/* Form Card */}
        <div className="bg-white w-full max-w-lg rounded-lg shadow-sm border border-gray-200 p-8 flex flex-col">
          
          {/* New Phone Number Section */}
          <label className={labelStyle}>{t.newPhoneNumber}</label>
          <input 
            type="tel"
            maxLength={10}
            placeholder={t.enter10Digit}
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))} // Restrict to numbers only
            className={inputStyle}
          />
          
          <button 
            onClick={handleSendOTP}
            className="bg-[#213f99] hover:bg-[#1a337a] text-white font-bold py-3.5 rounded shadow-sm transition-colors active:scale-95 mb-6 w-full"
          >
            {t.sendOtp}
          </button>

          {/* OTP Section */}
          <label className={labelStyle}>{t.enterOtpLabel}</label>
          <input 
            type="text"
            maxLength={6}
            placeholder={t.enterOtpPlaceholder}
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))} // Restrict to numbers only
            className={inputStyle}
          />

          <hr className="border-gray-100 my-2" />

          {/* Confirm Button */}
          <button 
            onClick={handleConfirmChange}
            className="bg-[#22c55e] hover:bg-green-600 text-white font-bold text-xl py-4 rounded-md shadow-md transition-all active:scale-95 mt-4 w-full"
          >
            {t.confirmChange}
          </button>

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

export default UpdateMobileNumber;
