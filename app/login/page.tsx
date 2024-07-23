import Link from "next/link";
import LogInEmail from "@/components/auth/LogInEmail";

export default function Login() {
  return (
    <main className="h-full flex-col flex justify-center items-center">
      <h1 className="text-4xl font-bold mb-4">
        <span className="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
          LU
        </span>
        CribCheck
      </h1>
      <LogInEmail />
      <Link href="/register">Go to Register</Link>
    </main>
  );
}
