"use client";

import { useRouter, useParams } from "next/navigation";
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

export default function EditOpinionForm({ opinionId, houseSlug }) {
  const router = useRouter();
  const { data: session } = useSession();

  const [opinion, setOpinion] = useState("");
  const [text, setText] = useState("");
  const [rating, setRating] = useState("");
  const [yearOfResidence, setYearOfResidence] = useState("");
  const [error, setError] = useState("");
  const [anonymous, setAnonymous] = useState(false);

  useEffect(() => {
    console.log("opinion id", opinionId);
    console.log("house slug", houseSlug)

    async function getOpinion( opinionId ) {
      // Fetch the opinion from API
      const res = await fetch(
        `/api/getOpinionById/${opinionId}&houseSlug=${houseSlug}`,
        {
          headers: { "Content-Type": "application/json" },
          method: "GET",
        },
      );

      if (res.ok) {
        const { opinion } = await res.json();
        console.log("opinion api", opinion);
        setOpinion(opinion);
        setText(opinion.text);
        setRating(opinion.rating);
        setYearOfResidence(opinion.yearOfResidence);
      }
    }

    if (!session) {
      router.push("/login");
    }

    // Get opinion
    if (!opinion) {
      getOpinion(opinionId);
    }

    console.log("opinion edit form", opinion);

    // If the opinion is not from the user, redirect to the opinion page
    //if (opinion.authorId != session.user.id) {
    //  router.push(`/`);
    //}
  }, [session, router, opinionId, houseSlug, opinion]);

  function handleCancel() {
    router.push(`/houses/${houseSlug}`);
  }

  async function handleSubmit(event) {
    event.preventDefault();
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

    const sanitizedOpinion = DOMPurify.sanitize(text);

    const response = await fetch("/api/editOpinion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        opinionId,
        text: sanitizedOpinion,
        rating,
        yearOfResidence,
        anonymous,
        // House related to
        houseSlug,
      }),
    });

    console.log("response", response);

    if (response.ok) {
      console.log("Opinion edited successfully");
      setText(""); // Reset the opinion state
      setRating(""); // Reset the rating state
      setYearOfResidence(""); // Reset the yearOfResidence state
      router.push(`/houses/${houseSlug}`);
    } else {
      setError("An error occurred while editing the opinion");
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
          <label className="input input-bordered flex items-center gap-2 w-full">
            Want your opinion to be anonymous?
            <input
              type="checkbox"
              value={anonymous}
              onChange={(e) => setAnonymous(e.target.checked)}
            />
          </label>
          <ReactQuill
            theme="snow"
            value={text}
            onChange={setText}
            placeholder="I think that this house..."
            className="w-full bg-white min-h-44 sm:min-h-32 overflow-hidden rounded-lg text-gray-800"
          />
          <div className="flex w-full flex-col xl:flex-row  gap-4 items-center">
            <label className="input input-bordered text-gray-500 flex items-center gap-2 w-full">
              Rating
              <input
                type="number"
                className=" w-full text-black dark:text-white"
                placeholder="1"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              />
              /5
            </label>
            <label className="input input-bordered  text-gray-500 flex items-center gap-2 w-full">
              Year of residence
              <input
                type="number"
                className=" w-fit dark:text-white text-black"
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
          Edit Opinion
        </button>
        <a className="btn mt-4" onClick={handleCancel}> 
          Cancel
        </a>
      </form>
    </>
  );
}
