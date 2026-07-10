import { Metadata } from "next";
import { notFound } from "next/navigation";
import guides from "@/data/guides.json";
import towns from "@/data/towns.json";
import { Guide, Town } from "@/lib/types";
import { generateGuidePageMeta, generateArticleSchema, generateBreadcrumbSchema, SITE_URL } from "@/lib/seo";
import Link from "next/link";

const allGuides = guides as Guide[];
const topCities = (towns as Town[])
  .sort((a, b) => b.population - a.population)
  .slice(0, 12);

export function generateStaticParams() {
  return allGuides.map((g) => ({ slug: g.slug }));
}

type PageProps = { params: { slug: string } };

export function generateMetadata({ params }: PageProps): Metadata {
  const guide = allGuides.find((g) => g.slug === params.slug);
  if (!guide) return {};
  return generateGuidePageMeta(guide.title, guide.meta_description, guide.slug);
}

export default function GuidePage({ params }: PageProps) {
  const slug = params.slug;
  const guide = allGuides.find((g) => g.slug === slug);
  if (!guide) notFound();

  const otherGuides = allGuides.filter((g) => g.slug !== slug).slice(0, 4);

  const breadcrumbs = [
    { name: "Home", url: SITE_URL },
    { name: "Guides", url: `${SITE_URL}/guides/` },
    { name: guide.title, url: `${SITE_URL}/guides/${guide.slug}/` },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateArticleSchema(guide.title, guide.meta_description, guide.slug, guide.created_at)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbSchema(breadcrumbs)),
        }}
      />

      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        {" / "}
        <Link href="/guides/" className="hover:text-blue-600">Guides</Link>
        {" / "}
        <span className="text-gray-900">{guide.title}</span>
      </nav>

      <article className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{guide.title}</h1>
        <p className="text-sm text-gray-500 mb-8">
          Last updated: {new Date(guide.created_at).toLocaleDateString("en-GB", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>

        <div
          className="prose prose-sm max-w-none prose-headings:text-gray-900 prose-p:text-gray-600 prose-a:text-blue-600"
          dangerouslySetInnerHTML={{ __html: guide.content }}
        />
      </article>

      {/* Related guides */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Related Guides</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {otherGuides.map((g) => (
            <Link
              key={g.slug}
              href={`/guides/${g.slug}/`}
              className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md hover:border-blue-200 transition-all"
            >
              <h3 className="font-medium text-gray-900 mb-1">{g.title}</h3>
              <p className="text-sm text-gray-500 line-clamp-2">{g.meta_description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Find Clinics Near You */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Find {guide.condition === "autism" ? "Autism" : guide.condition === "adhd" ? "ADHD" : "Assessment"} Clinics Near You
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {topCities.map((town) => (
            <Link
              key={town.slug}
              href={`/${guide.condition === "autism" ? "autism-assessment" : "adhd-assessment"}/${town.slug}/`}
              className={`text-sm px-3 py-2 rounded-lg border transition-colors ${
                guide.condition === "autism"
                  ? "text-purple-700 bg-purple-50 border-purple-100 hover:bg-purple-100"
                  : "text-blue-700 bg-blue-50 border-blue-100 hover:bg-blue-100"
              }`}
            >
              {town.name}
            </Link>
          ))}
        </div>
        <div className="mt-4">
          <Link
            href="/clinics/"
            className="text-sm text-blue-600 hover:text-blue-800 font-medium inline-flex items-center gap-1"
          >
            Or view all clinics on the map
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="mt-12 bg-blue-50 rounded-xl p-6 text-center">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">
          Ready to Find a Clinic?
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          Use our directory to find trusted private assessment clinics near you.
        </p>
        <div className="flex gap-3 justify-center">
          <Link href="/adhd-assessment/" className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">
            Find ADHD Clinics
          </Link>
          <Link href="/autism-assessment/" className="bg-purple-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-purple-700">
            Find Autism Clinics
          </Link>
        </div>
      </section>
    </div>
  );
}
