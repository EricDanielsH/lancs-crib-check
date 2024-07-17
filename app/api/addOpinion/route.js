import Opinion from "@/lib/models/Opinion";
import { connectMongoDB } from "@/lib/mongodb";
import House from "@/lib/models/House";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { slug, text, yearOfResidence, rating, author } = await req.json();
    console.log("slug from backend", slug);

    await connectMongoDB();
    const house = await House.findOne({ slug });
    if (!house) {
      return NextResponse.json({ error: "House not found" }, { status: 404 });
    }
    const newOpinion = await new Opinion({
      text,
      yearOfResidence,
      rating,
      author,
    });

    await newOpinion.save();
    house.opinions.push(newOpinion._id);
    await house.save();

    return NextResponse.json({ newOpinion, message: "Opinion added successfully" });

  } catch (error) {
    console.error(error);
    return NextResponse.error(
      { message: "An error occurred while adding an opinion to the house" },
      { status: 500 },
    );
  }
}
