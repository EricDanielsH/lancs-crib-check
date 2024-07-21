import Image from "next/image";
import defaultHouse from "../assets/defaultHouse.webp";
import StarRating from "@/components/StarRating";

export default function Card({
  address,
  ppw,
  bedrooms,
  bathrooms,
  image,
  rating,
}) {
  return (
    <div className="relative card card-side bg-base-100 shadow-xl">
      <figure className="relative w-2/3 h-64">
        <Image
          src={image || defaultHouse}
          alt={`${address} image`}
          fill
          className="object-cover rounded-t-md md:rounded-l-md md:rounded-t-none"
        />
      </figure>

      <div className="p-4 w-full">
        <h3 className="text-2xl font-bold mb-2">{address}</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="stat place-items-center bg-white rounded-lg p-4 shadow-md">
            <div className="stat-title red-grad">PPPW</div>
            <div className="flex items-center gap-2">
              <div className="red-grad text-2xl font-extrabold">{ppw}</div>
            </div>
          </div>

          <div className="stat place-items-center bg-white rounded-lg p-4 shadow-md">
            <div className="stat-title red-grad">Bthrm.</div>
            <div className="flex items-center gap-4">
              <div className="red-grad text-2xl font-extrabold">
                {bathrooms}
              </div>
            </div>
          </div>

          <div className="stat place-items-center bg-white rounded-lg p-4 shadow-md">
            <div className="stat-title red-grad">Bedrm</div>
            <div className="flex items-center gap-4">
              <div className="red-grad text-2xl font-extrabold">{bedrooms}</div>
            </div>
          </div>

          <div className="stat place-items-center bg-white rounded-lg p-4 shadow-md">
            <div className="stat-title red-grad">Rating</div>
            <div className="flex items-center gap-1 ">
              <div className="red-grad text-2xl font-extrabold flex items-center">
                {rating}
              </div>
              <div className="hidden sm:flex">
                <StarRating size={25} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}
