import { Town, Clinic, Condition } from "./types";

/**
 * Calculate distance between two points using Haversine formula
 * Returns distance in miles
 */
export function getDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 3959; // Earth's radius in miles
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(deg: number): number {
  return deg * (Math.PI / 180);
}

/**
 * Find nearby towns within a given radius
 */
export function findNearbyTowns(
  town: Town,
  allTowns: Town[],
  radiusMiles: number = 30,
  limit: number = 8
): Town[] {
  return allTowns
    .filter((t) => t.slug !== town.slug)
    .map((t) => ({
      town: t,
      distance: getDistance(town.lat, town.lng, t.lat, t.lng),
    }))
    .filter((t) => t.distance <= radiusMiles)
    .sort((a, b) => a.distance - b.distance)
    .slice(0, limit)
    .map((t) => t.town);
}

/**
 * Find clinics that serve a given town
 */
export function findClinicsForTown(
  townSlug: string,
  clinics: Clinic[],
  condition: Condition
): Clinic[] {
  return clinics
    .filter(
      (c) =>
        c.conditions.includes(condition) && c.towns_served.includes(townSlug)
    )
    .sort((a, b) => {
      const tierOrder = { premium: 0, featured: 1, free: 2 };
      return tierOrder[a.tier] - tierOrder[b.tier];
    });
}

/**
 * Find clinics near a town by distance
 */
export function findClinicsNearTown(
  town: Town,
  clinics: Clinic[],
  condition: Condition,
  radiusMiles: number = 50,
  limit: number = 10
): Clinic[] {
  return clinics
    .filter((c) => c.conditions.includes(condition))
    .map((c) => ({
      clinic: c,
      distance: getDistance(town.lat, town.lng, c.lat, c.lng),
    }))
    .filter((c) => c.distance <= radiusMiles)
    .sort((a, b) => {
      const tierOrder = { premium: 0, featured: 1, free: 2 };
      const tierDiff = tierOrder[a.clinic.tier] - tierOrder[b.clinic.tier];
      if (tierDiff !== 0) return tierDiff;
      return a.distance - b.distance;
    })
    .slice(0, limit)
    .map((c) => c.clinic);
}

/**
 * Format price for display
 */
export function formatPrice(price?: number): string {
  if (!price) return "Contact for pricing";
  return `£${price.toLocaleString()}`;
}

/**
 * Generate a slug from a string
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/**
 * Capitalise first letter of each word
 */
export function titleCase(str: string): string {
  return str.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
}
