import StatsModel from "../models/Stats";

export enum MetricType {
  googleCloudVisionFaceDetection = "googleCloudVisionFaceDetection",
  backgroundRemoval = "backgroundRemoval",
  apiCalled = "apiCalled",
}

export async function updateMetric(metric: MetricType) {
  const month = new Date().toISOString().slice(0, 7);

  await StatsModel.findOneAndUpdate(
    { metric, month },
    {
      $inc: { count: 1 },
    },
    {
      upsert: true,
    }
  );
}
