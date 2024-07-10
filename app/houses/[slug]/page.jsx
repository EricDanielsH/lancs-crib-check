"use client";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import DefaultHouse from "@/assets/defaultHouse.webp";

export default function HouseDetails() {
  const router = useRouter();
  const slug = useParams().slug;
  const [house, setHouse] = useState(null);

  useEffect(() => {
    async function fetchHouse(slug) {
      if (slug) {
        // Fetch house details from the database or API
        try {
          const res = await fetch(`/api/getHouse`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ slug }),
          });

          const { house } = await res.json();
          if (house) setHouse(house);
          else {
            console.error("House not found");
            return <div>House not found</div>;
          }
        } catch (error) {
          console.error(error);
        }
      }
    }
    fetchHouse(slug);
  }, [slug]);

  if (!house) return <div>Loading...</div>;

  return (
    <div className="container lg:flex items-center h-full">
      <Image
        src={house.image || DefaultHouse}
        alt={`${house.address} image`}
        width={800}
        height={600}
      />
      <section className="bg-base-100 p-8">
        <h2 className="text-6xl font-bold">{house.address}</h2>
        <ul className="details">
          <li>Price per week: £{house.ppw}</li>
          <li>Bedrooms: {house.bedrooms}</li>
          <li>Bathrooms: {house.bathrooms}</li>
          <li>Total weeks: {house.totalweeks}</li>
          <li>Total price: £{house.totalweeks * house.ppw}</li>
          <li>Rating: {house.rating}</li>
        </ul>
      </section>
    </div>
  );
}
