import { FilterQuery, Model } from "mongoose";

import type { NextApiRequest } from "next";

export const adminGetMongoQuery = async <T extends { _id: string }>(
  req: NextApiRequest,
  model: typeof Model,
  baseFilter = {}
) => {
  const { filter, range, sort } = req.query;

  const mongoFilter = { ...baseFilter } as FilterQuery<T>;
  if (filter) {
    const { id } = JSON.parse(filter as string);
    if (id) mongoFilter._id = { $in: id };
  }

  const query = model.find(mongoFilter);

  if (range) {
    const [sortField, dir] = JSON.parse(sort as string);
    query.sort({ [sortField]: dir });
  }

  if (range) {
    const [first, last] = JSON.parse(range as string);
    query.skip(first).limit(last - first + 1);
  }

  const items = await query.exec();

  const total = await model.find(baseFilter).count();

  const normalizedItems = items.map((item) => {
    return item.toObject();
  });

  return {
    total,
    items: normalizedItems,
  };
};
