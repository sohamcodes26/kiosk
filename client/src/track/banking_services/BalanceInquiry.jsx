import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import { useLanguage } from '../../LanguageContext';

const BalanceInquiry = () => {
    const navigate = useNavigate();
    const { t } = useLanguage();
    const [balance, setBalance] = useState(null);
    const [loading, setLoading] = useState(true);
    const [sessionTime, setSessionTime] = useState(0);
    const userId = "demoUser123"; 
    const userName = "Soham Kolte";

    useEffect(() => {
        const timer = setInterval(() => {
          setSessionTime((prevTime) => prevTime + 1);
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/api/users/balance/${userId}`);
                setBalance(res.data.balance);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchBalance();
    }, []);

    const handleFinish = () => {
        navigate('/end-session', { state: { type: 'balance' } });
    };

    const formatSessionTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60).toString().padStart(2, '0');
        const seconds = (timeInSeconds % 60).toString().padStart(2, '0');
        return `${minutes}.${seconds}`;
    };

    return (
        <div className="flex flex-col h-screen w-full bg-[#e9eff6] font-sans">
            <Header userName={userName} />
            
            <main className="flex-grow flex flex-col items-center p-8 relative">
                {/* Title */}
                <div className="w-full max-w-4xl flex items-center justify-center relative mb-6 mt-2">
                    <h2 className="text-3xl font-bold text-gray-800">
                        Balance Inquiry
                    </h2>
                </div>

                {/* Main Card */}
                <div className="bg-white w-full max-w-3xl rounded-xl shadow-md border border-gray-100 p-8 flex flex-col items-center">
                    <div className="bg-blue-50/50 w-full rounded-2xl p-10 mb-8 border border-blue-100 flex flex-col items-center shadow-inner">
                        <p className="text-gray-500 font-bold text-sm uppercase mb-3">
                            Available Balance
                        </p>
                        {loading ? (
                            <div className="animate-pulse text-4xl font-bold text-gray-300">₹ --,---.--</div>
                        ) : (
                            <div className="text-5xl font-bold text-[#004b9b] leading-tight">
                                {balance !== null && balance !== undefined ? (
                                    `₹ ${balance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`
                                ) : (
                                    "₹ 0.00"
                                )}
                            </div>
                        )}
                    </div>

                    <button
                        onClick={handleFinish}
                        className="bg-[#22c55e] hover:bg-green-600 text-white font-bold text-lg py-4 px-16 rounded-lg shadow-md transition-all active:scale-95 uppercase"
                    >
                        Print Receipt & Finish
                    </button>

                    <p className="mt-8 text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                        Maharashtra State Bank • Secure Session
                    </p>
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

export default BalanceInquiry;
