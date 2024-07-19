// app/api/findUser.js
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/lib/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { email  } = await req.json();

    await connectMongoDB();
    const user = await User.findOne({ email });


    console.log("user from findUser", user);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
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
