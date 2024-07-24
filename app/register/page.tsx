"use client";
import RegisterEmail from "@/components/auth/RegisterEmail";
import Title from "@/components/Title";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Register() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [session, status, router]);

  return (
    <main className="h-full flex flex-col justify-center items-center">
      <Title />
      <RegisterEmail />
    </main>
  );
}
