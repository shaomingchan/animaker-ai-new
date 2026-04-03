"use client";

import { useEffect, useState } from "react";
import DOMPurify from "isomorphic-dompurify";
import {
  getCurrentLocale,
  persistLocale,
  translations,
  type Locale,
} from "@/i18n/translations";

function resolveTranslationValue(source: unknown, keys: string[]): unknown {
  return keys.reduce<unknown>((value, key) => {
    if (typeof value !== "object" || value === null) {
      return undefined;
    }

    return (value as Record<string, unknown>)[key];
  }, source);
}

export function useTranslation() {
  const [lang, setLang] = useState<Locale>(getCurrentLocale);

  useEffect(() => {
    persistLocale(lang);
  }, [lang]);

  useEffect(() => {
    const syncLanguage = () => {
      setLang((currentLang) => {
        const nextLang = getCurrentLocale();
        return currentLang === nextLang ? currentLang : nextLang;
      });
    };

    window.addEventListener("popstate", syncLanguage);
    window.addEventListener("app:languagechange", syncLanguage as EventListener);

    return () => {
      window.removeEventListener("popstate", syncLanguage);
      window.removeEventListener("app:languagechange", syncLanguage as EventListener);
    };
  }, []);

  const messages = translations[lang] ?? translations.en;

  const t = (key: string): string => {
    const value = resolveTranslationValue(messages, key.split("."));
    const result = value ?? key;
    return typeof result === "string"
      ? DOMPurify.sanitize(result, { ALLOWED_TAGS: [] })
      : String(result);
  };

  return { t, lang, messages };
}
