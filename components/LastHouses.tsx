"use client";
import { useState, useEffect } from "react";
import HouseCard from "@/components/HouseCard";
import Link from "next/link";

//    slug: { type: String, required: true },
//    address: { type: String, required: true },
//    ppw: { type: Number, required: true },
//    totalweeks: { type: Number, required: true },
//    bedrooms: { type: Number, required: true },
//    bathrooms: { type: Number, required: true },
//    rating: { type: Number, required: true },
//    opinions: [{ type: Schema.Types.ObjectId, ref: "Opinion", required: true }],
//    mediaId: { type: Schema.Types.ObjectId, ref: "Media", required: true },
//    mediaUrl: { type: String, required: true },
//    authorId: { type: Schema.Types.ObjectId, ref: "User", required: true},

interface House {
  slug: string;
  address: string;
  ppw: number;
  totalweeks: number;
  bedrooms: number;
  bathrooms: number;
  rating: number;
  opinions: string[];
  mediaId: string;
  mediaUrl: string;
  authorId: string;
}

export default function LastHouses() {
  const [houses, setHouses] = useState<House[]>([]);

  async function fetchLastHouses() {
    const res = await fetch("/api/getLastHouses", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      const houses = await res.json();
      setHouses(houses);
      console.log("Last 3 houses", houses);
    } else {
      console.error("Failed to fetch last 3 houses");
    }
  }

  useEffect(() => {
    fetchLastHouses();
  }, []);

  return (
    <section>
      <h2 className="text-2xl text-center font-semibold text-gray-700 dark:text-neutral-100 w-full mb-10">
        Last Houses Added
      </h2>
      {houses?.length > 0 ? (
        <div className="w-full flex gap-8 flex-col">
          {houses.map((house, index) => (
            <Link key={index} href={`/houses/${house.slug}`}>
              <HouseCard key={house.slug} house={house} />
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-gray-700 dark:text-neutral-100">No houses found</p>
      )}
    </section>
  );
}
