import mongoose from "mongoose";

export interface Stats {
  month: string;
  count: number;
  metric: string;
}

const StatsSchema = new mongoose.Schema<Stats>(
  { month: String, count: Number, metric: String },
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

export default (mongoose.models.Stats as mongoose.Model<Stats>) ||
  mongoose.model<Stats>("Stats", StatsSchema);
