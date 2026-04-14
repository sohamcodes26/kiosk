import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import { useLanguage } from '../../LanguageContext';

const MiniStatement = () => {
    const navigate = useNavigate();
    const { t } = useLanguage();
    const [transactions, setTransactions] = useState([]);
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
        const fetchMiniStatement = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/api/users/mini-statement/${userId}`);
                setTransactions(res.data.transactions);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchMiniStatement();
    }, []);

    const handleFinish = () => {
        navigate('/end-session', { state: { type: 'statement' } });
    };

    const formatSessionTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60).toString().padStart(2, '0');
        const seconds = (timeInSeconds % 60).toString().padStart(2, '0');
        return `${minutes}.${seconds}`;
    };

    return (
        <div className="flex flex-col h-screen w-full bg-[#e9eff6] font-sans">
            <Header userName={userName} />
            
            <main className="flex-grow flex flex-col items-center p-6 relative overflow-hidden">
                {/* Title */}
                <div className="w-full max-w-4xl flex items-center justify-center relative mb-4 mt-1">
                    <h2 className="text-2xl font-bold text-gray-800">
                        Mini Statement
                    </h2>
                </div>

                {/* Main Card */}
                <div className="bg-white w-full max-w-4xl rounded-xl shadow-lg border border-gray-100 flex flex-col h-[520px] overflow-hidden">
                    
                    {/* List Header */}
                    <div className="bg-[#004b9b] text-white px-8 py-4 flex justify-between items-center z-10 shadow-sm">
                        <div>
                            <p className="text-blue-100/60 text-[10px] font-bold uppercase mb-0.5">Account</p>
                            <h3 className="text-lg font-bold">MSB **** 4567 • Savings</h3>
                        </div>
                        <div className="text-right">
                            <p className="text-blue-100/60 text-[10px] font-bold uppercase mb-0.5">Transactions</p>
                            <h3 className="text-lg font-bold italic">Last 5 Activities</h3>
                        </div>
                    </div>

                    {/* Transaction List */}
                    <div className="flex-grow overflow-y-auto p-6 bg-[#f8fafc]">
                        {loading ? (
                            <div className="space-y-3 animate-pulse">
                                {[1,2,3,4,5].map(i => (
                                    <div key={i} className="h-14 bg-gray-100 rounded-lg w-full"></div>
                                ))}
                            </div>
                        ) : transactions.length > 0 ? (
                            <div className="space-y-3">
                                {transactions.map((tx, idx) => (
                                    <div key={idx} className={`p-4 rounded-xl flex justify-between items-center bg-white border border-gray-100 shadow-sm transition-all hover:bg-gray-50 active:scale-[0.99] group`}>
                                        <div className="flex items-center gap-4">
                                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-[10px] shadow-sm ${tx.type === 'DEPOSIT' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-rose-50 text-rose-600 border border-rose-100'}`}>
                                                {tx.type === 'DEPOSIT' ? 'DEP' : 'WTH'}
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-gray-800 tracking-wide group-hover:text-[#004b9b] transition-colors">{tx.type} • {tx.subType || "Core Banking"}</p>
                                                <p className="text-gray-400 text-[10px] font-bold uppercase mt-0.5">{new Date(tx.createdAt).toLocaleDateString()} • {new Date(tx.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                            </div>
                                        </div>
                                        <div className={`text-xl font-bold ${tx.type === 'DEPOSIT' ? 'text-emerald-500' : 'text-rose-500'}`}>
                                            ₹ {tx.amount.toLocaleString('en-IN')}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-16">
                                <h3 className="text-gray-400 font-bold text-xs uppercase tracking-widest">No recent transactions found</h3>
                            </div>
                        )}
                    </div>

                    {/* Footer Controls */}
                    <div className="px-8 py-4 border-t bg-gray-50 flex gap-4 z-10 shadow-sm">
                        <button 
                            onClick={() => window.print()}
                            className="flex-1 bg-white border border-gray-200 text-[#004b9b] font-bold py-3 rounded-lg shadow-sm hover:bg-gray-100 transition-all uppercase tracking-wider active:scale-95 text-sm"
                        >
                            Print Summary
                        </button>
                        <button 
                            onClick={handleFinish}
                            className="flex-1 bg-[#22c55e] hover:bg-green-600 text-white font-bold py-3 rounded-lg shadow-sm transition-all uppercase tracking-wider active:scale-95 text-sm"
                        >
                            Finish & Logout
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

export default MiniStatement;
