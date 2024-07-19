import "./globals.css";
import SearchBar from "@/components/SearchBar";
import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();

  return (
    <>
      <main className="container mx-auto flex items-center justify-center flex-col h-screen max-w-screen ">
        <h1 className="text-4xl font-bold mb-2">
          <span className="text-red-600">LU</span>CribCheck
        </h1>

        <h2 className="mb-4 text-xl font-semibold">
          Find real opinions of student accomodation
        </h2>

        {session ? (
          <>
            <div>Estoy DENTR!!!!!</div>
            <p>{JSON.stringify(session)}</p>
          </>
        ) : (
          <>
            <div>wotefokk nadda sale</div>
            <p>{JSON.stringify(session)}</p>
          </>
        )}
        <div className="w-4/5 xl:w-3/5">
          <SearchBar />
        </div>
      </main>
    </>
  );
}
