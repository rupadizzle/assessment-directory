"use client";

import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import Link from "next/link";
import { Clinic, CONDITIONS } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface ClinicMapViewProps {
  clinics: Clinic[];
}

type FilterCondition = "all" | "adhd" | "autism";

function getPinColor(conditions: ("adhd" | "autism")[]): string {
  if (conditions.includes("adhd") && conditions.includes("autism")) return "#0d9488"; // teal
  if (conditions.includes("adhd")) return "#2563eb"; // blue
  return "#9333ea"; // purple
}

function createPinIcon(conditions: ("adhd" | "autism")[], isActive: boolean): L.DivIcon {
  const color = getPinColor(conditions);
  const size = isActive ? 16 : 10;
  const border = isActive ? 3 : 2;
  const shadow = isActive ? "0 0 0 4px rgba(37,99,235,0.2), 0 2px 8px rgba(0,0,0,0.3)" : "0 1px 4px rgba(0,0,0,0.3)";

  return L.divIcon({
    className: "custom-pin",
    html: `<div style="
      width:${size}px;height:${size}px;
      background:${color};
      border:${border}px solid white;
      border-radius:50%;
      box-shadow:${shadow};
      transition: all 0.2s ease;
    "></div>`,
    iconSize: [size + border * 2, size + border * 2],
    iconAnchor: [(size + border * 2) / 2, (size + border * 2) / 2],
  });
}

