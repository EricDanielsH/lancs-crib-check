import Opinion from "@/lib/models/opinion";
import { connectMongoDB } from "@/lib/mongodb";
import House from "@/lib/models/house";
import { NextResponse } from "next/server";
import { auth } from "@/auth";

export async function POST(req) {
  try {
    // Get current user
    const session = await auth();

    const { opinionId, text, yearOfResidence, rating, anonymous, houseSlug } =
      await req.json();
    console.log("opinionId from backend", opinionId);
    console.log("houseSlug from backend", houseSlug);

    await connectMongoDB();

    // Ensure rating is a number
    const numericRating = Number(rating);
    if (isNaN(numericRating) || numericRating < 1 || numericRating > 5) {
      return NextResponse.json(
        { message: "Invalid rating value" },
        { status: 400 },
      );
    }

    // Look for the opinion
    const opinion = await Opinion.findById(opinionId);
    if (!opinion) {
      return NextResponse.error(
        { message: "Opinion not found" },
        { status: 404 },
      );
    }

    // Update opinion
    if (anonymous) {
      opinion.authorName = "Anonymous";
    } else {
      opinion.authorName = session.user.name;
    }
    opinion.text = text;
    opinion.yearOfResidence = yearOfResidence;
    opinion.rating = numericRating;

    await opinion.save();
    console.log("Updated opinion", opinion);

    // Look for the house by slug
    const house = await House.findOne({ slug: houseSlug });
    if (!house) {
      return NextResponse.json({ message: "House not found" }, { status: 404 });
    }

    if (house.opinions.length === 0) {
      house.rating = 1; // Handle case where there are no opinions
    } else {
      // Get all ratings
      const opinions = await Opinion.find({ houseId: house._id }).select(
        "rating",
      );
      console.log("house ratings", opinions);

      // Calculate total rating
      let totalRating = 0;
      opinions.forEach((opinion) => {
        totalRating += opinion.rating;
      });

      // Calculate average rating
      const averageRating = totalRating / opinions.length;
      house.rating = parseFloat(averageRating.toFixed(1));
    }

    // Save the updated house rating
    await house.save();

    return NextResponse.json({
      opinion,
      message: "Opinion updated successfully",
    });
  } catch (error) {
    console.error("Error editing opinion:", error);
    return NextResponse.error(
      { message: "An error occurred while editing the opinion" },
      { status: 500 },
    );
  }
}
