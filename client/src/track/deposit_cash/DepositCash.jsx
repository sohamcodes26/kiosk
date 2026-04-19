import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import { useLanguage } from '../../LanguageContext';
import useSpeech from '../components/useSpeech';
import axios from "axios";

const DepositCash = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();
  useSpeech(t.enterReceiverDetail);
  
  const [sessionTime, setSessionTime] = useState(0); 
  const userName = "Soham Kolte"; 
  
  // Check if we have state passed back from the preview screen
  const [accountNumber, setAccountNumber] = useState(location.state?.accountNumber || '');

  // Keep notes state if passed, otherwise initialize to 0
  const [notes, setNotes] = useState(location.state?.notes || {
    2000: 0, 500: 0, 200: 0, 100: 0, 50: 0, 20: 0, 10: 0, 5: 0
  });

  const noteValues = [2000, 500, 200, 100, 50, 20, 10, 5];
  const MAX_NOTES = 1000;

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

  const handleDepositToSelf = () => {
    setAccountNumber('098765432100');
  };

  // Handle + and - buttons with limits
  const updateNoteCount = (value, increment) => {
    setNotes(prev => {
      const currentCount = Number(prev[value]) || 0;
      let newCount = increment ? currentCount + 1 : currentCount - 1;
      
      // Enforce limits
      if (newCount < 0) newCount = 0;
      if (newCount > MAX_NOTES) newCount = MAX_NOTES;

      return { ...prev, [value]: newCount };
    });
  };

  // Handle manual typing in the input box with limits
  const handleNoteInputChange = (value, inputValue) => {
    if (inputValue === '') {
      setNotes(prev => ({ ...prev, [value]: '' }));
      return;
    }
    
    const count = parseInt(inputValue, 10);
    if (!isNaN(count)) {
      if (count < 0) {
        setNotes(prev => ({ ...prev, [value]: 0 }));
      } else if (count > MAX_NOTES) {
        setNotes(prev => ({ ...prev, [value]: MAX_NOTES }));
      } else {
        setNotes(prev => ({ ...prev, [value]: count }));
      }
    }
  };

  // Calculate Total Amount (Treats empty strings as 0)
  const totalAmount = Object.entries(notes).reduce((total, [value, count]) => {
    const validCount = Number(count) || 0;
    return total + (Number(value) * validCount);
  }, 0);

  const handleConfirmDeposit = async () => {
    if (!accountNumber) {
      alert("Please enter a receiver account number.");
      return;
    }
    if (totalAmount === 0) {
      alert("Please enter the deposit amount.");
      return;
    }

    try {
      await axios.post("http://localhost:8000/api/users/deposit", {
        amount: Number(totalAmount),
        userId: "demoUser123"
      });

      navigate('/deposit-preview', { state: { accountNumber, notes } });
    } catch (error) {
      console.error("Deposit error:", error);
      const errorMsg = error.response?.data?.message || "Transaction failed. Please try again.";
      alert(`Transaction failed: ${errorMsg}`);
    }
  };

  return (
    <div className="flex flex-col h-screen w-full font-sans bg-[#e9eff6]">
      <Header userName={userName} />
      
      {/* Main Content Area */}
      <main className="flex-grow flex flex-col items-center p-8 relative">
        
        {/* Title */}
        <div className="w-full max-w-[90rem] flex items-center justify-center relative mb-8 mt-4 px-12">
          
                        <button 
                            onClick={() => navigate('/services')} 
                            className="absolute left-[3rem] p-2 hover:bg-blue-100 rounded-full transition-colors z-10"
                        >
                            <ArrowLeft size={36} className="text-gray-700" />
                        </button>
                        <h2 className="text-[34px] font-semibold text-black">
            {t.enterReceiverDetail}
          </h2>
        </div>

        {/* Main Card */}
        <div className="bg-white w-full max-w-5xl rounded-lg shadow-sm border border-gray-200 p-8 flex flex-col">
          
          <div className="flex border-b border-gray-200 pb-8 mb-6">
            
            {/* Left Column: Receiver Account */}
            <div className="w-1/3 flex flex-col gap-4 pr-10 border-r border-gray-200">
              <p className="text-[#3b5b99] font-bold text-base tracking-widest uppercase">
                {t.receiverAccount}
              </p>
              <input 
                type="text" 
                placeholder={t.enterAccountNumber}
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                className="border border-gray-300 rounded p-4 text-xl outline-none focus:border-[#004b9b]"
              />
              <button 
                onClick={handleDepositToSelf}
                className="bg-[#213f99] hover:bg-[#1a337a] text-white font-bold py-3 rounded shadow-sm transition-colors active:scale-95"
              >
                {t.depositToSelf}
              </button>
            </div>

            {/* Right Column: Amount Breakdown */}
            <div className="w-2/3 pl-10">
              <p className="text-[#3b5b99] font-bold text-base tracking-widest uppercase mb-4">
                {t.amountBreakdown}
              </p>
              <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                {noteValues.map((val) => {
                  const currentCount = notes[val] === '' ? 0 : Number(notes[val]);
                  
                  return (
                    <div key={val} className="flex items-center justify-between bg-[#ededed] border border-gray-100 p-2.5 rounded-md shadow-sm">
                      <span className="font-semibold text-gray-800 text-base w-14">₹ {val}</span>
                      
                      <div className="flex items-center gap-2.5">
                        <style>{`
                          input[type=number]::-webkit-inner-spin-button, 
                          input[type=number]::-webkit-outer-spin-button { 
                            -webkit-appearance: none; 
                            margin: 0; 
                          }
                        `}</style>
                        
                        <input 
                          type="number"
                          value={notes[val]}
                          onChange={(e) => handleNoteInputChange(val, e.target.value)}
                          className="border border-gray-400 text-black bg-white font-bold text-xl w-16 text-center py-1.5 rounded-sm outline-none focus:border-black focus:ring-1 focus:ring-black shadow-inner"
                          style={{ MozAppearance: 'textfield' }} 
                        />

                        <button 
                          onClick={() => updateNoteCount(val, false)}
                          disabled={currentCount <= 0}
                          className={`w-9 py-1.5 rounded-sm font-bold text-xl leading-none transition-colors flex items-center justify-center ${
                            currentCount <= 0 
                              ? 'bg-gray-300 text-gray-400 cursor-not-allowed' 
                              : 'bg-[#94a3b8] hover:bg-[#64748b] text-white active:scale-95'
                          }`}
                        >
                          -
                        </button>

                        <button 
                          onClick={() => updateNoteCount(val, true)}
                          disabled={currentCount >= MAX_NOTES}
                          className={`w-9 py-1.5 rounded-sm font-bold text-xl leading-none transition-colors flex items-center justify-center ${
                            currentCount >= MAX_NOTES
                              ? 'bg-gray-300 text-gray-400 cursor-not-allowed'
                              : 'bg-[#213f99] hover:bg-[#1a337a] text-white active:scale-95'
                          }`}
                        >
                          +
                        </button>

                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
          </div>

          {/* Bottom Row: Total & Confirm */}
          <div className="flex justify-between items-end">
            <div>
              <p className="text-gray-800 font-bold text-lg">{t.totalAmount}</p>
              <p className="text-[#1e3a8a] font-bold text-[32px] leading-none">
                ₹ {totalAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </p>
            </div>
            <button 
              onClick={handleConfirmDeposit}
              className="bg-[#22c55e] hover:bg-green-600 text-white font-bold text-xl py-4 px-16 rounded-md shadow-md transition-all active:scale-95"
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

export default DepositCash;
