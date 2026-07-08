import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  condition: string;
  assessmentType: string;
  location: string;
  townName: string | null;
  clinicId: string | null;
  clinicName: string | null;
  message: string;
  source: string;
  timestamp: string;
  status: "new" | "contacted" | "converted";
}

const LEADS_FILE = path.join(process.cwd(), "src", "data", "leads.json");

async function getLeads(): Promise<Lead[]> {
  try {
    const data = await fs.readFile(LEADS_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function saveLeads(leads: Lead[]): Promise<void> {
  await fs.writeFile(LEADS_FILE, JSON.stringify(leads, null, 2));
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, condition, assessmentType, location, townName, clinicId, clinicName, message, source, timestamp } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    const lead: Lead = {
      id: `lead-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      name,
      email,
      phone: phone || "",
      condition: condition || "",
      assessmentType: assessmentType || "",
      location: location || "",
      townName: townName || null,
      clinicId: clinicId || null,
      clinicName: clinicName || null,
      message: message || "",
      source: source || "",
      timestamp: timestamp || new Date().toISOString(),
      status: "new",
    };

    const leads = await getLeads();
    leads.push(lead);
    await saveLeads(leads);

    // Log for monitoring
    console.log(`[LEAD] New ${condition} lead from ${source}: ${name} (${email})`);

    return NextResponse.json({
      success: true,
      message: "Enquiry received. We'll be in touch within 24 hours.",
      leadId: lead.id,
    });
  } catch (err) {
    console.error("[LEAD] Error processing lead:", err);
    return NextResponse.json(
      { error: "Failed to process enquiry" },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Simple admin endpoint — in production, add auth
  try {
    const leads = await getLeads();
    return NextResponse.json({
      total: leads.length,
      new: leads.filter((l) => l.status === "new").length,
      leads: leads.slice(-50).reverse(),
    });
  } catch {
    return NextResponse.json({ error: "Failed to fetch leads" }, { status: 500 });
  }
}
