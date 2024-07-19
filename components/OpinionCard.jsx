import StarRating from "@/components/StarRating";
export default function OpinionCard({ opinion }) {
  return (
    <div key={opinion.id} className="flex flex-col gap-4 bg-base-200 mb-4 p-4 rounded">
      <div className="flex items-center justify-between">
        <h4 className="text-2xl font-semibold">{opinion.authorName}</h4>
        <div className="flex items-center">
          <h4 className="text-lg">{opinion.rating}/5</h4>
          <StarRating size={20} />
        </div>
      </div>
      <div>
        <p className="text-sm">
          Year of residence: {opinion.yearOfResidence}
        </p>
      </div>
      <div
        className="prose text-black"
        dangerouslySetInnerHTML={{ __html: opinion.text }}
      />
      <p>Posted on {new Date(opinion.createdAt).toLocaleDateString()}</p>
    </div>
  );
}
