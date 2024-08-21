import { connectMongoDB } from "@/lib/mongodb";
import House from "@/lib/models/house";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { slug } = await req.json();

    await connectMongoDB();
    const house = await House.findOne({ slug });

    if (!house) {
      return NextResponse.json({ message: "House not found" }, { status: 404 });
    }

    return NextResponse.json({ house });
  } catch (error) {
    console.error(error);
    return NextResponse.error(
      { message: "An error occurred while getting House object." },
      { status: 500 },
    );
  }
}
