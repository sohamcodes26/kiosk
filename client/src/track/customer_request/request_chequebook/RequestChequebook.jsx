import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import LogoutScreen from '../../components/LogoutScreen'; 
import { useLanguage } from '../../../LanguageContext';
import useSpeech from '../../components/useSpeech';

const RequestChequebook = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  useSpeech(t.requestChequebookTitle);
  
  const [sessionTime, setSessionTime] = useState(0);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const userName = "Soham Kolte"; 
  
  // Selection States
  const [leaves, setLeaves] = useState('');
  const [reason, setReason] = useState('');

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

  const handleSubmit = () => {
    if (!leaves || !reason) {
      alert("Please select the number of leaves and a reason.");
      return;
    }
    
    console.log(`Requesting ${leaves}-leaf chequebook. Reason: ${reason}`);
    
    // Pass the request-chequebook type to the dynamic end session component
    navigate('/end-session', { state: { type: 'request-chequebook' } });
  };

  // Reusable styles
  const labelStyle = "text-[#3b5b99] font-bold text-[11px] tracking-widest uppercase mb-3 block";
  const optionBtnBase = "py-3 rounded text-sm font-bold border transition-colors active:scale-95 text-center";
  
  // Helper to determine if a button is selected or not
  const getBtnStyle = (isSelected) => 
    isSelected 
      ? `${optionBtnBase} bg-[#213f99] text-white border-[#213f99]` 
      : `${optionBtnBase} bg-white text-gray-700 border-gray-300 hover:bg-blue-50`;

  return (
    <div className="flex flex-col h-screen w-full font-sans bg-[#e9eff6]">
      <LogoutScreen isOpen={isLogoutOpen} onClose={() => setIsLogoutOpen(false)} />
      
      {/* Header */}
      <header className="flex justify-between items-center bg-[#004b9b] text-white px-6 py-4 shadow-md z-10">
        <div><h1 className="text-xl font-semibold tracking-wide">{t.welcome}, {userName}</h1></div>
        <div>
          <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white text-sm font-medium px-4 py-1.5 rounded shadow-sm">
            {t.logout}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center p-8 relative">
        <div className="w-full max-w-3xl flex items-center justify-center relative mb-8 mt-2">
          <button onClick={handleBack} className="absolute left-0 p-2 hover:bg-blue-100 rounded-full transition-colors">
            <ArrowLeft size={36} className="text-black" />
          </button>
          <h2 className="text-[34px] font-semibold text-black">{t.requestChequebookTitle}</h2>
        </div>

        {/* Form Card */}
        <div className="bg-white w-full max-w-3xl rounded-lg shadow-sm border border-gray-200 p-10 flex flex-col gap-8">
          
          {/* Number of Leaves */}
          <div>
            <label className={labelStyle}>{t.numberOfLeaves}</label>
            <div className="grid grid-cols-4 gap-4">
              <button onClick={() => setLeaves('10')} className={getBtnStyle(leaves === '10')}>10</button>
              <button onClick={() => setLeaves('20')} className={getBtnStyle(leaves === '20')}>20</button>
              <button onClick={() => setLeaves('25')} className={getBtnStyle(leaves === '25')}>25</button>
              <button onClick={() => setLeaves('50')} className={getBtnStyle(leaves === '50')}>50</button>
            </div>
          </div>

          {/* Reason */}
          <div>
            <label className={labelStyle}>{t.reasonForRequest}</label>
            <select 
              value={reason} 
              onChange={(e) => setReason(e.target.value)}
              className="w-full border border-gray-300 rounded p-3 text-base text-gray-700 font-medium outline-none focus:border-[#004b9b] bg-white cursor-pointer"
            >
              <option value="" disabled>{t.selectReason}</option>
              <option value="Exhausted">{t.reasonExhausted}</option>
              <option value="Lost">{t.reasonLost}</option>
              <option value="Damaged">{t.reasonDamaged}</option>
            </select>
          </div>

          {/* Info Banner */}
          <div className="w-full bg-[#f8fafc] border border-gray-200 text-gray-500 font-medium text-sm py-4 rounded-md text-center">
            {t.deliveryInfo}
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-2">
            <button 
              onClick={handleSubmit}
              className="bg-[#22c55e] hover:bg-green-600 text-white font-bold text-xl py-3.5 px-16 rounded-md shadow-md transition-all active:scale-95"
            >
              {t.submitRequest}
            </button>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#004b9b] text-white px-6 py-2 flex justify-between items-center text-sm shadow-[0_-2px_10px_rgba(0,0,0,0.1)] mt-auto">
        <div className="w-1/3 flex items-center"><span className="font-bold tracking-widest bg-white/10 px-2 py-0.5 rounded">{formatSessionTime(sessionTime)}</span></div>
        <div className="w-1/3 text-center text-blue-100/90 text-xs tracking-wider">{t.secureSession}</div>
        <div className="w-1/3"></div>
      </footer>
    </div>
  );
};

export default RequestChequebook;