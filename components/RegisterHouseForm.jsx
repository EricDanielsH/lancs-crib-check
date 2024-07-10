"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function RegisterHouseForm() {
  const router = useRouter();

  const [slug, setSlug] = useState("");
  const [address, setAddress] = useState("");
  const [ppw, setPpw] = useState("");
  const [totalweeks, setTotalweeks] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [rating, setRating] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (address) {
      setSlug(createSlug(address));
    }
  }, [address]);

  function createSlug(address) {
    return address.split(" ").join("-").toLowerCase();
  }

  async function handleSubmit(event) {
    event.preventDefault();

    console.log("Slug before sumbission: ", slug);

    if (!address || !ppw || !totalweeks || !bedrooms || !bathrooms || !rating) {
      setError("Please fill in all the fields");
      return;
    }

    if (rating > 5 || rating < 1) {
      setError("Rating must be between 1 and 5");
      return;
    }

    const response = await fetch("/api/registerHouse", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        slug,
        address,
        ppw,
        totalweeks,
        bedrooms,
        bathrooms,
        rating,
      }),
    });

    if (response.ok) {
      form.reset();
      router.push("/");
    } else {
      setError("An error occurred while registering the house");
      console.error(response.statusText);
    }
  }

  return (
    <form
      id="form"
      className="flex flex-col w-full bg-red-50 justify-center items-center gap-3"
      onSubmit={handleSubmit}
    >
      <label className="input input-bordered flex items-center gap-2 w-full">
        Address
        <input
          type="text"
          className="grow"
          placeholder="24 George St"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </label>
      <label className="input input-bordered flex items-center gap-2 w-full">
        Price per week
        <input
          type="number"
          className="grow"
          placeholder="140"
          value={ppw}
          onChange={(e) => setPpw(e.target.value)}
        />
      </label>
      <label className="input input-bordered flex items-center gap-2 w-full">
        Total weeks
        <input
          type="number"
          className="grow"
          placeholder="52"
          value={totalweeks}
          onChange={(e) => setTotalweeks(e.target.value)}
        />
      </label>
      <label className="input input-bordered flex items-center gap-2 w-full">
        Total Bedrooms
        <input
          type="number"
          className="grow"
          placeholder="4"
          value={bedrooms}
          onChange={(e) => setBedrooms(e.target.value)}
        />
      </label>
      <label className="input input-bordered flex items-center gap-2 w-full">
        Total Bathrooms
        <input
          type="number"
          className="grow"
          placeholder="2"
          value={bathrooms}
          onChange={(e) => setBathrooms(e.target.value)}
        />
      </label>
      <label className="input input-bordered flex items-center gap-2 w-full">
        Rating
        <input
          type="number"
          className="bg-blue-100"
          placeholder="1"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />
        / 5
      </label>

      <div
        role="alert"
        className={`alert alert-error ${error == "" ? "hidden" : ""}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 shrink-0 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>Error! {error}</span>
      </div>

      <button className="btn btn-error" type="submit">
        Register house
      </button>
    </form>
  );
}
