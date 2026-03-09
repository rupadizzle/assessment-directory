import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — UK Assessment Directory",
  description:
    "Terms of service for UK Assessment Directory. Terms governing use of our clinic directory and listing services.",
  alternates: {
    canonical: "https://assessmentdirectory.co.uk/terms/",
  },
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Terms of Service
      </h1>
      <p className="text-sm text-gray-500 mb-8">Last updated: January 2025</p>

      <div className="prose prose-sm max-w-none text-gray-600 space-y-6">
        <section>
          <h2 className="text-xl font-semibold text-gray-900">
            About This Service
          </h2>
          <p>
            UK Assessment Directory (&ldquo;the Directory&rdquo;) is an online
            directory that helps users find private ADHD and autism assessment
            clinics in the United Kingdom. By using this website, you agree to
            these terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">
            Medical Disclaimer
          </h2>
          <p>
            The information provided on this website is for general
            informational purposes only. It is not intended as, and should not
            be taken as, medical advice, diagnosis, or treatment. Always seek
            the advice of a qualified healthcare professional with any questions
            you may have about a medical condition.
          </p>
          <p>
            We do not endorse, recommend, or guarantee any specific clinic,
            professional, treatment, or outcome. The inclusion of a clinic in
            our directory does not constitute a recommendation. You are
            responsible for conducting your own due diligence before choosing a
            healthcare provider.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">
            Accuracy of Information
          </h2>
          <p>
            While we make reasonable efforts to ensure the accuracy of clinic
            information (including pricing, waiting times, and professional
            credentials), we cannot guarantee that all information is complete,
            current, or accurate at all times. Clinic details may change without
            notice.
          </p>
          <p>
            We recommend contacting clinics directly to confirm current pricing,
            availability, and services before booking an assessment.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">
            Clinic Listings
          </h2>
          <p>
            Clinics listed in our directory may include both free and paid
            listings. Paid listings (marked as &ldquo;Featured&rdquo; or
            &ldquo;Premium&rdquo;) receive enhanced visibility and priority
            placement in search results. The presence of a paid listing label
            indicates a commercial relationship between the clinic and the
            Directory.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">
            Limitation of Liability
          </h2>
          <p>
            UK Assessment Directory shall not be liable for any direct,
            indirect, incidental, or consequential damages arising from your use
            of this website or reliance on information provided herein. This
            includes, but is not limited to, any loss or damage arising from
            interactions with clinics listed in the directory.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">
            Intellectual Property
          </h2>
          <p>
            All content on this website, including text, design, and
            functionality, is the property of UK Assessment Directory and is
            protected by copyright law. You may not reproduce, distribute, or
            otherwise use our content without prior written permission.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">
            Changes to These Terms
          </h2>
          <p>
            We reserve the right to update these terms at any time. Continued
            use of the website following any changes constitutes acceptance of
            the revised terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">
            Governing Law
          </h2>
          <p>
            These terms are governed by the laws of England and Wales.
          </p>
        </section>
      </div>
    </div>
  );
}
