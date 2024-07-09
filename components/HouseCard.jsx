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
    <div className="card bg-base-100 w-96 shadow-xl cursor-pointer hover:shadow-none hover:cursor-pointer transition-shadow">
      <figure>
        <Image
          src={image}
          alt={`${address} image`}
          width={1000}
          height={600}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title flex justify-between  w-full">
          {address}
          <div className="flex text-yellow-400">
            {rating}
            <svg
              className="w-6 h-6 text-yellow-400 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
            </svg>
          </div>
        </h2>
        <p></p>
        <div className="card-actions">
          <div className="badge badge-md">£{ppw}/ppw</div>
          <div className="badge badge-md">{bedrooms} bedrooms</div>
          <div className="badge badge-md">{bathrooms} bathrooms</div>
        </div>
      </div>
    </div>
  );
}
