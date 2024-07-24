// app/api/findUser.js
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/lib/models/user";
import VerificationToken from "@/lib/models/verificationToken";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import crypto from "crypto";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    await connectMongoDB();
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    if (user.isVerified === false) {
      // Delete any existing verification token
      const verificationTokenExists = await VerificationToken.findOne({
        userId: user._id,
      });

      if (verificationTokenExists) {
        await VerificationToken.deleteOne({ userId: user._id });
      }

      // Create a new token
      const token = await VerificationToken.create({
        userId: user._id,
        token: crypto.randomBytes(16).toString("hex"),
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
      });

      // Send email with token
      const res = await fetch(`${process.env.PUBLIC_URL}/api/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,
          name: user.name,
          token: token.token,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        console.log("api send:", data);
        return NextResponse.json(
          { message: data.message || "Failed to send verification email" },
          { status: res.status },
        );
      }

      return NextResponse.json(
        { message: "User has not verified email. Verification email sent." },
        { status: 401 },
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json(
        { message: "Incorrect password" },
        { status: 401 },
      );
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Error finding user:", error.message);
    return NextResponse.json(
      { message: "An error occurred while finding the user" },
      { status: 500 },
    );
  }
}
