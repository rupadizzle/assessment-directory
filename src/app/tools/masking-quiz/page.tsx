import { Metadata } from "next";
import Link from "next/link";
import MaskingQuiz from "./MaskingQuiz";

export const metadata: Metadata = {
  title: "Autism Masking Quiz — How Much Are You Masking?",
  description: "Explore how much you might be masking your autistic traits. Free self-reflection quiz covering social camouflaging, burnout, and authentic self-expression.",
  alternates: { canonical: "https://assessmentdirectory.co.uk/tools/masking-quiz/" },
};

export default function Page() {
  return (
    <div>
      <section className="bg-gradient-to-br from-purple-600 to-purple-700 text-white py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <Link href="/tools/" className="inline-flex items-center gap-1 text-purple-200 hover:text-white text-sm mb-4 transition-colors"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>All Tools</Link>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 tracking-tight">Autism Masking Quiz</h1>
          <p className="text-purple-100 leading-relaxed max-w-xl">Masking is when you hide or suppress autistic traits to fit in. This quiz helps you reflect on how much you might be masking.</p>
        </div>
      </section>
      <section className="max-w-3xl mx-auto px-4 py-10"><MaskingQuiz /></section>
    </div>
  );
}
