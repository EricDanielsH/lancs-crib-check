import { FaBed, FaBath, FaCalendarWeek, FaPoundSign } from "react-icons/fa";
import StarRating from "@/components/StarRating";

export default function HouseStats({ house }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="stat place-items-center bg-white dark:bg-gray-700 rounded-lg p-4 shadow-md dark:shadow-gray-600">
        <div className="stat-title text-red-500 dark:text-red-400">PPPW</div>
        <div className="flex items-center gap-2">
          <FaPoundSign className="text-red-500 dark:text-neutral-300 h-8 w-8" />
          <div className="text-red-500 dark:text-neutral-300 stat-value">
            {house.ppw}
          </div>
        </div>
      </div>

      <div className="stat place-items-center bg-white dark:bg-gray-700 rounded-lg p-4 shadow-md dark:shadow-gray-600">
        <div className="stat-title text-red-500 dark:text-red-400">
          Bathrooms
        </div>
        <div className="flex items-center gap-4">
          <div className="text-red-500 dark:text-neutral-300 stat-value">
            {house.bathrooms}
          </div>
          <FaBath className="text-red-500 dark:text-neutral-300 h-8 w-8" />
        </div>
      </div>

      <div className="stat place-items-center bg-white dark:bg-gray-700 rounded-lg p-4 shadow-md dark:shadow-gray-600">
        <div className="stat-title text-red-500 dark:text-red-400">Weeks</div>
        <div className="flex items-center gap-4">
          <div className="text-red-500 dark:text-neutral-300 stat-value">
            {house.totalweeks}
          </div>
          <FaCalendarWeek className="text-red-500 dark:text-neutral-300 h-8 w-8" />
        </div>
      </div>

      <div className="stat place-items-center bg-white dark:bg-gray-700 rounded-lg p-4 shadow-md dark:shadow-gray-600">
        <div className="stat-title text-red-500 dark:text-red-400">
          Bedrooms
        </div>
        <div className="flex items-center gap-4">
          <div className="text-red-500 dark:text-neutral-300 stat-value">
            {house.bedrooms}
          </div>
          <FaBed className="text-red-500 dark:text-neutral-300 h-8 w-8" />
        </div>
      </div>

      <div className="stat place-items-center bg-white dark:bg-gray-700 rounded-lg p-4 shadow-md dark:shadow-gray-600 col-span-2">
        <div className="stat-title text-red-500 dark:text-red-400">Rating</div>
        <div className="flex items-center gap-1">
          <div className="text-red-500 dark:text-neutral-300 stat-value flex items-center">
            {house.rating}
          </div>
          <StarRating size={30} />
        </div>
      </div>
    </div>
  );
}
