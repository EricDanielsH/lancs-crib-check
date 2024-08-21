import StarRating from "@/components/StarRating";
import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function OpinionCard({ opinion, onDelete }) {
  const { data: session } = useSession();
  const slug = useParams().slug;
  // Get the current url
  const currentUrl = window.location.href;

  const [error, setError] = useState("");

  const router = useRouter();

  async function handleDeleteOpinion(e) {
    e.preventDefault();

    const res = await fetch(`/api/deleteOpinion/${opinion._id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      console.log("Opinion deleted successfully");
      setError("");

      // On successful deletion, fetch the opinions again
      onDelete();

      // Close the modal programmatically
      document.getElementById("my_modal_1").close();

      // Reload the page after closing the modal and give 1 second delay
    } else {
      setError(`Failed to delete opinion. Status: ${res.status}`);
      console.log("Failed to delete opinion");
    }
  }

  return (
    <div
      key={opinion.id}
      className={`flex flex-col gap-4 bg-base-200 mb-4 p-4 rounded-lg dark:bg-gray-700 dark:text-gray-100 ${session && session.user.id === opinion.authorId.toString() && "bg-gray-300 border-gray-500 border-2 dark:bg-gray-800 dark:border-gray-500"}`}
    >
      <div className={`flex items-center justify-between `}>
        <h4 className="text-2xl font-semibold">{opinion.authorName}</h4>
        <div className="flex items-center">
          <h4 className="text-lg">
            <strong>{opinion.rating}</strong>/5
          </h4>
          <StarRating size={20} />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-sm dark:text-neutral-400">
          Year of residence: {opinion.yearOfResidence}
        </p>
        {session?.user?.id === opinion.authorId && (
          <div className="flex gap-2">
            <Link
              href={`/editOpinion/${opinion._id}?houseSlug=${slug}`}
              title="Edit"
            >
              <button className="btn btn-sm btn-error">
                <svg
                  fill="#000000"
                  viewBox="0 0 32 32"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  className="dark:text-white"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <title>pencil</title>{" "}
                    <path d="M0 32l12-4 20-20-8-8-20 20zM4 28l2.016-5.984 4 4zM8 20l12-12 4 4-12 12z"></path>{" "}
                  </g>
                </svg>
              </button>
            </Link>

            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <button
              title="Delete"
              className="btn btn-error btn-sm"
              onClick={() => document.getElementById("my_modal_1").showModal()}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    d="M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M18 6V16.2C18 17.8802 18 18.7202 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.7202 21 14.8802 21 13.2 21H10.8C9.11984 21 8.27976 21 7.63803 20.673C7.07354 20.3854 6.6146 19.9265 6.32698 19.362C6 18.7202 6 17.8802 6 16.2V6M14 10V17M10 10V17"
                    stroke="#000000"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>{" "}
                </g>
              </svg>
            </button>
            <dialog id="my_modal_1" className="modal">
              <div className="modal-box">
                <h3 className="font-bold text-lg">Confirmation!</h3>
                <p className="py-4">
                  Do you really want to delete this opinion?
                </p>

                {error && (
                  <div role="alert" className="alert alert-warning">
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
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                    <span>{error}</span>
                  </div>
                )}

                <div className="modal-action">
                  <div className="flex gap-2">
                    <button
                      onClick={(e) => handleDeleteOpinion(e)}
                      className="btn btn-error"
                    >
                      Delete
                    </button>

                    {/* if there is a button in form, it will close the modal */}
                    <button
                      className="btn"
                      onClick={() =>
                        document.getElementById("my_modal_1").close()
                      }
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </dialog>
          </div>
        )}
      </div>
      <div
        className="prose text-black dark:text-white"
        dangerouslySetInnerHTML={{ __html: opinion.text }}
      />
      <p className="text-sm text-right dark:text-neutral-400">
        Posted on {new Date(opinion.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
}
