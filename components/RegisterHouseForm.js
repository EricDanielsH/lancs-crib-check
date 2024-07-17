"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import DOMPurify from "dompurify";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function RegisterHouseForm() {
  const router = useRouter();

  const [slug, setSlug] = useState("");
  const [address, setAddress] = useState("");
  const [ppw, setPpw] = useState("");
  const [totalweeks, setTotalweeks] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [opinion, setOpinion] = useState("");
  const [rating, setRating] = useState("");
  const [yearOfResidence, setYearOfResidence] = useState("");
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
    console.log("Text before sumbission: ", opinion);

    if (
      !address ||
      !ppw ||
      !totalweeks ||
      !bedrooms ||
      !bathrooms ||
      !rating ||
      !opinion ||
      !yearOfResidence
    ) {
      setError("Please fill in all the fields");
      return;
    }

    if (totalweeks < 1 || totalweeks > 52) {
      setError("Total weeks must be between 1 and 52");
      return;
    }
    if (bedrooms < 1 || bedrooms > 10) {
      setError("Bedrooms must be between 1 and 10");
      return;
    }
    if (bathrooms < 1 || bathrooms > 10) {
      setError("Bathrooms must be between 1 and 10");
      return;
    }
    if (ppw < 50 || ppw > 500) {
      setError("Price per week must be between 50 and 500");
      return;
    }
    if (rating > 5 || rating < 1) {
      setError("Rating must be between 1 and 5");
      return;
    }
    if (opinion.length < 10) {
      setError("Opinion must be at least 10 characters long");
      return;
    }
    if (
      yearOfResidence < 2010 ||
      yearOfResidence > new Date().getFullYear() + 1
    ) {
      setError(
        `Year of residence must be between 2010 and ${new Date().getFullYear() + 1}`,
      );
      return;
    }

    const sanitizedAddress = DOMPurify.sanitize(address);
    const sanitizedOpinion = DOMPurify.sanitize(opinion);

    console.log("Sanitized address: ", sanitizedAddress);
    console.log("Opinion: ", opinion);
    console.log("Sanitized opinion: ", sanitizedOpinion);

    const response = await fetch("/api/registerHouse", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        // House related fields
        slug,
        address: sanitizedAddress,
        ppw,
        totalweeks,
        bedrooms,
        bathrooms,
        // Opinion related fields
        text: sanitizedOpinion,
        rating,
        yearOfResidence,
      }),
    });

    if (response.ok) {
      document.getElementById("form").reset(); // Reset the form
      router.push("/");
    } else {
      setError("An error occurred while registering the house");
      console.error(response.statusText);
    }
  }

  return (
    <form
      id="form"
      className="flex flex-col min-w-96 w-2/5 bg-red-800 justify-center items-center gap-3 my-20 p-4 rounded-lg"
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
      <ReactQuill
        theme="snow"
        value={opinion}
        onChange={setOpinion}
        placeholder="I think that this house..."
        className="w-full flex-2 bg-white"
      />

      <div className="flex w-full flex-col xl:flex-row  gap-4 items-center">
        <label className="input input-bordered flex items-center gap-2 w-full">
          Rating
          <input
            type="number"
            className=" w-full"
            placeholder="1"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
          /5
        </label>
        <label className="input input-bordered flex items-center gap-2 w-full">
          Year of residence
          <input
            type="number"
            className=" w-fit"
            placeholder="2023"
            value={yearOfResidence}
            onChange={(e) => setYearOfResidence(e.target.value)}
          />
        </label>
      </div>

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
