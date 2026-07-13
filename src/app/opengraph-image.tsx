import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt =
  "UK Assessment Directory — Find Private ADHD & Autism Assessments";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 55%, #7e22ce 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            fontSize: 32,
            fontWeight: 600,
            opacity: 0.9,
            marginBottom: 32,
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              background: "rgba(255,255,255,0.15)",
              border: "2px solid rgba(255,255,255,0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 13l4 4L19 7" />
            </svg>
          </div>
          UK Assessment Directory
        </div>
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: "-2px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span>Find Private ADHD &amp; Autism</span>
          <span style={{ color: "#bfdbfe" }}>Assessments Near You</span>
        </div>
        <div
          style={{
            fontSize: 30,
            marginTop: 36,
            color: "rgba(255,255,255,0.85)",
          }}
        >
          Compare 360+ clinics · Prices · Waiting times · Right to Choose
        </div>
      </div>
    ),
    size
  );
}
