import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoutScreen from './LogoutScreen';
import { useLanguage } from '../../LanguageContext';

const Header = ({ userName = "Soham Kolte" }) => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);

  const handleLogoutClick = () => {
    setIsLogoutOpen(true);
  };

  return (
    <>
      <LogoutScreen
        isOpen={isLogoutOpen}
        onClose={() => setIsLogoutOpen(false)}
      />

      <header className="flex justify-between items-center bg-[#004b9b] text-white px-6 py-4 shadow-md z-10 w-full">
        <h1 className="text-xl font-semibold tracking-wide">
          {t.welcome}, {userName}
        </h1>
        <button
          onClick={handleLogoutClick}
          className="bg-red-500 hover:bg-red-600 text-white text-sm font-medium px-4 py-1.5 rounded shadow-sm transition-colors"
        >
          {t.logout || "Logout"}
        </button>
      </header>
    </>
  );
};

export default Header;
