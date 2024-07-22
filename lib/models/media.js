import mongoose, { Schema } from "mongoose";

const mediaSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    postId: {
      type: String,
    },
    url: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const Media = mongoose.models.Media || mongoose.model("Media", mediaSchema);

export default Media;
