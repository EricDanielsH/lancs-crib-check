import { connectMongoDB } from "@/lib/mongodb";
import House from "@/lib/models/house";
import Opinion from "@/lib/models/opinion";
import { NextResponse } from "next/server";
import { auth } from "@/auth";

export async function POST(req) {
  console.log("Received request"); // Added log at the start

  const session = await auth();

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
    } = await req.json();

    // Get the old slug from the URL
    const oldSlug = req.nextUrl.pathname.split("/").pop();

    console.log("Address back: ", address);
    console.log("Slug back: ", slug);
    console.log("PPW back: ", ppw);
    console.log("Total weeks back: ", totalweeks);
    console.log("Bedrooms back: ", bedrooms);
    console.log("Bathrooms back: ", bathrooms);
    console.log("mediaUrl back: ", mediaUrl);
    console.log("mediaId back: ", mediaId);
    console.log("Old slug back: ", oldSlug);
    console.log("req.nextUrl.params: ", req.nextUrl.params);

    await connectMongoDB();

    // Get the house
    const house = await House.findOne({ slug: oldSlug });

    if (!house) {
      // Push to home page
      console.log("House not found");

      return NextResponse.json({ message: "House not found" }, { status: 404 });
    }

    // Check that the user is the owner of the house
    if (house.authorId.toString() !== session.user.id) {
      console.log("house.authorId: ", house.authorId);
      console.log("session.user.id: ", session.user.id);
      return NextResponse.json(
        { message: "You are not the owner of the house" },
        { status: 403 },
      );
    }

    // Check if the slug is already taken if the slug has changed
    if (slug !== oldSlug) {
      const newHouse = await House.findOne({ slug });
      console.log("newHouse: ", newHouse);

      if (newHouse) {
        return NextResponse.json(
          { message: "Address already taken" },
          { status: 400 },
        );
      }
    }

    // Update the house
    if (oldSlug !== slug) {
      house.slug = slug;
    }
    house.address = address;
    house.ppw = ppw;
    house.totalweeks = totalweeks;
    house.bedrooms = bedrooms;
    house.bathrooms = bathrooms;
    if (mediaId) {
      house.mediaId = mediaId;
    }
    house.mediaUrl = mediaUrl;

    await house.save();

    console.log("House updated: ", house);
    console.log("House updated successfully");

    return NextResponse.json({
      message: "House updated successfully",
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "An error occurred while updating the house" },
      { status: 500 },
    );
  }
}
