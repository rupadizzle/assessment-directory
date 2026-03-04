import { MetadataRoute } from "next";
import towns from "@/data/towns.json";
import clinics from "@/data/clinics.json";
import guides from "@/data/guides.json";
import { Town, Clinic, Guide } from "@/lib/types";

const BASE_URL = "https://assessmentdirectory.co.uk";
const allTowns = towns as Town[];
const allClinics = clinics as unknown as Clinic[];
const allGuides = guides as Guide[];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 1.0 },
    { url: `${BASE_URL}/adhd-assessment/`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${BASE_URL}/autism-assessment/`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${BASE_URL}/list-your-clinic/`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${BASE_URL}/pricing/`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 },
  ];

  const adhdTownPages = allTowns.map((town) => ({
    url: `${BASE_URL}/adhd-assessment/${town.slug}/`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const autismTownPages = allTowns.map((town) => ({
    url: `${BASE_URL}/autism-assessment/${town.slug}/`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const clinicPages = allClinics.map((clinic) => ({
    url: `${BASE_URL}/clinic/${clinic.slug}/`,
    lastModified: new Date(clinic.updated_at),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const guidePages = allGuides.map((guide) => ({
    url: `${BASE_URL}/guides/${guide.slug}/`,
    lastModified: new Date(guide.created_at),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    ...staticPages,
    ...adhdTownPages,
    ...autismTownPages,
    ...clinicPages,
    ...guidePages,
  ];
}
