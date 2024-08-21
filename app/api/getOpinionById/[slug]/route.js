"use server";
import { connectMongoDB } from "@/lib/mongodb";
import Opinion from "@/lib/models/opinion";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    // Extract query parameters from req.url
    let opinionId;
    console.log(req.nextUrl.pathname);
    try {
      const lastSegment = req.nextUrl.pathname.split("/").pop();
      [opinionId] = lastSegment.split("&");
    } catch (error) {
      console.error("Error parsing query parameters:", error);
      return NextResponse.json(
        { opinion: null, error: "Error parsing query parameters" },
        { status: 400 },
      );
    }

    if (!opinionId) {
      return NextResponse.json(
        { opinion: null, error: "Opinion ID is required" },
        { status: 400 },
      );
    }

    await connectMongoDB();
    const opinion = await Opinion.findById(opinionId);

    if (!opinion) {
      return NextResponse.json(
        { opinion: null, error: "Opinion not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ opinion });
  } catch (error) {
    console.error("Error fetching opinion:", error);
    return NextResponse.json(
      { message: "An error occurred while fetching the opinion" },
      { status: 500 },
    );
  }
}
