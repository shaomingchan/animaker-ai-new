import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

const competitors: Record<string, { name: string; desc: string; cons: string[]; price: string }> = {
  viggle: {
    name: "Viggle AI",
    desc: "AI character animation tool that generates videos from text prompts",
    cons: ["Limited to cartoon/anime style", "No real photo support", "Long queue times", "Lower resolution output"],
    price: "Free tier with limits, Pro from $10/mo",
  },
  runway: {
    name: "Runway ML",
    desc: "Professional AI video generation and editing platform",
    cons: ["Expensive for casual users ($15+/mo)", "Complex interface", "Not specialized for dance/motion transfer", "Requires learning curve"],
    price: "From $15/month",
  },
  pika: {
    name: "Pika Labs",
    desc: "AI video generation tool focused on text-to-video",
    cons: ["Text-to-video only, no photo input", "Less control over motion", "Inconsistent quality", "No motion transfer feature"],
    price: "Free tier, Pro from $10/mo",
  },
  "d-id": {
    name: "D-ID",
    desc: "AI-powered talking avatar and video creation platform",
    cons: ["Only face animation, no full body", "Robotic lip-sync feel", "Expensive credits system", "Limited motion types"],
    price: "From $5.90/month",
  },
  hedra: {
    name: "Hedra",
    desc: "AI character video generation tool",
    cons: ["Limited to upper body", "No dance/full body motion", "Newer platform with fewer features", "Queue-based generation"],
    price: "Free tier with limits",
  },
};

export async function generateStaticParams() {
  return Object.keys(competitors).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const comp = competitors[slug];
  if (!comp) return {};
  return {
    title: `Animaker.AI vs ${comp.name} - Which AI Video Tool is Better? (2026)`,
    description: `Compare Animaker.AI and ${comp.name}. See features, pricing, and quality differences. Find the best AI photo-to-dance video tool for your needs.`,
    openGraph: {
      title: `Animaker.AI vs ${comp.name} - Comparison 2026`,
      description: `Detailed comparison of Animaker.AI and ${comp.name} for AI video generation.`,
    },
  };
}

export default async function ComparePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const comp = competitors[slug];
  if (!comp) notFound();

  return (
    <main className="min-h-screen bg-black text-white">
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Animaker.AI</Link>
          <Link href="/create" className="text-sm bg-white text-black px-4 py-2 rounded-full font-medium hover:bg-gray-200 transition">Try Free</Link>
        </div>
      </nav>

      <section className="pt-28 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Animaker.AI vs {comp.name}
          </h1>
          <p className="text-xl text-gray-400 mb-12">
            Looking for the best AI tool to turn photos into dancing videos? Here&apos;s how Animaker.AI compares to {comp.name}.
          </p>

          {/* Comparison Table */}
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            <div className="p-6 rounded-2xl bg-purple-500/10 border border-purple-500/30">
              <h2 className="text-2xl font-bold mb-4 text-purple-300">Animaker.AI</h2>
              <ul className="space-y-3 text-gray-300">
                <li>✅ Real photo to dance video</li>
                <li>✅ Full body motion transfer</li>
                <li>✅ Pay per use — from $1.99</li>
                <li>✅ No subscription required</li>
                <li>✅ 5 minute generation time</li>
                <li>✅ Upload any reference video</li>
              </ul>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <h2 className="text-2xl font-bold mb-4 text-gray-400">{comp.name}</h2>
              <p className="text-gray-500 text-sm mb-4">{comp.desc}</p>
              <ul className="space-y-3 text-gray-400">
                {comp.cons.map((con, i) => (
                  <li key={i}>⚠️ {con}</li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-gray-500">Pricing: {comp.price}</p>
            </div>
          </div>

          {/* Why Choose */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Why Choose Animaker.AI?</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: "📸", title: "Real Photos", desc: "Works with any photo — selfies, portraits, full body shots." },
                { icon: "💃", title: "Any Dance", desc: "Upload any reference video. The AI copies the exact movements." },
                { icon: "💰", title: "Pay Per Use", desc: "No monthly subscription. Just $1.99 per video." },
              ].map((f) => (
                <div key={f.title} className="p-6 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-3xl mb-3">{f.icon}</div>
                  <h3 className="font-semibold mb-2">{f.title}</h3>
                  <p className="text-sm text-gray-400">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center py-12 rounded-2xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20">
            <h2 className="text-3xl font-bold mb-4">Ready to Try?</h2>
            <p className="text-gray-400 mb-8">Turn any photo into a dancing video in 60 seconds.</p>
            <Link href="/create" className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3.5 rounded-full font-medium text-lg hover:opacity-90 transition">
              Try Animaker.AI — $1.99
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
