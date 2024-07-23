import { connectMongoDB } from "@/lib/mongodb";
import House from "@/lib/models/house";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { address } = await req.json();

    await connectMongoDB();
    const houses = await House.find({
      address: { $regex: new RegExp(address, "i") },
    }).exec();

    return NextResponse.json({ houses });
  } catch (error) {
    console.error(error);
    return NextResponse.error(
      { message: "An error occurred while finding House object." },
      { status: 500 },
    );
  }
}
