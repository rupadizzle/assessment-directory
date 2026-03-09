import { MetadataRoute } from "next";
import towns from "@/data/towns.json";
import clinics from "@/data/clinics.json";
import guides from "@/data/guides.json";
import { Town, Clinic, Guide } from "@/lib/types";

const BASE_URL = "https://assessmentdirectory.co.uk";
const allTowns = towns as Town[];
const allClinics = clinics as unknown as Clinic[];
const allGuides = guides as Guide[];

const SITE_LAUNCH = "2025-01-15T00:00:00Z";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: BASE_URL, lastModified: SITE_LAUNCH },
    { url: `${BASE_URL}/adhd-assessment/`, lastModified: SITE_LAUNCH },
    { url: `${BASE_URL}/autism-assessment/`, lastModified: SITE_LAUNCH },
    { url: `${BASE_URL}/list-your-clinic/`, lastModified: SITE_LAUNCH },
    { url: `${BASE_URL}/pricing/`, lastModified: SITE_LAUNCH },
    { url: `${BASE_URL}/guides/`, lastModified: SITE_LAUNCH },
    { url: `${BASE_URL}/about/`, lastModified: SITE_LAUNCH },
    { url: `${BASE_URL}/privacy-policy/`, lastModified: SITE_LAUNCH },
    { url: `${BASE_URL}/terms/`, lastModified: SITE_LAUNCH },
  ];

  const adhdTownPages = allTowns.map((town) => ({
    url: `${BASE_URL}/adhd-assessment/${town.slug}/`,
    lastModified: SITE_LAUNCH,
  }));

  const autismTownPages = allTowns.map((town) => ({
    url: `${BASE_URL}/autism-assessment/${town.slug}/`,
    lastModified: SITE_LAUNCH,
  }));

  const clinicPages = allClinics.map((clinic) => ({
    url: `${BASE_URL}/clinic/${clinic.slug}/`,
    lastModified: clinic.updated_at,
  }));

  const guidePages = allGuides.map((guide) => ({
    url: `${BASE_URL}/guides/${guide.slug}/`,
    lastModified: guide.created_at,
  }));

  return [
    ...staticPages,
    ...adhdTownPages,
    ...autismTownPages,
    ...clinicPages,
    ...guidePages,
  ];
}
