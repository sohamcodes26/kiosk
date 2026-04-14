import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header'; 
import { useLanguage } from '../../../LanguageContext';
import useSpeech from '../../components/useSpeech';
import axios from "axios";

const UpdateMobileNumber = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  useSpeech(t.changePhoneNumberTitle);
  
  const [sessionTime, setSessionTime] = useState(0);
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

  const handleSendOTP = () => {
    if (mobileNumber.length !== 10) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }
    console.log(`Sending OTP to ${mobileNumber}...`);
  };

const handleConfirmChange = async () => {
    if (!mobileNumber || !otp) {
      alert("Please enter the mobile number and OTP.");
      return;
    }
    
    try {
      await axios.post("http://localhost:8000/api/users/request", {
        subType: "MOBILE_UPDATE",
        userId: "demoUser123"
      });

      navigate('/end-session', { 
        state: { 
          type: 'update-mobile',
          oldNumber: '1234567890',
          newNumber: mobileNumber
        } 
      });
    } catch (error) {
      console.error("Mobile update error:", error);
      alert("Request failed. Please try again.");
    }
  };

  // Reusable styles
  const labelStyle = "text-[#3b5b99] font-bold text-base tracking-widest uppercase mb-1.5 block";
  const inputStyle = "border border-gray-300 rounded p-4 text-xl outline-none focus:border-[#004b9b] w-full text-gray-800 font-medium mb-4";

  return (
    <div className="flex flex-col h-screen w-full font-sans bg-[#e9eff6]">
      <Header userName={userName} />
      
      {/* Main Content Area */}
      <main className="flex-grow flex flex-col items-center p-8 relative">
        
        {/* Title */}
        <div className="w-full max-w-2xl flex items-center justify-center relative mb-8 mt-4">
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
            onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))} 
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
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))} 
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
