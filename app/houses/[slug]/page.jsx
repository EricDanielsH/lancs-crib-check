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
    <div className="container lg:flex items-center">
      <Image
        src={house.image || DefaultHouse}
        alt={`${house.address} image`}
        width={800}
        height={600}
      />
      <section>
        <h1 className="text-3xl">{house.address}</h1>
        <div className="details">
          <p>Price per week: £{house.ppw}</p>
          <p>Bedrooms: {house.bedrooms}</p>
          <p>Bathrooms: {house.bathrooms}</p>
          <p>Total weeks: {house.totalweeks}</p>
          <p>Total price: £{house.totalweeks * house.ppw}</p>
          <p>Rating: {house.rating}</p>
        </div>
      </section>
    </div>
  );
}
