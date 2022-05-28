import type { NextApiRequest, NextApiResponse } from "next";

import ImageModel from "../../models/Image";
import StatsModel from "../../models/Stats";
import connectDB from "../../middleware/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();

  console.log(req.query);
  const month = new Date().toISOString().slice(0, 7);
  const statsThisMonth = await StatsModel.find({ month: month });
  let results = {};
  for (let i in statsThisMonth) {
    const stat = statsThisMonth[i];
    results[stat.metric] = stat.count;
  }
  console.log(statsThisMonth);

  const aggregateBackground = await ImageModel.aggregate([
    {
      $group: { _id: "$statusBackgroundRemoval", count: { $sum: 1 } },
    },
  ]);

  const aggregateFace = await ImageModel.aggregate([
    {
      $group: { _id: "$statusGoogleFaceDetection", count: { $sum: 1 } },
    },
  ]);

  const aggregateCrop = await ImageModel.aggregate([
    {
      $group: { _id: "$statusImageCropping", count: { $sum: 1 } },
    },
  ]);

  //   let imageViewCount = await Image.aggregate([
  //     // { $match: { viewCount: {$gte: 0, $lte: 1000000} } },
  //     { $group: { _id: null, amount: { $sum: "$viewCount" } } }
  // ]);
  //    imageViewCount = imageViewCount[0].amount;

  res.status(200).json({
    stats: results,
    aggregateCrop: transformArray(aggregateCrop),
    aggregateBackground: transformArray(aggregateBackground),
    aggregateFace: transformArray(aggregateFace),
  });
}
function transformArray(data) {
  return Object.fromEntries(data.map((item) => [item._id, item.count]));
}
