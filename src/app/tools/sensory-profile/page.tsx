import { Metadata } from "next";
import Link from "next/link";
import SensoryProfile from "./SensoryProfile";
import ToolSeoContent from "@/components/ToolSeoContent";

export const metadata: Metadata = {
  title: "Sensory Profile Quiz — Understand Your Sensory Sensitivities",
  description: "Explore your sensory profile across sight, sound, touch, taste, smell, and movement. Understand your sensitivities and get practical coping strategies.",
  alternates: { canonical: "https://assessmentdirectory.co.uk/tools/sensory-profile/" },
  openGraph: {
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    title: "Sensory Profile Quiz — Understand Your Sensory Sensitivities",
    description:
      "Explore your sensory profile across sight, sound, touch, taste, smell, and movement. Understand your sensitivities and get practical coping strategies.",
    url: "https://assessmentdirectory.co.uk/tools/sensory-profile/",
    siteName: "UK Assessment Directory",
    type: "website",
  },
};

export default function Page() {
  return (
    <div>
      <section className="bg-gradient-to-br from-purple-600 to-purple-700 text-white py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <Link href="/tools/" className="inline-flex items-center gap-1 text-purple-200 hover:text-white text-sm mb-4 transition-colors"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>All Tools</Link>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 tracking-tight">Sensory Profile Quiz</h1>
          <p className="text-purple-100 leading-relaxed max-w-xl">Sensory differences are a core feature of autism and common in ADHD. Discover your unique sensory profile and get personalised coping strategies.</p>
        </div>
      </section>
      <section className="max-w-3xl mx-auto px-4 py-10"><SensoryProfile /></section>
      <ToolSeoContent slug="sensory-profile" />
    </div>
  );
}
