"use client";

import Link from "next/link";
import { useTranslation } from "@/hooks/useTranslation";

export default function TermsPageContent() {
  const { t } = useTranslation();

  return (
    <main className="min-h-screen bg-black text-white py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center text-purple-400 hover:text-purple-300 mb-8">
          {t("common.backToHome")}
        </Link>
        <h1 className="text-4xl font-bold mb-8">{t("termsPage.title")}</h1>
        <p className="text-gray-400 mb-8">{t("termsPage.lastUpdated")}</p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t("termsPage.acceptance.title")}</h2>
          <p className="text-gray-300">{t("termsPage.acceptance.body")}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t("termsPage.service.title")}</h2>
          <p className="text-gray-300">{t("termsPage.service.body")}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t("termsPage.responsibilities.title")}</h2>
          <p className="text-gray-300 mb-4">{t("termsPage.responsibilities.intro")}</p>
          <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
            <li>{t("termsPage.responsibilities.items.0")}</li>
            <li>{t("termsPage.responsibilities.items.1")}</li>
            <li>{t("termsPage.responsibilities.items.2")}</li>
            <li>{t("termsPage.responsibilities.items.3")}</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t("termsPage.moderation.title")}</h2>
          <p className="text-gray-300">{t("termsPage.moderation.body")}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t("termsPage.ip.title")}</h2>
          <p className="text-gray-300">{t("termsPage.ip.body")}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t("termsPage.payments.title")}</h2>
          <p className="text-gray-300">{t("termsPage.payments.body")}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t("termsPage.liability.title")}</h2>
          <p className="text-gray-300">{t("termsPage.liability.body")}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t("termsPage.disputes.title")}</h2>
          <p className="text-gray-300 mb-4">{t("termsPage.disputes.intro")}</p>
          <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
            <li>{t("termsPage.disputes.items.0")}</li>
            <li>{t("termsPage.disputes.items.1")}</li>
            <li>{t("termsPage.disputes.items.2")}</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t("termsPage.contact.title")}</h2>
          <p className="text-gray-300">
            {t("termsPage.contact.body")}{" "}
            <a href="mailto:support@animaker.dev" className="text-purple-400 hover:underline">
              support@animaker.dev
            </a>
          </p>
        </section>
      </div>
    </main>
  );
}
