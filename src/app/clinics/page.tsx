import type { Metadata } from "next";
import dynamic from "next/dynamic";
import clinicsData from "@/data/clinics.json";
import { Clinic } from "@/lib/types";

// Dynamic import with SSR disabled — Leaflet requires `window`
const ClinicMapView = dynamic(() => import("@/components/ClinicMapView"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-[calc(100vh-64px)] bg-gray-50">
      <div className="text-center">
        <div className="w-12 h-12 border-3 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto" />
        <p className="text-sm text-gray-500 mt-4 font-medium">Loading clinic map…</p>
      </div>
    </div>
  ),
});

export const metadata: Metadata = {
  title: "Clinic Map — Find Private ADHD & Autism Assessment Clinics Near You",
  description:
    "Interactive map of 360+ private ADHD and Autism assessment clinics across the UK. Filter by condition, search by city, and compare prices and wait times.",
  alternates: {
    canonical: "https://assessmentdirectory.co.uk/clinics/",
  },
  openGraph: {
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    title: "Clinic Map — Find Private ADHD & Autism Assessment Clinics Near You",
    description:
      "Interactive map of 360+ private ADHD and Autism assessment clinics across the UK. Filter by condition, search by city, and compare prices and wait times.",
    url: "https://assessmentdirectory.co.uk/clinics/",
    siteName: "UK Assessment Directory",
    type: "website",
  },
};

export default function ClinicsMapPage() {
  const clinics = clinicsData as unknown as Clinic[];

  return (
    <>
      {/* Server-rendered heading for crawlers — the map itself is client-only */}
      <div className="sr-only">
        <h1>
          Clinic Map — Private ADHD &amp; Autism Assessment Clinics Across the
          UK
        </h1>
        <p>
          Browse {clinics.length} private ADHD and autism assessment clinics on
          an interactive map of the UK. Filter by condition, search by city,
          and compare prices and waiting times.
        </p>
      </div>
      <ClinicMapView clinics={clinics} />
    </>
  );
}
