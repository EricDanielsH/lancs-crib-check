import mongoose, { Schema } from "mongoose";

const opinionSchema = new Schema({
  //author: { type: Schema.Types.ObjectId, ref: "User" },
  author: { type: String, required: true},
  text: { type: String, required: true },
  rating: { type: Number, required: true },
  yearOfResidence: { type: Number, required: true },
} ,{ timestamps: true });

const Opinion =
  mongoose.models.Opinion || mongoose.model("Opinion", opinionSchema);
export default Opinion;
