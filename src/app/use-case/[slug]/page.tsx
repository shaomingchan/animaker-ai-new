import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

const useCases: Record<string, { title: string; h1: string; desc: string; benefits: string[] }> = {
  "ai-dance-video-maker": {
    title: "AI Dance Video Maker — Turn Any Photo Into a Dancing Video",
    h1: "AI Dance Video Maker",
    desc: "Create stunning dance videos from any photo. Upload a photo and a dance reference — our AI does the rest. No video editing skills needed.",
    benefits: ["Works with any photo", "Choose any dance style", "Ready in 5 minutes", "From $1.99 per video"],
  },
  "photo-to-video-ai": {
    title: "Photo to Video AI — Animate Any Photo with AI Motion Transfer",
    h1: "Turn Photos Into Videos with AI",
    desc: "Transform static photos into dynamic videos using AI motion transfer. Upload a portrait and a reference video to create realistic animations.",
    benefits: ["Full body motion transfer", "Realistic AI animation", "No editing required", "Pay per use pricing"],
  },
  "ai-animation-generator": {
    title: "AI Animation Generator — Create Animated Videos from Photos",
    h1: "AI Animation Generator",
    desc: "Generate professional animations from photos using AI. Perfect for social media content, marketing videos, and creative projects.",
    benefits: ["Social media ready output", "Multiple motion styles", "High quality 540p video", "Fast 5-minute generation"],
  },
  "make-photo-dance": {
    title: "Make Any Photo Dance with AI — Free Online Tool",
    h1: "Make Your Photo Dance",
    desc: "Want to see your photo dance? Upload any portrait and pick a dance move. Our AI creates a realistic dancing video in minutes.",
    benefits: ["Any photo works", "Dozens of dance styles", "Share on TikTok & Instagram", "Try for just $1.99"],
  },
  "ai-motion-transfer": {
    title: "AI Motion Transfer — Copy Dance Moves to Any Photo",
    h1: "AI Motion Transfer Tool",
    desc: "Transfer dance movements from any video to any photo. Our AI analyzes the motion and applies it to create a new animated video.",
    benefits: ["Upload your own reference video", "Precise motion copying", "Works with any person photo", "Professional quality output"],
  },
};

export async function generateStaticParams() {
  return Object.keys(useCases).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const uc = useCases[slug];
  if (!uc) return {};
  return {
    title: uc.title,
    description: uc.desc,
    openGraph: { title: uc.title, description: uc.desc },
  };
}

export default async function UseCasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const uc = useCases[slug];
  if (!uc) notFound();

  return (
    <main className="min-h-screen bg-black text-white">
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">animaker.dev</Link>
          <Link href="/create" className="text-sm bg-white text-black px-4 py-2 rounded-full font-medium hover:bg-gray-200 transition">Try Free</Link>
        </div>
      </nav>

      <section className="pt-28 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{uc.h1}</h1>
          <p className="text-xl text-gray-400 mb-12">{uc.desc}</p>

          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {uc.benefits.map((b, i) => (
              <div key={i} className="p-5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
                <span className="text-green-400 text-xl">✓</span>
                <span>{b}</span>
              </div>
            ))}
          </div>

          {/* How it works */}
          <h2 className="text-3xl font-bold mb-8">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {[
              { step: "1", title: "Upload Photo", desc: "Any photo with a person works." },
              { step: "2", title: "Pick Motion", desc: "Upload a reference video or use presets." },
              { step: "3", title: "Get Video", desc: "AI generates your video in ~5 minutes." },
            ].map((s) => (
              <div key={s.step} className="text-center p-6 rounded-xl bg-white/5 border border-white/10">
                <div className="text-3xl font-bold text-purple-400 mb-3">{s.step}</div>
                <h3 className="font-semibold mb-2">{s.title}</h3>
                <p className="text-sm text-gray-400">{s.desc}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center py-12 rounded-2xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20">
            <h2 className="text-3xl font-bold mb-4">Try It Now</h2>
            <p className="text-gray-400 mb-8">No subscription. No editing skills. Just upload and go.</p>
            <Link href="/create" className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3.5 rounded-full font-medium text-lg hover:opacity-90 transition">
              Get Started — $1.99
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
