import en from "@/i18n/locales/en.json";
import zh from "@/i18n/locales/zh.json";
import ja from "@/i18n/locales/ja.json";
import ko from "@/i18n/locales/ko.json";

export const localeCodes = ["en", "zh", "ja", "ko"] as const;

export type Locale = (typeof localeCodes)[number];
export type Messages = typeof en;

export const translations = {
  en,
  zh,
  ja,
  ko,
} satisfies Record<Locale, Messages>;

export function isLocale(value: string | null | undefined): value is Locale {
  return value !== null && value !== undefined && localeCodes.includes(value as Locale);
}

export function getLocaleFromSearch(search: string): Locale | null {
  const lang = new URLSearchParams(search).get("lang");
  return isLocale(lang) ? lang : null;
}

export function getLocaleFromCookie(cookieString: string | undefined): Locale | null {
  if (!cookieString) {
    return null;
  }

  const match = cookieString.match(/(?:^|;\s*)lang=([^;]+)/);
  return isLocale(match?.[1]) ? match[1] : null;
}

export function getStoredLocale(): Locale | null {
  if (typeof window === "undefined") {
    return null;
  }

  const storedLang = window.localStorage.getItem("lang");
  return isLocale(storedLang) ? storedLang : null;
}

export function getCurrentLocale(): Locale {
  if (typeof window === "undefined") {
    return "en";
  }

  return (
    getLocaleFromSearch(window.location.search) ??
    getStoredLocale() ??
    getLocaleFromCookie(document.cookie) ??
    "en"
  );
}

export function persistLocale(locale: Locale) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem("lang", locale);
  document.cookie = `lang=${locale}; path=/; max-age=31536000; samesite=lax`;
}
