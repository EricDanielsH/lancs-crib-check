"use client"
import RegisterHouseForm from "@/components/RegisterHouseForm";
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import {useEffect} from "react";

export default function HouseDetails() {

  const {data: session} = useSession();
  const router = useRouter();

  
  useEffect(() => {
    if (!session) {
      router.push("/login");
    }
  }, [session, router]);

  return (
    <div className="container w-full flex flex-col gap-10 content-center items-center h-full">
      <h1 className="text-3xl">Register a new house</h1>
      <RegisterHouseForm />
    </div>
  );
}
