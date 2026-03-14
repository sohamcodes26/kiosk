import React, { createContext, useState, useContext } from 'react';
import { translations } from './translations';

// Create the context
const LanguageContext = createContext();

// Create a custom hook for easy access
export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en'); // Default to English

  // This variable holds the actual dictionary for the current language
  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};