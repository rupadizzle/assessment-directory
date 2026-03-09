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
          className={`rounded-2xl p-7 flex flex-col transition-all duration-300 ${
            tier.highlighted
              ? "bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-xl shadow-blue-500/20 ring-1 ring-blue-500/50 scale-105"
              : "bg-white border border-gray-200/60 shadow-sm hover:shadow-md hover:-translate-y-0.5"
          }`}
        >
          {tier.highlighted && (
            <span className="text-xs font-semibold bg-white/20 text-white px-3 py-1 rounded-full w-fit mb-4">
              Most Popular
            </span>
          )}
          <h3
            className={`text-lg font-semibold ${tier.highlighted ? "text-white" : "text-gray-900"}`}
          >
            {tier.name}
          </h3>
          <div className="mt-3 flex items-baseline gap-1">
            <span className="text-4xl font-bold tracking-tight">{tier.price}</span>
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

          <ul className="mt-7 space-y-3.5 flex-1">
            {tier.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2.5 text-sm">
                <svg
                  className={`w-5 h-5 shrink-0 mt-0.5 ${tier.highlighted ? "text-blue-200" : "text-emerald-500"}`}
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
            className={`mt-7 block text-center py-3 rounded-xl font-medium transition-all ${
              tier.highlighted
                ? "bg-white text-blue-600 hover:bg-blue-50 shadow-sm"
                : "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-sm hover:shadow-md"
            }`}
          >
            {tier.cta}
          </Link>
        </div>
      ))}
    </div>
  );
}
