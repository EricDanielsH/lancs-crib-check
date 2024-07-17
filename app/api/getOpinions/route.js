import { connectMongoDB } from "@/lib/mongodb";
import House from "@/lib/models/House";
import Opinion from "@/lib/models/opinion";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { slug } = await req.json();

    await connectMongoDB();
    const house = await House.findOne({ slug });
    if (!house) {
      return NextResponse.json(
        { opinions: null, error: "House not found" },
        { status: 404 },
      );
    }
    const opinionIds = house.opinions;

    const o = await Promise.all(
      opinionIds.map(async (id) => {
        const opinion = await Opinion.findById(id);
        return opinion; // This will push null or undefined
      }),
    );

    const opinions = o.filter((opinion) => opinion !== null);

    return NextResponse.json({ opinions });
  } catch (error) {
    console.error(error);
    return NextResponse.error(
      { message: "An error occurred while getting House opinions" },
      { status: 500 },
    );
  }
}
