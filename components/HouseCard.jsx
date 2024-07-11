import Image from "next/image";
import defaultHouse from "../assets/defaultHouse.webp";
import StarRating from "@/components/StarRating";

export default function HouseCard({
  address,
  ppw,
  bedrooms,
  bathrooms,
  image,
  rating,
}) {
  return (
    <div className="card card-side bg-base-100 shadow-xl">
      <figure className="relative w-2/3  h-64">
        <Image
          src={defaultHouse || image}
          alt={`${address} image`}
          fill
          className="object-cover rounded-t-md md:rounded-l-md md:rounded-t-none"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{address}</h2>
        <ul className="list-disc">
          <li>£{ppw}/ppw</li>
          <li>{bedrooms} bedrooms</li>
          <li>{bathrooms} bathrooms</li>
          <li className="flex">
            {rating}/5 <StarRating size={20}/>
          </li>
        </ul>
      </div>
    </div>
  );
}
