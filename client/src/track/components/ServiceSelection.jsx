import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoutScreen from './LogoutScreen';
import { useLanguage } from '../../LanguageContext';
import useSpeech from './useSpeech';

const ServiceSelection = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();

  const [sessionTime, setSessionTime] = useState(0);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const userName = "Soham Kolte";

  useSpeech(t.selectService);

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

  const handleLogout = () => setIsLogoutOpen(true);

  const handleServiceClick = (serviceName) => {
    if (serviceName === 'Withdrawal')              navigate('/withdrawal');
    else if (serviceName === 'Cash Deposit')       navigate('/deposit-cash');
    else if (serviceName === 'Cheque Deposit')     navigate('/deposit-cheque');
    else if (serviceName === 'Demand Draft')       navigate('/deposit-dd');
    else if (serviceName === 'Request ATM Card')   navigate('/request-atm');
    else if (serviceName === 'Request Cheque Book')navigate('/request-chequebook');
    else if (serviceName === 'Update Mobile No.')  navigate('/update-mobile');
  };

  const buttonStyle = "bg-white text-[#0B4084] font-bold py-4 px-2 rounded-md shadow-md border border-gray-200 hover:bg-blue-50 hover:shadow-lg hover:border-blue-300 transition-all active:scale-95 w-full";

  /* ── Reusable service button ── */
  const SvcButton = ({ label, name, color, hoverColor, icon }) => (
    <button
      onClick={() => handleServiceClick(name)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        width: '100%',
        padding: '14px 18px',
        background: color,
        border: 'none',
        borderRadius: 0,                      /* square — no rounded corners */
        cursor: 'pointer',
        fontFamily: 'inherit',
        fontSize: 18,
        fontWeight: 600,
        color: '#ffffff',
        textAlign: 'left',
        letterSpacing: '0.01em',
        transition: 'filter 0.15s, transform 0.1s',
        boxShadow: '0 2px 6px rgba(0,0,0,0.18)',
      }}
      onMouseEnter={e => e.currentTarget.style.filter = 'brightness(1.1)'}
      onMouseLeave={e => e.currentTarget.style.filter = 'brightness(1)'}
      onMouseDown={e => e.currentTarget.style.transform = 'scale(0.98)'}
      onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
    >
      {/* icon box */}
      <span style={{
        width: 34, height: 34,
        background: 'rgba(255,255,255,0.18)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
        borderRadius: 0,
      }}>
        {icon}
      </span>
      <span style={{ flex: 1 }}>{label}</span>
      {/* chevron */}
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
        stroke="rgba(255,255,255,0.75)" strokeWidth="2.5" strokeLinecap="square">
        <polyline points="9 18 15 12 9 6"/>
      </svg>
    </button>
  );

  /* ── Card wrapper ── */
  const Card = ({ accentColor, headerBg, headerIcon, headerLabel, children }) => (
    <div style={{
      flex: 1,
      background: '#ffffff',
      border: '1.5px solid #cdd8ea',
      borderTop: `3px solid ${accentColor}`,   /* top accent stripe per card */
      borderRadius: 0,
      display: 'flex',
      flexDirection: 'column',
      maxHeight: 420,
      overflow: 'hidden',
      boxShadow: '0 2px 12px rgba(13,42,94,0.08)',
    }}>
      {/* card header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '16px 20px',
        background: headerBg,
        borderBottom: '1.5px solid #dce8f5',
      }}>
        <span style={{
          width: 38, height: 38,
          background: 'rgba(255,255,255,0.6)',
          border: `1.5px solid ${accentColor}30`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
          borderRadius: 0,
        }}>
          {headerIcon}
        </span>
        <span style={{
          fontWeight: 800,
          fontSize: 17,
          color: '#0d1f3c',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
        }}>
          {headerLabel}
        </span>
      </div>

      {/* divider under header */}
      <div style={{ height: 1, background: '#dce8f5' }} />

      {/* button list */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        maxHeight: 300,
        gap: 20,
        padding: '20px 20px',
        flex: 1,
      }}>
        {children}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-screen w-full font-sans bg-[#e9eff6]">
      <LogoutScreen
        isOpen={isLogoutOpen}
        onClose={() => setIsLogoutOpen(false)}
      />

      {/* ── Header ── */}
      <header className="flex justify-between items-center bg-[#004b9b] text-white px-6 py-4 shadow-md">
        <h1 className="text-xl font-semibold tracking-wide">
          {t.welcome}, {userName}
        </h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white text-sm font-medium px-4 py-1.5 rounded shadow-sm transition-colors"
        >
          {t.logout}
        </button>
      </header>

      {/* ── Page title ── */}
      <div style={{
        padding: '32px 40px 48px',
        textAlign: 'center',
      }}>
        <h2 style={{
          fontSize: 36,
          fontWeight: 700,
          color: '#0d1f3c',
          letterSpacing: '-0.01em',
          margin: 0,
        }}>
          {t.selectService}
        </h2>
        {/* rule under title */}
        <div style={{
          width: 60, height: 3,
          background: '#004b9b',
          margin: '8px auto 0',
        }} />
      </div>

      {/* ── 3-column cards ── */}
      <main style={{
        flex: 1,
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 400px)',
        justifyContent: 'center',
        gap: 32,
        padding: '0 32px 24px',
        minHeight: 0,
      }}>

        {/* ── CARD 1 — Withdrawal ── */}
        <Card
          accentColor="#1558d6"
          headerBg="#f0f5ff"
          headerLabel={t.cashTransaction}
          headerIcon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
              stroke="#1558d6" strokeWidth="1.8" strokeLinecap="square" strokeLinejoin="miter">
              <rect x="2" y="5" width="20" height="14"/>
              <line x1="2" y1="10" x2="22" y2="10"/>
              <line x1="6" y1="10" x2="6" y2="19"/>
              <line x1="18" y1="10" x2="18" y2="19"/>
              <circle cx="12" cy="14" r="2" fill="#1558d6" stroke="none"/>
            </svg>
          }
        >
          <SvcButton
            label={t.withdrawal}
            name="Withdrawal"
            color="#1558d6"
            icon={
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                stroke="#fff" strokeWidth="2" strokeLinecap="square">
                <rect x="2" y="6" width="20" height="13"/>
                <line x1="2" y1="10" x2="22" y2="10"/>
                <line x1="7" y1="10" x2="7" y2="19"/>
                <line x1="17" y1="10" x2="17" y2="19"/>
                <circle cx="12" cy="14" r="2" fill="white" stroke="none"/>
              </svg>
            }
          />
        </Card>

        {/* ── CARD 2 — Deposit ── */}
        <Card
          accentColor="#0a7a48"
          headerBg="#f0faf4"
          headerLabel={t.depositTitle}
          headerIcon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
              stroke="#0a7a48" strokeWidth="1.8" strokeLinecap="square" strokeLinejoin="miter">
              <rect x="3" y="3" width="18" height="18"/>
              <line x1="12" y1="16" x2="12" y2="8"/>
              <polyline points="8 12 12 8 16 12"/>
              <line x1="7" y1="19" x2="17" y2="19"/>
            </svg>
          }
        >
          <SvcButton
            label={t.cash}
            name="Cash Deposit"
            color="#0a7a48"
            icon={
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                stroke="#fff" strokeWidth="2" strokeLinecap="square">
                <rect x="2" y="6" width="20" height="13"/>
                <line x1="2" y1="10" x2="22" y2="10"/>
                <circle cx="12" cy="14" r="2" fill="white" stroke="none"/>
              </svg>
            }
          />
          <SvcButton
            label={t.cheque}
            name="Cheque Deposit"
            color="#0a7a48"
            icon={
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                stroke="#fff" strokeWidth="2" strokeLinecap="square">
                <rect x="2" y="4" width="20" height="16"/>
                <line x1="7" y1="9" x2="17" y2="9"/>
                <line x1="7" y1="13" x2="13" y2="13"/>
              </svg>
            }
          />
          <SvcButton
            label={t.demandDraft}
            name="Demand Draft"
            color="#0a7a48"
            icon={
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                stroke="#fff" strokeWidth="2" strokeLinecap="square">
                <rect x="4" y="2" width="13" height="20"/>
                <polyline points="13 2 13 8 17 8"/>
                <line x1="7" y1="12" x2="13" y2="12"/>
                <line x1="7" y1="16" x2="11" y2="16"/>
              </svg>
            }
          />
        </Card>

        {/* ── CARD 3 — Customer Request ── */}
        <Card
          accentColor="#5130c0"
          headerBg="#f5f3ff"
          headerLabel={t.customerRequest}
          headerIcon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
              stroke="#5130c0" strokeWidth="1.8" strokeLinecap="square" strokeLinejoin="miter">
              <circle cx="12" cy="7" r="4"/>
              <path d="M4 21v-2a8 8 0 0 1 16 0v2"/>
            </svg>
          }
        >
          <SvcButton
            label={t.requestAtm}
            name="Request ATM Card"
            color="#5130c0"
            icon={
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                stroke="#fff" strokeWidth="2" strokeLinecap="square">
                <rect x="2" y="5" width="20" height="14"/>
                <line x1="2" y1="10" x2="22" y2="10"/>
                <line x1="5" y1="15" x2="9" y2="15"/>
                <rect x="5" y="13" width="3" height="3" fill="white" stroke="none"/>
              </svg>
            }
          />
          <SvcButton
            label={t.requestChequeBook}
            name="Request Cheque Book"
            color="#5130c0"
            icon={
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                stroke="#fff" strokeWidth="2" strokeLinecap="square">
                <rect x="3" y="3" width="13" height="18"/>
                <rect x="6" y="3" width="13" height="18"/>
                <line x1="9" y1="8" x2="16" y2="8"/>
                <line x1="9" y1="12" x2="14" y2="12"/>
              </svg>
            }
          />
          <SvcButton
            label={t.updateMobile}
            name="Update Mobile No."
            color="#5130c0"
            icon={
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                stroke="#fff" strokeWidth="2" strokeLinecap="square">
                <rect x="7" y="2" width="10" height="20"/>
                <line x1="7" y1="6" x2="17" y2="6"/>
                <line x1="7" y1="18" x2="17" y2="18"/>
                <circle cx="12" cy="20" r="1" fill="white" stroke="none"/>
              </svg>
            }
          />
        </Card>

      </main>

      {/* ── Footer ── */}
      <footer className="bg-[#004b9b] text-white px-6 py-2 flex justify-between items-center text-sm shadow-[0_-2px_10px_rgba(0,0,0,0.1)]">
        <div className="w-1/3 flex items-center">
          <span className="font-bold tracking-widest bg-white/10 px-2 py-0.5 rounded">
            {formatSessionTime(sessionTime)}
          </span>
        </div>
        <div className="w-1/3 text-center text-blue-100/90 text-xs tracking-wider">
          {t.secureSession}
        </div>
        <div className="w-1/3" />
      </footer>

    </div>
  );
};

export default ServiceSelection;
