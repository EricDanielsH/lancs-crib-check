import { connectMongoDB } from "@/lib/mongodb";
import House from "@/lib/models/house";
import { NextResponse } from "next/server";

//   slug: { type: String, required: true },
//   address: { type: String, required: true },
//   ppw: { type: Number, required: true },
//   totalweeks: { type: Number, required: true },
//   bedrooms: { type: Number, required: true },
//   bathrooms: { type: Number, required: true },


export async function POST(req) {
  try {
    const { slug, address, ppw, totalweeks, bedrooms, bathrooms, rating  } = await req.json();

    await connectMongoDB();
    await House.create({ slug, address, ppw, totalweeks, bedrooms, bathrooms, rating });
    
    return NextResponse.json({ message: "House registered successfully", status: 200});
  } catch (error) {
    console.error(error);
    return NextResponse.error(
      { message: "An error occurred while finding the house" },
      { status: 500 },
    );
  }
}
