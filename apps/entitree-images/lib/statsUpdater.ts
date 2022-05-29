import { prismaClient } from "../prisma/prismaClient";
import { Metric } from ".prisma/client";

export async function updateMetric(metric: Metric) {
  const month = new Date().toISOString().slice(0, 7);
  //TODO
  // await prismaClient.stat.upsert({
  //   where: {
  //     metric,
  //     month,
  //   },
  //   update: {
  //     count: {
  //       increment: 1,
  //     },
  //   },
  // });
}
