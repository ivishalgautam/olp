// components/LanguageSwitcher.js
"use client"; // if using App Router

import { useRouter } from "next/router";

export default function LanguageSwitcher() {
  const router = useRouter();
  const { locale, locales, asPath } = router;

  const handleChange = (e) => {
    const newLocale = e.target.value;
    router.push(asPath, asPath, { locale: newLocale });
  };

  return (
    <select onChange={handleChange} value={locale}>
      {locales.map((loc) => (
        <option key={loc} value={loc}>
          {loc.toUpperCase()}
        </option>
      ))}
    </select>
  );
}
