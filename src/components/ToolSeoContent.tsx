import Link from "next/link";
import FAQ from "@/components/FAQ";
import { TOOL_CONTENT } from "@/data/tool-content";
import { generateFAQSchema, generateBreadcrumbSchema, SITE_URL } from "@/lib/seo";

// Server-rendered supporting content for tool pages: about section, FAQ with
// FAQPage schema, breadcrumb schema, and related-tool links.
export default function ToolSeoContent({ slug }: { slug: string }) {
  const content = TOOL_CONTENT[slug];
  if (!content) return null;

  const breadcrumbs = [
    { name: "Home", url: SITE_URL },
    { name: "Tools", url: `${SITE_URL}/tools/` },
    { name: content.name, url: `${SITE_URL}/tools/${slug}/` },
  ];

  const relatedTools = content.related
    .map((relSlug) => ({ slug: relSlug, name: TOOL_CONTENT[relSlug]?.name }))
    .filter((t): t is { slug: string; name: string } => !!t.name);

  return (
    <div className="max-w-3xl mx-auto px-4 pb-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateFAQSchema(content.faqs)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbSchema(breadcrumbs)),
        }}
      />

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          {content.aboutTitle}
        </h2>
        <div className="space-y-4">
          {content.paragraphs.map((p, i) => (
            <p key={i} className="text-gray-600 leading-relaxed">
              {p}
            </p>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 mb-5">
          Frequently Asked Questions
        </h2>
        <FAQ items={content.faqs} />
      </section>

      {relatedTools.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Related Tools
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {relatedTools.map((t) => (
              <Link
                key={t.slug}
                href={`/tools/${t.slug}/`}
                className="bg-white rounded-xl border border-gray-200/60 p-4 hover:shadow-md hover:border-blue-200 transition-all text-sm font-medium text-gray-900 hover:text-blue-600"
              >
                {t.name}
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
