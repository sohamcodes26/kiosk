import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../../components/Header";
import { useLanguage } from "../../../LanguageContext";

const PinChange = () => {
    const navigate = useNavigate();
    const { t } = useLanguage();
    const [oldPin, setOldPin] = useState("");
    const [newPin, setNewPin] = useState("");
    const [confirmPin, setConfirmPin] = useState("");
    const [step, setStep] = useState(1); // 1: Old, 2: New, 3: Confirm
    const [loading, setLoading] = useState(false);
    const userId = "demoUser123";

    const handleKeypad = (val) => {
        if (step === 1 && oldPin.length < 4) setOldPin(oldPin + val);
        if (step === 2 && newPin.length < 4) setNewPin(newPin + val);
        if (step === 3 && confirmPin.length < 4) setConfirmPin(confirmPin + val);
    };

    const handleClear = () => {
        if (step === 1) setOldPin("");
        if (step === 2) setNewPin("");
        if (step === 3) setConfirmPin("");
    };

    const nextStep = () => {
        if (step === 1 && oldPin.length === 4) setStep(2);
        else if (step === 2 && newPin.length === 4) setStep(3);
        else if (step === 3 && confirmPin.length === 4) {
            if (newPin !== confirmPin) {
                alert("New PINs do not match!");
                setConfirmPin("");
                return;
            }
            handleSubmit();
        }
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const res = await axios.post(`http://localhost:8000/api/users/change-pin`, {
                userId,
                oldPin,
                newPin
            });
            if (res.data.success) {
                navigate('/end-session', { state: { type: 'pin-change' } });
            }
        } catch (err) {
            alert(err.response?.data?.message || "Failed to change PIN");
            setStep(1);
            setOldPin("");
            setNewPin("");
            setConfirmPin("");
        } finally {
            setLoading(false);
        }
    };

    const renderKeypad = () => (
        <div className="grid grid-cols-3 gap-3 w-full max-w-xs mx-auto mt-8">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, "C", 0, ">"].map((k, i) => (
                <button
                    key={i}
                    onClick={() => {
                        if (k === "C") handleClear();
                        else if (k === ">") nextStep();
                        else handleKeypad(k.toString());
                    }}
                    className={`h-16 text-xl font-bold rounded-xl shadow-sm active:scale-95 transition-all ${
                        k === ">" ? "bg-emerald-500 text-white" : k === "C" ? "bg-rose-500 text-white" : "bg-white text-[#004b9b] border border-gray-100"
                    }`}
                >
                    {k}
                </button>
            ))}
        </div>
    );

    return (
        <div className="flex flex-col h-screen w-full bg-[#e9eff6] font-sans">
            <Header />
            <main className="flex-grow flex items-center justify-center p-6">
                <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl p-10 text-center border-t-8 border-[#004b9b]">
                    <h2 className="text-2xl font-bold text-gray-800 mb-1">Change Secure PIN</h2>
                    <p className="text-gray-400 font-bold text-[10px] uppercase tracking-widest mb-8">Step {step} of 3</p>

                    <div className="space-y-5">
                        <p className="text-lg font-bold text-gray-700">
                            {step === 1 && "Enter Current 4-Digit PIN"}
                            {step === 2 && "Enter New 4-Digit PIN"}
                            {step === 3 && "Confirm New 4-Digit PIN"}
                        </p>

                        <div className="flex justify-center gap-5">
                            {[1, 2, 3, 4].map((_, i) => {
                                const val = step === 1 ? oldPin : step === 2 ? newPin : confirmPin;
                                return (
                                    <div key={i} className={`w-10 h-10 rounded-full border-2 flex items-center justify-center ${val.length > i ? 'bg-[#004b9b] border-[#004b9b]' : 'border-gray-100'}`}>
                                        {val.length > i && <div className="w-3 h-3 bg-white rounded-full"></div>}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {renderKeypad()}
                </div>
            </main>
        </div>
    );
};

export default PinChange;
