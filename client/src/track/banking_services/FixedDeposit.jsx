import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { useLanguage } from '../../LanguageContext';
import { Landmark, TrendingUp, Calendar, ArrowRightCircle } from 'lucide-react';

const FixedDeposit = () => {
    const navigate = useNavigate();
    const { t } = useLanguage();
    const [amount, setAmount] = useState('');
    const [duration, setDuration] = useState(12);
    const [balance, setBalance] = useState(0);
    const [loading, setLoading] = useState(true);
    const [sessionTime, setSessionTime] = useState(0);
    const [maturityAmount, setMaturityAmount] = useState(null);

    const userId = "demoUser123";
    const userName = "Soham Kolte";
    const interestRate = 6.5;

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

    const calculateMaturity = (amt, dur) => {
        if (!amt) return 0;
        return Number(amt) + (Number(amt) * interestRate * (dur / 12)) / 100;
    };

    const handleAmountChange = (val) => {
        setAmount(val);
        setMaturityAmount(calculateMaturity(val, duration));
    };

    const handleDurationChange = (val) => {
        setDuration(val);
        setMaturityAmount(calculateMaturity(amount, val));
    };

    const handleOpenFD = async () => {
        if (!amount || amount < 1000) {
            alert("Min FD amount is ₹1,000");
            return;
        }
        if (amount > balance) {
            alert("Insufficient balance");
            return;
        }

        try {
            await axios.post('http://localhost:8000/api/users/fd', {
                userId,
                amount: Number(amount),
                duration: Number(duration)
            });
            navigate('/end-session', { state: { type: 'fd' } });
        } catch (err) {
            console.error(err);
            alert("FD Creation Failed");
        }
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
                <div className="w-full max-w-5xl flex items-center justify-center relative mb-4">
                    <h2 className="text-2xl font-bold text-gray-800">
                        Fixed Deposit (FD)
                    </h2>
                </div>

                <div className="w-full max-w-5xl grid grid-cols-12 gap-6 h-[500px]">
                    
                    {/* Left Panel: Calculator */}
                    <div className="col-span-7 bg-white rounded-xl shadow-md border border-gray-100 p-8 flex flex-col">
                        <div className="flex-grow space-y-8">
                            <div>
                                <label className="text-gray-400 text-[10px] font-bold uppercase mb-2 block ml-1">
                                    <Landmark size={12} className="inline mr-2 text-[#004b9b]" /> Deposit Amount
                                </label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl font-bold text-gray-300">₹</span>
                                    <input 
                                        type="number"
                                        placeholder="Min 1,000"
                                        value={amount}
                                        onChange={(e) => handleAmountChange(e.target.value)}
                                        className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 pl-10 text-xl font-bold text-gray-800 focus:border-[#004b9b] outline-none shadow-inner"
                                    />
                                </div>
                                <div className="flex justify-between mt-2 px-1">
                                    <p className="text-[10px] text-gray-400 font-bold uppercase">Available Balance</p>
                                    <p className="text-[10px] text-[#004b9b] font-bold uppercase italic">₹ {balance?.toLocaleString('en-IN')}</p>
                                </div>
                            </div>

                            <div>
                                <label className="text-gray-400 text-[10px] font-bold uppercase mb-4 block ml-1">
                                    <Calendar size={12} className="inline mr-2 text-[#004b9b]" /> Duration (Months)
                                </label>
                                <div className="grid grid-cols-4 gap-3">
                                    {[6, 12, 24, 36].map(m => (
                                        <button 
                                            key={m}
                                            onClick={() => handleDurationChange(m)}
                                            className={`p-4 rounded-xl border-2 font-bold text-base transition-all active:scale-[0.98] ${duration === m ? 'bg-[#004b9b] text-white border-[#004b9b] shadow-md' : 'bg-gray-50 text-gray-400 border-gray-100'}`}
                                        >
                                            {m} M
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <button 
                            onClick={handleOpenFD}
                            className="bg-[#22c55e] hover:bg-green-600 text-white w-full py-4 rounded-lg font-bold text-lg uppercase shadow-md active:scale-[0.98] transition-all flex items-center justify-center gap-3"
                        >
                            Open Fixed Deposit <ArrowRightCircle size={24} />
                        </button>
                    </div>

                    {/* Right Panel: Summary */}
                    <div className="col-span-5 flex flex-col gap-4">
                        <div className="bg-[#004b9b] rounded-xl shadow-lg p-8 text-white flex-grow relative overflow-hidden">
                           <TrendingUp className="absolute right-[-20px] top-[-20px] text-white/5 w-48 h-48" />
                           <div className="relative z-10">
                                <p className="text-blue-100/40 text-[10px] font-bold uppercase mb-1">Current Rate</p>
                                <h3 className="text-3xl font-bold italic">{interestRate}% <span className="text-[10px] font-bold opacity-60 not-italic uppercase">p.a</span></h3>
                                
                                <div className="mt-10 space-y-6">
                                    <div>
                                        <p className="text-blue-100/40 text-[10px] font-bold uppercase mb-1">Duration</p>
                                        <p className="text-xl font-bold">{duration} Months</p>
                                    </div>
                                    <div className="pt-6 border-t border-white/10">
                                        <p className="text-blue-100/40 text-[10px] font-bold uppercase mb-2">Estimated Maturity</p>
                                        <h4 className="text-4xl font-bold leading-tight text-white mb-1">
                                            ₹ {maturityAmount?.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                                        </h4>
                                        <p className="text-[8px] text-blue-100/30 uppercase font-bold italic">Principal + Interest</p>
                                    </div>
                                </div>
                           </div>
                        </div>

                        <div className="bg-white rounded-xl border border-gray-100 p-6 flex items-center gap-4 shadow-sm">
                            <div className="bg-blue-50 p-3 rounded-lg">
                                <TrendingUp size={24} className="text-[#004b9b]" />
                            </div>
                            <div>
                                <p className="text-gray-400 text-[10px] font-bold uppercase mb-0.5 italic">Tax Benefit</p>
                                <p className="text-gray-800 font-bold text-xs uppercase leading-tight">Secured by MSB Guarantee</p>
                            </div>
                        </div>
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

export default FixedDeposit;
