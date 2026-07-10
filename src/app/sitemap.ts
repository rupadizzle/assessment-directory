import { MetadataRoute } from "next";
import towns from "@/data/towns.json";
import clinics from "@/data/clinics.json";
import guides from "@/data/guides.json";
import { Town, Clinic, Guide } from "@/lib/types";

const BASE_URL = "https://assessmentdirectory.co.uk";
const allTowns = towns as Town[];
const allClinics = clinics as unknown as Clinic[];
const allGuides = guides as Guide[];

const LAST_UPDATED = "2026-07-10T00:00:00Z";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: BASE_URL, lastModified: LAST_UPDATED },
    { url: `${BASE_URL}/adhd-assessment/`, lastModified: LAST_UPDATED },
    { url: `${BASE_URL}/autism-assessment/`, lastModified: LAST_UPDATED },
    { url: `${BASE_URL}/clinics/`, lastModified: LAST_UPDATED },
    { url: `${BASE_URL}/list-your-clinic/`, lastModified: LAST_UPDATED },
    { url: `${BASE_URL}/pricing/`, lastModified: LAST_UPDATED },
    { url: `${BASE_URL}/guides/`, lastModified: LAST_UPDATED },
    { url: `${BASE_URL}/about/`, lastModified: LAST_UPDATED },
    { url: `${BASE_URL}/privacy-policy/`, lastModified: LAST_UPDATED },
    { url: `${BASE_URL}/terms/`, lastModified: LAST_UPDATED },
  ];

  const adhdTownPages = allTowns.map((town) => ({
    url: `${BASE_URL}/adhd-assessment/${town.slug}/`,
    lastModified: LAST_UPDATED,
  }));

  const autismTownPages = allTowns.map((town) => ({
    url: `${BASE_URL}/autism-assessment/${town.slug}/`,
    lastModified: LAST_UPDATED,
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
