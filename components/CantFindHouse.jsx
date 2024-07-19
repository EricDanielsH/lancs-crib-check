import Link from "next/link";

export default function CantFindHouse() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center bg-base-200 p-4 rounded-xl">
      <p className="text-lg mb-2 font-semibold">
        The house you are looking for does not exist in our listings.
      </p>
      <p className="text-base mb-4">
        If you have lived in this house or have information about it, you can
        add it to our database.
      </p>
      <Link
        href="/registerHouse"
        className="mt-4 hover:underline btn btn-wide btn-neutral"
      >
        Create a new listing
      </Link>
    </div>
  );
}
