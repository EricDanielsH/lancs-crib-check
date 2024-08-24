import Opinion from "@/lib/models/opinion";
import House from "@/lib/models/house";
import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { JSDOM } from "jsdom";

export async function GET() {
  try {
    await connectMongoDB();

    // Fetch the last 3 opinions based on a timestamp or creation date
    const opinions = await Opinion.find().sort({ createdAt: -1 }).limit(3);

    if (!opinions || opinions.length === 0) {
      return NextResponse.json(
        { message: "No opinions found" },
        { status: 404 },
      );
    }

    // Function to strip HTML tags and truncate text
    const stripHtml = (html: string) => {
      const doc = new JSDOM(html).window.document;
      const text = doc.body.textContent || "";
      return text.length > 200 ? text.slice(0, 200) + "..." : text;
    };

    // Fetch the house name for each opinion and truncate the text
    const truncatedOpinions = await Promise.all(
      opinions.map(async (opinion) => {
        console.log("opinion house id", opinion);
        const house = await House.findById(opinion.houseId);
        console.log("house house id", house);

        const houseName = house?.address || "Unknown house";

        return {
          ...opinion._doc, // Spread the original document fields
          text: stripHtml(opinion.text), // Truncate the opinion text
          houseName, // Add the house name to the response
          houseSlug: house?.slug || "unknown-house",
        };
      }),
    );

    console.log("last 3 truncated opinions", truncatedOpinions);

    return NextResponse.json(truncatedOpinions, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch last 3 opinions: ", error);
    return NextResponse.json(
      { message: "Failed to fetch last 3 opinions" },
      { status: 500 },
    );
  }
}
