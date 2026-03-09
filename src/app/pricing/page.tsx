import { Metadata } from "next";
import PricingTable from "@/components/PricingTable";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pricing — Clinic Listing Plans",
  description:
    "Choose a plan for your clinic listing. Free basic listing, Featured from £49/mo, Premium from £149/mo. No long-term contracts.",
  alternates: {
    canonical: "https://assessmentdirectory.co.uk/pricing/",
  },
};

export default function PricingPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          Simple, Transparent Pricing
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Start with a free listing. Upgrade when you want priority placement
          and more enquiries. Cancel any time.
        </p>
      </div>

      <PricingTable />

      <div className="text-center mt-12">
        <Link
          href="/list-your-clinic/"
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          Learn more about listing your clinic →
        </Link>
      </div>
    </div>
  );
}
