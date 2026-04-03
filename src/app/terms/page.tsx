import type { Metadata } from 'next';
import TermsPageContent from "@/components/TermsPageContent";

export const metadata: Metadata = {
  title: 'Terms of Service - Animaker.AI',
  description: 'Terms of Service for Animaker.AI - AI-powered dance video generation service',
};

export default function TermsOfService() {
  return <TermsPageContent />;
}
