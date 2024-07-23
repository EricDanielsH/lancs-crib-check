import RegisterEmail from "@/components/auth/RegisterEmail";
import Link from "next/link";

export default function Register() {
  return (
    <main className="h-full flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold mb-4">
        <span className="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
          LU
        </span>
        CribCheck
      </h1>
      <RegisterEmail />
      <Link href="/login">Go to Login</Link>
    </main>
  );
}
