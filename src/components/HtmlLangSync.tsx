"use client";

import { useEffect } from "react";
import { useTranslation } from "@/hooks/useTranslation";

export default function HtmlLangSync() {
  const { lang } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return null;
}
