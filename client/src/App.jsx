import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StartScreen from "./track/StartScreen.jsx";
import LanguageSelection from "./track/components/LanguageSelection.jsx";
import ServiceSelection from "./track/components/ServiceSelection.jsx";
import EndSession from "./track/components/EndSession.jsx"; 
import ManualLogin from "./track/components/ManualLogin.jsx";

import WithdrawalCash from "./track/withdrawal/WithdrawalCash.jsx";
import WithdrawalSlipPreview from "./track/withdrawal/WithdrawalSlipPreview.jsx";

import DepositCash from "./track/deposit_cash/DepositCash.jsx";
import DepositCashPreview from "./track/deposit_cash/DepositCashPreview.jsx";

import DepositCheque from "./track/deposit_cheque/DepositCheque.jsx";
import DepositChequePreview from "./track/deposit_cheque/DepositChequePreview.jsx";

import DepositDD from "./track/deposit_DD/DepositDD.jsx";
import DepositDDPreview from "./track/deposit_DD/DepositDDPreview.jsx";
import { LanguageProvider } from './LanguageContext';

import UpdateMobileNumber from "./track/customer_request/update_mobile/UpdateMobileNumber.jsx";
import RequestATM from "./track/customer_request/request_atm/RequestATM.jsx";
import RequestChequebook from "./track/customer_request/request_chequebook/RequestChequebook.jsx";
import PinChange from "./track/customer_request/pin_change/PinChange.jsx";

// Banking Services
import BalanceInquiry from "./track/banking_services/BalanceInquiry.jsx";
import MiniStatement from "./track/banking_services/MiniStatement.jsx";
import FullStatement from "./track/banking_services/FullStatement.jsx";
import FixedDeposit from "./track/banking_services/FixedDeposit.jsx";

// Brochure
import BankBrochure from "./track/brochure/BankBrochure.jsx";

// Admin Components
import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";

function App() {
  return (
    <LanguageProvider>
    <Router>
      <Routes>
        <Route path="/" element={<StartScreen />} />
        <Route path="/language" element={<LanguageSelection />} />
        <Route path="/manual-login" element={<ManualLogin />} />
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

        {/* Customer Request Routes */}
        <Route path="/update-mobile" element={<UpdateMobileNumber />} />
        <Route path="/request-atm" element={<RequestATM />} />
        <Route path="/request-chequebook" element={<RequestChequebook />} />
        <Route path="/change-pin" element={<PinChange />} />

        {/* Banking Services Routes */}
        <Route path="/balance-inquiry" element={<BalanceInquiry />} />
        <Route path="/mini-statement" element={<MiniStatement />} />
        <Route path="/full-statement" element={<FullStatement />} />
        <Route path="/fixed-deposit" element={<FixedDeposit />} />

        {/* Brochure Route */}
        <Route path="/brochure" element={<BankBrochure />} />
        
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
    </LanguageProvider>
  );
}

export default App;