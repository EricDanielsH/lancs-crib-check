import Image from "next/image";

export default function HouseCard({
  address,
  ppw,
  bedrooms,
  bathrooms,
  image,
  rating,
}) {
  return (
    <>
      <div className="card card-side bg-base-100 shadow-xl">
        <figure className="relative w-full md:w-1/2 h-64">
          <Image
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
            alt={`${address} image`}
            fill
            className="object-cover rounded-t-md md:rounded-l-md md:rounded-t-none"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{address}</h2>
          <ul className="flex gap-2">
            <li>{ppw}</li>
            <li>{bedrooms}</li>
            <li>{bathrooms}</li>
            <li>{image}</li>
            <li>{rating}</li>
          </ul>
        </div>
      </div>
    </>
  );
}
