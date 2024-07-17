import { connectMongoDB } from "@/lib/mongodb";
import House from "@/lib/models/House";
import Opinion from "@/lib/models/opinion";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const {
      // House fields
      slug,
      address,
      ppw,
      totalweeks,
      bedrooms,
      bathrooms,
      // Opinion fields
      text,
      rating,
      yearOfResidence,
    } = await req.json();

    console.log("Address back: ", address)
    console.log("opinoin back: ", text)

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
    });
    const newOpinion = await new Opinion({
      text,
      author: "Messi" || req.user._id,
      rating,
      yearOfResidence,

    });

    newHouse.opinions.push(newOpinion._id);

    await newHouse.save();
    await newOpinion.save();

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
