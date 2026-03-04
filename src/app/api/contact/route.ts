import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, message, clinicId } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email and message are required" },
        { status: 400 }
      );
    }

    // In production, this would send an email to the clinic
    // For now, just log and return success
    console.log("Enquiry received:", { name, email, phone, message, clinicId });

    return NextResponse.json({ success: true, message: "Enquiry sent successfully" });
  } catch {
    return NextResponse.json(
      { error: "Failed to process enquiry" },
      { status: 500 }
    );
  }
}
