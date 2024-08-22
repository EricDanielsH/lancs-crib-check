"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import DOMPurify from "dompurify";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { getSignedURL } from "@/lib/actions";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function RegisterHouseForm() {
  const router = useRouter();
  const { data: session } = useSession();

  const [slug, setSlug] = useState("");
  const [address, setAddress] = useState("");
  const [ppw, setPpw] = useState("");
  const [totalweeks, setTotalweeks] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [opinion, setOpinion] = useState("");
  const [rating, setRating] = useState("");
  const [yearOfResidence, setYearOfResidence] = useState("");
  const [error, setError] = useState("");
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const computeSHA256 = async (file) => {
    const buffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    return hashHex;
  };

  useEffect(() => {
    if (address) {
      setSlug(createSlug(address));
    }
  }, [address]);

  function createSlug(address) {
    return address.split(" ").join("-").toLowerCase();
  }

  function handleFileChange(event) {
    // Extract the file from the event
    const file = event.target.files?.[0];

    // Update the state with the selected file
    setFile(file);

    // Log the file to the console for debugging
    console.log("File: ", event.target.files?.[0]);

    // Revoke the old object URL if one exists
    if (fileUrl) {
      URL.revokeObjectURL(fileUrl);
    }

    // If a new file is selected
    if (file) {
      // Create a new object URL for the file
      const url = URL.createObjectURL(event.target.files?.[0]);

      // Update the state with the new object URL
      setFileUrl(url);
    } else {
      // If no file is selected, clear the file URL
      setFileUrl(undefined);
    }
  }

  async function handleSubmit(event) {
    console.log("Annon", anonymous);
    try {
      event.preventDefault();
      setIsLoading(true);

      // Upload the image to the S3 bucket
      let media_Id = null;
      let media_Url = null;
      if (file) {
        console.log("Uploading image to S3 bucket...");
        const checksum = await computeSHA256(file);
        const signedURLResult = await getSignedURL(
          file.type,
          file.size,
          file.name,
          checksum,
        );
        console.log("signedURLResult: ", signedURLResult);

        if (signedURLResult.error) {
          setError("Error while uploading the image: ", error.message);
          console.error(signedURLResult.error.message);
          return;
        }

        const { url, mediaUrl, mediaId } = signedURLResult.success;
        console.log("URL: ", url);
        console.log("mediaId: ", mediaId);
        media_Id = mediaId;
        media_Url = mediaUrl;
        await fetch(url, {
          method: "PUT",
          headers: {
            "Content-Type": file.type,
          },
          body: file,
        });
        console.log("Image uploaded to S3 bucket");
      }

      if (
        !address ||
        !ppw ||
        !totalweeks ||
        !bedrooms ||
        !bathrooms ||
        !rating ||
        !opinion ||
        !yearOfResidence ||
        !file
      ) {
        setError("Please fill in all the fields");
        return;
      }

      if (totalweeks < 1 || totalweeks > 52) {
        setError("Total weeks must be between 1 and 52");
        return;
      }
      if (bedrooms < 1 || bedrooms > 30) {
        setError("Bedrooms must be between 1 and 30");
        return;
      }
      if (bathrooms < 1 || bathrooms > 20) {
        setError("Bathrooms must be between 1 and 20");
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
      console.log("media_Id", media_Id);

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
          mediaId: media_Id || null,
          mediaUrl: media_Url || null,
          // author
          authorId: session.user.id,
          // Opinion related fields
          anonymous,
          text: sanitizedOpinion,
          rating,
          yearOfResidence,
          authorEmail: session.user.email,
        }),
      });

      console.log("resonses: ", response);

      if (response.ok) {
        document.getElementById("form").reset(); // Reset the form
        router.push(`/houses/${slug}`); // Redirect to the new house page
      } else {
        setError("An error occurred while registering the house");
        console.error(response.statusText);
      }
    } catch (error) {
      setError(error);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form
      id="form"
      className="flex flex-col  w-[95%] sm:min-w-96 sm:w-3/5 lg:w-2/5 bg-red-800 justify-center items-center gap-3 mb-20 p-4 rounded-lg"
      onSubmit={handleSubmit}
    >
      <label className="input input-bordered flex items-center gap-2 w-full">
        <div>
          Address <span className="text-red-500">*</span>
        </div>
        <input
          type="text"
          className="grow dark:text-white"
          placeholder="24 George St"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </label>
      <label className="input input-bordered flex items-center gap-2 w-full">
        <div className="flex-shrink-0">
          Price per week <span className="text-red-500">*</span>
        </div>
        <input
          type="number"
          className="grow dark:text-white"
          placeholder="140"
          value={ppw}
          onChange={(e) => setPpw(e.target.value)}
        />
      </label>
      <label className="input input-bordered flex items-center gap-2 w-full">
        <div className="flex-shrink-0">
          Total weeks <span className="text-red-500">*</span>
        </div>
        <input
          type="number"
          className="grow dark:text-white"
          placeholder="52"
          value={totalweeks}
          onChange={(e) => setTotalweeks(e.target.value)}
        />
      </label>
      <label className="input input-bordered flex items-center gap-2 w-full">
        <div>
          Bedrooms <span className="text-red-500">*</span>
        </div>

        <input
          type="number"
          className="grow dark:text-white"
          placeholder="4"
          value={bedrooms}
          onChange={(e) => setBedrooms(e.target.value)}
        />
      </label>
      <label className="input input-bordered flex items-center gap-2 w-full mb-8">
        <div>
          Bathrooms <span className="text-red-500">*</span>
        </div>

        <input
          type="number"
          className="grow dark:text-white"
          placeholder="2"
          value={bathrooms}
          onChange={(e) => setBathrooms(e.target.value)}
        />
      </label>
      <label className="input input-bordered flex items-center gap-2 w-full">
        Want your opinion to be anonymous?
        <input
          type="checkbox"
          className="grow"
          checked={anonymous}
          onChange={(e) => setAnonymous(e.target.checked)}
        />
      </label>
      <ReactQuill
        theme="snow"
        value={opinion}
        onChange={setOpinion}
        placeholder="I think that this house..."
        className="w-full bg-white min-h-40 sm:min-h-32 overflow-hidden rounded-lg"
      />

      <div className="flex w-full flex-col xl:flex-row  gap-4 items-center mb-2">
        <label className="input input-bordered flex items-center gap-2 w-full">
          <div className="w-32">
            Rating <span className="text-red-500">*</span>
          </div>
          <input
            type="number"
            className=" w-full dark:text-white"
            placeholder="1"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
          /5
        </label>
        <label className="input input-bordered flex items-center gap-2 w-full">
          <div className="flex-shrink-0">
            Year of residence <span className="text-red-500">*</span>
          </div>

          <input
            type="number"
            className=" w-20 dark:text-white"
            placeholder="2023"
            value={yearOfResidence}
            onChange={(e) => setYearOfResidence(e.target.value)}
          />
        </label>
      </div>

      <div>
        <label className="text-white flex items-center w-full gap-2 mb-1">
          {" "}
          Add an image of the house <span className="text-red-500"> *</span>
        </label>
        <input
          type="file"
          className="file-input w-full"
          name="media"
          accept=" image/jpeg, image/png, image/webp"
          onChange={handleFileChange}
        />
      </div>

      {fileUrl && file && (
        <div className="flex flex-col justify-center gap-2">
          <Image
            src={fileUrl}
            alt="House image"
            className="object-cover"
            width={200}
            height={200}
          />
          <button
            type="button"
            className="border rounded-xl px-4 py-2 bg-base-100"
            onClick={() => {
              setFile(null);
              setFileUrl(null);
            }}
          >
            Remove
          </button>
        </div>
      )}

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

      <button className="btn mt-4" type="submit" disabled={isLoading}>
        {isLoading ? (
          <span className="loading loading-spinner loading-md"></span>
        ) : (
          "Register house"
        )}
      </button>
    </form>
  );
}
