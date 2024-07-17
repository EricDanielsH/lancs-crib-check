import RegisterHouseForm from "@/components/RegisterHouseForm";

export default function HouseDetails() {

  return (
    <div className="container w-full flex flex-col gap-10 content-center items-center h-full">
      <h1 className="text-3xl">Register a new house</h1>
      <RegisterHouseForm />
    </div>
  );
}
