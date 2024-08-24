"use client";
import { useState, useEffect } from "react";
import StarRating from "@/components/StarRating";
import Link from "next/link";

interface Opinion {
  houseId: string;
  houseName: string;
  houseSlug: string;
  authorId: string;
  authorName: string;
  text: string;
  rating: number;
  yearOfResidence: number;
}

export default function LastOpinions() {
  const [opinions, setOpinions] = useState<Opinion[]>([]);

  async function fetchLastOpinions() {
    const res = await fetch("/api/getLastOpinions", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      const opinions = await res.json();
      setOpinions(opinions);
      console.log("last 3 opinions", opinions);
    } else {
      console.error("Failed to fetch last 3 opinions");
    }
  }

  useEffect(() => {
    fetchLastOpinions();
  }, []);

  return (
    <section>
      <h2 className="text-2xl text-center font-semibold text-gray-700 dark:text-neutral-100 w-full mb-10">
        Latest Opinions
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {opinions.map((opinion, index) => (
          <Link key={index} href={`/houses/${opinion.houseSlug}`}>
            <div
              className={`flex flex-col gap-4 bg-base-200 mb-4 p-4 rounded-lg dark:bg-gray-700 dark:text-gray-100}`}
            >
              <div className={`flex items-center justify-between `}>
                <h4 className="text-2xl font-semibold">{opinion.houseName}</h4>
                <div className="flex items-center">
                  <h4 className="text-lg">
                    <strong>{opinion.rating}</strong>/5
                  </h4>
                  <StarRating size={20} />
                </div>
              </div>
              <h4 className="text-xl font-normal">{opinion.authorName}</h4>
              <div className="flex items-center justify-between">
                <p className="text-sm dark:text-neutral-400">
                  Year of residence: {opinion.yearOfResidence}
                </p>
              </div>
              <div
                className="prose text-black dark:text-white"
                dangerouslySetInnerHTML={{ __html: opinion.text }}
              />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