// Sidebar clinic card (compact version for map view)
function MapClinicCard({
  clinic,
  isActive,
  onHover,
  onClick,
}: {
  clinic: Clinic;
  isActive: boolean;
  onHover: () => void;
  onClick: () => void;
}) {
  const priceKey = clinic.conditions.includes("adhd") ? "adhd_adult" : "autism_adult";
  const price = clinic.pricing[priceKey as keyof typeof clinic.pricing];

  return (
    <div
      onMouseEnter={onHover}
      onClick={onClick}
      className={`p-4 border-b border-gray-100 cursor-pointer transition-all duration-200 ${
        isActive
          ? "bg-blue-50/80 border-l-4 border-l-blue-500"
          : "hover:bg-gray-50/80 border-l-4 border-l-transparent"
      }`}
    >
      <div className="flex justify-between items-start gap-3">
        <div className="min-w-0 flex-1">
          <h3 className={`font-semibold text-sm truncate ${isActive ? "text-blue-700" : "text-gray-900"}`}>
            {clinic.name}
          </h3>
          <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
            <svg className="w-3 h-3 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="truncate">{clinic.city} · {clinic.postcode}</span>
          </p>
        </div>
        <div className="text-right shrink-0">
          {price ? (
            <p className="text-sm font-bold text-gray-900">{formatPrice(price)}</p>
          ) : (
            <p className="text-xs text-gray-400">Contact</p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 mt-2">
        {clinic.conditions.map((c) => (
          <span
            key={c}
            className={`text-[10px] px-2 py-0.5 rounded-md font-medium ${
              c === "adhd" ? "bg-blue-100 text-blue-700" : "bg-purple-100 text-purple-700"
            }`}
          >
            {CONDITIONS[c].name}
          </span>
        ))}
        <span className="text-[10px] px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 font-medium">
          {clinic.wait_time}
        </span>
      </div>

      <div className="mt-2.5">
        <Link
          href={`/clinic/${clinic.slug}/`}
          className="text-xs text-blue-600 hover:text-blue-800 font-medium inline-flex items-center gap-1"
          onClick={(e) => e.stopPropagation()}
        >
          View profile
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}

export default function ClinicMapView({ clinics }: ClinicMapViewProps) {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<Map<string, L.Marker>>(new Map());
  const sidebarRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  const [filter, setFilter] = useState<FilterCondition>("all");
  const [activeClinicId, setActiveClinicId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter clinics
  const filteredClinics = useMemo(() => {
    let result = clinics;

    if (filter !== "all") {
      result = result.filter((c) => c.conditions.includes(filter));
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.city.toLowerCase().includes(q) ||
          c.postcode.toLowerCase().includes(q)
      );
    }

    return result;
  }, [clinics, filter, searchQuery]);

  // Initialize map
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: [54.5, -2.5], // Center of UK
      zoom: 6,
      zoomControl: false,
      scrollWheelZoom: true,
    });

    L.control.zoom({ position: "bottomright" }).addTo(map);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 18,
    }).addTo(map);

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Update markers when filter changes
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // Clear existing markers
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current.clear();

    // Add markers for filtered clinics (skip Online/Nationwide with default coords)
    filteredClinics
      .filter((c) => c.city !== "Online" && c.city !== "Nationwide")
      .forEach((clinic) => {
        const marker = L.marker([clinic.lat, clinic.lng], {
          icon: createPinIcon(clinic.conditions, clinic.id === activeClinicId),
        });

        marker.bindPopup(
          `<div style="min-width:180px">
            <strong style="font-size:13px">${clinic.name}</strong><br/>
            <span style="font-size:11px;color:#666">${clinic.city} · ${clinic.postcode}</span><br/>
            ${clinic.pricing.adhd_adult ? `<span style="font-size:12px;font-weight:600">From ${formatPrice(clinic.pricing.adhd_adult)}</span><br/>` : ""}
            <span style="font-size:11px;color:#059669">Wait: ${clinic.wait_time}</span><br/>
            <a href="/clinic/${clinic.slug}/" style="font-size:11px;color:#2563eb;text-decoration:none;font-weight:500">View profile →</a>
          </div>`,
          { closeButton: false, offset: [0, -5] }
        );

        marker.on("click", () => {
          setActiveClinicId(clinic.id);
          // Scroll sidebar to this card
          const cardEl = cardRefs.current.get(clinic.id);
          if (cardEl && sidebarRef.current) {
            sidebarRef.current.scrollTo({
              top: cardEl.offsetTop - sidebarRef.current.offsetTop - 10,
              behavior: "smooth",
            });
          }
        });

        marker.addTo(map);
        markersRef.current.set(clinic.id, marker);
      });
  }, [filteredClinics, activeClinicId]);

  // Handle clicking a card -> fly to pin
  const handleCardClick = useCallback(
    (clinic: Clinic) => {
      setActiveClinicId(clinic.id);
      const map = mapRef.current;
      if (!map) return;

      if (clinic.city !== "Online" && clinic.city !== "Nationwide") {
        map.flyTo([clinic.lat, clinic.lng], 13, { duration: 0.8 });

        const marker = markersRef.current.get(clinic.id);
        if (marker) {
          setTimeout(() => marker.openPopup(), 800);
        }
      }
    },
    []
  );

  // Handle hovering a card -> highlight pin
  const handleCardHover = useCallback((clinic: Clinic) => {
    // Update pin icons
    markersRef.current.forEach((marker, id) => {
      const c = clinics.find((cl) => cl.id === id);
      if (c) {
        marker.setIcon(createPinIcon(c.conditions, id === clinic.id));
      }
    });
  }, [clinics]);

  const filterCounts = useMemo(() => {
    const all = clinics.length;
    const adhd = clinics.filter((c) => c.conditions.includes("adhd")).length;
    const autism = clinics.filter((c) => c.conditions.includes("autism")).length;
    return { all, adhd, autism };
  }, [clinics]);

  return (
    <div className="flex flex-col h-[calc(100vh-64px)]">
      {/* Filter bar */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex flex-wrap items-center gap-3 z-10">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              filter === "all"
                ? "bg-gray-900 text-white shadow-sm"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            All ({filterCounts.all})
          </button>
          <button
            onClick={() => setFilter("adhd")}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              filter === "adhd"
                ? "bg-blue-600 text-white shadow-sm"
                : "bg-blue-50 text-blue-700 hover:bg-blue-100"
            }`}
          >
            ADHD ({filterCounts.adhd})
          </button>
          <button
            onClick={() => setFilter("autism")}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              filter === "autism"
                ? "bg-purple-600 text-white shadow-sm"
                : "bg-purple-50 text-purple-700 hover:bg-purple-100"
            }`}
          >
            Autism ({filterCounts.autism})
          </button>
        </div>

        <div className="relative flex-1 max-w-xs">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, city, or postcode..."
            className="w-full pl-9 pr-4 py-1.5 text-sm border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300"
          />
        </div>

        <p className="text-xs text-gray-400 ml-auto">
          {filteredClinics.length} clinic{filteredClinics.length !== 1 ? "s" : ""} shown
        </p>
      </div>

      {/* Map + Sidebar */}
      <div className="flex flex-1 min-h-0">
        {/* Map */}
        <div className="flex-1 relative">
          <div ref={mapContainerRef} className="absolute inset-0" />

          {/* Legend */}
          <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/60 px-4 py-3 z-[1000]">
            <p className="text-xs font-semibold text-gray-700 mb-2">Clinic Types</p>
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-600 border-2 border-white shadow-sm" />
                <span className="text-xs text-gray-600">ADHD only</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-purple-600 border-2 border-white shadow-sm" />
                <span className="text-xs text-gray-600">Autism only</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-teal-600 border-2 border-white shadow-sm" />
                <span className="text-xs text-gray-600">ADHD &amp; Autism</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-[380px] border-l border-gray-200 bg-white flex flex-col shrink-0 hidden md:flex">
          <div className="px-4 py-3 border-b border-gray-100 bg-gray-50/50">
            <h2 className="text-sm font-semibold text-gray-800">
              {filteredClinics.length} Clinic{filteredClinics.length !== 1 ? "s" : ""}
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">Click a clinic to zoom on the map</p>
          </div>

          <div ref={sidebarRef} className="flex-1 overflow-y-auto">
            {filteredClinics.map((clinic) => (
              <div
                key={clinic.id}
                ref={(el) => {
                  if (el) cardRefs.current.set(clinic.id, el);
                }}
              >
                <MapClinicCard
                  clinic={clinic}
                  isActive={clinic.id === activeClinicId}
                  onHover={() => handleCardHover(clinic)}
                  onClick={() => handleCardClick(clinic)}
                />
              </div>
            ))}

            {filteredClinics.length === 0 && (
              <div className="p-8 text-center">
                <p className="text-sm text-gray-500">No clinics match your filters.</p>
                <button
                  onClick={() => {
                    setFilter("all");
                    setSearchQuery("");
                  }}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium mt-2"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
