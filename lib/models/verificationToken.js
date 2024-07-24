import mongoose, { Schema } from "mongoose";

const verificationTokenSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    token: { type: String, required: true },
    expires: { type: Date, required: true },
  },
  { timestamps: true },
);

const VerificationToken =
  mongoose.models.VerificationToken ||
  mongoose.model("VerificationToken", verificationTokenSchema);

export default VerificationToken;
