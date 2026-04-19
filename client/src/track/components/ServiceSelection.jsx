import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import { useLanguage } from '../../LanguageContext';
import useSpeech from './useSpeech';

const ServiceSelection = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();

  const [sessionTime, setSessionTime] = useState(0);
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

  const handleServiceClick = (serviceName) => {
    if (serviceName === 'Withdrawal')              navigate('/withdrawal');
    else if (serviceName === 'Cash Deposit')       navigate('/deposit-cash');
    else if (serviceName === 'Cheque Deposit')     navigate('/deposit-cheque');
    else if (serviceName === 'Demand Draft')       navigate('/deposit-dd');
    else if (serviceName === 'Request ATM Card')   navigate('/request-atm');
    else if (serviceName === 'Request Cheque Book')navigate('/request-chequebook');
    else if (serviceName === 'Update Mobile No.')  navigate('/update-mobile');
    else if (serviceName === 'Balance Inquiry')    navigate('/balance-inquiry');
    else if (serviceName === 'Mini Statement')     navigate('/mini-statement');
    else if (serviceName === 'Bank Statement')     navigate('/full-statement');
    else if (serviceName === 'Fixed Deposit')      navigate('/fixed-deposit');
  };

  /* ── Reusable service button ── */
  const SvcButton = ({ label, name, color, icon }) => (
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
        borderRadius: 0,
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
      borderTop: `3px solid ${accentColor}`,
      borderRadius: 0,
      display: 'flex',
      flexDirection: 'column',
      maxHeight: 480,
      overflow: 'hidden',
      boxShadow: '0 2px 12px rgba(13,42,94,0.08)',
    }}>
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
          fontSize: 15,
          color: '#0d1f3c',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
        }}>
          {headerLabel}
        </span>
      </div>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        padding: '20px',
        flex: 1,
        overflowY: 'auto'
      }}>
        {children}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-screen w-full font-sans bg-[#e9eff6]">
      <Header userName={userName} />

      <div style={{ padding: '24px 40px 32px', textAlign: 'center' }}>
        <h2 style={{ fontSize: 32, fontWeight: 700, color: '#0d1f3c', margin: 0 }}>
          {t.selectService}
        </h2>
        <div style={{ width: 60, height: 3, background: '#004b9b', margin: '8px auto 0' }} />
      </div>

      <main style={{
        flex: 1,
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 340px)',
        justifyContent: 'center',
        gap: 24,
        padding: '0 24px 24px',
        minHeight: 0,
      }}>

        {/* CARD 1 — Cash Withdrawal */}
        <Card
          accentColor="#1558d6"
          headerBg="#f0f5ff"
          headerLabel={t.cashTransaction}
          headerIcon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1558d6" strokeWidth="2"><rect x="2" y="5" width="20" height="14"/><line x1="2" y1="10" x2="22" y2="10"/></svg>}
        >
          <SvcButton label={t.withdrawal} name="Withdrawal" color="#1558d6" icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><rect x="2" y="6" width="20" height="13"/><circle cx="12" cy="14" r="2" fill="white" stroke="none"/></svg>} />
        </Card>

        {/* CARD 2 — Deposit */}
        <Card
          accentColor="#0a7a48"
          headerBg="#f0faf4"
          headerLabel={t.depositTitle}
          headerIcon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0a7a48" strokeWidth="2"><rect x="3" y="3" width="18" height="18"/><path d="M12 16V8M8 12l4-4 4 4"/></svg>}
        >
          <SvcButton label={t.cash} name="Cash Deposit" color="#0a7a48" icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><rect x="2" y="6" width="20" height="13"/></svg>} />
          <SvcButton label={t.cheque} name="Cheque Deposit" color="#0a7a48" icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><rect x="2" y="4" width="20" height="16"/><line x1="7" y1="9" x2="17" y2="9"/></svg>} />
          <SvcButton label={t.demandDraft} name="Demand Draft" color="#0a7a48" icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><rect x="4" y="2" width="13" height="20"/></svg>} />
        </Card>

        {/* CARD 3 — Banking Services */}
        <Card
          accentColor="#0B4084"
          headerBg="#eef2ff"
          headerLabel="BANKING SERVICES"
          headerIcon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0B4084" strokeWidth="2"><rect x="3" y="10" width="18" height="9"/><path d="M3 10V6l9-3 9 3v4"/></svg>}
        >
          <SvcButton label="Balance Inquiry" name="Balance Inquiry" color="#0B4084" icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12" y2="16"/></svg>} />
          <SvcButton label="Mini Statement" name="Mini Statement" color="#0B4084" icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>} />
          <SvcButton label="Bank Statement" name="Bank Statement" color="#0B4084" icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><rect x="3" y="3" width="18" height="18"/><path d="M12 8v8M8 12h8"/></svg>} />
          <SvcButton label="Fixed Deposit" name="Fixed Deposit" color="#0B4084" icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>} />
        </Card>

        {/* CARD 4 — Customer Request */}
        <Card
          accentColor="#5130c0"
          headerBg="#f5f3ff"
          headerLabel={t.customerRequest}
          headerIcon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5130c0" strokeWidth="2"><circle cx="12" cy="7" r="4"/><path d="M4 21v-2a8 8 0 0 1 16 0v2"/></svg>}
        >
          <SvcButton label={t.requestAtm} name="Request ATM Card" color="#5130c0" icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><rect x="2" y="5" width="20" height="14"/></svg>} />
          <SvcButton label={t.requestChequeBook} name="Request Cheque Book" color="#5130c0" icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><rect x="3" y="3" width="13" height="18"/></svg>} />
          <SvcButton label={t.updateMobile} name="Update Mobile No." color="#5130c0" icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><rect x="7" y="2" width="10" height="20"/></svg>} />
        </Card>

      </main>

      <footer className="bg-[#004b9b] text-white px-6 py-2 flex justify-between items-center text-sm shadow-[0_-2px_10px_rgba(0,0,0,0.1)]">
        <div className="w-1/3 flex items-center">
          <span className="font-bold tracking-widest bg-white/10 px-2 py-0.5 rounded">
            {formatSessionTime(sessionTime)}
          </span>
        </div>
        <div className="w-1/3 text-center text-blue-100/90 text-xs tracking-wider uppercase">
          {t.secureSession}
        </div>
        <div className="w-1/3" />
      </footer>
    </div>
  );
};

export default ServiceSelection;
