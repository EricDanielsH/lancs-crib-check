import LogInEmail from "@/components/auth/LogInEmail";
import Title from "@/components/Title";

export default function Login() {
  return (
    <main className="h-full flex-col flex justify-center items-center">
      <Title />
      <LogInEmail />
    </main>
  );
}
