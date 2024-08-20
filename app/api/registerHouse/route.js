import { connectMongoDB } from "@/lib/mongodb";
import House from "@/lib/models/house";
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
      // Author
      authorId,
      // Opinion fields
      anonymous,
      text,
      rating,
      yearOfResidence,
      authorEmail,
    } = await req.json();

    console.log("Address back: ", address);
    console.log("opinoin back: ", text);
    console.log("mediaId back: ", mediaId);
    const res = await fetch(`${process.env.PUBLIC_URL}/api/findUserByEmail`, {
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
      authorId,
    });

    if (anonymous) {
      user.name = "Anonymous";
    }

    console.log("User.name backk: ", user.name);

    const newOpinion = await new Opinion({
      houseId: newHouse._id,
      text,
      rating: parseFloat(rating.toFixed(1)),
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
