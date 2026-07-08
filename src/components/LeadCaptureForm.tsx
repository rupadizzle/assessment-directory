"use client";

import { useState } from "react";

interface LeadCaptureFormProps {
  condition: "adhd" | "autism";
  townName?: string;
  clinicId?: string;
  clinicName?: string;
  variant?: "inline" | "sidebar" | "banner";
}

export default function LeadCaptureForm({
  condition,
  townName,
  clinicId,
  clinicName,
  variant = "inline",
}: LeadCaptureFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    assessmentType: condition === "adhd" ? "adhd_adult" : "autism_adult",
    location: townName || "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      const res = await fetch("/api/leads/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          condition,
          townName,
          clinicId: clinicId || null,
          clinicName: clinicName || null,
          source: typeof window !== "undefined" ? window.location.pathname : "",
          timestamp: new Date().toISOString(),
        }),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", phone: "", assessmentType: formData.assessmentType, location: townName || "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const conditionLabel = condition === "adhd" ? "ADHD" : "Autism";
  const headingColor = condition === "adhd" ? "text-blue-700" : "text-purple-700";
  const btnColor = condition === "adhd" ? "bg-blue-600 hover:bg-blue-700" : "bg-purple-600 hover:bg-purple-700";
  const borderColor = condition === "adhd" ? "border-blue-200" : "border-purple-200";
  const bgColor = condition === "adhd" ? "bg-blue-50" : "bg-purple-50";

  if (status === "success") {
    return (
      <div className={`${bgColor} rounded-xl border ${borderColor} p-6 text-center`}>
        <div className="text-3xl mb-3">✓</div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Enquiry Sent!</h3>
        <p className="text-gray-600 text-sm">
          We&apos;ll match you with {conditionLabel} assessment clinics
          {townName ? ` near ${townName}` : ""} and send you their details within 24 hours.
        </p>
      </div>
    );
  }

  if (variant === "banner") {
    return (
      <div className={`${bgColor} rounded-xl border ${borderColor} p-6`}>
        <h3 className={`text-lg font-semibold ${headingColor} mb-1`}>
          Get Matched to {conditionLabel} Clinics{townName ? ` Near ${townName}` : ""}
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Tell us what you need and we&apos;ll connect you with clinics that can help. Free, no obligation.
        </p>
        <form onSubmit={handleSubmit} className="grid sm:grid-cols-4 gap-3">
          <input
            type="text"
            placeholder="Your name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="px-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <input
            type="email"
            placeholder="Email address"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="px-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <input
            type="tel"
            placeholder="Phone (optional)"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="px-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="submit"
            disabled={status === "submitting"}
            className={`${btnColor} text-white px-6 py-3 rounded-lg font-medium text-sm transition-colors disabled:opacity-50`}
          >
            {status === "submitting" ? "Sending..." : "Get Matched Free"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className={`${bgColor} rounded-xl border ${borderColor} p-6`}>
      <h3 className={`text-lg font-semibold ${headingColor} mb-1`}>
        {clinicName
          ? `Enquire About ${conditionLabel} Assessment`
          : `Find ${conditionLabel} Assessment Clinics${townName ? ` in ${townName}` : ""}`}
      </h3>
      <p className="text-sm text-gray-600 mb-4">
        {clinicName
          ? `Send an enquiry to ${clinicName}. They'll respond within 24 hours.`
          : `Tell us what you need and we'll match you with suitable clinics. Free, no obligation.`}
      </p>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="grid sm:grid-cols-2 gap-3">
          <input
            type="text"
            placeholder="Your name *"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="px-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <input
            type="email"
            placeholder="Email address *"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="px-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          <input
            type="tel"
            placeholder="Phone number (optional)"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="px-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <select
            value={formData.assessmentType}
            onChange={(e) => setFormData({ ...formData, assessmentType: e.target.value })}
            className="px-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
          >
            {condition === "adhd" ? (
              <>
                <option value="adhd_adult">Adult ADHD Assessment</option>
                <option value="adhd_child">Child ADHD Assessment</option>
              </>
            ) : (
              <>
                <option value="autism_adult">Adult Autism Assessment</option>
                <option value="autism_child">Child Autism Assessment</option>
              </>
            )}
          </select>
        </div>
        {!townName && (
          <input
            type="text"
            placeholder="Your location (town or postcode)"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        )}
        <textarea
          placeholder="Tell us about your needs (optional)"
          rows={3}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          className={`w-full ${btnColor} text-white px-6 py-3 rounded-lg font-medium text-sm transition-colors disabled:opacity-50`}
        >
          {status === "submitting"
            ? "Sending..."
            : clinicName
            ? "Send Enquiry"
            : "Get Matched to Clinics Free"}
        </button>
        {status === "error" && (
          <p className="text-red-600 text-sm text-center">Something went wrong. Please try again.</p>
        )}
        <p className="text-xs text-gray-400 text-center">
          By submitting, you agree to be contacted by assessment clinics. We never share your data with third parties.
        </p>
      </form>
    </div>
  );
}
