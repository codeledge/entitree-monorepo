import mongoose from "mongoose";

const connectDB = async () => {
  if (mongoose.connections[0].readyState) {
    // Use current db connection
    return;
  }
  // Use new db connection
  await mongoose.connect(process.env.MONGODB_URI!);
};

export default connectDB;
