"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import "react-quill/dist/quill.snow.css";
import DOMPurify from "dompurify";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

//   user: { type: Schema.Types.ObjectId, ref: "User" },
//   text: { type: String, required: true },
//   rating: { type: Number, required: true },
//   yearOfResidence: { type: Number, required: true },
// } ,{ timestamps: true });

export default function AddOpinionForm({ slug, onAddOpinion }) {
  const router = useRouter();
  const { data: session } = useSession();

  const [opinion, setOpinion] = useState("");
  const [rating, setRating] = useState("");
  const [yearOfResidence, setYearOfResidence] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event) {

    if (opinion == "" || rating == "") {
      setError("Opinion and rating are required");
      return;
    }

    if (opinion.length < 10) {
      setError("Opinion must be at least 10 characters long");
      return;
    }

    if (rating > 5 || rating < 1) {
      setError("Rating must be between 1 and 5");
      return;
    }

    if (yearOfResidence < 2010 || yearOfResidence > new Date().getFullYear()) {
      setError("Year of residence must be between 2010 and the current year");
      return;
    }

    setError("");

    const sanitizedOpinion = DOMPurify.sanitize(opinion);

    const response = await fetch("/api/addOpinion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        slug,
        text: sanitizedOpinion,
        rating,
        author: session.user.email, // TODO: replace with the actual user id
        yearOfResidence,
      }),
    });

    if (response.ok) {
      setOpinion(""); // Reset the opinion state
      setRating(""); // Reset the rating state
      setYearOfResidence(""); // Reset the yearOfResidence state
      onAddOpinion();
    } else {
      setError("An error occurred while registering the house");
      console.error(response.statusText);
    }
  }

  return (
    <>
      <form
        id="form"
        className="flex flex-col w-full bg-red-800 mb-10 p-8 justify-center items-center gap-3 rounded"
        onSubmit={handleSubmit}
      >
        <div className="flex w-full flex-col gap-4 items-center">
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
        <button className="btn btn-error mt-4" type="submit">
          Add opinion
        </button>
      </form>
    </>
  );
}
