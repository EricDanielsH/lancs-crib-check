"use client";
import EditOpinionForm from "@/components/EditOpinionForm";
import { useRouter, useParams, useSearchParams } from "next/navigation";

export default function EditOpinion() {
  // Get the opinion ID from the URL path
  const { slug } = useParams();

  // Get the houseId from the URL query parameters
  const searchParams = useSearchParams();
  const houseSlug = searchParams.get("houseSlug");

  console.log("opinion ID (slug)", slug);
  console.log("houseId from query params", houseSlug);

  return (
    <div className="w-full flex items-center justify-center">
      <section className="section pt-[10vh]">
        <div className="max-w-2xl flex flex-col items-center justify-center gap-2 p-4">
          <h1 className="text-2xl text-black dark:text-white font-semibold">
            Edit Opinion
          </h1>
          <EditOpinionForm opinionId={slug} houseSlug={houseSlug} />
        </div>
      </section>
    </div>
  );
}
