"use client";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import DefaultHouse from "@/assets/defaultHouse.webp";
import StarRating from "@/components/StarRating";
import AddOpinionForm from "@/components/AddOpinionForm";
import { FaBed, FaBath, FaCalendarWeek } from "react-icons/fa";
import OpinionCard from "@/components/OpinionCard";
import { useSession } from "next-auth/react";
import Link from "next/link";
import HouseStats from "@/components/HouseStats";

export default function HouseDetails() {
  const slug = useParams().slug;
  const [house, setHouse] = useState(null);
  const [opinions, setOpinions] = useState([]);
  const { data: session } = useSession();

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
      <div className="container flex flex-col justify-center xl:flex-row items-center mb-20 mt-8 gap-4">
        <Image
          src={house.mediaUrl || DefaultHouse}
          alt={`${house.address} image`}
          width={800}
          height={600}
          className="rounded-lg"
        />
        <section className="backdrop-blur-xl p-8 w-full xl:w-1/2 rounded-lg">
          <p>Last updated: {new Date(house.updatedAt).toLocaleDateString()}</p>
          <h2 className="text-6xl font-bold mb-4 text-slate-800">
            {house.address}
          </h2>

          <HouseStats house={house} />
        </section>
      </div>

      <div className="container flex flex-col justify-center items-center rounded-lg">
        <section className="backdrop-blur-xl p-8 w-full lg:w-3/4 flex flex-col justify-center">
          <h3 className="text-4xl font-bold mb-4">Opinions</h3>
          {session ? (
            <AddOpinionForm slug={slug} onAddOpinion={handleOpinionAdded} />
          ) : (
            <p className="text-lg text-slate-700 dark:bg-slate-900 dark:text-neutral-200 p-4 rounded-lg bg-slate-300 mb-6">
              If you want to add your opinion, please log in first.{" "}
              <Link
                href="/login"
                className="underline text-blue-600 hover:text-blue-800 font-semibold"
              >
                Click here to Log In
              </Link>
            </p>
          )}
          {opinions.map((opinion) => (
            <OpinionCard key={opinion._id} opinion={opinion} />
          ))}
        </section>
      </div>
    </>
  );
}
