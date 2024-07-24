"use client";
import LogInEmail from "@/components/auth/LogInEmail";
import Title from "@/components/Title";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Login({
  searchParams,
}: {
  searchParams: { verified: string };
}) {
  const {  status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  const isVerified = searchParams.verified === "true";
  return (
    <main className="h-full flex-col flex justify-center items-center">
      <Title />
      <LogInEmail isVerified={isVerified} />
    </main>
  );
}
