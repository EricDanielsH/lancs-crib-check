import { type NextRequest } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import Token from "@/lib/models/verificationToken";
import User from "@/lib/models/user";
import { redirect } from "next/navigation";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const token = searchParams.get("token");
  const email = searchParams.get("email");
  console.log(token);

  if (!token) {
    return Response.json({ message: "Missing token" }, { status: 400 });
  }

  await connectMongoDB();
  // check if token is in database

  const tokenExists = await Token.findOne({ token });

  if (!tokenExists) {
    return Response.json({ message: "Invalid token" }, { status: 400 });
  }

  // check if token is expired
  if (tokenExists.expires < new Date()) {
    return Response.json({ message: "Token has expired" }, { status: 400 });
  }

  // check if email is already verified
  const user = await User.findOne({ email });
  if (user.isVerified) {
    return Response.json(
      { message: "Email is already verified" },
      { status: 400 },
    );
  }

  // update user to verified
  user.isVerified = true;
  await user.save();

  // delete token
  await Token.deleteOne({ token });
  redirect("/login?verified=true");
}
