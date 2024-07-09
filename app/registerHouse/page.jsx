import RegisterHouseForm from "@/components/RegisterHouseForm";

export default function HouseDetails() {

  return (
    <div className="container bg-sky-50 flex flex-col gap-10 content-center items-center w-96">
      <h1 className="text-3xl">Register a new house</h1>
      <RegisterHouseForm />
    </div>
  );
}
