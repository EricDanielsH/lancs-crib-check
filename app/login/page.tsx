import Link from "next/link";
import LogInEmail from "@/components/auth/LogInEmail";

export default function Login() {
  return (
    <main className="h-screen flex-col flex justify-center items-center">
      <LogInEmail />
      <Link href="/register">Go to Register</Link>
    </main>
  );
}
