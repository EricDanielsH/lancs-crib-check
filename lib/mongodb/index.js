import mongoose from "mongoose";

export const connectMongoDB = async() => {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(process.env.MONGODB_URI)
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!",
    );
  } catch (error) {
    // Ensures that the client will close when you finish/error
    console.error("An error occurred while connecting to MongoDB: ", error);
  }
}
