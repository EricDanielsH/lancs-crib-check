import mongoose, { Schema } from "mongoose";

const opinionSchema = new Schema(
  {
    houseId: { type: Schema.Types.ObjectId, ref: "House", required: true },
    authorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    authorName: { type: String, required: true },
    text: { type: String, required: true },
    rating: { type: Number, required: true },
    yearOfResidence: { type: Number, required: true },
  },
  { timestamps: true },
);

const Opinion =
  mongoose.models.Opinion || mongoose.model("Opinion", opinionSchema);
export default Opinion;
