import { Metadata } from "next";
import PricingTable from "@/components/PricingTable";

export const metadata: Metadata = {
  title: "List Your Clinic — Join the UK Assessment Directory",
  description:
    "Get your clinic in front of thousands of people searching for private ADHD and Autism assessments. Free listing available. Upgrade for priority placement.",
  alternates: {
    canonical: "https://assessmentdirectory.co.uk/list-your-clinic/",
  },
};

export default function ListYourClinicPage() {
  return (
    <div>
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            Get More Patients From Your Online Presence
          </h1>
          <p className="text-lg text-gray-300 mb-6">
            Thousands of people search for private ADHD and Autism assessments
            every month. List your clinic on our assessment directory and start
            receiving enquiries.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-12 -mt-8">
        <div className="grid sm:grid-cols-3 gap-6 mb-16">
          <div className="bg-white rounded-xl border border-gray-200 p-6 text-center shadow-sm">
            <p className="text-3xl font-bold text-blue-600">14,800+</p>
            <p className="text-sm text-gray-600 mt-1">
              Monthly searches for &ldquo;private ADHD assessment&rdquo;
            </p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6 text-center shadow-sm">
            <p className="text-3xl font-bold text-blue-600">2-5 years</p>
            <p className="text-sm text-gray-600 mt-1">
              Average NHS waiting time driving demand
            </p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6 text-center shadow-sm">
            <p className="text-3xl font-bold text-blue-600">1,200+</p>
            <p className="text-sm text-gray-600 mt-1">
              UK towns covered in our directory
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
          Choose Your Plan
        </h2>
        <PricingTable />
      </section>

      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">
            Why List With Us?
          </h2>
          <div className="space-y-6">
            {[
              {
                title: "Targeted Traffic",
                desc: "We rank for high-intent keywords like 'private ADHD assessment near me'. Every visitor is actively looking for assessment services.",
              },
              {
                title: "No Long-Term Contracts",
                desc: "Pay monthly, cancel any time. No setup fees, no hidden costs. Start with a free listing and upgrade when you're ready.",
              },
              {
                title: "Complete Control",
                desc: "Manage your profile, update pricing, and respond to enquiries. Full control over your clinic's online presence.",
              },
              {
                title: "SEO Boost",
                desc: "Each clinic gets a dedicated profile page with structured data markup. This backlink and citation helps your own website rank higher.",
              },
            ].map((item) => (
              <div key={item.title} className="flex gap-4">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center shrink-0 mt-1">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{item.title}</h3>
                  <p className="text-gray-600 text-sm mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-blue-600 text-white py-12 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-3">
            Ready to Get Started?
          </h2>
          <p className="text-blue-100 mb-6">
            Email us at{" "}
            <a href="mailto:clinics@assessmentdirectory.co.uk" className="underline">
              clinics@assessmentdirectory.co.uk
            </a>{" "}
            with your clinic details and we&apos;ll get you listed within 24
            hours.
          </p>
          <a
            href="mailto:clinics@assessmentdirectory.co.uk?subject=List My Clinic"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors"
          >
            Email Us to Get Listed
          </a>
        </div>
      </section>
    </div>
  );
}
