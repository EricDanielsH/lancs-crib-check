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
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const { data: session } = useSession();

  function handleDeleteOpinion() {
    // Remove opinion of the list
    fetchOpinions(slug);
  }

  async function fetchHouse(slug) {
    if (slug) {
      try {
        const res = await fetch(`/api/getHouse`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ slug }),
        });

        if (!res.ok) {
          throw new Error("Failed to fetch house"); // Throw an error
        }

        const { house } = await res.json();
        if (house) {
          setHouse(house);
        } else {
          throw new Error("House not found"); // Throw an error if no house found
        }
      } catch (error) {
        console.error(error);
        setError(error.message); // Set error message
      } finally {
        setLoading(false); // Set loading to false
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

  if (loading) {
    return <div>Loading...</div>; // Display loading message
  }

  if (error) {
    return <div>{error}</div>; // Display error message
  }

  if (!house) {
    return <div>No house data available.</div>; // Handle case where house is null
  }

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
        <section className="backdrop-blur-xl p-8 w-full xl:w-1/2 rounded-lg bg-gray-200 dark:bg-gray-600">
          {house.authorId === session?.user.id && (
            <Link
              href={`/editHouse/${house.slug}`}
              className="text-blue-400 underline text-sm"
            >
              Edit this house
            </Link>
          )}

          <p className="text-gray-400">
            Last updated: {new Date(house.updatedAt).toLocaleDateString()}
          </p>
          <h2 className="text-6xl font-bold mb-4 text-slate-800 dark:text-neutral-100">
            {house.address}
          </h2>

          <HouseStats house={house} />
        </section>
      </div>

      <div className="container flex flex-col justify-center items-center rounded-lg">
        <section className="backdrop-blur-xl p-8 w-full lg:w-3/4 flex flex-col justify-center">
          <h3 className="text-4xl font-bold dark:text-neutral-200 mb-4">
            Opinions
          </h3>
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
            <OpinionCard
              key={opinion._id}
              opinion={opinion}
              onDelete={handleDeleteOpinion}
            />
          ))}
        </section>
      </div>
    </>
  );
}
