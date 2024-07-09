import { connectMongoDB } from "@/lib/mongodb";
import User from "@/lib/models/user";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { email } = await req.json();

    await connectMongoDB();
    const user = await User.findOne({ email }).select("_id");

    return NextResponse.json({ user });
  } catch (error) {
    console.error(error);
    return NextResponse.error(
      { message: "An error occurred while finding duplicate user." },
      { status: 500 },
    );
  }
}
