import Link from "next/link";

const tiers = [
  {
    name: "Free Listing",
    price: "£0",
    period: "forever",
    description: "Get your clinic listed in our directory",
    features: [
      "Basic clinic profile",
      "Name, address & contact info",
      "Listed on relevant town pages",
      "Link to your website",
    ],
    cta: "Get Listed Free",
    href: "/list-your-clinic/",
    highlighted: false,
  },
  {
    name: "Featured",
    price: "£49",
    period: "/month",
    description: "Stand out from other clinics with priority placement",
    features: [
      "Everything in Free, plus:",
      "Priority placement in search results",
      "Featured badge on your profile",
      "Enhanced clinic profile",
      "Direct enquiry forwarding",
      "Performance analytics",
    ],
    cta: "Upgrade to Featured",
    href: "/list-your-clinic/",
    highlighted: true,
  },
  {
    name: "Premium",
    price: "£149",
    period: "/month",
    description: "Maximum visibility and lead generation",
    features: [
      "Everything in Featured, plus:",
      "Top placement on all pages",
      "Premium gold badge",
      "Full clinic showcase page",
      "Priority enquiry routing",
      "Monthly SEO report",
      "Dedicated account manager",
    ],
    cta: "Go Premium",
    href: "/list-your-clinic/",
    highlighted: false,
  },
];

export default function PricingTable() {
  return (
    <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
      {tiers.map((tier) => (
        <div
          key={tier.name}
          className={`rounded-2xl p-6 flex flex-col ${
            tier.highlighted
              ? "bg-blue-600 text-white shadow-xl ring-2 ring-blue-600 scale-105"
              : "bg-white border border-gray-200 shadow-sm"
          }`}
        >
          <h3
            className={`text-lg font-semibold ${tier.highlighted ? "text-white" : "text-gray-900"}`}
          >
            {tier.name}
          </h3>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-3xl font-bold">{tier.price}</span>
            <span
              className={`text-sm ${tier.highlighted ? "text-blue-100" : "text-gray-500"}`}
            >
              {tier.period}
            </span>
          </div>
          <p
            className={`mt-3 text-sm ${tier.highlighted ? "text-blue-100" : "text-gray-600"}`}
          >
            {tier.description}
          </p>

          <ul className="mt-6 space-y-3 flex-1">
            {tier.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2 text-sm">
                <svg
                  className={`w-5 h-5 shrink-0 mt-0.5 ${tier.highlighted ? "text-blue-200" : "text-green-500"}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <Link
            href={tier.href}
            className={`mt-6 block text-center py-3 rounded-lg font-medium transition-colors ${
              tier.highlighted
                ? "bg-white text-blue-600 hover:bg-blue-50"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {tier.cta}
          </Link>
        </div>
      ))}
    </div>
  );
}
