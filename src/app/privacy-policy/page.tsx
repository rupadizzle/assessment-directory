import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — UK Assessment Directory",
  description:
    "Privacy policy for UK Assessment Directory. How we collect, use, and protect your personal data under UK GDPR.",
  alternates: {
    canonical: "https://assessmentdirectory.co.uk/privacy-policy/",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
      <p className="text-sm text-gray-500 mb-8">Last updated: January 2025</p>

      <div className="prose prose-sm max-w-none text-gray-600 space-y-6">
        <section>
          <h2 className="text-xl font-semibold text-gray-900">
            Who We Are
          </h2>
          <p>
            UK Assessment Directory (&ldquo;we&rdquo;, &ldquo;us&rdquo;,
            &ldquo;our&rdquo;) operates the website assessmentdirectory.co.uk.
            We are a directory service that helps people find private ADHD and
            autism assessment clinics in the United Kingdom.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">
            What Data We Collect
          </h2>
          <p>We may collect the following types of information:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong>Contact form submissions:</strong> Name, email address,
              and message content when you contact us via our website forms
            </li>
            <li>
              <strong>Clinic listing information:</strong> Business name,
              address, contact details, pricing, and professional credentials
              submitted by clinic operators
            </li>
            <li>
              <strong>Usage data:</strong> Anonymised analytics data including
              pages visited, time spent on site, and general geographic location
              (country/region level)
            </li>
          </ul>
          <p>
            We do not collect health data, medical records, or diagnostic
            information from visitors to our directory.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">
            How We Use Your Data
          </h2>
          <p>We use the data we collect to:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Respond to contact form enquiries</li>
            <li>Process and publish clinic listings</li>
            <li>
              Improve our website and services through anonymised analytics
            </li>
            <li>
              Send relevant updates to clinic operators about their listings
            </li>
          </ul>
          <p>
            We do not sell your personal data to third parties. We do not use
            your data for marketing purposes unless you have explicitly
            consented.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">
            Cookies
          </h2>
          <p>
            Our website uses essential cookies to ensure proper functionality.
            We may also use anonymised analytics cookies to understand how
            visitors use our site. You can control cookie preferences through
            your browser settings.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">
            Your Rights Under UK GDPR
          </h2>
          <p>Under the UK General Data Protection Regulation, you have the right to:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Access the personal data we hold about you</li>
            <li>Request correction of inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Object to processing of your data</li>
            <li>Request data portability</li>
          </ul>
          <p>
            To exercise any of these rights, contact us at{" "}
            <a
              href="mailto:clinics@assessmentdirectory.co.uk"
              className="text-blue-600 hover:text-blue-800"
            >
              clinics@assessmentdirectory.co.uk
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">
            Data Retention
          </h2>
          <p>
            We retain contact form submissions for up to 12 months. Clinic
            listing data is retained for as long as the listing is active.
            Anonymised analytics data is retained for up to 26 months.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">
            Changes to This Policy
          </h2>
          <p>
            We may update this privacy policy from time to time. Any changes
            will be posted on this page with an updated revision date.
          </p>
        </section>
      </div>
    </div>
  );
}
