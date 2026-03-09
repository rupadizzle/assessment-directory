import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us — UK Assessment Directory",
  description:
    "Learn about UK Assessment Directory, how we verify clinics, and our mission to help people access private ADHD and autism assessments across the UK.",
  alternates: {
    canonical: "https://assessmentdirectory.co.uk/about/",
  },
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        About UK Assessment Directory
      </h1>

      <div className="prose prose-sm max-w-none text-gray-600 space-y-6">
        <section>
          <h2 className="text-xl font-semibold text-gray-900">Our Mission</h2>
          <p>
            UK Assessment Directory exists to help people find trusted private
            ADHD and autism assessment clinics across the United Kingdom. With
            NHS waiting times for neurodevelopmental assessments stretching to
            several years in many areas, thousands of people are turning to
            private assessment as a faster route to diagnosis and support.
          </p>
          <p>
            We make it easier to compare clinics by bringing together pricing,
            waiting times, services, and professional credentials in one place —
            completely free for patients to use.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">
            How We Verify Clinics
          </h2>
          <p>
            Every clinic listed in our directory goes through a verification
            process before being published. We check that:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              The clinic is a registered healthcare provider operating in the UK
            </li>
            <li>
              Named professionals hold appropriate qualifications (e.g. GMC
              registration for psychiatrists, HCPC registration for
              psychologists)
            </li>
            <li>
              Pricing and waiting time information is accurate at the time of
              listing
            </li>
            <li>The clinic has a verifiable physical or registered address</li>
          </ul>
          <p>
            Clinic profiles include a &ldquo;last updated&rdquo; date so you can
            see how recently the information was reviewed. If you notice any
            inaccurate information, please contact us so we can investigate.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">
            How We Make Money
          </h2>
          <p>
            Our basic clinic listing is free. Clinics can optionally pay for
            enhanced visibility through our{" "}
            <Link
              href="/pricing/"
              className="text-blue-600 hover:text-blue-800"
            >
              Featured and Premium plans
            </Link>
            , which give them priority placement in search results and enhanced
            profile pages. Paid listings are clearly labelled as
            &ldquo;Featured&rdquo; or &ldquo;Premium&rdquo; so you always know
            which clinics have paid for promotion.
          </p>
          <p>
            We do not accept payment for positive reviews or editorial coverage.
            Our guide content is produced independently of any commercial
            relationships.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">
            Editorial Standards
          </h2>
          <p>
            Our educational guides are written to help people understand the
            assessment process, their rights, and what to expect. We reference
            established clinical guidelines including NICE guidelines for ADHD
            (NG87) and autism (CG128), and NHS England&apos;s Right to Choose
            policy where applicable.
          </p>
          <p>
            Our content is for informational purposes only and does not
            constitute medical advice. We always recommend consulting a
            qualified healthcare professional for personal medical decisions.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">Contact Us</h2>
          <p>
            For clinic listing enquiries, email{" "}
            <a
              href="mailto:clinics@assessmentdirectory.co.uk"
              className="text-blue-600 hover:text-blue-800"
            >
              clinics@assessmentdirectory.co.uk
            </a>
            .
          </p>
          <p>
            To report inaccurate information or provide feedback about the
            directory, email{" "}
            <a
              href="mailto:clinics@assessmentdirectory.co.uk"
              className="text-blue-600 hover:text-blue-800"
            >
              clinics@assessmentdirectory.co.uk
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
