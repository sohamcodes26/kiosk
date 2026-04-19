import React, { useState, useEffect } from 'react';
import { Layers, Fingerprint, Phone, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const StartScreen = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const navigate = useNavigate();

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
    <div className="flex flex-col h-screen w-full font-sans bg-[#e9eff6]">

      {/* Animation Styles */}
      <style>{`
        @keyframes scanline {
          0%   { top: 8px;  opacity: 0; }
          5%   { opacity: 1; }
          95%  { opacity: 1; }
          100% { top: calc(100% - 8px); opacity: 0; }
        }
        @keyframes pulseRing {
          0%   { transform: scale(1);   opacity: 0.6; }
          100% { transform: scale(1.18); opacity: 0; }
        }
        .scan-line {
          animation: scanline 2.2s ease-in-out infinite;
        }
        .pulse-ring {
          animation: pulseRing 2.2s ease-out infinite;
        }
      `}</style>

      {/* Header */}
      <header className="flex justify-between items-center bg-[#004b9b] text-white px-8 py-5 shadow-lg z-20">
        <div className="flex items-center gap-5">
          <div className="bg-white/10 p-2.5 rounded-xl backdrop-blur-sm border border-white/20">
            <Layers size={28} className="text-white" strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight uppercase">Bank of Maharashtra</h1>
            <p className="text-xs text-blue-100 font-medium tracking-widest opacity-80 uppercase">One Family One Bank</p>
          </div>
        </div>
        <div className="text-right bg-white/10 px-6 py-2 rounded-xl backdrop-blur-sm border border-white/20">
          <p className="text-xl font-bold tabular-nums tracking-tight">{formatTime(currentTime)}</p>
          <p className="text-[10px] text-blue-100 font-bold uppercase tracking-widest opacity-80">{formatDate(currentTime)}</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center p-8 relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[60%] bg-[#004b9b] opacity-[0.03] rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[60%] bg-[#004b9b] opacity-[0.03] rounded-full blur-3xl pointer-events-none"></div>

        <div className="bg-white rounded-3xl shadow-xl w-full max-w-3xl py-8 px-10 flex flex-col items-center text-center z-10 border border-gray-100">
          
          <div className="mb-4">
            <h2 className="text-[36px] font-bold text-gray-800 mb-1">
              Welcome / स्वागत आहे
            </h2>
            <div className="w-16 h-1 bg-[#004b9b] mx-auto rounded-full mb-4"></div>
            <p className="text-gray-600 text-base font-semibold">
              Please choose a secure login method to proceed
            </p>
          </div>

          <div className="flex flex-col items-center justify-center w-full mt-2">
            
            {/* Fingerprint Scanner Section - Main Emphasis */}
            <div className="flex flex-col items-center mb-4">
              <div
                onClick={() => navigate('/language')}
                className="relative cursor-pointer mb-4 group"
                style={{ width: 180, height: 180 }}
              >
                <span className="pulse-ring absolute inset-[-8px] rounded-full border-2 border-blue-400 opacity-40"></span>
                <div
                  className="relative w-full h-full rounded-full border-[6px] border-[#004b9b] bg-blue-50 flex items-center justify-center overflow-hidden group-hover:bg-blue-100 transition-all shadow-lg"
                >
                  <Fingerprint size={100} className="text-[#004b9b]" strokeWidth={1.5} />
                  <div className="scan-line absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent shadow-[0_0_15px_rgba(59,130,246,0.8)] z-10"></div>
                </div>
              </div>
              <p className="text-[#004b9b] font-bold text-xl uppercase mb-1">Biometric Scan</p>
              <p className="text-gray-500 text-sm font-medium italic">Touch sensor to authenticate</p>
            </div>

            {/* Alternative Login Options - Exactly below the scanner */}
            <div className="flex flex-row gap-6 w-full justify-center">
                <button
                  onClick={() => navigate('/manual-login', { state: { mode: 'phone' } })}
                  className="w-56 group bg-white border-2 border-gray-100 p-4 rounded-2xl flex items-center gap-4 hover:border-[#004b9b] hover:shadow-lg transition-all active:scale-[0.97] text-left"
                >
                  <div className="bg-blue-50 p-2.5 rounded-xl group-hover:bg-[#004b9b] transition-colors">
                    <Phone size={24} className="text-[#004b9b] group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="text-gray-800 font-bold text-base">Phone Login</p>
                  </div>
                </button>
            </div>

          </div>

          <div className="mt-8 w-full flex flex-col items-center gap-4">
             <div className="flex items-center gap-4 w-full max-w-md mb-1">
                <div className="flex-grow h-px bg-gray-200"></div>
                <span className="text-gray-400 font-bold text-[9px] uppercase tracking-widest">Information & Services</span>
                <div className="flex-grow h-px bg-gray-200"></div>
             </div>

             <button
              onClick={() => navigate('/brochure')}
              className="flex items-center gap-3 bg-white border-2 border-gray-200 text-gray-800 font-bold text-base px-10 py-3.5 rounded-xl hover:bg-gray-50 hover:border-[#004b9b] hover:text-[#004b9b] transition-all shadow-sm active:scale-95"
            >
              <div className="bg-blue-50 p-1.5 rounded-lg">
                <Layers size={20} strokeWidth={2.5} className="text-[#004b9b]" />
              </div>
              View Bank Products & Brochure
            </button>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#004b9b] text-white px-8 py-3 flex justify-between items-center text-xs font-bold tracking-[0.1em] uppercase z-20">
        <div className="w-1/3 flex items-center gap-2">
          <span className="opacity-60">Terminal ID:</span>
          <span className="text-blue-100">MSB-K-402</span>
        </div>
        <div className="w-1/3 text-center text-blue-100/70">
          © 2026 Maharashtra State Bank • Secure Session
        </div>
        <div className="w-1/3 text-right">
           <button
            onClick={() => navigate('/admin/login')}
            className="text-[10px] py-1 px-3 border border-white/30 rounded-md hover:bg-white/10 transition-colors"
          >
            Terminal Admin
          </button>
        </div>
      </footer>
    </div>
  );
};

export default StartScreen;