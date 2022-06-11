import { prismaClient, Metric } from "../prisma/prismaClient";

export async function updateMetric(metric: Metric) {
  const month = new Date().toISOString().slice(0, 7);
  // await prismaClient.stat.upsert({
  //   where: {
  //     metric_month: {
  //       metric,
  //       month,
  //     },
  //   },
  //   create: {
  //     count: 1,
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

export { Metric } from "../prisma/prismaClient";
