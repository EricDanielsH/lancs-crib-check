import mongoose, { Schema } from "mongoose";

const houseSchema = new Schema(
  {
    slug: { type: String, required: true },
    address: { type: String, required: true },
    ppw: { type: Number, required: true },
    totalweeks: { type: Number, required: true },
    bedrooms: { type: Number, required: true },
    bathrooms: { type: Number, required: true },
    rating: { type: Number, required: true },
    opinions: [{ type: Schema.Types.ObjectId, ref: "Opinion", required: true }],
    mediaId: { type: Schema.Types.ObjectId, ref: "Media", required: true },
    mediaUrl: { type: String, required: false },
  },
  { timestamps: true },
);

const House = mongoose.models.House || mongoose.model("House", houseSchema);
export default House;
