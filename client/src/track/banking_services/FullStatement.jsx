import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import { useLanguage } from '../../LanguageContext';
import { Calendar, Search, FileText , ArrowLeft } from 'lucide-react';

const FullStatement = () => {
    const navigate = useNavigate();
    const { t } = useLanguage();
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [sessionTime, setSessionTime] = useState(0);
    const userId = "demoUser123";
    const userName = "Soham Kolte";

    useEffect(() => {
        const timer = setInterval(() => {
          setSessionTime((prevTime) => prevTime + 1);
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const fetchStatement = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`http://localhost:8000/api/users/statement?userId=${userId}&startDate=${startDate}&endDate=${endDate}`);
            setTransactions(res.data.transactions);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

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
                <div className="w-full max-w-[90rem] flex items-center justify-center relative mb-8 mt-4 px-12">
                    
                        <button 
                            onClick={() => navigate('/services')} 
                            className="absolute left-[3rem] p-2 hover:bg-blue-100 rounded-full transition-colors z-10"
                        >
                            <ArrowLeft size={36} className="text-gray-700" />
                        </button>
                        <h2 className="text-2xl font-bold text-gray-800">
                        Account Statement
                    </h2>
                </div>

                {/* Filters Card */}
                <div className="bg-white w-full max-w-5xl rounded-xl shadow-md border border-gray-100 p-6 mb-4 flex items-end gap-10">
                    <div className="flex-grow grid grid-cols-2 gap-8">
                        <div>
                            <label className="text-gray-400 text-[10px] font-bold uppercase mb-2 block ml-1">
                                <Calendar size={12} className="inline mr-2 text-[#004b9b]" /> From Date
                            </label>
                            <input 
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="w-full bg-gray-50 border border-gray-100 rounded-lg p-3 text-base font-bold text-gray-800 focus:border-[#004b9b] outline-none"
                            />
                        </div>
                        <div>
                            <label className="text-gray-400 text-[10px] font-bold uppercase mb-2 block ml-1">
                                <Calendar size={12} className="inline mr-2 text-[#004b9b]" /> To Date
                            </label>
                            <input 
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="w-full bg-gray-50 border border-gray-100 rounded-lg p-3 text-base font-bold text-gray-800 focus:border-[#004b9b] outline-none"
                            />
                        </div>
                    </div>
                    <button 
                        onClick={fetchStatement}
                        className="bg-[#004b9b] hover:bg-[#003d7e] text-white px-8 py-3 rounded-lg flex items-center gap-2 font-bold text-base shadow-sm transition-all active:scale-95 uppercase tracking-wider"
                    >
                        Search <Search size={18} />
                    </button>
                </div>

                {/* Results Card */}
                <div className="bg-white w-full max-w-5xl rounded-xl shadow-lg border border-gray-100 flex flex-col h-[320px] overflow-hidden">
                    <div className="flex-grow overflow-y-auto bg-[#f8fafc]">
                        {loading ? (
                            <div className="p-8 space-y-3 animate-pulse">
                                {[1,2,3,4].map(i => (
                                    <div key={i} className="h-12 bg-gray-100 rounded-lg w-full"></div>
                                ))}
                            </div>
                        ) : transactions.length > 0 ? (
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-[#004b9b] text-white text-[10px] uppercase tracking-wider sticky top-0 z-10 font-bold">
                                    <tr>
                                        <th className="px-6 py-4">Date & Time</th>
                                        <th className="px-6 py-4">Type</th>
                                        <th className="px-6 py-4">Method</th>
                                        <th className="px-6 py-4 text-right">Amount</th>
                                    </tr>
                                </thead>
                                <tbody className="text-xs font-bold text-gray-700 divide-y divide-gray-100 italic">
                                    {transactions.map((tx, idx) => (
                                        <tr key={idx} className="bg-white hover:bg-blue-50/50 transition-colors group">
                                            <td className="px-6 py-4">
                                                {new Date(tx.createdAt).toLocaleDateString()}
                                                <span className="block text-[8px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">
                                                    {new Date(tx.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${tx.type === 'DEPOSIT' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-rose-50 text-rose-600 border border-rose-100'}`}>
                                                    {tx.type}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-gray-400 font-bold">{tx.subType || "CORE_TX"}</td>
                                            <td className={`px-6 py-4 text-right text-lg font-bold ${tx.type === 'DEPOSIT' ? 'text-emerald-500' : 'text-rose-500'}`}>
                                                ₹ {tx.amount.toLocaleString('en-IN')}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full text-gray-300 opacity-20">
                                <FileText size={100} strokeWidth={1} />
                                <h3 className="text-lg font-bold uppercase tracking-widest mt-4">Select Date Range</h3>
                            </div>
                        )}
                    </div>

                    {/* Footer Controls */}
                    <div className="px-8 py-4 border-t bg-gray-50 flex gap-6 z-10 shadow-sm justify-end">
                        <button 
                            onClick={handleFinish}
                            className="bg-[#22c55e] hover:bg-green-600 text-white font-bold py-3 px-12 rounded-lg shadow-sm transition-all uppercase tracking-wider active:scale-95 text-sm"
                        >
                            Complete Session
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

export default FullStatement;
