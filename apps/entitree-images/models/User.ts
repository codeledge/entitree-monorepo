import mongoose from "mongoose";

export interface User {
  _id: string;
  id: string;
  name: string;
  email: string;
  image: string;
  role?: "admin";
}

const UserSchema = new mongoose.Schema<User>(
  {
    name: String,
    email: String,
    image: String,
    role: String,
  },
  {
    toObject: {
      transform: (doc, ret) => {
        ret.id = doc.id;
        // ret.name = doc.profile.name;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

export const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", UserSchema);
