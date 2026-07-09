"use client";

import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import Link from "next/link";
import { Clinic, CONDITIONS } from "@/lib/types";
import { formatPrice, getDistance } from "@/lib/utils";
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

function createUserLocationIcon(): L.DivIcon {
  return L.divIcon({
    className: "custom-pin",
    html: `<div style="
      width:16px;height:16px;
      background:#3b82f6;
      border:3px solid white;
      border-radius:50%;
      box-shadow:0 0 0 6px rgba(59,130,246,0.25), 0 2px 8px rgba(0,0,0,0.3);
      animation: pulse-ring 2s ease-out infinite;
    "></div>`,
    iconSize: [22, 22],
    iconAnchor: [11, 11],
  });
}

// Sidebar clinic card (compact version for map view)
function MapClinicCard({
  clinic,
  isActive,
  distanceMiles,
  onHover,
  onClick,
}: {
  clinic: Clinic;
  isActive: boolean;
  distanceMiles?: number;
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
        {distanceMiles !== undefined && (
          <span className="text-[10px] px-2 py-0.5 rounded-md bg-orange-50 text-orange-700 font-medium">
            {distanceMiles < 1
              ? "< 1 mile"
              : `${Math.round(distanceMiles)} mile${Math.round(distanceMiles) !== 1 ? "s" : ""}`}
          </span>
        )}
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
  const userMarkerRef = useRef<L.Marker | null>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  const [filter, setFilter] = useState<FilterCondition>("all");
  const [activeClinicId, setActiveClinicId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locatingState, setLocatingState] = useState<"idle" | "loading" | "denied">("idle");
  const [mobileView, setMobileView] = useState<"map" | "list">("map");

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

  // Sort by distance when user location is available
  const sortedClinics = useMemo(() => {
    if (!userLocation) return filteredClinics;

    return [...filteredClinics].sort((a, b) => {
      const distA = getDistance(userLocation.lat, userLocation.lng, a.lat, a.lng);
      const distB = getDistance(userLocation.lat, userLocation.lng, b.lat, b.lng);
      return distA - distB;
    });
  }, [filteredClinics, userLocation]);

  // Compute distances per clinic
  const clinicDistances = useMemo(() => {
    if (!userLocation) return new Map<string, number>();
    const map = new Map<string, number>();
    sortedClinics.forEach((c) => {
      map.set(c.id, getDistance(userLocation.lat, userLocation.lng, c.lat, c.lng));
    });
    return map;
  }, [sortedClinics, userLocation]);

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
    sortedClinics
      .filter((c) => c.city !== "Online" && c.city !== "Nationwide")
      .forEach((clinic) => {
        const marker = L.marker([clinic.lat, clinic.lng], {
          icon: createPinIcon(clinic.conditions, clinic.id === activeClinicId),
        });

        const dist = clinicDistances.get(clinic.id);
        const distText = dist !== undefined
          ? `<span style="font-size:11px;color:#c2410c;font-weight:500">${Math.round(dist)} miles away</span><br/>`
          : "";

        marker.bindPopup(
          `<div style="min-width:180px">
            <strong style="font-size:13px">${clinic.name}</strong><br/>
            <span style="font-size:11px;color:#666">${clinic.city} · ${clinic.postcode}</span><br/>
            ${distText}
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
  }, [sortedClinics, activeClinicId, clinicDistances]);

  // Handle geolocation
  const handleLocateMe = useCallback(() => {
    if (!navigator.geolocation) {
      setLocatingState("denied");
      return;
    }

    setLocatingState("loading");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });
        setLocatingState("idle");

        const map = mapRef.current;
        if (!map) return;

        // Remove old user marker
        if (userMarkerRef.current) {
          userMarkerRef.current.remove();
        }

        // Add user location marker
        const userMarker = L.marker([latitude, longitude], {
          icon: createUserLocationIcon(),
          zIndexOffset: 1000,
        });

        userMarker.bindPopup(
          `<div style="text-align:center;min-width:120px">
            <strong style="font-size:13px">You are here</strong><br/>
            <span style="font-size:11px;color:#666">Clinics sorted by distance</span>
          </div>`,
          { closeButton: false, offset: [0, -8] }
        );

        userMarker.addTo(map);
        userMarkerRef.current = userMarker;

        // Fly to user location
        map.flyTo([latitude, longitude], 10, { duration: 1.2 });

        // Open the popup briefly
        setTimeout(() => userMarker.openPopup(), 1300);
        setTimeout(() => userMarker.closePopup(), 4000);
      },
      (error) => {
        console.warn("Geolocation error:", error.message);
        setLocatingState("denied");
        // Reset after 3 seconds
        setTimeout(() => setLocatingState("idle"), 3000);
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 300000, // Cache for 5 min
      }
    );
  }, []);

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

        {/* Location button */}
        <button
          onClick={handleLocateMe}
          disabled={locatingState === "loading"}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all inline-flex items-center gap-1.5 ${
            userLocation
              ? "bg-blue-600 text-white shadow-sm"
              : locatingState === "denied"
              ? "bg-red-50 text-red-600 border border-red-200"
              : locatingState === "loading"
              ? "bg-gray-100 text-gray-400 cursor-wait"
              : "bg-orange-50 text-orange-700 hover:bg-orange-100 border border-orange-200"
          }`}
        >
          {locatingState === "loading" ? (
            <>
              <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Locating...
            </>
          ) : locatingState === "denied" ? (
            <>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
              </svg>
              Location denied
            </>
          ) : (
            <>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {userLocation ? "Near me" : "Find my location"}
            </>
          )}
        </button>

        <div className="relative flex-1 min-w-[180px] max-w-xs">
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
          {sortedClinics.length} clinic{sortedClinics.length !== 1 ? "s" : ""} shown
          {userLocation && " · sorted by distance"}
        </p>
      </div>

      {/* Map + Sidebar */}
      <div className="flex flex-1 min-h-0">
        {/* Map — hidden on mobile when list view is active */}
        <div className={`flex-1 relative ${mobileView === "list" ? "hidden md:block" : ""}`}>
          <div ref={mapContainerRef} className="absolute inset-0" />

          {/* Legend — hide on mobile for more map space */}
          <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/60 px-4 py-3 z-[1000] hidden sm:block">
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
              {userLocation && (
                <div className="flex items-center gap-2 mt-1 pt-1 border-t border-gray-100">
                  <div className="w-3 h-3 rounded-full bg-blue-500 border-2 border-white shadow-sm ring-2 ring-blue-200" />
                  <span className="text-xs text-gray-600">Your location</span>
                </div>
              )}
            </div>
          </div>

          {/* Mobile toggle button — bottom center of map */}
          <button
            onClick={() => setMobileView("list")}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[1000] md:hidden bg-white shadow-lg border border-gray-200 rounded-full px-5 py-2.5 flex items-center gap-2 text-sm font-semibold text-gray-800 active:scale-95 transition-transform"
          >
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
            View list ({sortedClinics.length})
          </button>
        </div>

        {/* Mobile list view — shown only on mobile when list is active */}
        <div className={`flex-1 flex flex-col bg-white ${mobileView === "list" ? "flex md:hidden" : "hidden"}`}>
          <div className="px-4 py-3 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-gray-800">
                {sortedClinics.length} Clinic{sortedClinics.length !== 1 ? "s" : ""}
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                {userLocation
                  ? "Sorted by distance from you"
                  : "Tap a clinic to view details"}
              </p>
            </div>
            <button
              onClick={() => setMobileView("map")}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              Map
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            {sortedClinics.map((clinic) => (
              <MapClinicCard
                key={clinic.id}
                clinic={clinic}
                isActive={clinic.id === activeClinicId}
                distanceMiles={clinicDistances.get(clinic.id)}
                onHover={() => {}}
                onClick={() => handleCardClick(clinic)}
              />
            ))}

            {sortedClinics.length === 0 && (
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

        {/* Desktop sidebar — unchanged */}
        <div className="w-[380px] border-l border-gray-200 bg-white flex-col shrink-0 hidden md:flex">
          <div className="px-4 py-3 border-b border-gray-100 bg-gray-50/50">
            <h2 className="text-sm font-semibold text-gray-800">
              {sortedClinics.length} Clinic{sortedClinics.length !== 1 ? "s" : ""}
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              {userLocation
                ? "Sorted by distance from you"
                : "Click a clinic to zoom on the map"}
            </p>
          </div>

          <div ref={sidebarRef} className="flex-1 overflow-y-auto">
            {sortedClinics.map((clinic) => (
              <div
                key={clinic.id}
                ref={(el) => {
                  if (el) cardRefs.current.set(clinic.id, el);
                }}
              >
                <MapClinicCard
                  clinic={clinic}
                  isActive={clinic.id === activeClinicId}
                  distanceMiles={clinicDistances.get(clinic.id)}
                  onHover={() => handleCardHover(clinic)}
                  onClick={() => handleCardClick(clinic)}
                />
              </div>
            ))}

            {sortedClinics.length === 0 && (
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
