import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "UK Assessment Directory — Find Private ADHD & Autism Assessments",
    template: "%s | UK Assessment Directory",
  },
  description:
    "Find trusted private ADHD and Autism assessment clinics across the UK. Compare prices, waiting times and book your assessment today.",
  metadataBase: new URL("https://assessmentdirectory.co.uk"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-gray-50 text-gray-900 antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
