import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Phone, Lock, ArrowLeft, Delete, CheckCircle2 } from 'lucide-react';

const ManualLogin = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [mode, setMode] = useState(location.state?.mode || 'phone'); // 'phone' or 'pin'
    const [inputValue, setInputValue] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);

    const maxLength = mode === 'phone' ? (isOtpSent ? 6 : 10) : 6;

    const handleNumberClick = (num) => {
        if (inputValue.length < maxLength) {
            setInputValue(prev => prev + num);
        }
    };

    const handleDelete = () => {
        setInputValue(prev => prev.slice(0, -1));
    };

    const handleContinue = () => {
        if (mode === 'phone' && !isOtpSent && inputValue.length === 10) {
            setIsOtpSent(true);
            setInputValue('');
        } else if (inputValue.length === maxLength) {
            // Simulate successful login
            navigate('/language');
        }
    };

    return (
        <div className="flex flex-col h-screen w-full font-sans bg-[#e9eff6]">
            {/* Header */}
            <header className="flex justify-between items-center bg-[#004b9b] text-white px-8 py-5 shadow-lg z-20">
                <div className="flex items-center gap-5">
                    <button 
                        onClick={() => navigate('/')}
                        className="p-2.5 bg-white/10 hover:bg-white/20 rounded-xl transition-all active:scale-95 border border-white/20"
                    >
                        <ArrowLeft size={28} />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight uppercase">Manual Authentication</h1>
                        <p className="text-xs text-blue-100 font-medium tracking-widest opacity-80 uppercase">Secured by MSB Shield</p>
                    </div>
                </div>
                <div className="bg-white/10 px-6 py-2 rounded-xl backdrop-blur-sm border border-white/20">
                    <p className="text-sm font-bold uppercase tracking-widest">Kiosk Terminal</p>
                    <p className="text-[10px] text-blue-100 opacity-80">ID: MSB-K-402</p>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow flex items-center justify-center p-6 relative overflow-hidden">
                <div className="bg-white rounded-3xl shadow-xl w-full max-w-4xl py-8 px-12 flex gap-10 z-10 border border-gray-100">
                    
                    {/* Left Column: Input Display */}
                    <div className="w-1/2 flex flex-col justify-center">
                        <div className="mb-6">
                            <div className="bg-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-4 shadow-inner">
                                {mode === 'phone' ? (
                                    <Phone size={32} className="text-[#004b9b]" />
                                ) : (
                                    <Lock size={32} className="text-[#004b9b]" />
                                )}
                            </div>
                            <h2 className="text-3xl font-bold text-gray-800 leading-tight mb-2">
                                {mode === 'phone' 
                                    ? (isOtpSent ? "Enter OTP Code" : "Phone Number") 
                                    : "Enter Security PIN"}
                            </h2>
                            <p className="text-gray-500 text-base font-semibold">
                                {mode === 'phone' 
                                    ? (isOtpSent ? "We've sent a 6-digit code to your mobile." : "Please enter your registered 10-digit mobile number.")
                                    : "Enter your 6-digit account security PIN."}
                            </p>
                        </div>

                        <div className="relative">
                            <div className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl p-6 flex items-center justify-center min-h-[90px] shadow-inner mb-6">
                                <span className={`text-4xl font-bold ${inputValue ? 'text-gray-800' : 'text-gray-300'}`}>
                                    {mode === 'pin' || isOtpSent 
                                        ? "•".repeat(inputValue.length) + "•".repeat(maxLength - inputValue.length)
                                        : inputValue || "0000000000"}
                                </span>
                            </div>

                            <button
                                onClick={handleContinue}
                                disabled={inputValue.length !== maxLength}
                                className={`w-full py-4 rounded-2xl font-bold text-xl uppercase transition-all shadow-md flex items-center justify-center gap-3 ${
                                    inputValue.length === maxLength 
                                    ? 'bg-[#004b9b] text-white hover:bg-[#003d7e] active:scale-[0.98]' 
                                    : 'bg-gray-100 text-gray-300 cursor-not-allowed'
                                }`}
                            >
                                Continue <CheckCircle2 size={24} />
                            </button>
                        </div>
                    </div>

                    {/* Right Column: Keypad */}
                    <div className="w-1/2 bg-gray-50/50 rounded-3xl p-6 border border-gray-100 shadow-inner">
                        <div className="grid grid-cols-3 gap-4">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                                <button
                                    key={num}
                                    onClick={() => handleNumberClick(num)}
                                    className="h-20 bg-white rounded-2xl text-2xl font-bold text-gray-800 shadow-sm hover:shadow-md hover:bg-gray-50 active:scale-90 transition-all border border-gray-100/50"
                                >
                                    {num}
                                </button>
                            ))}
                            <button
                                onClick={handleDelete}
                                className="h-20 bg-rose-50 rounded-2xl text-rose-600 flex items-center justify-center active:scale-90 transition-all border border-rose-100/50 hover:bg-rose-100"
                            >
                                <Delete size={32} strokeWidth={2.5} />
                            </button>
                            <button
                                onClick={() => handleNumberClick(0)}
                                className="h-20 bg-white rounded-2xl text-2xl font-bold text-gray-800 shadow-sm hover:shadow-md hover:bg-gray-50 active:scale-90 transition-all border border-gray-100/50"
                            >
                                0
                            </button>
                            <button
                                onClick={() => {
                                    setInputValue('');
                                    setIsOtpSent(false);
                                }}
                                className="h-20 bg-white rounded-2xl text-lg font-bold text-[#004b9b] shadow-sm hover:shadow-md hover:bg-gray-50 active:scale-90 transition-all border border-gray-100/50 uppercase"
                            >
                                Clear
                            </button>
                        </div>
                    </div>
                </div>

                {/* Switch Login Method */}
                <div className="absolute bottom-10 flex gap-4">
                    <button 
                        onClick={() => {
                            setMode(mode === 'phone' ? 'pin' : 'phone');
                            setInputValue('');
                            setIsOtpSent(false);
                        }}
                        className="bg-white/90 backdrop-blur-md px-6 py-2.5 rounded-xl border border-gray-200 text-[#004b9b] font-bold text-xs uppercase shadow-lg hover:bg-white transition-all active:scale-95"
                    >
                        Switch to {mode === 'phone' ? 'PIN Login' : 'Phone Login'}
                    </button>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-[#004b9b] text-white px-8 py-3 text-center text-[10px] font-bold uppercase opacity-60">
                Maharashtra State Bank • Secure Multi-Factor Authentication
            </footer>
        </div>
    );
};

export default ManualLogin;
