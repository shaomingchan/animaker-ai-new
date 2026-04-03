"use client";

import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { persistLocale, type Locale } from "@/i18n/translations";
import { useTranslation } from "@/hooks/useTranslation";

const languages: { code: 'en'|'zh'|'ja'|'ko'; name: string; flag: string }[] = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "zh", name: "中文", flag: "🇨🇳" },
  { code: "ja", name: "日本語", flag: "🇯🇵" },
  { code: "ko", name: "한국어", flag: "🇰🇷" },
];

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { lang: currentLang } = useTranslation();

  const switchLanguage = (code: Locale) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("lang", code);
    persistLocale(code);
    window.dispatchEvent(new Event("app:languagechange"));
    router.replace(`${pathname}?${params.toString()}`);
    setIsOpen(false);
  };

  const current = languages.find((l) => l.code === currentLang) || languages[0];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition text-sm"
      >
        <span>{current.flag}</span>
        <span>{current.name}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-black border border-white/10 rounded-lg shadow-lg overflow-hidden z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => switchLanguage(lang.code)}
              className={`w-full flex items-center gap-2 px-4 py-2 hover:bg-white/10 transition text-sm ${
                lang.code === currentLang ? "bg-white/5" : ""
              }`}
            >
              <span>{lang.flag}</span>
              <span>{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
