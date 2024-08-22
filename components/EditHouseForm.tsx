"use client";

import { useRouter, useParams } from "next/navigation";
import {
  useState,
  useEffect,
  useCallback,
  ChangeEvent,
  FormEvent,
} from "react";
import DOMPurify from "dompurify";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { getSignedURL } from "@/lib/actions";

export default function RegisterHouseForm() {
  const router = useRouter();
  const { data: session } = useSession();
  const houseSlug = useParams().slug;

  const [house, setHouse] = useState<any>({});
  const [slug, setSlug] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [ppw, setPpw] = useState<string>("");
  const [totalweeks, setTotalweeks] = useState<string>("");
  const [bedrooms, setBedrooms] = useState<string>("");
  const [bathrooms, setBathrooms] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getHouse = useCallback(
    async (slug: string) => {
      try {
        const res = await fetch("/api/getHouse", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ slug }),
        });

        if (res.ok) {
          const { house } = await res.json();
          console.log("house data: ", house);
          setHouse(house);
          setAddress(house.address);
          setPpw(house.ppw);
          setTotalweeks(house.totalweeks);
          setBedrooms(house.bedrooms);
          setBathrooms(house.bathrooms);
          setFileUrl(house.mediaUrl);
          setError("");
        } else {
          setError(`Error while finding house: ${res.status}`);
          console.error(res.statusText);
          router.push(`/`);
        }
      } catch (error) {
        setError(
          `Error while retrieving the house: ${(error as Error).message}`,
        );
        console.error(error);
      }
    },
    [router],
  );

  const computeSHA256 = async (file: File) => {
    const buffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    return hashHex;
  };

  useEffect(() => {
    if (!session) {
      router.push(`/login`);
      return;
    }

    if (session.user && house.authorId && session.user.id !== house.authorId) {
      router.push(`/login`);
      return;
    }

    if (typeof houseSlug === "string") {
      getHouse(houseSlug);
    } else {
      setError("Error: houseSlug is not a string");
    }
  }, [houseSlug, session, router, getHouse, house.authorId]);

  function createSlug(address: string) {
    return address.split(" ").join("-").toLowerCase();
  }

  function handleFileChange(event: any) {
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
      setFileUrl(null);
    }
  }

  async function handleSubmit(event: FormEvent): Promise<void> {
    try {
      event.preventDefault();
      setIsLoading(true);

      // Create a slug from the address
      const slug = createSlug(address);

      // Upload the image to the S3 bucket
      let media_Id = null;
      let media_Url = null;

      if (file) {
        console.log("Uploading image to S3 bucket...");
        const checksum = await computeSHA256(file);
        const signedURLResult = await getSignedURL(
          file.type,
          file.size,
          checksum,
        );
        console.log("signedURLResult: ", signedURLResult);

        if (signedURLResult.error) {
          setError(
            `Error while uploading the image: ${signedURLResult.error.message}`,
          );
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
        !fileUrl
      ) {
        setError("Please fill in all the fields");
        return;
      }

      if (+totalweeks < 1 || +totalweeks > 52) {
        setError("Total weeks must be between 1 and 52");
        return;
      }
      if (+bedrooms < 1 || +bedrooms > 30) {
        setError("Bedrooms must be between 1 and 30");
        return;
      }
      if (+bathrooms < 1 || +bathrooms > 20) {
        setError("Bathrooms must be between 1 and 20");
        return;
      }
      if (+ppw < 50 || +ppw > 500) {
        setError("Price per week must be between 50 and 500");
        return;
      }

      const sanitizedAddress = DOMPurify.sanitize(address);

      const response = await fetch(`/api/editHouse/${houseSlug}`, {
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
          mediaUrl: media_Url || fileUrl || null,
        }),
      });

      console.log("resonses: ", response);

      if (response.ok) {
        (document.getElementById("form") as HTMLFormElement).reset(); // Reset the form
        router.push(`/houses/${slug}`); // Redirect to the new house page
      } else {
        setError("An error occurred while registering the house");
        console.error(response.statusText);
      }
    } catch (error) {
      setError((error as Error).message);
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
        <div className="w-fit flex gap-1">
          Address <span className="text-red-500">*</span>
        </div>
        <input
          type="text"
          className="grow"
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
          className="grow"
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
          className="grow"
          placeholder="52"
          value={totalweeks}
          onChange={(e) => setTotalweeks(e.target.value)}
        />
      </label>
      <label className="input input-bordered flex items-center gap-2 w-full">
        <div className="flex gap-1">
          Bedrooms <span className="text-red-500">*</span>
        </div>

        <input
          type="number"
          className="grow w-fit"
          placeholder="4"
          value={bedrooms}
          onChange={(e) => setBedrooms(e.target.value)}
        />
      </label>
      <label className="input input-bordered flex items-center gap-2 w-full mb-8">
        <div className="flex gap-1">
          Bathrooms <span className="text-red-500">*</span>
        </div>

        <input
          type="number"
          className="grow"
          placeholder="2"
          value={bathrooms}
          onChange={(e) => setBathrooms(e.target.value)}
        />
      </label>
      <div>
        <label className="text-white flex items-center w-full gap-2 mb-1">
          {" "}
          Edit the image of the house <span className="text-red-500"> *</span>
        </label>
        <input
          type="file"
          className="file-input w-full"
          name="media"
          accept=" image/jpeg, image/png, image/webp"
          onChange={handleFileChange}
        />
      </div>

      {fileUrl && (
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

      <div className="flex gap-2">
        <button
          className="btn mt-4"
          type="button"
          disabled={isLoading}
          onClick={() => router.push(`/houses/${houseSlug}`)}
        >
          Cancel
        </button>
        <button
          className="btn btn-error mt-4"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="loading loading-spinner loading-md"></span>
          ) : (
            "Update house"
          )}
        </button>
      </div>
    </form>
  );
}
