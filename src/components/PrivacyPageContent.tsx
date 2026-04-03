"use client";

import Link from "next/link";
import { useTranslation } from "@/hooks/useTranslation";

export default function PrivacyPageContent() {
  const { t } = useTranslation();

  return (
    <main className="min-h-screen bg-black text-white py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center text-purple-400 hover:text-purple-300 mb-8">
          {t("common.backToHome")}
        </Link>
        <h1 className="text-4xl font-bold mb-8">{t("privacyPage.title")}</h1>
        <p className="text-gray-400 mb-8">{t("privacyPage.lastUpdated")}</p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t("privacyPage.collection.title")}</h2>
          <p className="text-gray-300 mb-4">{t("privacyPage.collection.intro")}</p>
          <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
            <li>{t("privacyPage.collection.items.0")}</li>
            <li>{t("privacyPage.collection.items.1")}</li>
            <li>{t("privacyPage.collection.items.2")}</li>
            <li>{t("privacyPage.collection.items.3")}</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t("privacyPage.usage.title")}</h2>
          <p className="text-gray-300 mb-4">{t("privacyPage.usage.intro")}</p>
          <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
            <li>{t("privacyPage.usage.items.0")}</li>
            <li>{t("privacyPage.usage.items.1")}</li>
            <li>{t("privacyPage.usage.items.2")}</li>
            <li>{t("privacyPage.usage.items.3")}</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t("privacyPage.storage.title")}</h2>
          <p className="text-gray-300 mb-4">{t("privacyPage.storage.body")}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t("privacyPage.thirdParty.title")}</h2>
          <p className="text-gray-300 mb-4">{t("privacyPage.thirdParty.intro")}</p>
          <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
            <li>{t("privacyPage.thirdParty.items.0")}</li>
            <li>{t("privacyPage.thirdParty.items.1")}</li>
            <li>{t("privacyPage.thirdParty.items.2")}</li>
            <li>{t("privacyPage.thirdParty.items.3")}</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t("privacyPage.rights.title")}</h2>
          <p className="text-gray-300 mb-4">{t("privacyPage.rights.intro")}</p>
          <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
            <li>{t("privacyPage.rights.items.0")}</li>
            <li>{t("privacyPage.rights.items.1")}</li>
            <li>{t("privacyPage.rights.items.2")}</li>
            <li>{t("privacyPage.rights.items.3")}</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t("privacyPage.contact.title")}</h2>
          <p className="text-gray-300">
            {t("privacyPage.contact.body")}{" "}
            <a href="mailto:support@animaker.dev" className="text-purple-400 hover:underline">
              support@animaker.dev
            </a>
          </p>
        </section>
      </div>
    </main>
  );
}
