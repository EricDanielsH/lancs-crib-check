import { NextResponse } from "next/server";
import Opinion from "@/lib/models/opinion";
import House from "@/lib/models/house";
import { connectMongoDB } from "@/lib/mongodb";
import { auth } from "@/auth";

export async function DELETE(req: Request) {
  try {
    // Connect to MongoDB
    await connectMongoDB();

    // Parse the URL to extract the slug
    const url = new URL(req.url);
    const slug = url.pathname.split("/").pop(); // Assuming slug is the last part of the path

    // Check if the user is the author
    const session = await auth();

    const opinion = await Opinion.findOne({ _id: slug });

    const houseId = opinion?.houseId;
    const house = await House.findOne({ _id: houseId });

    console.log("opinion", opinion);
    console.log("session", session);
    console.log("slug", slug);

    if (!opinion) {
      return NextResponse.json(
        { message: "Opinion not found" },
        { status: 404 },
      );
    }

    if (opinion.authorId.toString() !== session?.user?.id) {
      return NextResponse.json(
        {
          message:
            "You are not authorized to delete this opinion because you are not the author",
        },
        { status: 403 },
      );
    }

    // Delete the opinion
    const result = await Opinion.deleteOne({ _id: slug });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { message: "Opinion not found" },
        { status: 404 },
      );
    }

    // Update the house rating
    const opinions = await Opinion.find({ houseId });
    let totalRating = 0;
    opinions.forEach((opinion) => {
      totalRating += opinion.rating;
    });
    const rating = parseFloat((totalRating / opinions.length).toFixed(1));

    await House.updateOne({ _id: house }, { rating });

    return NextResponse.json(
      { message: "Opinion deleted successfully", data: result },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
