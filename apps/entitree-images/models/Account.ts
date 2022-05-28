import mongoose, { Document } from "mongoose";

export interface Account {
  id: string;
}

const Accountchema = new mongoose.Schema<Account>(
  {},
  {
    toObject: {
      transform: (doc, ret) => {
        ret.id = doc.id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

export default (mongoose.models.Account as mongoose.Model<Account>) ||
  mongoose.model<Account>("Account", Accountchema);
