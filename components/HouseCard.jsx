import Image from "next/image";
import defaultHouse from "../assets/defaultHouse.webp";
import StarRating from "@/components/StarRating";

export default function Card({ house }) {
  return (
    <div className="relative card bg-base-100 dark:bg-gray-800 shadow-xl sm:flex sm:flex-row rounded-md overflow-hidden">
      <figure className="relative w-full h-24 md:w-2/3 sm:h-auto">
        <Image
          src={house.mediaUrl || defaultHouse}
          alt={`${house.address} image`}
          fill
          className="object-cover rounded-t-md md:rounded-l-md md:rounded-t-none"
        />
      </figure>

      <div className="p-4 w-full sm:flex sm:flex-col">
        <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">
          {house.address}
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="stat place-items-center bg-white dark:bg-gray-700 rounded-lg p-4 shadow-md dark:shadow-gray-600">
            <div className="stat-title text-red-500 dark:text-red-400">
              PPPW
            </div>
            <div className="flex items-center gap-2">
              <div className=" dark:text-neutral-300 text-2xl font-extrabold">
                {house.ppw}
              </div>
            </div>
          </div>

          <div className="stat place-items-center bg-white dark:bg-gray-700 rounded-lg p-4 shadow-md dark:shadow-gray-600">
            <div className="stat-title text-red-500 dark:text-red-400">
              Bthrm.
            </div>
            <div className="flex items-center gap-4">
              <div className=" dark:text-neutral-300 text-2xl font-extrabold">
                {house.bathrooms}
              </div>
            </div>
          </div>

          <div className="stat place-items-center bg-white dark:bg-gray-700 rounded-lg p-4 shadow-md dark:shadow-gray-600">
            <div className="stat-title text-red-500 dark:text-red-400">
              Bedrm
            </div>
            <div className="flex items-center gap-4">
              <div className=" dark:text-neutral-300 text-2xl font-extrabold">
                {house.bedrooms}
              </div>
            </div>
          </div>

          <div className="stat place-items-center bg-white dark:bg-gray-700 rounded-lg p-4 shadow-md dark:shadow-gray-600">
            <div className="stat-title text-red-500 dark:text-red-400">
              Rating
            </div>
            <div className="flex items-center gap-1">
              <div className=" dark:text-neutral-300 text-2xl font-extrabold flex items-center">
                {house.rating}
              </div>
              <div className="hidden sm:flex">
                <StarRating size={25} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
