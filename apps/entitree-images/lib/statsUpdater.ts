import { prismaClient } from "../prisma/prismaClient";
import { Metric } from "@prisma/client";

export async function updateMetric(metric: Metric) {
  const month = new Date().toISOString().slice(0, 7);
  await prismaClient.stat.upsert({
    where: {
      metric_month: {
        metric,
        month,
      },
    },
    create: {
      count: 1,
      metric,
      month,
    },
    update: {
      count: {
        increment: 1,
      },
    },
  });
}
