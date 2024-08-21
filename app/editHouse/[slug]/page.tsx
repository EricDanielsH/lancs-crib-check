"use client";
import EditHouseForm from "components/EditHouseForm";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function EditHouse() {
  const { data: session } = useSession();
  const router = useRouter();

  if (!session) {
    router.push("/login");
    return null;
  }

  // Get the opinion ID from the URL path
  return (
    <div className="w-full flex items-center justify-center">
      <section className="section pt-[10vh]">
        <div className="max-w-2xl flex flex-col items-center justify-center gap-2 p-4">
          <h1 className="text-2xl text-black dark:text-white font-semibold">
            Edit House
          </h1>
          <EditHouseForm />
        </div>
      </section>
    </div>
  );
}
