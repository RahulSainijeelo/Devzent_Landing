import { NextRequest, NextResponse } from "next/server";
import { db } from "@/config/firebase";
import { z } from "zod";

const profileSchema = z.object({
  name: z.string(),
  bio: z.string(),
  photo: z.string().url(),
  phoneNumbers: z.array(z.string()),
  email: z.string().email(),
  address: z.string(),
  whatsapp: z.string(),
  experience: z.string(),
  workingHours: z.string(),
});

const PROFILE_DOC_ID = "main"; // single profile document

export async function GET() {
  try {
    const doc = await db.collection("profile").doc(PROFILE_DOC_ID).get();
    if (!doc.exists) {
      return NextResponse.json(
        { message: "Profile not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(doc.data(), { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch profile" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const data = profileSchema.parse(body);
    await db
      .collection("profile")
      .doc(PROFILE_DOC_ID)
      .set(data, { merge: true });
    return NextResponse.json({ message: "Profile updated" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update profile" },
      { status: 400 }
    );
  }
}
