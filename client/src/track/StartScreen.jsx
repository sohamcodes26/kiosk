import React, { useState, useEffect } from 'react';
import { Layers, Fingerprint, UserPlus } from 'lucide-react';
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
    <div className="flex flex-col h-screen w-full font-sans bg-gradient-to-br from-blue-50 to-blue-200">

      {/* scanning animation keyframes injected via style tag */}
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
        .pulse-ring-delay {
          animation: pulseRing 2.2s ease-out infinite 0.7s;
        }
      `}</style>

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

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl py-14 px-8 flex flex-col items-center text-center">

          <h2 className="text-4xl font-bold text-[#0B4084] mb-3">
            Welcome / स्वागत आहे
          </h2>
          <p className="text-gray-500 text-sm mb-10">
            Please scan your fingerprint to proceed safely.
          </p>

          {/* ── Fingerprint Scanner ── */}
          <div
            onClick={() => navigate('/language')}
            className="relative cursor-pointer mb-6"
            style={{ width: 200, height: 200 }}
          >
            {/* pulse rings behind the circle */}
            <span
              className="pulse-ring absolute inset-0 rounded-full border-2 border-blue-400"
              style={{ zIndex: 0 }}
            />
            <span
              className="pulse-ring-delay absolute inset-0 rounded-full border-2 border-blue-300"
              style={{ zIndex: 0 }}
            />

            {/* main circle */}
            <div
              className="relative w-full h-full rounded-full border-[3px] border-[#3B82F6] bg-blue-50 flex items-center justify-center overflow-hidden hover:bg-blue-100 transition-colors"
              style={{ zIndex: 1 }}
            >
              {/* fingerprint icon */}
              <Fingerprint size={120} className="text-[#0B4084]" strokeWidth={1.2} />

              {/* scanning overlay — top to bottom sweep */}
              <div
                className="scan-line absolute left-0 right-0 pointer-events-none"
                style={{
                  height: 3,
                  background: 'linear-gradient(90deg, transparent 0%, #3B82F6 20%, #60a5fa 50%, #3B82F6 80%, transparent 100%)',
                  boxShadow: '0 0 12px 4px rgba(59,130,246,0.55)',
                  borderRadius: 2,
                  zIndex: 2,
                }}
              />

              {/* subtle blue tint overlay that follows scan */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(180deg, rgba(59,130,246,0.06) 0%, rgba(59,130,246,0.02) 100%)',
                  zIndex: 1,
                }}
              />
            </div>
          </div>

          <p className="text-[#3B82F6] font-medium text-lg mb-10">
            Tap Fingerprint to Scan
          </p>

          {/* ── New Customer button (replaces rectangle) ── */}
          <button
            onClick={() => navigate('/new-customer')}
            className="flex items-center gap-3 bg-white border-2 border-[#0B4084] text-[#0B4084] font-semibold text-base px-8 py-3 rounded-xl hover:bg-[#0B4084] hover:text-white transition-all shadow-sm active:scale-95"
          >
            <UserPlus size={20} strokeWidth={2} />
            New Customer
          </button>

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