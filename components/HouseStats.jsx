import { FaBed, FaBath, FaCalendarWeek, FaPoundSign } from "react-icons/fa";
import StarRating from "@/components/StarRating";

export default function HouseStats({ house }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="stat place-items-center bg-white rounded-lg p-4 shadow-md">
        <div className="stat-title red-grad">PPPW</div>
        <div className="flex items-center gap-2">
          <FaPoundSign className="red-grad h-8 w-8" />
          <div className="red-grad stat-value">{house.ppw}</div>
        </div>
      </div>

      <div className="stat place-items-center bg-white rounded-lg p-4 shadow-md">
        <div className="stat-title red-grad">Bathrooms</div>
        <div className="flex items-center gap-4">
          <div className="red-grad stat-value">{house.bathrooms}</div>
          <FaBath className="red-grad h-8 w-8" />
        </div>
      </div>

      <div className="stat place-items-center bg-white rounded-lg p-4 shadow-md">
        <div className="stat-title red-grad">Weeks</div>
        <div className="flex items-center gap-4">
          <div className="red-grad stat-value">{house.totalweeks}</div>
          <FaCalendarWeek className="red-grad h-8 w-8" />
        </div>
      </div>

      <div className="stat place-items-center bg-white rounded-lg p-4 shadow-md">
        <div className="stat-title red-grad">Bedrooms</div>
        <div className="flex items-center gap-4">
          <div className="red-grad stat-value">{house.bedrooms}</div>
          <FaBed className="red-grad h-8 w-8" />
        </div>
      </div>

      <div className="stat place-items-center bg-white rounded-lg p-4 shadow-md  col-span-2">
        <div className="stat-title red-grad">Rating</div>
        <div className="flex items-center gap-4">
          <div className="red-grad stat-value flex items-center">
            {house.rating} 
            <span className="ml-1 text-sm">/5 </span>
          </div>
          <StarRating size={30} />
        </div>
      </div>
    </div>
  );
}
