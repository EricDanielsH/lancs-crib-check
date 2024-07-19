// app/api/findUser.js
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/lib/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    await connectMongoDB();
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json({ message: "Incorrect password" }, { status: 401 });
    }


    return NextResponse.json({user});
  } catch (error) {
    console.error("Error finding user:", error.message);
    return NextResponse.json(
      { message: "An error occurred while finding the user" },
      { status: 500 },
    );
  }
}
