import "./globals.css";
import SearchBar from "@/components/SearchBar";
import { auth } from "@/auth";
import TopHouses from "@/components/TopHouses";
import LastOpinions from "@/components/LastOpinions";
import LastHouses from "@/components/LastHouses";

export default async function Home() {
  const session = await auth();

  return (
    <>
      <main className="container mx-auto flex items-center justify-center flex-col w-full max-w-screen h-full transition-colors duration-500 pt-[10vh]">
        <h1 className="text-4xl mt-20 font-bold mb-2 text-gray-900 dark:text-neutral-100 ">
          <span className="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
            LU
          </span>
          CribCheck
        </h1>

        <h2 className="mb-4 text-xl font-semibold w-full text-center text-gray-700 dark:text-neutral-100">
          Find student opinions on student accommodation
        </h2>

        <div className="w-4/5 xl:w-3/5 mb-20">
          <SearchBar />
        </div>

        <div className="w-4/5 xl:w-3/5 mb-20">
          <TopHouses />
        </div>

        <div className="w-4/5 xl:w-3/5 mb-20">
          <LastHouses />
        </div>
        <div className="w-4/5 xl:w-3/5 mb-20">
          <LastOpinions />
        </div>
      </main>
    </>
  );
}
