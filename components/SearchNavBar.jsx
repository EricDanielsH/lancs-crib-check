"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import HouseCard from "@/components/HouseCard";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [houses, setHouses] = useState([]);

  function handleHouseClick() {
    setSearchTerm("");
  }

  useEffect(() => {
    console.log("searchTerm", searchTerm);

    async function searchHouses(term) {
      const res = await fetch("/api/searchHouseByAddress", {
        method: "POST",
        body: JSON.stringify({ address: term }),
      });

      const data = await res.json();
      const hs = data.houses;
      if (hs) {
        setHouses(hs);
      } else {
        console.error("No houses found in the front end.");
      }
    }
    if (searchTerm.length > 0) {
      searchHouses(searchTerm);
    } else {
      setHouses([]);
    }
  }, [searchTerm]);

  return (
    <section className="max-w-full flex h-fit flex-col items-center">
      <div className="w-full z-10">
        <div className="relative flex w-full  items-stretch bg-base-100 rounded">
          <input
            type="search"
            className="relative m-0 block flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
            placeholder="Search"
            aria-label="Search"
            aria-describedby="button-addon2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {/* <!--Search icon--> */}
          <span
            className="input-group-text flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal text-neutral-700 dark:text-neutral-200"
            id="basic-addon2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path
                fillRule="evenodd"
                d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </div>
      </div>

      <div
        className={`top-[calc(100% - 0.5rem)] right-0 backdrop-blur-sm max-w-lg absolute flex flex-col gap-4 w-4/5 mt-16 z-50 overflow-y-auto max-h-80  rounded ${searchTerm ? "p-4" : ""}`}
        onClick={handleHouseClick}
      >
        {houses.map((house) => (
          <Link href={`/houses/${house.slug}`} key={house.slug}>
            <HouseCard
              key={house.slug}
              address={house.address}
              ppw={house.ppw}
              bedrooms={house.bedrooms}
              bathrooms={house.bathrooms}
              image={house.image}
              rating={house.rating}
            />
          </Link>
        ))}
      </div>
    </section>
  );
}
