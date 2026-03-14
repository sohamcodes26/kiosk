import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StartScreen from "./track/StartScreen.jsx";
import LanguageSelection from "./track/components/LanguageSelection.jsx";
import ServiceSelection from "./track/components/ServiceSelection.jsx";
import EndSession from "./track/components/EndSession.jsx"; 

import WithdrawalCash from "./track/withdrawal/WithdrawalCash.jsx";
import WithdrawalSlipPreview from "./track/withdrawal/WithdrawalSlipPreview.jsx";

import DepositCash from "./track/deposit_cash/DepositCash.jsx";
import DepositCashPreview from "./track/deposit_cash/DepositCashPreview.jsx";

import DepositCheque from "./track/deposit_cheque/DepositCheque.jsx";
import DepositChequePreview from "./track/deposit_cheque/DepositChequePreview.jsx";

// Import your DD components
import DepositDD from "./track/deposit_DD/DepositDD.jsx";
import DepositDDPreview from "./track/deposit_DD/DepositDDPreview.jsx";
import { LanguageProvider } from './LanguageContext';

function App() {
  return (
    <LanguageProvider>
    <Router>
      <Routes>
        <Route path="/" element={<StartScreen />} />
        <Route path="/language" element={<LanguageSelection />} />
        <Route path="/services" element={<ServiceSelection />} />
        <Route path="/end-session" element={<EndSession />} />
        
        {/* Withdrawal Routes */}
        <Route path="/withdrawal" element={<WithdrawalCash />} />
        <Route path="/withdrawal-preview" element={<WithdrawalSlipPreview />} />
        
        {/* Cash Deposit Routes */}
        <Route path="/deposit-cash" element={<DepositCash />} />
        <Route path="/deposit-preview" element={<DepositCashPreview />} />
        
        {/* Cheque Deposit Routes */}
        <Route path="/deposit-cheque" element={<DepositCheque />} />
        <Route path="/deposit-cheque-preview" element={<DepositChequePreview />} />
        
        {/* Demand Draft Routes */}
        <Route path="/deposit-dd" element={<DepositDD />} />
        <Route path="/deposit-dd-preview" element={<DepositDDPreview />} />
      </Routes>
    </Router>
    </LanguageProvider>
  );
}

export default App;