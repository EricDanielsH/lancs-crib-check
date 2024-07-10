import HouseCard from "@/components/HouseCard";
import Link from "next/link";

export default function HouseList() {
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
