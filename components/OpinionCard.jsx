import StarRating from "@/components/StarRating";
export default function OpinionCard({ opinion }) {
  return (
    <div
      key={opinion.id}
      className="flex flex-col gap-4 bg-base-200 mb-4 p-4 rounded-lg dark:bg-gray-700 dark:text-gray-100"
    >
      <div className="flex items-center justify-between">
        <h4 className="text-2xl font-semibold">{opinion.authorName}</h4>
        <div className="flex items-center">
          <h4 className="text-lg">
            <strong>{opinion.rating}</strong>/5
          </h4>
          <StarRating size={20} />
        </div>
      </div>
      <p className="text-sm dark:text-neutral-400">
        Year of residence: {opinion.yearOfResidence}
      </p>
      <div
        className="prose text-black dark:text-white"
        dangerouslySetInnerHTML={{ __html: opinion.text }}
      />
      <p className="text-sm text-right dark:text-neutral-400">
        Posted on {new Date(opinion.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
}
