import { connectMongoDB } from "@/lib/mongodb";
import House from "@/lib/models/House";
import Opinion from "@/lib/models/opinion";
import { NextResponse } from "next/server";

export async function POST(req) {
  console.log("Received request"); // Added log at the start
  try {
    const {
      // House fields
      slug,
      address,
      ppw,
      totalweeks,
      bedrooms,
      bathrooms,
      mediaId,
      mediaUrl,
      // Opinion fields
      text,
      rating,
      yearOfResidence,
      authorEmail,
    } = await req.json();

    console.log("Address back: ", address);
    console.log("opinoin back: ", text);
    console.log("mediaId back: ", mediaId);
    const res = await fetch("http://localhost:3000/api/findUserByEmail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: authorEmail }),
    });

    if (res.status !== 200) {
      return NextResponse.error({ message: "User not found" }, { status: 404 });
    }

    const { user } = await res.json();
    if (!user) {
      return NextResponse.error({ message: "User not found" }, { status: 404 });
    }

    await connectMongoDB();

    // Check if the house already exists
    if (await House.findOne({ slug })) {
      return NextResponse.error(
        { message: "House already exists" },
        { status: 400 },
      );
    }
    const newHouse = await new House({
      slug,
      address,
      ppw,
      totalweeks,
      bedrooms,
      bathrooms,
      rating,
      opinions: [],
      mediaId,
      mediaUrl,
    });
    const newOpinion = await new Opinion({
      text,
      rating,
      yearOfResidence,
      authorId: user._id,
      authorName: user.name,
    });

    newHouse.opinions.push(newOpinion._id);

    await newHouse.save();
    await newOpinion.save();

    console.log("House: ", newHouse);
    console.log("House created successfully");

    return NextResponse.json({
      message: "House registered successfully",
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.error(
      { message: "An error occurred while creating the house" },
      { status: 500 },
    );
  }
}
