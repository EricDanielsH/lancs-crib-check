import { useSession } from "next-auth/client";
import RegisterEmail from "@/components/auth/RegisterEmail";
import Link from "next/link";

export default function Register() {
  return (
    <main className="h-screen flex flex-col justify-center items-center">
      <h1>Register here</h1>
      <RegisterEmail />
      <Link href="/login">Go to Login</Link>


    </main>
  );
}
