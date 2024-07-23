import RegisterEmail from "@/components/auth/RegisterEmail";
import Title from "@/components/Title";

export default function Register() {
  return (
    <main className="h-full flex flex-col justify-center items-center">
      <Title />
      <RegisterEmail />
    </main>
  );
}
