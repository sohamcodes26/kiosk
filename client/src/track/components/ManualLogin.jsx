import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, Lock, ArrowLeft, CheckCircle2 } from 'lucide-react';

const ManualLogin = () => {
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState('');
    const [isOtpStep, setIsOtpStep] = useState(false);

    const handleInputChange = (e) => {
        const val = e.target.value.replace(/\D/g, ''); // Allow only numbers
        const maxLength = isOtpStep ? 4 : 10;
        if (val.length <= maxLength) {
            setInputValue(val);
        }
    };

    const handleContinue = () => {
        if (!isOtpStep && inputValue.length === 10) {
            setIsOtpStep(true);
            setInputValue('');
        } else if (isOtpStep && inputValue.length === 4) {
            navigate('/language');
        }
    };

    const isButtonDisabled = isOtpStep ? inputValue.length !== 4 : inputValue.length !== 10;

    return (
        <div className="flex flex-col h-screen w-full font-sans bg-[#e9eff6]">
            {/* Header */}
            <header className="flex justify-between items-center bg-[#004b9b] text-white px-8 py-5 shadow-lg z-20">
                <div className="flex items-center gap-5">
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
                <div className="bg-white rounded-3xl shadow-xl w-full max-w-2xl py-8 px-12 flex flex-col z-10 border border-gray-100 relative">
                    
                    {/* Back Button inside the white box */}
                    <button 
                        onClick={() => isOtpStep ? setIsOtpStep(false) : navigate('/')}
                        className="absolute top-6 left-6 p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-800 rounded-full transition-all active:scale-95"
                        aria-label="Go back"
                    >
                        <ArrowLeft size={28} />
                    </button>

                    {/* Input Display */}
                    <div className="w-full flex flex-col justify-center text-center items-center mt-4">
                        <div className="mb-8 flex flex-col items-center">
                            <div className="bg-blue-50 w-20 h-20 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
                                {isOtpStep ? (
                                    <Lock size={40} className="text-[#004b9b]" />
                                ) : (
                                    <Phone size={40} className="text-[#004b9b]" />
                                )}
                            </div>
                            <h2 className="text-3xl font-bold text-gray-800 leading-tight mb-2">
                                {isOtpStep ? "Enter OTP Code" : "Phone Number Login"}
                            </h2>
                            <p className="text-gray-500 text-base font-semibold">
                                {isOtpStep 
                                    ? "Please enter the 4-digit code sent to your mobile." 
                                    : "Please enter your 10-digit mobile number to proceed."
                                }
                            </p>
                        </div>

                        <div className="relative w-full max-w-md">
                            <div className="mb-8">
                                <input 
                                    type="text"
                                    inputMode="numeric"
                                    value={inputValue}
                                    onChange={handleInputChange}
                                    placeholder={isOtpStep ? "Enter 4-digit OTP" : "Enter 10-digit phone number"}
                                    className="w-full bg-white border-2 border-gray-300 rounded-2xl p-6 text-center text-4xl font-bold text-gray-800 shadow-sm focus:border-[#004b9b] focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all placeholder:text-gray-300 placeholder:text-2xl placeholder:font-normal"
                                />
                            </div>

                            <button
                                onClick={handleContinue}
                                disabled={isButtonDisabled}
                                className={`w-full py-4 rounded-2xl font-bold text-xl uppercase transition-all shadow-md flex items-center justify-center gap-3 ${
                                    !isButtonDisabled
                                    ? 'bg-[#004b9b] text-white hover:bg-[#003d7e] active:scale-[0.98]' 
                                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                }`}
                            >
                                {isOtpStep ? "Verify OTP" : "Continue"} <CheckCircle2 size={24} />
                            </button>
                        </div>
                    </div>
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
