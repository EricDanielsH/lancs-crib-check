import LogInEmail from "@/components/auth/LogInEmail";
import Title from "@/components/Title";

export default function Login({
  searchParams,
}: {
  searchParams: { verified: string };
}) {
  const isVerified = searchParams.verified === "true";
  return (
    <main className="h-full flex-col flex justify-center items-center">
      <Title />
      <LogInEmail isVerified={isVerified}/>
    </main>
  );
}
