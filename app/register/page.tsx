import SignInGoogle from "@/components/SignInGoogle";
import RegisterEmail from "@/components/RegisterEmail";
import { useSession } from "next-auth/client";

export default function Register() {
  return (
    <main>
      <RegisterEmail />
      <SignInGoogle />
    </main>
  );
}
