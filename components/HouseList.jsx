import HouseCard from "@/components/HouseCard";
import Link from "next/link";

export default function HouseList() {
  const houseExamples = [
    {
      id: "1234-main-st",
      address: "1234 Main St",
      ppw: 100,
      totalweeks: 52,
      totalprice: 5200,
      bedrooms: 3,
      bathrooms: 2,
      image:
        "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg",
      rating: 4,
    },
    {
      id: "5678-elm-st",
      address: "5678 Elm St",
      ppw: 150,
      totalweeks: 52,
      totalprice: 7800,
      bedrooms: 4,
      bathrooms: 3,
      image:
        "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg",
      rating: 5,
    },
    {
      id: "91011-pine-st",
      address: "91011 Pine St",
      ppw: 200,
      totalweeks: 52,
      totalprice: 10400,
      bedrooms: 5,
      bathrooms: 4,
      image:
        "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg",
      rating: 3,
    },
  ];

  return (
    <section>
      <h1 className="text-3xl font-bold mb-6">Houses!</h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {houseExamples.map((house) => (
          <Link href={`/houses/${house.id}`} key={house.id}>
            <HouseCard
              key={house.id}
              address={house.address}
              ppw={house.ppw}
              bedrooms={house.bedrooms}
              bathrooms={house.bathrooms}
              image={house.image}
              rating={house.rating}
            />
          </Link>
        ))}
      </div>
    </section>
  );
}
