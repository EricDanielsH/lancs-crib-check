import { useSession } from "next-auth/client";
import "./globals.css";
import LogInButton from "@/components/auth/LogInButton";
import RegisterButton from "@/components/auth/RegisterButton";
import HouseList from "@/components/HouseList";
import SearchBar from "@/components/SearchBar";

export default function Home() {
  return (
    <>
      <main className="container mx-auto flex items-center justify-center flex-col h-screen max-w-screen ">
        <h1 className="text-4xl font-bold mb-2">
          <span className="text-red-600">LU</span>CribCheck
        </h1>

        <h2 className="mb-4 text-xl font-semibold">
          Find real opinions of student accomodation
        </h2>

        <div className="w-4/5 xl:w-3/5">
          <SearchBar />
        </div>
      </main>
    </>
  );
}
