import React, { createContext, useContext, useMemo, useState } from 'react';
import { t as translate } from '../i18n/strings';

const Ctx = createContext(null);

// මුළු ඇප් එකටම පොදු state: භාෂාව, අකුරු ප්‍රමාණය, තෝරපු නගර
export function AppProvider({ children }) {
  const [lang, setLang] = useState('si');
  const [big, setBig] = useState(false);
  const [from, setFrom] = useState('colombo');
  const [to, setTo] = useState(null);

  const value = useMemo(
    () => ({
      lang, setLang,
      big, setBig,
      from, setFrom,
      to, setTo,
      t: (key) => translate(key, lang),
      // fs = font size. "අකුරු ලොකු" දැම්මොත් 25% ලොකු වෙනවා
      fs: (n) => Math.round(n * (big ? 1.25 : 1)),
      // {si, en, ta} object එකකින් දැන් භාෂාවේ text එක
      tr: (obj) => (obj ? obj[lang] || obj.en || '' : ''),
    }),
    [lang, big, from, to]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useApp = () => useContext(Ctx);
