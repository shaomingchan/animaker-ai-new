import type { Metadata } from 'next';
import PrivacyPageContent from "@/components/PrivacyPageContent";

export const metadata: Metadata = {
  title: 'Privacy Policy - Animaker.AI',
  description: 'Privacy Policy for Animaker.AI - AI-powered dance video generation service',
};

export default function PrivacyPolicy() {
  return <PrivacyPageContent />;
}
