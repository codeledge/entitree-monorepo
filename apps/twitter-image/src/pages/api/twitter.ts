import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { Client } from "twitter-api-sdk";
import { TwitterApi } from "twitter-api-v2";

const key = process.env.TWITTER_V2_API_KEY;

const client = new Client(key);
const twitterClient = new TwitterApi(key);

async function main() {}

const fetch = async (props: any) => {
  const config = {
    method: "get",
    url: `https://api.twitter.com/2/users/by?usernames=${props.username}&user.fields=profile_image_url`,
    headers: {
      Authorization: `Bearer AAAAAAAAAAAAAAAAAAAAAOPlVwEAAAAAtf8lx19Zs7sPbpF0aNEgpqESWyQ%3DHOjH5PbZpAhEUvdnhOFnk756pxFEiJw8jEghjDRQ2kgjPcUR2E`,
    },
  };

  const { data: response } = await axios(config as any);
  return response;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await client.users.findUserByUsername("elonmusk", {
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
  const roClient = twitterClient.readOnly.v2;
  const v1 = twitterClient.readOnly.v1;

  const unoffi = await roClient.userByUsername("elonmusk");

  // const banner = await v1.userProfileBannerSizes({ user_id: unoffi.data.id });
  const timeline = await client.tweets.usersIdTweets(unoffi.data.id, {
    max_results: 10,
    pagination_token: "7140dibdnow9c7btw4228gkn49jw7t9t4wv8mrv6xp645",
    "tweet.fields": [
      "attachments",
      "author_id",
      "context_annotations",
      "conversation_id",
      "created_at",
      "entities",
      "geo",
      "id",
      "in_reply_to_user_id",
      "lang",
      "possibly_sensitive",
      "public_metrics",
      "referenced_tweets",
      "reply_settings",
      "source",
      "text",
      "withheld",
    ],
    "media.fields": [
      "alt_text",
      "duration_ms",
      "height",
      "media_key",
      "non_public_metrics",
      "organic_metrics",
      "preview_image_url",
      "promoted_metrics",
      "public_metrics",
      "type",
      "url",
      "variants",
      "width",
    ],

    expansions: [
      "attachments.media_keys",
      "attachments.poll_ids",
      "author_id",
      "entities.mentions.username",
      "geo.place_id",
      "in_reply_to_user_id",
      "referenced_tweets.id",
      "referenced_tweets.id.author_id",
    ],
  });

  const timeline2 = null; //await roClient.userTimeline(unoffi.data.id, {});

  // console.log(tweet.data);
  res.status(200).send({ user, unoffi, timeline, timeline2 });
};
export default handler;
