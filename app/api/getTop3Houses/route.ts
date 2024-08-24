import House from "@/lib/models/house";
import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectMongoDB();
    const houses = await House.find().sort({ rating: -1 }).limit(3);
    if (!houses) {
      return NextResponse.json({ message: "No houses found" }, { status: 404 });
    }
    console.log("top 3 houses", houses);

    return NextResponse.json(houses, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch top 3 houses: ", error);
    return NextResponse.json(
      { message: "Failed to fetch top 3 houses" },
      { status: 500 },
    );
  }
}
