import { connectMongoDB } from "@/lib/mongodb";
import User from "@/lib/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const {
      name,
      email,
      password,
    } = await req.json();

    await connectMongoDB();

    // Check if the house already exists
    if (await User.findOne({ email })) {
      return NextResponse.error(
        { message: "Email is already used" },
        { status: 400 },
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return NextResponse.json({
      message: "House registered successfully",
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.error(
      { message: "An error occurred while creating the user" },
      { status: 500 },
    );
  }
}
