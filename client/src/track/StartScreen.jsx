import React, { useState, useEffect } from 'react';
import { Layers, Fingerprint } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const StartScreen = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const navigate = useNavigate();

  // Update the clock every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  };

  return (
    <div className="flex flex-col h-screen w-full font-sans bg-gradient-to-br from-blue-50 to-blue-200">
      
      {/* Header */}
      <header className="flex justify-between items-center bg-[#0B4084] text-white px-6 py-3 shadow-md">
        <div className="flex items-center gap-4">
          <div className="bg-white rounded-full p-2 text-[#0B4084]">
            <Layers size={24} strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-wide">Maharashtra State Bank</h1>
            <p className="text-xs text-blue-100 font-light">Welcome to Self-Service Kiosk</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold">{formatTime(currentTime)}</p>
          <p className="text-xs text-blue-100 font-light">{formatDate(currentTime)}</p>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl py-16 px-8 flex flex-col items-center text-center">
          
          <h2 className="text-4xl font-bold text-[#0B4084] mb-3">
            Welcome / स्वागत आहे
          </h2>
          <p className="text-gray-500 text-sm mb-12">
            Please scan your fingerprint to proceed safely.
          </p>

          {/* Fingerprint Scanner Graphic */}
          <div className="relative mb-6">
            <div 
              onClick={() => navigate('/language')} 
              className="rounded-full border-[3px] border-[#3B82F6] p-6 flex items-center justify-center bg-blue-50/50 cursor-pointer hover:bg-blue-100 transition-colors"
            >
              <Fingerprint size={64} className="text-[#0B4084]" strokeWidth={1.5} />
            </div>
          </div>

          <p className="text-[#3B82F6] font-medium text-lg mb-8">
            Tap Fingerprint to Scan
          </p>

          <div className="bg-gray-200 w-48 h-8 rounded-sm"></div>
          
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#0B3A76] text-white px-6 py-2 flex justify-between items-center text-sm">
        <div className="w-1/3">
          <span className="font-semibold">MM.SS</span>
        </div>
        <div className="w-1/3 text-center text-blue-100/80">
          2026 Bank Kiosk Secure Session
        </div>
        <div className="w-1/3 text-right"></div>
      </footer>
      
    </div>
  );
};

export default StartScreen;