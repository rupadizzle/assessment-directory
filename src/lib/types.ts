export interface Clinic {
  id: string;
  name: string;
  slug: string;
  conditions: ("adhd" | "autism")[];
  towns_served: string[];
  address: string;
  city: string;
  postcode: string;
  lat: number;
  lng: number;
  phone: string;
  email: string;
  website: string;
  pricing: {
    adhd_adult?: number;
    adhd_child?: number;
    autism_adult?: number;
    autism_child?: number;
  };
  wait_time: string;
  tier: "free" | "featured" | "premium";
  featured_until?: string;
  logo?: string;
  description: string;
  services: string[];
  professionals: string[];
  created_at: string;
  updated_at: string;
}

export interface Town {
  slug: string;
  name: string;
  county: string;
  region: string;
  lat: number;
  lng: number;
  population: number;
  nearby_towns: string[];
}

export interface Guide {
  slug: string;
  title: string;
  meta_description: string;
  content: string;
  condition: "adhd" | "autism" | "both";
  created_at: string;
}

export type Condition = "adhd" | "autism";

export interface ConditionConfig {
  slug: string;
  name: string;
  fullName: string;
  description: string;
  color: string;
}

export const CONDITIONS: Record<Condition, ConditionConfig> = {
  adhd: {
    slug: "adhd-assessment",
    name: "ADHD",
    fullName: "ADHD Assessment",
    description: "Private ADHD assessments and diagnosis",
    color: "blue",
  },
  autism: {
    slug: "autism-assessment",
    name: "Autism",
    fullName: "Autism Assessment",
    description: "Private autism assessments and diagnosis",
    color: "purple",
  },
};
