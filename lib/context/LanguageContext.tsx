'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'ID' | 'ENG';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (idText: string, engText: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'ID',
  setLanguage: () => {},
  t: (idText: string) => idText,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('ID');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('grindurance_lang') as Language;
      if (saved === 'ID' || saved === 'ENG') {
        setLanguageState(saved);
        document.documentElement.lang = saved === 'ID' ? 'id' : 'en';
      }
    } catch {
      // localStorage unavailable or private browsing
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('grindurance_lang', lang);
      document.documentElement.lang = lang === 'ID' ? 'id' : 'en';
    } catch {
      // localStorage unavailable
    }
  };

  const t = (idText: string, engText: string) => {
    return language === 'ENG' ? engText : idText;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
