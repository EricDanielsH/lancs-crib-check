"use client";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import DefaultHouse from "@/assets/defaultHouse.webp";
import StarRating from "@/components/StarRating";
import AddOpinionForm from "@/components/AddOpinionForm";
import { FaBed, FaBath, FaCalendarWeek } from "react-icons/fa";
import OpinionCard from "@/components/OpinionCard";

export default function HouseDetails() {
  const slug = useParams().slug;
  const [house, setHouse] = useState(null);
  const [opinions, setOpinions] = useState([]);

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


  async function fetchOpinions(slug) {
    if (slug) {
      // Fetch house details from the database or API
      try {
        const res = await fetch(`/api/getOpinions`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ slug }),
        });

        const { opinions } = await res.json();

        if (opinions) setOpinions(opinions.reverse());
        else {
          console.error("Opinions not found");
          return <div>Opinions not found</div>;
        }
      } catch (error) {
        console.error(error);
      }
    }
  }


  const handleOpinionAdded = () => {
    // Fetch opinions again after adding a new opinion
    fetchOpinions(slug);
  };



  useEffect(() => {


    fetchHouse(slug);
    fetchOpinions(slug);
  }, [slug]);

  if (!house) return <div>Loading...</div>;

  return (
    <>
      <div className="container flex flex-col justify-center xl:flex-row items-center h-full mb-20">
        <Image
          src={house.image || DefaultHouse}
          alt={`${house.address} image`}
          width={800}
          height={600}
        />
        <section className="backdrop-blur-xl p-8 w-full xl:w-1/2">
          <p>Last updated: {new Date(house.updatedAt).toLocaleDateString()}</p>
          <h2 className="text-6xl font-bold mb-4 text-slate-800">
            {house.address}
          </h2>
          <div className="flex items-center justify-between gap-4  mb-8">
            <h3
              className="text-4xl font-semibold text-slate-700
            "
            >
              £{house.ppw}/pppw
            </h3>
            <h3 className="text-4xl flex items-center text-slate-700">
              {house.rating}
              <span className="text-base mx-2">/ 5</span>
              <StarRating size={30} />
            </h3>
          </div>

          <div className="flex gap-10">
            <div className="flex flex-col items-center justify-center gap-2 text-slate-700">
              <FaBed className="text-3xl" /> {house.bedrooms} bdrm.
            </div>
            <div className="flex flex-col items-center justify-center gap-2 text-slate-700">
              <FaBath className="text-3xl" /> {house.bathrooms} bathrooms
            </div>
            <div className="flex flex-col items-center justify-center gap-2 text-slate-700">
              <FaCalendarWeek className="text-3xl" /> {house.totalweeks} weeks
            </div>
          </div>
        </section>
      </div>

      <div className="container flex flex-col justify-center items-center h-full">
        <section className="backdrop-blur-xl p-8 w-full lg:w-3/4 flex flex-col justify-center">
          <h3 className="text-4xl font-bold mb-4">Opinions</h3>
          <AddOpinionForm slug={slug} onAddOpinion={handleOpinionAdded} />
          {opinions.map((opinion) => (
            <OpinionCard key={opinion._id} opinion={opinion} />
          ))}
        </section>
      </div>
    </>
  );
}
