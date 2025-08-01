import { z } from "zod";
import { db } from "@/config/firebase"; // Use your admin SDK config
import { NextRequest, NextResponse } from "next/server";

const categories = [
  "Tiles",
  "Marble",
  "Kota Stone",
  "Ladi",
  "Vitrified Tiles",
  "Stone Cladding",
  "Other",
] as const;

const portfolioSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  category: z.enum(categories),
  description: z.string().min(5, "Description must be at least 5 characters"),
  images: z.array(z.string().url("Invalid image URL")),
});

export async function GET(request: NextRequest) {
  try {
    const snapshot = await db.collection("portfolio").orderBy("title").get();
    const data = snapshot.docs.map((doc: any) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json("Failed to fetch portfolio items", {
      status: 500,
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = portfolioSchema.parse(body);
    console.log("This is post and data is", data);
    await db.collection("portfolio").add(data);

    return NextResponse.json("Portfolio item added successfully", {
      status: 200,
    });
  } catch (error) {
    console.error("This is post and error is", error);
    return NextResponse.json(
      error instanceof z.ZodError
        ? JSON.stringify(error.errors)
        : "Internal Server Error",
      { status: 400 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...rest } = body;
    if (!id) throw new Error("ID is required");

    const data = portfolioSchema.partial().parse(rest);

    await db.collection("portfolio").doc(id).update(data);

    return NextResponse.json("Portfolio item updated successfully", {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      error instanceof z.ZodError
        ? JSON.stringify(error.errors)
        : "Internal Server Error",
      { status: 400 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();
    if (!id) throw new Error("ID is required");

    await db.collection("portfolio").doc(id).delete();

    return NextResponse.json("Portfolio item deleted successfully", {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      error instanceof z.ZodError
        ? JSON.stringify(error.errors)
        : "Internal Server Error",
      { status: 400 }
    );
  }
}
