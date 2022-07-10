import axios from "axios";
import { Client } from "twitter-api-sdk";
import { prismaClient } from "../../prisma/prismaClient";
import fs from "fs";

const key = process.env.TWITTER_V2_API_KEY;
const client = new Client(key);

export const byUsername = async (username: string) => {
  const user = await client.users.findUserByUsername(username, {
    "user.fields": [
      "id",
      "name",
      "username",
      "created_at",
      "description",
      "entities",
      "location",
      "pinned_tweet_id",
      "profile_image_url",
      "protected",
      "public_metrics",
      "url",
      "verified",
      "withheld",
    ],

    "tweet.fields": ["created_at", "entities", "attachments", "lang"],
    expansions: ["pinned_tweet_id"],
  });

  return user;
};

export const queryUser = async (username: string) => {
  const user = await byUsername(username);
  const accountId = Number(user.data.id);
  const imageUrl = user.data.profile_image_url.replace("_normal", "");
  if (!user.data) {
    return "no data";
  }
  console.log(user);
  await prismaClient.twitterAccount.upsert({
    where: {
      accountId,
    },
    create: {
      accountId,
      username: user.data.username,
      // created_at: user.data.created_at,
    },
    update: {
      username: user.data.username,
    },
  });

  await prismaClient.twitterPublicMetrics.create({
    data: {
      account: {
        connect: {
          accountId,
        },
      },
      ...user.data.public_metrics,
    },
  });

  const existingImage = await prismaClient.twitterImage.findFirst({
    where: {
      url: imageUrl,
    },
  });

  if (existingImage) {
    return;
  }

  const buffer = await axios
    .get(imageUrl, {
      responseType: "arraybuffer",
    })
    .then((response) =>
      Buffer.from(response.data, "binary").toString("base64")
    );
  console.log(buffer);
  const createdImage = await prismaClient.twitterImage.create({
    data: {
      account: {
        connect: {
          accountId,
        },
      },
      source: buffer,
      url: imageUrl,
    },
  });
  return user;
  // await axios
  //   .get(imageUrl, { responseType: "stream" })
  //   .then((response) => {
  //     response.data.pipe(
  //       fs.createWriteStream("public/image/" + createdImage.id + ".jpg")
  //     );
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
};
