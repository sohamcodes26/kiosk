import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import { useLanguage } from '../../LanguageContext'; 

const LanguageSelection = () => {
  const navigate = useNavigate();
  const { t, setLanguage } = useLanguage(); 
  
  const [sessionTime, setSessionTime] = useState(0);
  const userName = "Soham Kolte"; 

  // Session Timer Logic
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

  const handleLanguageSelect = (langCode) => {
    console.log(`Selected language: ${langCode}`);
    setLanguage(langCode); 
    navigate('/services'); 
  };

  return (
    <div className="flex flex-col h-screen w-full font-sans bg-[#e9eff6]">
      <Header userName={userName} />
      
      {/* Main Content Area */}
      <main className="flex-grow flex flex-col items-center justify-center p-6">
        <div className="text-center mb-12">
          <h2 className="text-[32px] font-semibold text-gray-800 mb-2">
            Select Your Language
          </h2>
          <h3 className="text-[28px] font-medium text-gray-800">
            आपली भाषा निवडा
          </h3>
        </div>

        {/* Language Buttons */}
        <div className="flex gap-8">
          <button 
            onClick={() => handleLanguageSelect('en')} 
            className="bg-[#145bbf] hover:bg-[#0c4596] text-white text-xl font-medium w-48 py-5 rounded-lg shadow-[0_4px_10px_rgba(0,0,0,0.2)] transition-all active:scale-95"
          >
            ENGLISH
          </button>
          
          <button 
            onClick={() => handleLanguageSelect('mr')} 
            className="bg-[#145bbf] hover:bg-[#0c4596] text-white text-xl font-medium w-48 py-5 rounded-lg shadow-[0_4px_10px_rgba(0,0,0,0.2)] transition-all active:scale-95"
          >
            मराठी
          </button>
        </div>
      </main>

      {/* Footer with Active Timer */}
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

export default LanguageSelection;