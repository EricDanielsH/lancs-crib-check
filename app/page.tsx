import { useSession } from "next-auth/client";
import "./globals.css";
import LogInButton from "@/components/auth/LogInButton";
import RegisterButton from "@/components/auth/RegisterButton";
import HouseList from "@/components/HouseList";
import SearchBar from "@/components/SearchBar";

export default function Home() {
  return (
    <main className="container">
      <h1>THE HOMEEEE</h1>
      <LogInButton />
      <RegisterButton />

      <h2>Look for a house</h2>
      <SearchBar />


    </main>
  );
}
