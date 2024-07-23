import "./globals.css";
import SearchBar from "@/components/SearchBar";
import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();

  return (
    <>
      <main className="container mx-auto flex items-center justify-center flex-col w-full max-w-screen h-full">
        <h1 className="text-4xl font-bold mb-2">
          <span className="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
            LU
          </span>
          CribCheck
        </h1>

        <h2 className="mb-4 text-xl font-semibold w-full text-center">
          Find student opinions on student accomodation
        </h2>

        <div className="w-4/5 xl:w-3/5">
          <SearchBar />
        </div>
      </main>
    </>
  );
}
