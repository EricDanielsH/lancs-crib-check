import Opinion from "@/lib/models/opinion";
import { connectMongoDB } from "@/lib/mongodb";
import House from "@/lib/models/house";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { slug, text, yearOfResidence, rating, author, anonymous } =
      await req.json();
    console.log("slug from backend", slug);
    console.log("author from backend", author);

    // get the user id from the session
    const res = await fetch(`${process.env.PUBLIC_URL}/api/findUserByEmail`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: author }),
    });

    const { user } = await res.json();

    console.log(user);

    if (!user) {
      return NextResponse.json(
        { error: "User not found when adding an opinion to a house" },
        { status: 404 },
      );
    }

    await connectMongoDB();
    const house = await House.findOne({ slug });
    if (!house) {
      return NextResponse.json({ error: "House not found" }, { status: 404 });
    }

    if (anonymous) {
      user.name = "Anonymous";
    }

    const newOpinion = await new Opinion({
      houseId: house._id,
      authorId: user._id,
      authorName: user.name,
      text,
      yearOfResidence,
      rating,
    });

    console.log("opoinfsdofas", newOpinion);

    await newOpinion.save();
    house.opinions.push(newOpinion._id);

    // Calculate the new average rating
    const opinions = await Opinion.find({ houseId: house._id });
    let totalRating = 0;
    for (const opinion of opinions) {
      totalRating += opinion.rating;
    }
    const averageRating = totalRating / opinions.length;

    // Update the house's rating
    house.rating = parseFloat(averageRating.toFixed(1));
    await house.save();

    return NextResponse.json({
      newOpinion,
      message: "Opinion added successfully",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.error(
      { message: "An error occurred while adding an opinion to the house" },
      { status: 500 },
    );
  }
}
