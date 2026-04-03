import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

const posts: Record<string, { title: string; desc: string; content: string[] }> = {
  "how-to-make-ai-dancing-videos": {
    title: "How to Make AI Dancing Videos in 60 Seconds (2026 Guide)",
    desc: "Learn how to turn any photo into a dancing video using AI. Step-by-step guide with tips for best results.",
    content: [
      "AI dancing videos are taking over social media. From TikTok to Instagram Reels, people are using AI to create stunning dance videos from simple photos. But how does it actually work?",
      "## What is AI Motion Transfer?\n\nAI motion transfer is a technology that copies movements from a reference video and applies them to a person in a photo. The AI analyzes the dance moves frame by frame, then generates a new video where the person in your photo performs those exact movements.",
      "## How to Create Your First AI Dance Video\n\n**Step 1: Choose Your Photo**\nPick any photo with a person. Full body shots work best. Tips:\n- Good lighting\n- Clear face\n- Simple background\n- Person standing upright\n- **Avoid holding objects** (hands should be empty for best results)",
      "**Step 2: Select a Reference Video**\nThis is the dance you want your photo to perform. You can:\n- Upload your own dance video\n- Use a TikTok dance clip\n- Choose from preset motions\n\nKeep it under 15 seconds for best quality.",
      "**Step 3: Generate and Download**\nUpload both to Animaker.AI, hit generate, and wait about 5 minutes. The AI handles everything — no editing skills needed.",
      "## Tips for Best Results\n\n1. **Empty hands** — Objects in hands cause flickering\n2. **Full body visible** — Cropped photos limit motion range\n3. **Simple background** — Busy backgrounds can confuse the AI\n4. **Good lighting** — Well-lit photos produce cleaner videos\n5. **Matching pose** — Starting pose similar to reference video helps",
      "## How Much Does It Cost?\n\nAnimaker.AI uses pay-per-use pricing starting at $1.99 per video. No monthly subscription required. Perfect for trying it out without commitment.",
    ],
  },
  "best-ai-photo-to-video-tools-2026": {
    title: "Best AI Photo to Video Tools in 2026 (Free & Paid)",
    desc: "Compare the top AI tools that turn photos into videos. Features, pricing, and honest reviews of each platform.",
    content: [
      "The AI video generation space has exploded in 2026. Dozens of tools now promise to turn your photos into videos. But which ones actually deliver? We tested the most popular options.",
      "## 1. Animaker.AI — Best for Dance Videos\n\n**What it does:** Transfers dance movements from any reference video to a person in your photo.\n\n**Pros:**\n- Real photo support (not just AI-generated faces)\n- Full body motion transfer\n- Pay per use ($1.99/video)\n- Fast generation (~5 min)\n\n**Best for:** Social media creators, fun content, dance videos",
      "## 2. Runway ML — Best for Professional Use\n\n**What it does:** Full AI video editing suite with text-to-video, image-to-video, and more.\n\n**Pros:** Professional features, high quality\n**Cons:** Expensive ($15+/mo), steep learning curve\n**Best for:** Professional video editors",
      "## 3. Pika Labs — Best for Text-to-Video\n\n**What it does:** Generates videos from text descriptions.\n\n**Pros:** Creative freedom, good quality\n**Cons:** No photo input, less control over specific motions\n**Best for:** Creative experimentation",
      "## 4. D-ID — Best for Talking Avatars\n\n**What it does:** Creates talking head videos from photos.\n\n**Pros:** Good lip sync, easy to use\n**Cons:** Face only (no body), can look robotic\n**Best for:** Presentations, customer support videos",
      "## The Verdict\n\nIf you want to make a photo dance → **Animaker.AI**\nIf you need professional video editing → Runway ML\nIf you want text-to-video → Pika Labs\nIf you need talking avatars → D-ID\n\nEach tool has its niche. For dance and motion transfer specifically, Animaker.AI offers the best value with its pay-per-use model.",
    ],
  },
  "ai-dance-video-generator-complete-guide": {
    title: "AI Dance Video Generator: Complete Guide for Beginners (2026)",
    desc: "Everything you need to know about AI dance video generators. How they work, best practices, and creative ideas.",
    content: [
      "AI dance video generators have become one of the most viral content creation tools of 2026. Whether you want to see your pet dance, create a funny birthday video, or make engaging social media content, these tools make it possible in minutes.",
      "## How AI Dance Video Generators Work\n\nThe technology behind AI dance videos is called **motion transfer** (also known as pose transfer). Here's the simplified process:\n\n1. The AI detects the human pose in each frame of the reference video\n2. It maps these poses onto the person in your photo\n3. It generates new frames where your photo's person performs the movements\n4. The frames are combined into a smooth video",
      "## Creative Ideas for AI Dance Videos\n\n- **Social Media Content** — Stand out on TikTok and Instagram\n- **Birthday Surprises** — Make someone's photo dance to their favorite song\n- **Marketing** — Product mascots that dance\n- **Memes** — Historical figures doing modern dances\n- **Wedding Content** — Bride and groom dance preview",
      "## Common Mistakes to Avoid\n\n1. **Using photos with objects in hands** — Causes visual glitches\n2. **Low resolution photos** — Results in blurry videos\n3. **Multiple people in photo** — AI works best with single person\n4. **Extreme poses in photo** — Start with a neutral standing pose\n5. **Very long reference videos** — Keep under 15 seconds",
      "## Getting Started\n\nThe easiest way to try AI dance video generation is with Animaker.AI. No account setup needed for browsing, and your first video costs just $1.99. Upload a photo, pick a dance, and you'll have your video in about 5 minutes.",
    ],
  },
};

export async function generateStaticParams() {
  return Object.keys(posts).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = posts[slug];
  if (!post) return {};
  return { title: post.title, description: post.desc, openGraph: { title: post.title, description: post.desc } };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts[slug];
  if (!post) notFound();

  return (
    <main className="min-h-screen bg-black text-white">
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Animaker.AI</Link>
          <Link href="/create" className="text-sm bg-white text-black px-4 py-2 rounded-full font-medium hover:bg-gray-200 transition">Try Free</Link>
        </div>
      </nav>
      <article className="pt-28 pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">{post.title}</h1>
          <p className="text-gray-400 mb-12">{post.desc}</p>
          <div className="prose prose-invert prose-lg max-w-none space-y-6">
            {post.content.map((block, i) => (
              <div key={i} className="text-gray-300 leading-relaxed whitespace-pre-line">{block}</div>
            ))}
          </div>
          <div className="mt-16 text-center py-12 rounded-2xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20">
            <h2 className="text-3xl font-bold mb-4">Try Animaker.AI</h2>
            <p className="text-gray-400 mb-8">Turn any photo into a dancing video. No editing skills needed.</p>
            <Link href="/create" className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3.5 rounded-full font-medium text-lg hover:opacity-90 transition">Get Started — $1.99</Link>
          </div>
        </div>
      </article>
    </main>
  );
}
