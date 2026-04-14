import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from './Header';
import { useLanguage } from '../../LanguageContext';
import useSpeech from './useSpeech';

const EndSession = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();
  
  // Get transaction type and data from router state
  const transactionType = location.state?.type || 'deposit'; 
  const oldNumber = location.state?.oldNumber || '';
  const newNumber = location.state?.newNumber || '';
  
  const isUpdateMobile = transactionType === 'update-mobile';
  const isRequestAtm = transactionType === 'request-atm'; 
  const isRequestChequebook = transactionType === 'request-chequebook'; 
  const isDeposit = transactionType === 'deposit';

  // Determine Title and Audio Text dynamically
  let titleText = "";
  let audioText = "";
  if (isUpdateMobile) {
    titleText = t.mobileUpdatedSuccess;
    audioText = t.mobileUpdatedSuccess;
  } else if (isRequestAtm || isRequestChequebook) {   
    titleText = t.atmRequestSuccessTitle; 
    audioText = t.atmRequestSuccessTitle;
  } else {
    titleText = isDeposit ? t.printingDepositSlip : t.printingWithdrawalSlip;
    audioText = titleText;
  }

  const counterText = isDeposit ? t.submitCounter4 : t.submitCounter3;

  const [sessionTime, setSessionTime] = useState(0); 
  const [countdown, setCountdown] = useState(60);
  const userName = "Soham Kolte"; 

  // Mount Audio Effect
  useSpeech(audioText);

  // Session Time Tracker
  useEffect(() => {
    const timer = setInterval(() => {
      setSessionTime((prevTime) => prevTime + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // 60-Second Countdown
  useEffect(() => {
    if (countdown <= 0) {
      navigate('/'); 
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

  return (
    <div className="flex flex-col h-screen w-full font-sans bg-[#e9eff6]">
      <Header userName={userName} />

      {/* Main Content Area */}
      <main className="flex-grow flex flex-col items-center justify-center p-8 relative">
        
        {isUpdateMobile ? (
          <div className="flex flex-col items-center w-full max-w-3xl -mt-20">
            <h2 className="text-[36px] font-semibold text-black mb-12">
              {titleText}
            </h2>
            <div className="text-[26px] text-gray-800 space-y-3 w-full text-center font-medium">
              <p>{t.oldNumberLabel} {oldNumber}</p>
              <p>{t.newNumberLabel} {newNumber}</p>
            </div>
          </div>
        ) : (isRequestAtm || isRequestChequebook) ? (
          <div className="flex flex-col items-center w-full max-w-4xl -mt-20 px-8">
            <h2 className="text-[38px] font-semibold text-black mb-10 text-center">{titleText}</h2>
            <p className="text-[24px] text-gray-800 text-center leading-relaxed font-medium">
              {isRequestAtm ? t.atmRequestSuccessDesc : t.chequebookSuccessDesc}
            </p>
          </div>
        ): (
          <div className="flex flex-col items-center w-full max-w-3xl -mt-20">
            <h2 className="text-[36px] font-semibold text-black mb-10">
              {titleText}
            </h2>
            <div className="text-[22px] text-gray-800 space-y-2 w-full pl-10 font-medium">
              <p>{t.signSlip}</p>
              <p>{counterText}</p>
            </div>
          </div>
        )}

        {/* 60-second Countdown Timer */}
        <div className="absolute bottom-24 flex flex-col items-center">
          <p className="text-gray-500 text-xl font-medium">
            {t.endingSession} <span className="text-[#004b9b] font-bold text-2xl">{countdown}s</span>
          </p>
          <div className="w-64 h-2 bg-gray-200 rounded-full mt-3 overflow-hidden">
            <div 
              className="h-full bg-[#004b9b] transition-all duration-1000 ease-linear"
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
          {t.secureSession}
        </div>
        <div className="w-1/3"></div>
      </footer>
      
    </div>
  );
};

export default EndSession;