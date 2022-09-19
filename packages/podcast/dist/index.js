"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  DESCRIPTIONS_DEFAULT: () => DESCRIPTIONS_DEFAULT,
  ItunesEpisodeSchema: () => ItunesEpisodeSchema,
  POPULAR_PODCASTS: () => POPULAR_PODCASTS,
  convertFeedEpisodeToWikidata: () => convertFeedEpisodeToWikidata,
  convertFeedToWikidata: () => convertFeedToWikidata,
  convertItunesToFeed: () => convertItunesToFeed,
  convertSpotifyToFeed: () => convertSpotifyToFeed,
  extractGuests: () => extractGuests,
  extractProductionCode: () => extractProductionCode,
  extractRecordingDate: () => extractRecordingDate,
  getItunesShowEpisodes: () => getItunesShowEpisodes,
  getPodcastFeed: () => getPodcastFeed,
  getPodcastInfo: () => getPodcastInfo,
  getSpotifyShowEpisodes: () => getSpotifyShowEpisodes,
  renameClaimIdtoLabel: () => renameClaimIdtoLabel
});
module.exports = __toCommonJS(src_exports);

// src/spotify/getSpotifyShowEpisodes.ts
var import_luxon = require("luxon");
var import_axios = __toESM(require("axios"));
async function getSpotifyShowEpisodes(playlistId, access_token, afterDate) {
  let items = [];
  let offset = 0;
  let nextPageToken = "start";
  do {
    const page = (await import_axios.default.get(
      "https://api.spotify.com/v1/shows/" + playlistId + "/episodes",
      {
        headers: {
          Authorization: "Bearer " + access_token,
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        params: {
          limit: 50,
          offset
        }
      }
    )).data;
    offset += 50;
    nextPageToken = page.next;
    for (const item of page.items) {
      items.push(item);
    }
  } while (nextPageToken && (!afterDate || import_luxon.DateTime.fromISO(items[items.length - 1].pubDate) > afterDate));
  return items;
}

// src/spotify/convertSpotifyToFeed.ts
function convertSpotifyToFeed(episodes) {
  let items = [];
  for (const item of episodes) {
    let itemFeed = {
      title: item.name,
      duration: item.duration_ms / 1e3,
      pubDate: item.release_date,
      explicit: item.explicit,
      description: item.description,
      guid: item.href,
      episodeType: "full" /* Full */,
      spotifyId: item.href.split("episodes/")[1],
      image: { url: item.images[0].url },
      author: "",
      summary: "",
      enclosure: { url: "" },
      lastBuildDate: ""
    };
    items.push(itemFeed);
  }
  return items;
}

// src/itunes/getItunesShowEpisodes.ts
var import_axios2 = __toESM(require("axios"));

// src/itunes/example.ts
var itunesExample = [
  {
    previewUrl: "https://www.buzzsprout.com/1772992/11085490-nick-beattie-rainbow-wallet.mp3",
    artworkUrl160: "https://is5-ssl.mzstatic.com/image/thumb/Podcasts115/v4/74/4a/3a/744a3a10-0b6d-8c7d-98a1-6c05e0fbedf7/mza_7762033313959794772.jpg/160x160bb.jpg",
    episodeFileExtension: "mp3",
    episodeContentType: "audio",
    episodeUrl: "https://www.buzzsprout.com/1772992/11085490-nick-beattie-rainbow-wallet.mp3",
    artworkUrl600: "https://is5-ssl.mzstatic.com/image/thumb/Podcasts115/v4/74/4a/3a/744a3a10-0b6d-8c7d-98a1-6c05e0fbedf7/mza_7762033313959794772.jpg/600x600bb.jpg",
    collectionViewUrl: "https://itunes.apple.com/us/podcast/devtools-fm/id1566647758?mt=2&uo=4",
    trackViewUrl: "https://podcasts.apple.com/us/podcast/nick-beattie-rainbow-wallet/id1566647758?i=1000575097111&uo=4",
    trackTimeMillis: 3862e3,
    contentAdvisoryRating: "Clean",
    artworkUrl60: "https://is5-ssl.mzstatic.com/image/thumb/Podcasts115/v4/74/4a/3a/744a3a10-0b6d-8c7d-98a1-6c05e0fbedf7/mza_7762033313959794772.jpg/60x60bb.jpg",
    releaseDate: "2022-08-05T06:00:00Z",
    trackId: 1000575097111,
    trackName: "Nick Beattie - Rainbow Wallet",
    shortDescription: "",
    closedCaptioning: "none",
    collectionId: 1566647758,
    collectionName: "devtools.fm",
    feedUrl: "https://feeds.buzzsprout.com/1772992.rss",
    artistIds: [],
    country: "USA",
    kind: "podcast-episode",
    wrapperType: "podcastEpisode",
    description: "This week we chat with Nick Beattie, lead engineer of RainbowKit. We talk about web3, the changing face of the internet, and the Rainbow company.\nTwitter Website\n\nTooltips\n\n\n\nAndrew\n\n\nhttps://github.com/kuprel/min-dallehttps://twitter.com/shuding_/status/1475916082875666441\nJustin\n\n\nHaptic smart knob projectAutomatic CNC tool head changer\nNick\n\n\nFoundry is a blazing fast, portable and modular toolkit for Ethereum application development written in Rust.Monome Norns Shield is a DIY circuit which extends a normal Raspberry Pi, turning it into a norns.",
    genres: [
      {
        name: "Technology",
        id: "1318"
      }
    ],
    episodeGuid: "Buzzsprout-11085490"
  },
  {
    previewUrl: "https://www.buzzsprout.com/1772992/11009143-josh-goldberg-learning-typescript-book-typescript-eslint.mp3",
    artworkUrl160: "https://is5-ssl.mzstatic.com/image/thumb/Podcasts115/v4/74/4a/3a/744a3a10-0b6d-8c7d-98a1-6c05e0fbedf7/mza_7762033313959794772.jpg/160x160bb.jpg",
    episodeFileExtension: "mp3",
    episodeContentType: "audio",
    episodeUrl: "https://www.buzzsprout.com/1772992/11009143-josh-goldberg-learning-typescript-book-typescript-eslint.mp3",
    artworkUrl600: "https://is5-ssl.mzstatic.com/image/thumb/Podcasts115/v4/74/4a/3a/744a3a10-0b6d-8c7d-98a1-6c05e0fbedf7/mza_7762033313959794772.jpg/600x600bb.jpg",
    collectionViewUrl: "https://itunes.apple.com/us/podcast/devtools-fm/id1566647758?mt=2&uo=4",
    trackViewUrl: "https://podcasts.apple.com/us/podcast/josh-goldberg-learning-typescript-book-typescript-eslint/id1566647758?i=1000570776912&uo=4",
    trackTimeMillis: 3874e3,
    contentAdvisoryRating: "Clean",
    artworkUrl60: "https://is5-ssl.mzstatic.com/image/thumb/Podcasts115/v4/74/4a/3a/744a3a10-0b6d-8c7d-98a1-6c05e0fbedf7/mza_7762033313959794772.jpg/60x60bb.jpg",
    releaseDate: "2022-07-22T06:00:00Z",
    trackId: 1000570776912,
    trackName: "Josh Goldberg - Learning TypeScript Book, typescript-eslint",
    shortDescription: "",
    closedCaptioning: "none",
    collectionId: 1566647758,
    collectionName: "devtools.fm",
    feedUrl: "https://feeds.buzzsprout.com/1772992.rss",
    artistIds: [],
    country: "USA",
    kind: "podcast-episode",
    wrapperType: "podcastEpisode",
    description: "This week we're joined by another great contributor to the TypeScript community.\nJosh Goldberg is the author of O'Reilly's Learning TypeScript and a core contributor to the typescript-eslint.\nhttps://twitter.com/JoshuaKGoldberghttps://www.learningtypescript.comhttps://github.com/typescript-eslint/typescript-eslinthttps://github.com/JoshuaKGoldberg/TypeStathttps://www.learningtypescript.com/articles/extreme-explorations-of-typescripts-type-systemhttps://ts-error-translator.vercel.app/Tooltips\nAndrew\nhttps://www.npmjs.com/package/jscodeshifthttps://react-cmdk.comJustin\nhttps://interval.com/https://github.com/coddingtonbear/obsidian-local-rest-apiJosh\nhttps://github.com/mattpocock/ts-error-translator (https://ts-error-translator.vercel.app) by @mattpocock. Great explainer for TypeScript errors.Laziness Does Not Exist by Devon Price, Ph.D. Helping me feel better about my work ethics & avoid burnout.",
    genres: [
      {
        name: "Technology",
        id: "1318"
      }
    ],
    episodeGuid: "Buzzsprout-11009143"
  },
  {
    previewUrl: "https://www.buzzsprout.com/1772992/10925378-jake-cooper-railway.mp3",
    artworkUrl160: "https://is5-ssl.mzstatic.com/image/thumb/Podcasts115/v4/74/4a/3a/744a3a10-0b6d-8c7d-98a1-6c05e0fbedf7/mza_7762033313959794772.jpg/160x160bb.jpg",
    episodeFileExtension: "mp3",
    episodeContentType: "audio",
    episodeUrl: "https://www.buzzsprout.com/1772992/10925378-jake-cooper-railway.mp3",
    artworkUrl600: "https://is5-ssl.mzstatic.com/image/thumb/Podcasts115/v4/74/4a/3a/744a3a10-0b6d-8c7d-98a1-6c05e0fbedf7/mza_7762033313959794772.jpg/600x600bb.jpg",
    collectionViewUrl: "https://itunes.apple.com/us/podcast/devtools-fm/id1566647758?mt=2&uo=4",
    trackViewUrl: "https://podcasts.apple.com/us/podcast/jake-cooper-railway/id1566647758?i=1000569234314&uo=4",
    trackTimeMillis: 3252e3,
    contentAdvisoryRating: "Clean",
    artworkUrl60: "https://is5-ssl.mzstatic.com/image/thumb/Podcasts115/v4/74/4a/3a/744a3a10-0b6d-8c7d-98a1-6c05e0fbedf7/mza_7762033313959794772.jpg/60x60bb.jpg",
    releaseDate: "2022-07-08T06:00:00Z",
    trackId: 1000569234314,
    trackName: "Jake Cooper - Railway",
    shortDescription: "",
    closedCaptioning: "none",
    collectionId: 1566647758,
    collectionName: "devtools.fm",
    feedUrl: "https://feeds.buzzsprout.com/1772992.rss",
    artistIds: [],
    country: "USA",
    kind: "podcast-episode",
    wrapperType: "podcastEpisode",
    description: "This week we go down the stack all the way to the infrastructure! We're joined by Jake Cooper, CEO of Railway, a company innovating in automatic infrastructure deployment. Just push your code and railway figures out how to create an environment!\n\n\nhttps://railway.apphttps://twitter.com/JustJakehttps://twitter.com/Railwayhttps://justjake.substack.com\nTooltips\nAndrew\nhttps://docs.plasmo.comhttps://lion-web.netlify.appJustin\nhttps://github.com/actualbudget/actualhttps://watchy.sqfmi.com/Jake\nhttps://tamagui.dev/https://tailscale.com/https://github.com/graphql-nexus/nexushttps://trpc.io/",
    genres: [
      {
        name: "Technology",
        id: "1318"
      }
    ],
    episodeGuid: "Buzzsprout-10925378"
  },
  {
    previewUrl: "https://www.buzzsprout.com/1772992/10847215-tyler-krupicka-stripe-typescript-migration.mp3",
    artworkUrl160: "https://is5-ssl.mzstatic.com/image/thumb/Podcasts115/v4/74/4a/3a/744a3a10-0b6d-8c7d-98a1-6c05e0fbedf7/mza_7762033313959794772.jpg/160x160bb.jpg",
    episodeFileExtension: "mp3",
    episodeContentType: "audio",
    episodeUrl: "https://www.buzzsprout.com/1772992/10847215-tyler-krupicka-stripe-typescript-migration.mp3",
    artworkUrl600: "https://is5-ssl.mzstatic.com/image/thumb/Podcasts115/v4/74/4a/3a/744a3a10-0b6d-8c7d-98a1-6c05e0fbedf7/mza_7762033313959794772.jpg/600x600bb.jpg",
    collectionViewUrl: "https://itunes.apple.com/us/podcast/devtools-fm/id1566647758?mt=2&uo=4",
    trackViewUrl: "https://podcasts.apple.com/us/podcast/tyler-krupicka-stripe-typescript-migration/id1566647758?i=1000567572141&uo=4",
    trackTimeMillis: 4312e3,
    contentAdvisoryRating: "Clean",
    artworkUrl60: "https://is5-ssl.mzstatic.com/image/thumb/Podcasts115/v4/74/4a/3a/744a3a10-0b6d-8c7d-98a1-6c05e0fbedf7/mza_7762033313959794772.jpg/60x60bb.jpg",
    releaseDate: "2022-06-24T05:00:00Z",
    trackId: 1000567572141,
    trackName: "Tyler Krupicka - Stripe TypeScript Migration",
    shortDescription: "",
    closedCaptioning: "none",
    collectionId: 1566647758,
    collectionName: "devtools.fm",
    feedUrl: "https://feeds.buzzsprout.com/1772992.rss",
    artistIds: [],
    country: "USA",
    kind: "podcast-episode",
    wrapperType: "podcastEpisode",
    description: "This week we're joined by Tyler Krupicka, an engineer on Stripe's devleper productivity team. He talks to use about their experience migrating millions of lines of Flow to TypeScript.\n\n\nBlog postOSS conversion toolStripe engineering blog\nTooltips\nAndrew\nhttps://virtuoso.devhttps://github.com/ecklf/tailwindcss-radixJustin\nhttps://riffle.systems/essays/prelude/https://github.com/maraisr/merosTyler\nhttps://www.npmjs.com/package/eslint-bankruptcyhttps://github.com/dsherret/ts-morph",
    genres: [
      {
        name: "Technology",
        id: "1318"
      }
    ],
    episodeGuid: "Buzzsprout-10847215"
  },
  {
    previewUrl: "https://www.buzzsprout.com/1772992/10769139-daniel-stockman-lerna.mp3",
    artworkUrl160: "https://is5-ssl.mzstatic.com/image/thumb/Podcasts115/v4/74/4a/3a/744a3a10-0b6d-8c7d-98a1-6c05e0fbedf7/mza_7762033313959794772.jpg/160x160bb.jpg",
    episodeFileExtension: "mp3",
    episodeContentType: "audio",
    episodeUrl: "https://www.buzzsprout.com/1772992/10769139-daniel-stockman-lerna.mp3",
    artworkUrl600: "https://is5-ssl.mzstatic.com/image/thumb/Podcasts115/v4/74/4a/3a/744a3a10-0b6d-8c7d-98a1-6c05e0fbedf7/mza_7762033313959794772.jpg/600x600bb.jpg",
    collectionViewUrl: "https://itunes.apple.com/us/podcast/devtools-fm/id1566647758?mt=2&uo=4",
    trackViewUrl: "https://podcasts.apple.com/us/podcast/daniel-stockman-lerna/id1566647758?i=1000565927788&uo=4",
    trackTimeMillis: 4282e3,
    contentAdvisoryRating: "Clean",
    artworkUrl60: "https://is5-ssl.mzstatic.com/image/thumb/Podcasts115/v4/74/4a/3a/744a3a10-0b6d-8c7d-98a1-6c05e0fbedf7/mza_7762033313959794772.jpg/60x60bb.jpg",
    releaseDate: "2022-06-10T05:00:00Z",
    trackId: 1000565927788,
    trackName: "Daniel Stockman - Lerna",
    shortDescription: "",
    closedCaptioning: "none",
    collectionId: 1566647758,
    collectionName: "devtools.fm",
    feedUrl: "https://feeds.buzzsprout.com/1772992.rss",
    artistIds: [],
    country: "USA",
    kind: "podcast-episode",
    wrapperType: "podcastEpisode",
    description: "This week we're joined by Daniel Stockman the former maintainer of Lerna.\nIn this episode we talk about he became the sole maintainer of the project, how he dealt with burnout, and thet future of Lerna.\n\nhttps://lerna.js.org\n\nAndrew\nhttps://github.com/shuding/tilghttps://github.com/ericclemmons/click-to-componentJustin\nhttps://github.com/thepassle/astro-service-workerhttps://github.com/spacedriveapp/spacedriveDaniel\nhttps://github.com/sharkdp/bathttps://github.com/sharkdp/fd",
    genres: [
      {
        name: "Technology",
        id: "1318"
      }
    ],
    episodeGuid: "Buzzsprout-10769139"
  },
  {
    previewUrl: "https://www.buzzsprout.com/1772992/10690343-colin-mcdonnell-zod-trpc-edgedb.mp3",
    artworkUrl160: "https://is5-ssl.mzstatic.com/image/thumb/Podcasts115/v4/74/4a/3a/744a3a10-0b6d-8c7d-98a1-6c05e0fbedf7/mza_7762033313959794772.jpg/160x160bb.jpg",
    episodeFileExtension: "mp3",
    episodeContentType: "audio",
    episodeUrl: "https://www.buzzsprout.com/1772992/10690343-colin-mcdonnell-zod-trpc-edgedb.mp3",
    artworkUrl600: "https://is5-ssl.mzstatic.com/image/thumb/Podcasts115/v4/74/4a/3a/744a3a10-0b6d-8c7d-98a1-6c05e0fbedf7/mza_7762033313959794772.jpg/600x600bb.jpg",
    collectionViewUrl: "https://itunes.apple.com/us/podcast/devtools-fm/id1566647758?mt=2&uo=4",
    trackViewUrl: "https://podcasts.apple.com/us/podcast/colin-mcdonnell-zod-trpc-edgedb/id1566647758?i=1000564137680&uo=4",
    trackTimeMillis: 4675e3,
    contentAdvisoryRating: "Clean",
    artworkUrl60: "https://is5-ssl.mzstatic.com/image/thumb/Podcasts115/v4/74/4a/3a/744a3a10-0b6d-8c7d-98a1-6c05e0fbedf7/mza_7762033313959794772.jpg/60x60bb.jpg",
    releaseDate: "2022-05-27T05:00:00Z",
    trackId: 1000564137680,
    trackName: "Colin McDonnell - Zod, tRPC, EdgeDB",
    shortDescription: "",
    closedCaptioning: "none",
    collectionId: 1566647758,
    collectionName: "devtools.fm",
    feedUrl: "https://feeds.buzzsprout.com/1772992.rss",
    artistIds: [],
    country: "USA",
    kind: "podcast-episode",
    wrapperType: "podcastEpisode",
    description: "This week we're joined by Colin McDonnel, the head of devrel at EdgeDB a relational database with an object-oriented data model and a powerful queru language.\nColin is also the creator of useful TypeScript libraries such as Zod and tRPC.\nhttps://trpc.io/https://www.edgedb.com/https://github.com/colinhacks/zod\nTooltips\nAndrew\nRFC: useEvent reactjs/rfcs#220Justin\nhttps://github.com/wycats/starbeamColin\nhttps://www.amazon.com/Saddle-Chair/s?k=Saddle+Chairhttps://www.npmjs.com/package/ts-node -T flaghttps://devblogs.microsoft.com/typescript/announcing-typescript-4-7-beta/ ESM support",
    genres: [
      {
        name: "Technology",
        id: "1318"
      }
    ],
    episodeGuid: "Buzzsprout-10690343"
  },
  {
    previewUrl: "https://www.buzzsprout.com/1772992/10610556-zack-jackson-module-federation.mp3",
    artworkUrl160: "https://is5-ssl.mzstatic.com/image/thumb/Podcasts115/v4/74/4a/3a/744a3a10-0b6d-8c7d-98a1-6c05e0fbedf7/mza_7762033313959794772.jpg/160x160bb.jpg",
    episodeFileExtension: "mp3",
    episodeContentType: "audio",
    episodeUrl: "https://www.buzzsprout.com/1772992/10610556-zack-jackson-module-federation.mp3",
    artworkUrl600: "https://is5-ssl.mzstatic.com/image/thumb/Podcasts115/v4/74/4a/3a/744a3a10-0b6d-8c7d-98a1-6c05e0fbedf7/mza_7762033313959794772.jpg/600x600bb.jpg",
    collectionViewUrl: "https://itunes.apple.com/us/podcast/devtools-fm/id1566647758?mt=2&uo=4",
    trackViewUrl: "https://podcasts.apple.com/us/podcast/zack-jackson-module-federation/id1566647758?i=1000560966281&uo=4",
    trackTimeMillis: 4543e3,
    contentAdvisoryRating: "Clean",
    artworkUrl60: "https://is5-ssl.mzstatic.com/image/thumb/Podcasts115/v4/74/4a/3a/744a3a10-0b6d-8c7d-98a1-6c05e0fbedf7/mza_7762033313959794772.jpg/60x60bb.jpg",
    releaseDate: "2022-05-13T05:00:00Z",
    trackId: 1000560966281,
    trackName: "Zack Jackson - Module Federation",
    shortDescription: "",
    closedCaptioning: "none",
    collectionId: 1566647758,
    collectionName: "devtools.fm",
    feedUrl: "https://feeds.buzzsprout.com/1772992.rss",
    artistIds: [],
    country: "USA",
    kind: "podcast-episode",
    wrapperType: "podcastEpisode",
    description: "This week we dive into a fascinating new concept in web development: Module Federation.\nJoin us with Zack Jackson, the creator of module federation, to discuss where it started, how it works, and all the cool uses cases it unlocks.\n\n\nhttps://webpack.js.org/concepts/module-federation/\nTooltips\nAndrew\nhttps://www.patterns.dev/https://reactjs.org/blog/2022/03/29/react-v18.htmlJustin\nhttps://github.com/facebook/lexicalhttps://blog.maximeheckel.com/posts/the-power-of-composition-with-css-variables/https://shop.vectorfinesse.com/Zack\nhttps://github.com/module-federation/module-federation-exampleshttps://app.privjs.com/buy/packageDetail?pkg=@module-federation/nextjs-mfhttps://app.privjs.com/buy/packageDetail?pkg=@module-federation/nextjs-ssr",
    genres: [
      {
        name: "Technology",
        id: "1318"
      }
    ],
    episodeGuid: "Buzzsprout-10610556"
  },
  {
    previewUrl: "https://www.buzzsprout.com/1772992/10525607-juri-strumpflohner-nx-nrwl.mp3",
    artworkUrl160: "https://is5-ssl.mzstatic.com/image/thumb/Podcasts115/v4/74/4a/3a/744a3a10-0b6d-8c7d-98a1-6c05e0fbedf7/mza_7762033313959794772.jpg/160x160bb.jpg",
    episodeFileExtension: "mp3",
    episodeContentType: "audio",
    episodeUrl: "https://www.buzzsprout.com/1772992/10525607-juri-strumpflohner-nx-nrwl.mp3",
    artworkUrl600: "https://is5-ssl.mzstatic.com/image/thumb/Podcasts115/v4/74/4a/3a/744a3a10-0b6d-8c7d-98a1-6c05e0fbedf7/mza_7762033313959794772.jpg/600x600bb.jpg",
    collectionViewUrl: "https://itunes.apple.com/us/podcast/devtools-fm/id1566647758?mt=2&uo=4",
    trackViewUrl: "https://podcasts.apple.com/us/podcast/juri-strumpflohner-nx-nrwl/id1566647758?i=1000559068872&uo=4",
    trackTimeMillis: 3688e3,
    contentAdvisoryRating: "Clean",
    artworkUrl60: "https://is5-ssl.mzstatic.com/image/thumb/Podcasts115/v4/74/4a/3a/744a3a10-0b6d-8c7d-98a1-6c05e0fbedf7/mza_7762033313959794772.jpg/60x60bb.jpg",
    releaseDate: "2022-04-29T05:00:00Z",
    trackId: 1000559068872,
    trackName: "Juri Strumpflohner - NX, Nrwl",
    shortDescription: "",
    closedCaptioning: "none",
    collectionId: 1566647758,
    collectionName: "devtools.fm",
    feedUrl: "https://feeds.buzzsprout.com/1772992.rss",
    artistIds: [],
    country: "USA",
    kind: "podcast-episode",
    wrapperType: "podcastEpisode",
    description: "Join us this week with Juri Strumpflohner, the head of DX and Europe Engineering at Nrwl.\nNrwl maintains NX a next generation build system with first class monorepo support and powerful integrations.\nJoin us as we dive deep into the feature set and learn all about how the make builds lightning fast.\n\n\nTooltips\nAndrew\nVite Virtual ModulesSWCJustin\nhttps://github.com/yjs/yjshttps://github.com/jdoleary/WebsocketPieJuri\nNx Consolehttps://obsidian.md/LunarVim",
    genres: [
      {
        name: "Technology",
        id: "1318"
      }
    ],
    episodeGuid: "Buzzsprout-10525607"
  },
  {
    previewUrl: "https://www.buzzsprout.com/1772992/10443036-steve-sewell-builder-io-partytown-qwik-mitosis.mp3",
    artworkUrl160: "https://is5-ssl.mzstatic.com/image/thumb/Podcasts115/v4/74/4a/3a/744a3a10-0b6d-8c7d-98a1-6c05e0fbedf7/mza_7762033313959794772.jpg/160x160bb.jpg",
    episodeFileExtension: "mp3",
    episodeContentType: "audio",
    episodeUrl: "https://www.buzzsprout.com/1772992/10443036-steve-sewell-builder-io-partytown-qwik-mitosis.mp3",
    artworkUrl600: "https://is5-ssl.mzstatic.com/image/thumb/Podcasts115/v4/74/4a/3a/744a3a10-0b6d-8c7d-98a1-6c05e0fbedf7/mza_7762033313959794772.jpg/600x600bb.jpg",
    collectionViewUrl: "https://itunes.apple.com/us/podcast/devtools-fm/id1566647758?mt=2&uo=4",
    trackViewUrl: "https://podcasts.apple.com/us/podcast/steve-sewell-builder-io-partytown-qwik-mitosis/id1566647758?i=1000557673317&uo=4",
    trackTimeMillis: 3977e3,
    contentAdvisoryRating: "Clean",
    artworkUrl60: "https://is5-ssl.mzstatic.com/image/thumb/Podcasts115/v4/74/4a/3a/744a3a10-0b6d-8c7d-98a1-6c05e0fbedf7/mza_7762033313959794772.jpg/60x60bb.jpg",
    releaseDate: "2022-04-15T04:00:00Z",
    trackId: 1000557673317,
    trackName: "Steve Sewell - Builder.io, partytown, Qwik, mitosis",
    shortDescription: "",
    closedCaptioning: "none",
    collectionId: 1566647758,
    collectionName: "devtools.fm",
    feedUrl: "https://feeds.buzzsprout.com/1772992.rss",
    artistIds: [],
    country: "USA",
    kind: "podcast-episode",
    wrapperType: "podcastEpisode",
    description: "This week we have an exciting episode that peers into the future of the web.\nSteve Sewell is the CEO of Builder.io, a company that aims to be the Photoshop of building websites. They've built some clever tools come together to render pages insanely fast. join use for this fascinating conversation.\n\n\nBuilder.iomitosisqwikpartytown\nTooltips\nAndrew\nhttps://peeky.devhttps://corset.devJustin\nhttps://www.lovehulten.com/https://blockprotocol.org/https://github.com/lirantal/lockfile-lintSteve\nhttps://www.builder.io/c/performance-insights",
    genres: [
      {
        name: "Technology",
        id: "1318"
      }
    ],
    episodeGuid: "Buzzsprout-10443036"
  },
  {
    previewUrl: "https://www.buzzsprout.com/1772992/10358569-retrospective-year-in-review.mp3",
    artworkUrl160: "https://is5-ssl.mzstatic.com/image/thumb/Podcasts115/v4/74/4a/3a/744a3a10-0b6d-8c7d-98a1-6c05e0fbedf7/mza_7762033313959794772.jpg/160x160bb.jpg",
    episodeFileExtension: "mp3",
    episodeContentType: "audio",
    episodeUrl: "https://www.buzzsprout.com/1772992/10358569-retrospective-year-in-review.mp3",
    artworkUrl600: "https://is5-ssl.mzstatic.com/image/thumb/Podcasts115/v4/74/4a/3a/744a3a10-0b6d-8c7d-98a1-6c05e0fbedf7/mza_7762033313959794772.jpg/600x600bb.jpg",
    collectionViewUrl: "https://itunes.apple.com/us/podcast/devtools-fm/id1566647758?mt=2&uo=4",
    trackViewUrl: "https://podcasts.apple.com/us/podcast/retrospective-year-in-review/id1566647758?i=1000555912916&uo=4",
    trackTimeMillis: 2661e3,
    contentAdvisoryRating: "Clean",
    artworkUrl60: "https://is5-ssl.mzstatic.com/image/thumb/Podcasts115/v4/74/4a/3a/744a3a10-0b6d-8c7d-98a1-6c05e0fbedf7/mza_7762033313959794772.jpg/60x60bb.jpg",
    releaseDate: "2022-04-01T05:00:00Z",
    trackId: 1000555912916,
    trackName: "Retrospective - Year in Review",
    shortDescription: "",
    closedCaptioning: "none",
    collectionId: 1566647758,
    collectionName: "devtools.fm",
    feedUrl: "https://feeds.buzzsprout.com/1772992.rss",
    artistIds: [],
    country: "USA",
    kind: "podcast-episode",
    wrapperType: "podcastEpisode",
    description: "Join us this week on a special episode where we're the guests! We look back on where it all started, what we've learned since, and where we're going.\n\n\nDescriptOxidedevtools-ds",
    genres: [
      {
        name: "Technology",
        id: "1318"
      }
    ],
    episodeGuid: "Buzzsprout-10358569"
  },
  {
    previewUrl: "https://www.buzzsprout.com/1772992/10272182-brian-leroux-arc-codes-begin-com.mp3",
    artworkUrl160: "https://is5-ssl.mzstatic.com/image/thumb/Podcasts115/v4/74/4a/3a/744a3a10-0b6d-8c7d-98a1-6c05e0fbedf7/mza_7762033313959794772.jpg/160x160bb.jpg",
    episodeFileExtension: "mp3",
    episodeContentType: "audio",
    episodeUrl: "https://www.buzzsprout.com/1772992/10272182-brian-leroux-arc-codes-begin-com.mp3",
    artworkUrl600: "https://is5-ssl.mzstatic.com/image/thumb/Podcasts115/v4/74/4a/3a/744a3a10-0b6d-8c7d-98a1-6c05e0fbedf7/mza_7762033313959794772.jpg/600x600bb.jpg",
    collectionViewUrl: "https://itunes.apple.com/us/podcast/devtools-fm/id1566647758?mt=2&uo=4",
    trackViewUrl: "https://podcasts.apple.com/us/podcast/brian-leroux-arc-codes-begin-com/id1566647758?i=1000554446793&uo=4",
    trackTimeMillis: 3454e3,
    contentAdvisoryRating: "Clean",
    artworkUrl60: "https://is5-ssl.mzstatic.com/image/thumb/Podcasts115/v4/74/4a/3a/744a3a10-0b6d-8c7d-98a1-6c05e0fbedf7/mza_7762033313959794772.jpg/60x60bb.jpg",
    releaseDate: "2022-03-18T05:00:00Z",
    trackId: 1000554446793,
    trackName: "Brian LeRoux - arc.codes, begin.com",
    shortDescription: "",
    closedCaptioning: "none",
    collectionId: 1566647758,
    collectionName: "devtools.fm",
    feedUrl: "https://feeds.buzzsprout.com/1772992.rss",
    artistIds: [],
    country: "USA",
    kind: "podcast-episode",
    wrapperType: "podcastEpisode",
    description: "Join us this week as we talk to our guest Brian LeRoux about functional web apps. Brian is the creator of Architect (https://arc.codes), a framework for building serverless apps on aws. He's also the founder of Begin.com, a service build on top of Architect to easily ship serverless apps.\n\n\nhttps://begin.comhttps://arc.codes\nAndrew\nhttps://lyts.christiankaindl.comJustin\nhttps://build.typogram.co/p/the-taste-skill-gapBrian\nBreville Bambion Expresso Maker",
    genres: [
      {
        name: "Technology",
        id: "1318"
      }
    ],
    episodeGuid: "Buzzsprout-10272182"
  },
  {
    previewUrl: "https://www.buzzsprout.com/1772992/10186224-anthony-fu-vue-vite-vitest-unocss.mp3",
    artworkUrl160: "https://is5-ssl.mzstatic.com/image/thumb/Podcasts115/v4/74/4a/3a/744a3a10-0b6d-8c7d-98a1-6c05e0fbedf7/mza_7762033313959794772.jpg/160x160bb.jpg",
    episodeFileExtension: "mp3",
    episodeContentType: "audio",
    episodeUrl: "https://www.buzzsprout.com/1772992/10186224-anthony-fu-vue-vite-vitest-unocss.mp3",
    artworkUrl600: "https://is5-ssl.mzstatic.com/image/thumb/Podcasts115/v4/74/4a/3a/744a3a10-0b6d-8c7d-98a1-6c05e0fbedf7/mza_7762033313959794772.jpg/600x600bb.jpg",
    collectionViewUrl: "https://itunes.apple.com/us/podcast/devtools-fm/id1566647758?mt=2&uo=4",
    trackViewUrl: "https://podcasts.apple.com/us/podcast/anthony-fu-vue-vite-vitest-unocss/id1566647758?i=1000552893869&uo=4",
    trackTimeMillis: 315e4,
    contentAdvisoryRating: "Clean",
    artworkUrl60: "https://is5-ssl.mzstatic.com/image/thumb/Podcasts115/v4/74/4a/3a/744a3a10-0b6d-8c7d-98a1-6c05e0fbedf7/mza_7762033313959794772.jpg/60x60bb.jpg",
    releaseDate: "2022-03-04T05:00:00Z",
    trackId: 1000552893869,
    trackName: "Anthony Fu - Vue, Vite, Vitest, UnoCSS",
    shortDescription: "",
    closedCaptioning: "none",
    collectionId: 1566647758,
    collectionName: "devtools.fm",
    feedUrl: "https://feeds.buzzsprout.com/1772992.rss",
    artistIds: [],
    country: "USA",
    kind: "podcast-episode",
    wrapperType: "podcastEpisode",
    description: "Join us this week with our guest Anthony Fu.\nAnthony is a voracious open source develop who maintains dozens of packages and works at Nuxt Labs.\nHe is a core member of Vue and Vite and is the creator of Vitest and UnoCSS.\n\n\nhttps://twitter.com/antfu7https://github.com/windicss/windicsshttps://vitejs.dev/https://nuxtjs.org/https://vitest.dev/https://github.com/unocss/unocsshttps://sli.dev/https://antfu.me/posts/reimagine-atomic-css\nTooltips\nAndrew\nRadix PrimitivesasChild propcomposeEventHandlershttps://www.svgator.com/Justin\nFigma Tokens Plugintoken-transformerhttps://github.com/huxingyi/dust3dAnthony\nhttps://github.com/unjs/unbuildhttps://pnpm.io/",
    genres: [
      {
        name: "Technology",
        id: "1318"
      }
    ],
    episodeGuid: "Buzzsprout-10186224"
  },
  {
    previewUrl: "https://www.buzzsprout.com/1772992/10098658-zach-lloyd-michelle-lim-warp-dev.mp3",
    artworkUrl160: "https://is5-ssl.mzstatic.com/image/thumb/Podcasts115/v4/74/4a/3a/744a3a10-0b6d-8c7d-98a1-6c05e0fbedf7/mza_7762033313959794772.jpg/160x160bb.jpg",
    episodeFileExtension: "mp3",
    episodeContentType: "audio",
    episodeUrl: "https://www.buzzsprout.com/1772992/10098658-zach-lloyd-michelle-lim-warp-dev.mp3",
    artworkUrl600: "https://is5-ssl.mzstatic.com/image/thumb/Podcasts115/v4/74/4a/3a/744a3a10-0b6d-8c7d-98a1-6c05e0fbedf7/mza_7762033313959794772.jpg/600x600bb.jpg",
    collectionViewUrl: "https://itunes.apple.com/us/podcast/devtools-fm/id1566647758?mt=2&uo=4",
    trackViewUrl: "https://podcasts.apple.com/us/podcast/zach-lloyd-michelle-lim-warp-dev/id1566647758?i=1000551470506&uo=4",
    trackTimeMillis: 3309e3,
    contentAdvisoryRating: "Clean",
    artworkUrl60: "https://is5-ssl.mzstatic.com/image/thumb/Podcasts115/v4/74/4a/3a/744a3a10-0b6d-8c7d-98a1-6c05e0fbedf7/mza_7762033313959794772.jpg/60x60bb.jpg",
    releaseDate: "2022-02-18T06:00:00Z",
    trackId: 1000551470506,
    trackName: "Zach Lloyd, Michelle Lim -- Warp.dev",
    shortDescription: "",
    closedCaptioning: "none",
    collectionId: 1566647758,
    collectionName: "devtools.fm",
    feedUrl: "https://feeds.buzzsprout.com/1772992.rss",
    artistIds: [],
    country: "USA",
    kind: "podcast-episode",
    wrapperType: "podcastEpisode",
    description: "This episode we're joined by Zach Lloyd and Michelle Lim of Warp.dev. Warp is a modern, rust-based terminal that aims to make developers more efficient by reemerging and enhancing the terminal's UI.\n\nIf you'd like to try Warp you can download it here: https://app.warp.dev/download/r/1DVTFM\n\nAndrew\nhttps://github.com/nadeesha/ts-prunehttps://github.com/junegunn/fzfJustin\nhttps://github.com/bradtraversy/design-resources-for-developershttps://idratherbewriting.com/learnapidoc/ (Tom Johnson)Zach\nhttps://github.com/rust-lang/rustlingshttps://vt100.net/https://vt100.net/emu/dec_ansi_parserMichelle\nhttps://retool.com/https://www.nutribullet.com",
    genres: [
      {
        name: "Technology",
        id: "1318"
      }
    ],
    episodeGuid: "Buzzsprout-10098658"
  },
  {
    previewUrl: "https://www.buzzsprout.com/1772992/10010372-steve-ruiz-tldraw.mp3",
    artworkUrl160: "https://is5-ssl.mzstatic.com/image/thumb/Podcasts115/v4/74/4a/3a/744a3a10-0b6d-8c7d-98a1-6c05e0fbedf7/mza_7762033313959794772.jpg/160x160bb.jpg",
    episodeFileExtension: "mp3",
    episodeContentType: "audio",
    episodeUrl: "https://www.buzzsprout.com/1772992/10010372-steve-ruiz-tldraw.mp3",
    artworkUrl600: "https://is5-ssl.mzstatic.com/image/thumb/Podcasts115/v4/74/4a/3a/744a3a10-0b6d-8c7d-98a1-6c05e0fbedf7/mza_7762033313959794772.jpg/600x600bb.jpg",
    collectionViewUrl: "https://itunes.apple.com/us/podcast/devtools-fm/id1566647758?mt=2&uo=4",
    trackViewUrl: "https://podcasts.apple.com/us/podcast/steve-ruiz-tldraw/id1566647758?i=1000550036054&uo=4",
    trackTimeMillis: 4769e3,
    contentAdvisoryRating: "Clean",
    artworkUrl60: "https://is5-ssl.mzstatic.com/image/thumb/Podcasts115/v4/74/4a/3a/744a3a10-0b6d-8c7d-98a1-6c05e0fbedf7/mza_7762033313959794772.jpg/60x60bb.jpg",
    releaseDate: "2022-02-04T06:00:00Z",
    trackId: 1000550036054,
    trackName: "Steve Ruiz - tldraw",
    shortDescription: "",
    closedCaptioning: "none",
    collectionId: 1566647758,
    collectionName: "devtools.fm",
    feedUrl: "https://feeds.buzzsprout.com/1772992.rss",
    artistIds: [],
    country: "USA",
    kind: "podcast-episode",
    wrapperType: "podcastEpisode",
    description: "This episode we're joined by Steve Ruiz, creator of tldraw.\nSteve is known for his facinating threads on Twitter about his work making open source canvas graphics libaries.\nIn this episode we talk about tldraw, a drawing app with a open source re-usable UI.\n\nhttps://www.tldraw.com\n\nTooltips\nAndrew\nhttps://floating-ui.comhttps://codesandbox.io/post/sandpack-announcementJustin\nhttps://codehike.org/ by Rodrigo Pombohttps://ioun.it/ by Samuel Timb\xF3Steve\nhttps://github.com/steveruizok/telestratorhttps://getkap.cohttps://topnotch.app",
    genres: [
      {
        name: "Technology",
        id: "1318"
      }
    ],
    episodeGuid: "Buzzsprout-10010372"
  },
  {
    previewUrl: "https://www.buzzsprout.com/1772992/9911872-yang-zhang-plasmic.mp3",
    artworkUrl160: "https://is5-ssl.mzstatic.com/image/thumb/Podcasts115/v4/74/4a/3a/744a3a10-0b6d-8c7d-98a1-6c05e0fbedf7/mza_7762033313959794772.jpg/160x160bb.jpg",
    episodeFileExtension: "mp3",
    episodeContentType: "audio",
    episodeUrl: "https://www.buzzsprout.com/1772992/9911872-yang-zhang-plasmic.mp3",
    artworkUrl600: "https://is5-ssl.mzstatic.com/image/thumb/Podcasts115/v4/74/4a/3a/744a3a10-0b6d-8c7d-98a1-6c05e0fbedf7/mza_7762033313959794772.jpg/600x600bb.jpg",
    collectionViewUrl: "https://itunes.apple.com/us/podcast/devtools-fm/id1566647758?mt=2&uo=4",
    trackViewUrl: "https://podcasts.apple.com/us/podcast/yang-zhang-plasmic/id1566647758?i=1000548548559&uo=4",
    trackTimeMillis: 3424e3,
    contentAdvisoryRating: "Clean",
    artworkUrl60: "https://is5-ssl.mzstatic.com/image/thumb/Podcasts115/v4/74/4a/3a/744a3a10-0b6d-8c7d-98a1-6c05e0fbedf7/mza_7762033313959794772.jpg/60x60bb.jpg",
    releaseDate: "2022-01-21T05:00:00Z",
    trackId: 1000548548559,
    trackName: "Yang Zhang - Plasmic",
    shortDescription: "",
    closedCaptioning: "none",
    collectionId: 1566647758,
    collectionName: "devtools.fm",
    feedUrl: "https://feeds.buzzsprout.com/1772992.rss",
    artistIds: [],
    country: "USA",
    kind: "podcast-episode",
    wrapperType: "podcastEpisode",
    description: "This weeks guest is Yang Zhang, co-founder of Plasmic. Plasmic aims to bridge the gap between designers and developers in all sort of interesting ways. Import you code directly into their approachable drag and drag editor or even run pages built in plasmic in your app!\n\nhttps://www.plasmic.app\n\nTooltips\nAndrew\nhttps://mantine.devhttps://planetscale.com (https://github.com/vitessio/vitess)Justin\nhttps://blog.warp.dev/how-to-draw-styled-rectangles-using-the-gpu-and-metal/https://regexly.js.org/Yang\nhttps://developer.chrome.com/blog/renderingng/https://browser.engineering/https://github.com/pmndrs/suspend-react",
    genres: [
      {
        name: "Technology",
        id: "1318"
      }
    ],
    episodeGuid: "Buzzsprout-9911872"
  },
  {
    previewUrl: "https://www.buzzsprout.com/1772992/9845502-alex-johansson-trpc-zart.mp3",
    artworkUrl160: "https://is5-ssl.mzstatic.com/image/thumb/Podcasts115/v4/74/4a/3a/744a3a10-0b6d-8c7d-98a1-6c05e0fbedf7/mza_7762033313959794772.jpg/160x160bb.jpg",
    episodeFileExtension: "mp3",
    episodeContentType: "audio",
    episodeUrl: "https://www.buzzsprout.com/1772992/9845502-alex-johansson-trpc-zart.mp3",
    artworkUrl600: "https://is5-ssl.mzstatic.com/image/thumb/Podcasts115/v4/74/4a/3a/744a3a10-0b6d-8c7d-98a1-6c05e0fbedf7/mza_7762033313959794772.jpg/600x600bb.jpg",
    collectionViewUrl: "https://itunes.apple.com/us/podcast/devtools-fm/id1566647758?mt=2&uo=4",
    trackViewUrl: "https://podcasts.apple.com/us/podcast/alex-johansson-trpc-zart/id1566647758?i=1000547174335&uo=4",
    trackTimeMillis: 3454e3,
    contentAdvisoryRating: "Clean",
    artworkUrl60: "https://is5-ssl.mzstatic.com/image/thumb/Podcasts115/v4/74/4a/3a/744a3a10-0b6d-8c7d-98a1-6c05e0fbedf7/mza_7762033313959794772.jpg/60x60bb.jpg",
    releaseDate: "2022-01-07T07:00:00Z",
    trackId: 1000547174335,
    trackName: "Alex Johansson - tRPC, Zart",
    shortDescription: "",
    closedCaptioning: "none",
    collectionId: 1566647758,
    collectionName: "devtools.fm",
    feedUrl: "https://feeds.buzzsprout.com/1772992.rss",
    artistIds: [],
    country: "USA",
    kind: "podcast-episode",
    wrapperType: "podcastEpisode",
    description: "This week's episode features Alex Johansson creator of tRPC. tRPC enables you to create end to end typesafe APIs with ease with no code generation!\n\n\nhttps://katt.dev/https://web.archive.org/web/20061112194431/http://www.ociusservers.com/https://github.com/trpc/trpchttps://blitzjs.com/https://github.com/KATT/zart\nTooltips\nAndrew\nhttps://devblogs.microsoft.com/typescript/announcing-typescript-4-5/ (Awaited type, depend on lib, top level await, new type import syntax)https://next-auth.js.orgJustin\nhttps://github.com/tldraw/tldrawhttps://github.com/cocoss-org/co-shareAlex\nhttps://www.prisma.io",
    genres: [
      {
        name: "Technology",
        id: "1318"
      }
    ],
    episodeGuid: "Buzzsprout-9845502"
  },
  {
    previewUrl: "https://www.buzzsprout.com/1772992/9738331-simon-hofmann-nut-js.mp3",
    artworkUrl160: "https://is5-ssl.mzstatic.com/image/thumb/Podcasts115/v4/74/4a/3a/744a3a10-0b6d-8c7d-98a1-6c05e0fbedf7/mza_7762033313959794772.jpg/160x160bb.jpg",
    episodeFileExtension: "mp3",
    episodeContentType: "audio",
    episodeUrl: "https://www.buzzsprout.com/1772992/9738331-simon-hofmann-nut-js.mp3",
    artworkUrl600: "https://is5-ssl.mzstatic.com/image/thumb/Podcasts115/v4/74/4a/3a/744a3a10-0b6d-8c7d-98a1-6c05e0fbedf7/mza_7762033313959794772.jpg/600x600bb.jpg",
    collectionViewUrl: "https://itunes.apple.com/us/podcast/devtools-fm/id1566647758?mt=2&uo=4",
    trackViewUrl: "https://podcasts.apple.com/us/podcast/simon-hofmann-nut-js/id1566647758?i=1000545246146&uo=4",
    trackTimeMillis: 315e4,
    contentAdvisoryRating: "Clean",
    artworkUrl60: "https://is5-ssl.mzstatic.com/image/thumb/Podcasts115/v4/74/4a/3a/744a3a10-0b6d-8c7d-98a1-6c05e0fbedf7/mza_7762033313959794772.jpg/60x60bb.jpg",
    releaseDate: "2021-12-17T06:00:00Z",
    trackId: 1000545246146,
    trackName: "Simon Hofmann - Nut.js",
    shortDescription: "",
    closedCaptioning: "none",
    collectionId: 1566647758,
    collectionName: "devtools.fm",
    feedUrl: "https://feeds.buzzsprout.com/1772992.rss",
    artistIds: [],
    country: "USA",
    kind: "podcast-episode",
    wrapperType: "podcastEpisode",
    description: "This weeks guest is Simon Hoffman an engineer with passion to Automate All the Things\u2122.\nSimon is pioneering the way in a new desktop automation library called Nut.js, which works on all OSes and has intuitive thoughtful API.\xA0\n\n\nhttps://nutjs.dev/\nTooltips\nAndrew\nhttps://beta.reactjs.orghttps://playwright.devJustin\nhttps://github.com/marcomontalbano/figma-exporthttps://antfu.me/posts/reimagine-atomic-csshttps://github.com/antfu/unocssSimon\nhttps://github.com/tnobody/lerna-audithttps://sli.dev",
    genres: [
      {
        name: "Technology",
        id: "1318"
      }
    ],
    episodeGuid: "Buzzsprout-9738331"
  },
  {
    previewUrl: "https://www.buzzsprout.com/1772992/9655230-michael-jackson-react-router-remix-unpkg.mp3",
    artworkUrl160: "https://is5-ssl.mzstatic.com/image/thumb/Podcasts115/v4/74/4a/3a/744a3a10-0b6d-8c7d-98a1-6c05e0fbedf7/mza_7762033313959794772.jpg/160x160bb.jpg",
    episodeFileExtension: "mp3",
    episodeContentType: "audio",
    episodeUrl: "https://www.buzzsprout.com/1772992/9655230-michael-jackson-react-router-remix-unpkg.mp3",
    artworkUrl600: "https://is5-ssl.mzstatic.com/image/thumb/Podcasts115/v4/74/4a/3a/744a3a10-0b6d-8c7d-98a1-6c05e0fbedf7/mza_7762033313959794772.jpg/600x600bb.jpg",
    collectionViewUrl: "https://itunes.apple.com/us/podcast/devtools-fm/id1566647758?mt=2&uo=4",
    trackViewUrl: "https://podcasts.apple.com/us/podcast/michael-jackson-react-router-remix-unpkg/id1566647758?i=1000543823918&uo=4",
    trackTimeMillis: 4105e3,
    contentAdvisoryRating: "Clean",
    artworkUrl60: "https://is5-ssl.mzstatic.com/image/thumb/Podcasts115/v4/74/4a/3a/744a3a10-0b6d-8c7d-98a1-6c05e0fbedf7/mza_7762033313959794772.jpg/60x60bb.jpg",
    releaseDate: "2021-12-03T06:00:00Z",
    trackId: 1000543823918,
    trackName: "Michael Jackson - react-router, Remix, unpkg",
    shortDescription: "",
    closedCaptioning: "none",
    collectionId: 1566647758,
    collectionName: "devtools.fm",
    feedUrl: "https://feeds.buzzsprout.com/1772992.rss",
    artistIds: [],
    country: "USA",
    kind: "podcast-episode",
    wrapperType: "podcastEpisode",
    description: "Joining us this week is Michael Jackson, creator of unpkg, a CDN for all things NPM, as well as co-creator of react router, and co-founder of react training.\nHe has now created, alongside his long time cohort Ryan Florence, Remix a a full stack react framework built on modern web standards.\nhttps://remix.run/https://reactrouter.com/https://unpkg.com/https://remix.run/docs/en/v1/guides/philosophy\nTooltips\nAndrew\nhttps://spline.designhttps://github.com/snowpackjs/astro/tree/main/examplesJustin\nhttps://github.com/Valerioageno/ssr-rshttps://github.com/plopjs/plopMichael\nhttps://fly.io",
    genres: [
      {
        name: "Technology",
        id: "1318"
      }
    ],
    episodeGuid: "Buzzsprout-9655230"
  },
  {
    previewUrl: "https://www.buzzsprout.com/1772992/9576404-dr-chris-weichel-gitpod.mp3",
    artworkUrl160: "https://is5-ssl.mzstatic.com/image/thumb/Podcasts115/v4/74/4a/3a/744a3a10-0b6d-8c7d-98a1-6c05e0fbedf7/mza_7762033313959794772.jpg/160x160bb.jpg",
    episodeFileExtension: "mp3",
    episodeContentType: "audio",
    episodeUrl: "https://www.buzzsprout.com/1772992/9576404-dr-chris-weichel-gitpod.mp3",
    artworkUrl600: "https://is5-ssl.mzstatic.com/image/thumb/Podcasts115/v4/74/4a/3a/744a3a10-0b6d-8c7d-98a1-6c05e0fbedf7/mza_7762033313959794772.jpg/600x600bb.jpg",
    collectionViewUrl: "https://itunes.apple.com/us/podcast/devtools-fm/id1566647758?mt=2&uo=4",
    trackViewUrl: "https://podcasts.apple.com/us/podcast/dr-chris-weichel-gitpod/id1566647758?i=1000542440422&uo=4",
    trackTimeMillis: 3147e3,
    contentAdvisoryRating: "Clean",
    artworkUrl60: "https://is5-ssl.mzstatic.com/image/thumb/Podcasts115/v4/74/4a/3a/744a3a10-0b6d-8c7d-98a1-6c05e0fbedf7/mza_7762033313959794772.jpg/60x60bb.jpg",
    releaseDate: "2021-11-19T08:00:00Z",
    trackId: 1000542440422,
    trackName: "Dr. Chris Weichel - GitPod",
    shortDescription: "",
    closedCaptioning: "none",
    collectionId: 1566647758,
    collectionName: "devtools.fm",
    feedUrl: "https://feeds.buzzsprout.com/1772992.rss",
    artistIds: [],
    country: "USA",
    kind: "podcast-episode",
    wrapperType: "podcastEpisode",
    description: "This week's guest is Dr. Chris Weichel, CTO of GitPod. GitPod is an all-in-one online development environment with a complete version of VSCode in the browser.\nWe also spend some time talking about Chris' Human-Computer interaction research.\nhttps://www.gitpod.io/https://www.gitpod.io/blog/openvscode-server-launchhttps://github.com/gitpod-io/openvscode-server/https://open-vsx.org/https://github.com/features/codespaceshttps://csweichel.de/papers/2015-spata.pdfhttps://csweichel.de/papers/2015-reform.pdfhttp://scihi.org/mark-weiser-ubiquituous-computing/https://simonhearne.com/2020/network-faster-than-cache/\nTooltips\nAndrew\nhttps://www.npmjs.com/package/webpack-bundle-analyzerhttp://webpack.github.io/analyse/#Justin\nhttps://github.com/prisma-labs/konnhttps://github.com/Owez/argiChris\nJumpcutHarvester",
    genres: [
      {
        name: "Technology",
        id: "1318"
      }
    ],
    episodeGuid: "Buzzsprout-9576404"
  },
  {
    previewUrl: "https://www.buzzsprout.com/1772992/9496039-pedro-duarte-modulz-radix-stitches.mp3",
    artworkUrl160: "https://is5-ssl.mzstatic.com/image/thumb/Podcasts115/v4/74/4a/3a/744a3a10-0b6d-8c7d-98a1-6c05e0fbedf7/mza_7762033313959794772.jpg/160x160bb.jpg",
    episodeFileExtension: "mp3",
    episodeContentType: "audio",
    episodeUrl: "https://www.buzzsprout.com/1772992/9496039-pedro-duarte-modulz-radix-stitches.mp3",
    artworkUrl600: "https://is5-ssl.mzstatic.com/image/thumb/Podcasts115/v4/74/4a/3a/744a3a10-0b6d-8c7d-98a1-6c05e0fbedf7/mza_7762033313959794772.jpg/600x600bb.jpg",
    collectionViewUrl: "https://itunes.apple.com/us/podcast/devtools-fm/id1566647758?mt=2&uo=4",
    trackViewUrl: "https://podcasts.apple.com/us/podcast/pedro-duarte-modulz-radix-stitches/id1566647758?i=1000540849379&uo=4",
    trackTimeMillis: 4585e3,
    contentAdvisoryRating: "Clean",
    artworkUrl60: "https://is5-ssl.mzstatic.com/image/thumb/Podcasts115/v4/74/4a/3a/744a3a10-0b6d-8c7d-98a1-6c05e0fbedf7/mza_7762033313959794772.jpg/60x60bb.jpg",
    releaseDate: "2021-11-05T06:00:00Z",
    trackId: 1000540849379,
    trackName: "Pedro Duarte - Modulz, Radix, Stitches",
    shortDescription: "",
    closedCaptioning: "none",
    collectionId: 1566647758,
    collectionName: "devtools.fm",
    feedUrl: "https://feeds.buzzsprout.com/1772992.rss",
    artistIds: [],
    country: "USA",
    kind: "podcast-episode",
    wrapperType: "podcastEpisode",
    description: "This week's guest is Pedro Duarte, a developer experience engineer working at Modulz helping maintain the open source libraries (Radix and Stitches) that power the product.\nhttps://www.modulz.app/https://stitches.dev/https://www.radix-ui.com/\nTooltips\nAndrew\nhttps://twitter.com/orta/status/1432044027474583552/photo/1Justin\nhttps://github.com/BuilderIO/partytownhttps://github.com/meilisearch/MeiliSearchhttps://github.com/eps1lon/screen-reader-testing-libraryPedro\nhttps://www.raycast.com/https://www.are.na/",
    genres: [
      {
        name: "Technology",
        id: "1318"
      }
    ],
    episodeGuid: "Buzzsprout-9496039"
  },
  {
    previewUrl: "https://www.buzzsprout.com/1772992/9413188-kilian-valkhof-polypane-electron-superposition.mp3",
    artworkUrl160: "https://is5-ssl.mzstatic.com/image/thumb/Podcasts115/v4/74/4a/3a/744a3a10-0b6d-8c7d-98a1-6c05e0fbedf7/mza_7762033313959794772.jpg/160x160bb.jpg",
    episodeFileExtension: "mp3",
    episodeContentType: "audio",
    episodeUrl: "https://www.buzzsprout.com/1772992/9413188-kilian-valkhof-polypane-electron-superposition.mp3",
    artworkUrl600: "https://is5-ssl.mzstatic.com/image/thumb/Podcasts115/v4/74/4a/3a/744a3a10-0b6d-8c7d-98a1-6c05e0fbedf7/mza_7762033313959794772.jpg/600x600bb.jpg",
    collectionViewUrl: "https://itunes.apple.com/us/podcast/devtools-fm/id1566647758?mt=2&uo=4",
    trackViewUrl: "https://podcasts.apple.com/us/podcast/kilian-valkhof-polypane-electron-superposition/id1566647758?i=1000539363270&uo=4",
    trackTimeMillis: 3436e3,
    contentAdvisoryRating: "Clean",
    artworkUrl60: "https://is5-ssl.mzstatic.com/image/thumb/Podcasts115/v4/74/4a/3a/744a3a10-0b6d-8c7d-98a1-6c05e0fbedf7/mza_7762033313959794772.jpg/60x60bb.jpg",
    releaseDate: "2021-10-22T05:00:00Z",
    trackId: 1000539363270,
    trackName: "Kilian Valkhof - Polypane, Electron, Superposition",
    shortDescription: "",
    closedCaptioning: "none",
    collectionId: 1566647758,
    collectionName: "devtools.fm",
    feedUrl: "https://feeds.buzzsprout.com/1772992.rss",
    artistIds: [],
    country: "USA",
    kind: "podcast-episode",
    wrapperType: "podcastEpisode",
    description: "Join as as we chat with Kilian Valkhof, an indie developer with a passion for building developer focused tooling. On this episode we discuss his product Polypane, a browser built for web developers.\xA0\n\n\nhttps://polypane.app/https://www.electronjs.org/https://github.com/browserslist/browserslisthttps://superposition.design/https://cssstats.com/\nTooltips\nAndrew\nhttps://www.webpagetest.orghttps://www.openpalette.ioJustin\nhttps://seed-rs.org/https://github.com/tauri-apps/tauriKilian\nhttps://meetfranz.com/https://getferdi.com/https://www.npmjs.com/package/colord",
    genres: [
      {
        name: "Technology",
        id: "1318"
      }
    ],
    episodeGuid: "Buzzsprout-9413188"
  },
  {
    previewUrl: "https://www.buzzsprout.com/1772992/9332912-rich-harris-svelte-rollup.mp3",
    artworkUrl160: "https://is5-ssl.mzstatic.com/image/thumb/Podcasts115/v4/74/4a/3a/744a3a10-0b6d-8c7d-98a1-6c05e0fbedf7/mza_7762033313959794772.jpg/160x160bb.jpg",
    episodeFileExtension: "mp3",
    episodeContentType: "audio",
    episodeUrl: "https://www.buzzsprout.com/1772992/9332912-rich-harris-svelte-rollup.mp3",
    artworkUrl600: "https://is5-ssl.mzstatic.com/image/thumb/Podcasts115/v4/74/4a/3a/744a3a10-0b6d-8c7d-98a1-6c05e0fbedf7/mza_7762033313959794772.jpg/600x600bb.jpg",
    collectionViewUrl: "https://itunes.apple.com/us/podcast/devtools-fm/id1566647758?mt=2&uo=4",
    trackViewUrl: "https://podcasts.apple.com/us/podcast/rich-harris-svelte-rollup/id1566647758?i=1000537945130&uo=4",
    trackTimeMillis: 2848e3,
    contentAdvisoryRating: "Clean",
    artworkUrl60: "https://is5-ssl.mzstatic.com/image/thumb/Podcasts115/v4/74/4a/3a/744a3a10-0b6d-8c7d-98a1-6c05e0fbedf7/mza_7762033313959794772.jpg/60x60bb.jpg",
    releaseDate: "2021-10-08T06:00:00Z",
    trackId: 1000537945130,
    trackName: "Rich Harris - Svelte, Rollup",
    shortDescription: "",
    closedCaptioning: "none",
    collectionId: 1566647758,
    collectionName: "devtools.fm",
    feedUrl: "https://feeds.buzzsprout.com/1772992.rss",
    artistIds: [],
    country: "USA",
    kind: "podcast-episode",
    wrapperType: "podcastEpisode",
    description: "Join as we talk with Rich Harris, creator of Rollup, Svelte, degit and more. Rich works at the New York Time developing engaging data visualizations and building the tools of tomorrow.\nhttps://twitter.com/Rich_Harrishttps://github.com/rollup/rolluphttps://github.com/sveltejs/sveltehttps://github.com/sveltejs/kit\nTooltips\nAndrew\nhttps://www.npmjs.com/package/react-json-reconcilerhttps://popper.js.orgJustin\nhttps://github.com/jaredpalmer/mutikhttps://github.com/napi-rs/napi-rs/pull/696Rich\nhttps://workflowy.com/Pasta maker",
    genres: [
      {
        name: "Technology",
        id: "1318"
      }
    ],
    episodeGuid: "Buzzsprout-9332912"
  },
  {
    previewUrl: "https://www.buzzsprout.com/1772992/9251750-fred-k-schott-snowpack-astro.mp3",
    artworkUrl160: "https://is5-ssl.mzstatic.com/image/thumb/Podcasts115/v4/74/4a/3a/744a3a10-0b6d-8c7d-98a1-6c05e0fbedf7/mza_7762033313959794772.jpg/160x160bb.jpg",
    episodeFileExtension: "mp3",
    episodeContentType: "audio",
    episodeUrl: "https://www.buzzsprout.com/1772992/9251750-fred-k-schott-snowpack-astro.mp3",
    artworkUrl600: "https://is5-ssl.mzstatic.com/image/thumb/Podcasts115/v4/74/4a/3a/744a3a10-0b6d-8c7d-98a1-6c05e0fbedf7/mza_7762033313959794772.jpg/600x600bb.jpg",
    collectionViewUrl: "https://itunes.apple.com/us/podcast/devtools-fm/id1566647758?mt=2&uo=4",
    trackViewUrl: "https://podcasts.apple.com/us/podcast/fred-k-schott-snowpack-astro/id1566647758?i=1000536470748&uo=4",
    trackTimeMillis: 3442e3,
    contentAdvisoryRating: "Clean",
    artworkUrl60: "https://is5-ssl.mzstatic.com/image/thumb/Podcasts115/v4/74/4a/3a/744a3a10-0b6d-8c7d-98a1-6c05e0fbedf7/mza_7762033313959794772.jpg/60x60bb.jpg",
    releaseDate: "2021-09-24T05:00:00Z",
    trackId: 1000536470748,
    trackName: "Fred K. Schott - Snowpack, Astro",
    shortDescription: "",
    closedCaptioning: "none",
    collectionId: 1566647758,
    collectionName: "devtools.fm",
    feedUrl: "https://feeds.buzzsprout.com/1772992.rss",
    artistIds: [],
    country: "USA",
    kind: "podcast-episode",
    wrapperType: "podcastEpisode",
    description: "Blast off into the future of webdev with Fred K. Schott, creator of snowpack, skypack, and Astro.\nPolymerSnowpackSkypackAstroIslands ArchitectureMarko.js11ty\nTooltips\nAndrew\nCosmic Rays cause bugshttps://render.comJustin\nhttps://github.com/msokalski/asciiidhttps://learn.adafruit.com/cnc-milling-keycapsFred\nhttps://shikijs.github.io/https://shikijs.github.io/twoslash/",
    genres: [
      {
        name: "Technology",
        id: "1318"
      }
    ],
    episodeGuid: "Buzzsprout-9251750"
  },
  {
    previewUrl: "https://www.buzzsprout.com/1772992/9170671-shawn-wang-temporal.mp3",
    artworkUrl160: "https://is5-ssl.mzstatic.com/image/thumb/Podcasts115/v4/74/4a/3a/744a3a10-0b6d-8c7d-98a1-6c05e0fbedf7/mza_7762033313959794772.jpg/160x160bb.jpg",
    episodeFileExtension: "mp3",
    episodeContentType: "audio",
    episodeUrl: "https://www.buzzsprout.com/1772992/9170671-shawn-wang-temporal.mp3",
    artworkUrl600: "https://is5-ssl.mzstatic.com/image/thumb/Podcasts115/v4/74/4a/3a/744a3a10-0b6d-8c7d-98a1-6c05e0fbedf7/mza_7762033313959794772.jpg/600x600bb.jpg",
    collectionViewUrl: "https://itunes.apple.com/us/podcast/devtools-fm/id1566647758?mt=2&uo=4",
    trackViewUrl: "https://podcasts.apple.com/us/podcast/shawn-wang-temporal/id1566647758?i=1000534887279&uo=4",
    trackTimeMillis: 337e4,
    contentAdvisoryRating: "Clean",
    artworkUrl60: "https://is5-ssl.mzstatic.com/image/thumb/Podcasts115/v4/74/4a/3a/744a3a10-0b6d-8c7d-98a1-6c05e0fbedf7/mza_7762033313959794772.jpg/60x60bb.jpg",
    releaseDate: "2021-09-10T06:00:00Z",
    trackId: 1000534887279,
    trackName: "Shawn Wang - Temporal",
    shortDescription: "",
    closedCaptioning: "none",
    collectionId: 1566647758,
    collectionName: "devtools.fm",
    feedUrl: "https://feeds.buzzsprout.com/1772992.rss",
    artistIds: [],
    country: "USA",
    kind: "podcast-episode",
    wrapperType: "podcastEpisode",
    description: "Join us as we chat with Shawn Wang who's Head of Developer Experience at Temporal and a staunch advocate of learning in public.\nhttps://temporal.io/https://vuejs.nychttps://aws.amazon.com/amplify/https://www.netlify.com/https://sidekiq.org/https://bazel.build/https://www.swyx.io/learn-in-public/\nTooltips\nAndrew\nhttps://www.prisma.ioesbuildJustin\nhttps://github.com/unjs/unpluginhttps://khalilstemmler.com/articles/client-side-architecture/introduction/Shawn\nhttps://akiflow.com/https://supabase.io",
    genres: [
      {
        name: "Technology",
        id: "1318"
      }
    ],
    episodeGuid: "Buzzsprout-9170671"
  },
  {
    previewUrl: "https://www.buzzsprout.com/1772992/9095477-evan-you-vue-vite.mp3",
    artworkUrl160: "https://is5-ssl.mzstatic.com/image/thumb/Podcasts115/v4/74/4a/3a/744a3a10-0b6d-8c7d-98a1-6c05e0fbedf7/mza_7762033313959794772.jpg/160x160bb.jpg",
    episodeFileExtension: "mp3",
    episodeContentType: "audio",
    episodeUrl: "https://www.buzzsprout.com/1772992/9095477-evan-you-vue-vite.mp3",
    artworkUrl600: "https://is5-ssl.mzstatic.com/image/thumb/Podcasts115/v4/74/4a/3a/744a3a10-0b6d-8c7d-98a1-6c05e0fbedf7/mza_7762033313959794772.jpg/600x600bb.jpg",
    collectionViewUrl: "https://itunes.apple.com/us/podcast/devtools-fm/id1566647758?mt=2&uo=4",
    trackViewUrl: "https://podcasts.apple.com/us/podcast/evan-you-vue-vite/id1566647758?i=1000533281327&uo=4",
    trackTimeMillis: 281e4,
    contentAdvisoryRating: "Clean",
    artworkUrl60: "https://is5-ssl.mzstatic.com/image/thumb/Podcasts115/v4/74/4a/3a/744a3a10-0b6d-8c7d-98a1-6c05e0fbedf7/mza_7762033313959794772.jpg/60x60bb.jpg",
    releaseDate: "2021-08-27T07:00:00Z",
    trackId: 1000533281327,
    trackName: "Evan You - Vue, Vite",
    shortDescription: "",
    closedCaptioning: "none",
    collectionId: 1566647758,
    collectionName: "devtools.fm",
    feedUrl: "https://feeds.buzzsprout.com/1772992.rss",
    artistIds: [],
    country: "USA",
    kind: "podcast-episode",
    wrapperType: "podcastEpisode",
    description: "Join us as we talk to Evan You, creator of Vue.js, Vite, VitePress, and a host of other tools.\n\n\nhttps://vuejs.org/https://vitejs.dev/https://vitepress.vuejs.org/https://www.meteor.com/https://v3.vuejs.org/api/composition-api.htmlhttps://github.com/vuejs/rfcs/pull/78https://vueuse.org/https://vue-loader.vuejs.org/https://astro.build/\nTooltips\nAndrew\nhttps://linear.apphttps://www.npmjs.com/package/yarn-deduplicateJustin\nhttps://imba.io/https://jlongster.com/future-sql-webEvan\nhttps://vitepress.vuejs.org/https://volta.net/",
    genres: [
      {
        name: "Technology",
        id: "1318"
      }
    ],
    episodeGuid: "Buzzsprout-9095477"
  },
  {
    previewUrl: "https://www.buzzsprout.com/1772992/9022902-kendall-gassner-a11y-design-systems.mp3",
    artworkUrl160: "https://is5-ssl.mzstatic.com/image/thumb/Podcasts115/v4/74/4a/3a/744a3a10-0b6d-8c7d-98a1-6c05e0fbedf7/mza_7762033313959794772.jpg/160x160bb.jpg",
    episodeFileExtension: "mp3",
    episodeContentType: "audio",
    episodeUrl: "https://www.buzzsprout.com/1772992/9022902-kendall-gassner-a11y-design-systems.mp3",
    artworkUrl600: "https://is5-ssl.mzstatic.com/image/thumb/Podcasts115/v4/74/4a/3a/744a3a10-0b6d-8c7d-98a1-6c05e0fbedf7/mza_7762033313959794772.jpg/600x600bb.jpg",
    collectionViewUrl: "https://itunes.apple.com/us/podcast/devtools-fm/id1566647758?mt=2&uo=4",
    trackViewUrl: "https://podcasts.apple.com/us/podcast/kendall-gassner-a11y-design-systems/id1566647758?i=1000531909227&uo=4",
    trackTimeMillis: 303e4,
    contentAdvisoryRating: "Clean",
    artworkUrl60: "https://is5-ssl.mzstatic.com/image/thumb/Podcasts115/v4/74/4a/3a/744a3a10-0b6d-8c7d-98a1-6c05e0fbedf7/mza_7762033313959794772.jpg/60x60bb.jpg",
    releaseDate: "2021-08-13T10:00:00Z",
    trackId: 1000531909227,
    trackName: "Kendall Gassner - A11y, Design Systems",
    shortDescription: "",
    closedCaptioning: "none",
    collectionId: 1566647758,
    collectionName: "devtools.fm",
    feedUrl: "https://feeds.buzzsprout.com/1772992.rss",
    artistIds: [],
    country: "USA",
    kind: "podcast-episode",
    wrapperType: "podcastEpisode",
    description: "Join us for a lighthearted chat with Kendall Gassner a seasoned design systems engineer with an expertise in accessibility.\nhttps://github.com/intuit/eslint-plugin-no-explicit-type-exportshttps://github.com/intuit/accessibility-snippetshttps://github.com/nvaccess/nvda/https://www.freedomscientific.com/products/software/jaws/https://www.accessibilityassociation.org/s/certificationhttps://www.last-child.com/intuits-accessibility-champion-program/https://react-spectrum.adobe.com/blog/building-a-combobox.html\nTooltips\nAndrew\nhttps://flightcontrol.devhttps://sindresorhus.com/lungoJustin\nhttps://daisyui.com/https://www.medlycomponents.comKendall\nuseKeyboard from https://github.com/intuit/design-systems-cli/tree/master/packages/hookshttps://github.com/reach/reach-ui",
    genres: [
      {
        name: "Technology",
        id: "1318"
      }
    ],
    episodeGuid: "Buzzsprout-9022902"
  },
  {
    previewUrl: "https://www.buzzsprout.com/1772992/8945902-robert-long-vr-ar-open-metaverse.mp3",
    artworkUrl160: "https://is5-ssl.mzstatic.com/image/thumb/Podcasts115/v4/74/4a/3a/744a3a10-0b6d-8c7d-98a1-6c05e0fbedf7/mza_7762033313959794772.jpg/160x160bb.jpg",
    episodeFileExtension: "mp3",
    episodeContentType: "audio",
    episodeUrl: "https://www.buzzsprout.com/1772992/8945902-robert-long-vr-ar-open-metaverse.mp3",
    artworkUrl600: "https://is5-ssl.mzstatic.com/image/thumb/Podcasts115/v4/74/4a/3a/744a3a10-0b6d-8c7d-98a1-6c05e0fbedf7/mza_7762033313959794772.jpg/600x600bb.jpg",
    collectionViewUrl: "https://itunes.apple.com/us/podcast/devtools-fm/id1566647758?mt=2&uo=4",
    trackViewUrl: "https://podcasts.apple.com/us/podcast/robert-long-vr-ar-open-metaverse/id1566647758?i=1000530487028&uo=4",
    trackTimeMillis: 3519e3,
    contentAdvisoryRating: "Clean",
    artworkUrl60: "https://is5-ssl.mzstatic.com/image/thumb/Podcasts115/v4/74/4a/3a/744a3a10-0b6d-8c7d-98a1-6c05e0fbedf7/mza_7762033313959794772.jpg/60x60bb.jpg",
    releaseDate: "2021-07-30T07:00:00Z",
    trackId: 1000530487028,
    trackName: "Robert Long - VR/AR Open Metaverse",
    shortDescription: "",
    closedCaptioning: "none",
    collectionId: 1566647758,
    collectionName: "devtools.fm",
    feedUrl: "https://feeds.buzzsprout.com/1772992.rss",
    artistIds: [],
    country: "USA",
    kind: "podcast-episode",
    wrapperType: "podcastEpisode",
    description: "Join as a we talk with Robert Long (AltSpace, Mozilla) to talk about all things open metaverse!\xA0\n\n\nhttps://www.youtube.com/watch?v=UIwdCN4dV6whttps://altvr.com/https://hubs.mozilla.com/https://www.babylonjs.com/https://threejs.org/https://sketchfab.com/https://en.wikipedia.org/wiki/GlTFhttps://modelviewer.dev/https://www.blender.org/https://github.com/mozilla/Spoke\nTooltips\nAndrew\ngitup.coJustin\nhttps://egamebook.comhttps://github.com/mrbbot/miniflareRobert\nhttps://vitejs.devhttps://github.com/NateTheGreatt/bitecs",
    genres: [
      {
        name: "Technology",
        id: "1318"
      }
    ],
    episodeGuid: "Buzzsprout-8945902"
  },
  {
    previewUrl: "https://www.buzzsprout.com/1772992/8871304-jason-laster-replay-io.mp3",
    artworkUrl160: "https://is5-ssl.mzstatic.com/image/thumb/Podcasts115/v4/74/4a/3a/744a3a10-0b6d-8c7d-98a1-6c05e0fbedf7/mza_7762033313959794772.jpg/160x160bb.jpg",
    episodeFileExtension: "mp3",
    episodeContentType: "audio",
    episodeUrl: "https://www.buzzsprout.com/1772992/8871304-jason-laster-replay-io.mp3",
    artworkUrl600: "https://is5-ssl.mzstatic.com/image/thumb/Podcasts115/v4/74/4a/3a/744a3a10-0b6d-8c7d-98a1-6c05e0fbedf7/mza_7762033313959794772.jpg/600x600bb.jpg",
    collectionViewUrl: "https://itunes.apple.com/us/podcast/devtools-fm/id1566647758?mt=2&uo=4",
    trackViewUrl: "https://podcasts.apple.com/us/podcast/jason-laster-replay-io/id1566647758?i=1000529072617&uo=4",
    trackTimeMillis: 3515e3,
    contentAdvisoryRating: "Clean",
    artworkUrl60: "https://is5-ssl.mzstatic.com/image/thumb/Podcasts115/v4/74/4a/3a/744a3a10-0b6d-8c7d-98a1-6c05e0fbedf7/mza_7762033313959794772.jpg/60x60bb.jpg",
    releaseDate: "2021-07-16T10:00:00Z",
    trackId: 1000529072617,
    trackName: "Jason Laster - replay.io",
    shortDescription: "",
    closedCaptioning: "none",
    collectionId: 1566647758,
    collectionName: "devtools.fm",
    feedUrl: "https://feeds.buzzsprout.com/1772992.rss",
    artistIds: [],
    country: "USA",
    kind: "podcast-episode",
    wrapperType: "podcastEpisode",
    description: "Join us as we talk with the CEO of replay.io a radical new time travel debugger that poised to change how we debug our programs.\n\n\nhttps://replay.io/http://pry.github.io/https://bpython-interpreter.org/https://www.recurse.com/https://cdn.openai.com/dota-2.pdfhttps://www.benzinga.com/news/21/06/21706412/software-company-figma-raises-200m-at-10b-valuation-bloomberghttps://pulse2.com/cypress-io-raises-40-million-in-series-b-funding/\nAndrew\nhttps://www.macbartender.comhttps://www.docker.com/Justin\nhttps://copilot.github.com/https://github.com/Jarred-Sumner/git-peekJason\nhttps://www.tovala.com/ovenhttps://replit.com/",
    genres: [
      {
        name: "Technology",
        id: "1318"
      }
    ],
    episodeGuid: "Buzzsprout-8871304"
  },
  {
    previewUrl: "https://www.buzzsprout.com/1772992/8800239-brendan-falk-matt-schrage-fig.mp3",
    artworkUrl160: "https://is5-ssl.mzstatic.com/image/thumb/Podcasts115/v4/74/4a/3a/744a3a10-0b6d-8c7d-98a1-6c05e0fbedf7/mza_7762033313959794772.jpg/160x160bb.jpg",
    episodeFileExtension: "mp3",
    episodeContentType: "audio",
    episodeUrl: "https://www.buzzsprout.com/1772992/8800239-brendan-falk-matt-schrage-fig.mp3",
    artworkUrl600: "https://is5-ssl.mzstatic.com/image/thumb/Podcasts115/v4/74/4a/3a/744a3a10-0b6d-8c7d-98a1-6c05e0fbedf7/mza_7762033313959794772.jpg/600x600bb.jpg",
    collectionViewUrl: "https://itunes.apple.com/us/podcast/devtools-fm/id1566647758?mt=2&uo=4",
    trackViewUrl: "https://podcasts.apple.com/us/podcast/brendan-falk-matt-schrage-fig/id1566647758?i=1000527612304&uo=4",
    trackTimeMillis: 3173e3,
    contentAdvisoryRating: "Clean",
    artworkUrl60: "https://is5-ssl.mzstatic.com/image/thumb/Podcasts115/v4/74/4a/3a/744a3a10-0b6d-8c7d-98a1-6c05e0fbedf7/mza_7762033313959794772.jpg/60x60bb.jpg",
    releaseDate: "2021-07-02T10:00:00Z",
    trackId: 1000527612304,
    trackName: "Brendan Falk, Matt Schrage - Fig",
    shortDescription: "",
    closedCaptioning: "none",
    collectionId: 1566647758,
    collectionName: "devtools.fm",
    feedUrl: "https://feeds.buzzsprout.com/1772992.rss",
    artistIds: [],
    country: "USA",
    kind: "podcast-episode",
    wrapperType: "podcastEpisode",
    description: "Join as on a chat with the founder's of fig.io. They're trying to bring fresh air to the terminal experience in new and interesting ways.\nhttps://fig.ioFig Hacker News Post: https://news.ycombinator.com/item?id=27277819shell explainer: https://explainshell.com/\nTooltips\nAndrew\nPosticohttps://homebridge.iohttps://level.coJustin\nhttps://github.com/lirantal/nodejs-cli-apps-best-practiceshttps://github.com/thassiov/tuizerhttps://github.com/ploopyco/mini-trackballBrendan\nCLI tools: trash, abbreviationshttps://github.com/sindresorhus/trashMDX: https://mdxjs.com/Matt\nCLI interface guidelines, by Ben Firshman and others: https://clig.dev/Modern Text Based web browser. https://www.brow.sh/Docopt - build CLI tool based off of synopsis. http://docopt.org/Gooey - automatically turn python CLI tools into GUI apps. https://github.com/chriskiehl/Gooey",
    genres: [
      {
        name: "Technology",
        id: "1318"
      }
    ],
    episodeGuid: "Buzzsprout-8800239"
  },
  {
    previewUrl: "https://www.buzzsprout.com/1772992/8725926-paul-shen-natto-dev.mp3",
    artworkUrl160: "https://is5-ssl.mzstatic.com/image/thumb/Podcasts115/v4/74/4a/3a/744a3a10-0b6d-8c7d-98a1-6c05e0fbedf7/mza_7762033313959794772.jpg/160x160bb.jpg",
    episodeFileExtension: "mp3",
    episodeContentType: "audio",
    episodeUrl: "https://www.buzzsprout.com/1772992/8725926-paul-shen-natto-dev.mp3",
    artworkUrl600: "https://is5-ssl.mzstatic.com/image/thumb/Podcasts115/v4/74/4a/3a/744a3a10-0b6d-8c7d-98a1-6c05e0fbedf7/mza_7762033313959794772.jpg/600x600bb.jpg",
    collectionViewUrl: "https://itunes.apple.com/us/podcast/devtools-fm/id1566647758?mt=2&uo=4",
    trackViewUrl: "https://podcasts.apple.com/us/podcast/paul-shen-natto-dev/id1566647758?i=1000526042368&uo=4",
    trackTimeMillis: 2857e3,
    contentAdvisoryRating: "Clean",
    artworkUrl60: "https://is5-ssl.mzstatic.com/image/thumb/Podcasts115/v4/74/4a/3a/744a3a10-0b6d-8c7d-98a1-6c05e0fbedf7/mza_7762033313959794772.jpg/60x60bb.jpg",
    releaseDate: "2021-06-18T17:00:00Z",
    trackId: 1000526042368,
    trackName: "Paul Shen - natto.dev",
    shortDescription: "",
    closedCaptioning: "none",
    collectionId: 1566647758,
    collectionName: "devtools.fm",
    feedUrl: "https://feeds.buzzsprout.com/1772992.rss",
    artistIds: [],
    country: "USA",
    kind: "podcast-episode",
    wrapperType: "podcastEpisode",
    description: "Tune in while we chat with Paul Shen the creator of natto.dev.\n\n\nhttps://drawbattle.iohttps://stedolan.github.io/jq/https://gource.io/https://github.com/efokschaner/terraform-provider-factoriohttps://dion.systems/blog_0001_hms2020.htmlhttps://inliner.iohttps://www.andy.works/words/serious-play\nTooltips\nAndrew\nDigital Gardenhttps://www.hipstersmoothie.com/gardenJustin\nSqlDBM, visual tool for designing dbsBuerli, React CAD in the browserVisual CSS Grid LayoutPaul\nJohn Palmer\u2019s talk on spatial interfacesDavid Cole\u2019s thread on WarioWare DIYFactorioTwemex",
    genres: [
      {
        name: "Technology",
        id: "1318"
      }
    ],
    episodeGuid: "Buzzsprout-8725926"
  },
  {
    previewUrl: "https://www.buzzsprout.com/1772992/8683793-orta-therox-cocoapods-danger-typescript.mp3",
    artworkUrl160: "https://is5-ssl.mzstatic.com/image/thumb/Podcasts115/v4/74/4a/3a/744a3a10-0b6d-8c7d-98a1-6c05e0fbedf7/mza_7762033313959794772.jpg/160x160bb.jpg",
    episodeFileExtension: "mp3",
    episodeContentType: "audio",
    episodeUrl: "https://www.buzzsprout.com/1772992/8683793-orta-therox-cocoapods-danger-typescript.mp3",
    artworkUrl600: "https://is5-ssl.mzstatic.com/image/thumb/Podcasts115/v4/74/4a/3a/744a3a10-0b6d-8c7d-98a1-6c05e0fbedf7/mza_7762033313959794772.jpg/600x600bb.jpg",
    collectionViewUrl: "https://itunes.apple.com/us/podcast/devtools-fm/id1566647758?mt=2&uo=4",
    trackViewUrl: "https://podcasts.apple.com/us/podcast/orta-therox-cocoapods-danger-typescript/id1566647758?i=1000525119217&uo=4",
    trackTimeMillis: 3084e3,
    contentAdvisoryRating: "Clean",
    artworkUrl60: "https://is5-ssl.mzstatic.com/image/thumb/Podcasts115/v4/74/4a/3a/744a3a10-0b6d-8c7d-98a1-6c05e0fbedf7/mza_7762033313959794772.jpg/60x60bb.jpg",
    releaseDate: "2021-06-11T07:00:00Z",
    trackId: 1000525119217,
    trackName: "Orta Therox - CocoaPods, Danger, TypeScript",
    shortDescription: "",
    closedCaptioning: "none",
    collectionId: 1566647758,
    collectionName: "devtools.fm",
    feedUrl: "https://feeds.buzzsprout.com/1772992.rss",
    artistIds: [],
    country: "USA",
    kind: "podcast-episode",
    wrapperType: "podcastEpisode",
    description: "Listen to us chat with Orta Therox, creator and maintainer of a decades worth of open source tooling!\n\n\nhttps://orta.io/https://shikijs.github.io/twoslash/https://opensourcedesign.net/https://github.com/dangerhttps://github.com/intuit/autohttps://github.com/wixplosives/plebhttps://flappyroyale.io/https://redux.js.org/https://github.com/JSMonk/hegel\nTooltips\nAndrew\nhttps://getpixelsnap.com/Justin\nhttps://mrm.js.org/Orta\nhttps://shortcatapp.com/https://github.com/davidtheclark/cosmiconfighttps://shikijs.github.io/twoslash/",
    genres: [
      {
        name: "Technology",
        id: "1318"
      }
    ],
    episodeGuid: "Buzzsprout-8683793"
  },
  {
    previewUrl: "https://www.buzzsprout.com/1772992/8642195-storybook-with-norbert-and-dom.mp3",
    artworkUrl160: "https://is5-ssl.mzstatic.com/image/thumb/Podcasts115/v4/74/4a/3a/744a3a10-0b6d-8c7d-98a1-6c05e0fbedf7/mza_7762033313959794772.jpg/160x160bb.jpg",
    episodeFileExtension: "mp3",
    episodeContentType: "audio",
    episodeUrl: "https://www.buzzsprout.com/1772992/8642195-storybook-with-norbert-and-dom.mp3",
    artworkUrl600: "https://is5-ssl.mzstatic.com/image/thumb/Podcasts115/v4/74/4a/3a/744a3a10-0b6d-8c7d-98a1-6c05e0fbedf7/mza_7762033313959794772.jpg/600x600bb.jpg",
    collectionViewUrl: "https://itunes.apple.com/us/podcast/devtools-fm/id1566647758?mt=2&uo=4",
    trackViewUrl: "https://podcasts.apple.com/us/podcast/storybook-with-norbert-and-dom/id1566647758?i=1000524251524&uo=4",
    trackTimeMillis: 4159e3,
    contentAdvisoryRating: "Clean",
    artworkUrl60: "https://is5-ssl.mzstatic.com/image/thumb/Podcasts115/v4/74/4a/3a/744a3a10-0b6d-8c7d-98a1-6c05e0fbedf7/mza_7762033313959794772.jpg/60x60bb.jpg",
    releaseDate: "2021-06-04T05:00:00Z",
    trackId: 1000524251524,
    trackName: "Storybook with Norbert and Dom",
    shortDescription: "",
    closedCaptioning: "none",
    collectionId: 1566647758,
    collectionName: "devtools.fm",
    feedUrl: "https://feeds.buzzsprout.com/1772992.rss",
    artistIds: [],
    country: "USA",
    kind: "podcast-episode",
    wrapperType: "podcastEpisode",
    description: "Storybook is an open source tool for building UI components in isolation. Tune in as we talk t Dominic Nguyen and Norbert de Langen about the story behind storybook, what it's like to run an open-source based company, the importance of developing UI in isolation, and more\nStorybookjimpStorybook Addon React DocgenMeteorPheonix LiveViewMeteor's DDPBlitz.jsRedwood.jsAtmosphereComponent story formatStorybook ArgsStory DocsChromatic Visual Testing\nTooltips\nAndrew\nloopbackMacOS IconsJustin\nIntroducing WebContainersmockfsplanetscale (serverless db)Dom\nMock Service WorkerMirage.jsMeasure addon by VarunNorbert\nBracket ColorizerDeepscanMHO",
    genres: [
      {
        name: "Technology",
        id: "1318"
      }
    ],
    episodeGuid: "Buzzsprout-8642195"
  },
  {
    previewUrl: "https://www.buzzsprout.com/1772992/8603610-danny-banks-and-kelly-harrop-style-dictionary.mp3",
    artworkUrl160: "https://is5-ssl.mzstatic.com/image/thumb/Podcasts115/v4/74/4a/3a/744a3a10-0b6d-8c7d-98a1-6c05e0fbedf7/mza_7762033313959794772.jpg/160x160bb.jpg",
    episodeFileExtension: "mp3",
    episodeContentType: "audio",
    episodeUrl: "https://www.buzzsprout.com/1772992/8603610-danny-banks-and-kelly-harrop-style-dictionary.mp3",
    artworkUrl600: "https://is5-ssl.mzstatic.com/image/thumb/Podcasts115/v4/74/4a/3a/744a3a10-0b6d-8c7d-98a1-6c05e0fbedf7/mza_7762033313959794772.jpg/600x600bb.jpg",
    collectionViewUrl: "https://itunes.apple.com/us/podcast/devtools-fm/id1566647758?mt=2&uo=4",
    trackViewUrl: "https://podcasts.apple.com/us/podcast/danny-banks-and-kelly-harrop-style-dictionary/id1566647758?i=1000523415086&uo=4",
    trackTimeMillis: 3155e3,
    contentAdvisoryRating: "Clean",
    artworkUrl60: "https://is5-ssl.mzstatic.com/image/thumb/Podcasts115/v4/74/4a/3a/744a3a10-0b6d-8c7d-98a1-6c05e0fbedf7/mza_7762033313959794772.jpg/60x60bb.jpg",
    releaseDate: "2021-05-28T15:00:00Z",
    trackId: 1000523415086,
    trackName: "Danny Banks and Kelly Harrop - style-dictionary",
    shortDescription: "",
    closedCaptioning: "none",
    collectionId: 1566647758,
    collectionName: "devtools.fm",
    feedUrl: "https://feeds.buzzsprout.com/1772992.rss",
    artistIds: [],
    country: "USA",
    kind: "podcast-episode",
    wrapperType: "podcastEpisode",
    description: "What's a design token? Why would you even want one? Listen to our conversations with Amazon's Danny Banks where he talks about style-dictionary's origin. Hear stories about real world usage with Kelly Harrop from Intuit.\n\n\nstyle-dictionaryfigmaFramerstorybookplayroomtheodiez\nTooltips\nAndrew:\ncleanshotJustin\nListen NotesnattoKelly\nreactflowdomeventsDanny\nreplit",
    genres: [
      {
        name: "Technology",
        id: "1318"
      }
    ],
    episodeGuid: "Buzzsprout-8603610"
  },
  {
    previewUrl: "https://www.buzzsprout.com/1772992/8564054-david-stone-and-adam-dierkens-intuit-player.mp3",
    artworkUrl160: "https://is5-ssl.mzstatic.com/image/thumb/Podcasts115/v4/74/4a/3a/744a3a10-0b6d-8c7d-98a1-6c05e0fbedf7/mza_7762033313959794772.jpg/160x160bb.jpg",
    episodeFileExtension: "mp3",
    episodeContentType: "audio",
    episodeUrl: "https://www.buzzsprout.com/1772992/8564054-david-stone-and-adam-dierkens-intuit-player.mp3",
    artworkUrl600: "https://is5-ssl.mzstatic.com/image/thumb/Podcasts115/v4/74/4a/3a/744a3a10-0b6d-8c7d-98a1-6c05e0fbedf7/mza_7762033313959794772.jpg/600x600bb.jpg",
    collectionViewUrl: "https://itunes.apple.com/us/podcast/devtools-fm/id1566647758?mt=2&uo=4",
    trackViewUrl: "https://podcasts.apple.com/us/podcast/david-stone-and-adam-dierkens-intuit-player/id1566647758?i=1000522682518&uo=4",
    trackTimeMillis: 4281e3,
    contentAdvisoryRating: "Clean",
    artworkUrl60: "https://is5-ssl.mzstatic.com/image/thumb/Podcasts115/v4/74/4a/3a/744a3a10-0b6d-8c7d-98a1-6c05e0fbedf7/mza_7762033313959794772.jpg/60x60bb.jpg",
    releaseDate: "2021-05-21T18:00:00Z",
    trackId: 1000522682518,
    trackName: "David Stone and Adam Dierkens - Intuit Player",
    shortDescription: "",
    closedCaptioning: "none",
    collectionId: 1566647758,
    collectionName: "devtools.fm",
    feedUrl: "https://feeds.buzzsprout.com/1772992.rss",
    artistIds: [],
    country: "USA",
    kind: "podcast-episode",
    wrapperType: "podcastEpisode",
    description: "In this episode of devtools.fm we talk to two of the people behind how Intuit products deliver their products to multiple platforms. Explore the interesting world of the Player and all the tools it's spawned.\n\n\n\nIntuitstyle-dictionarydesign-systems-clidevtools-dsautojsonnetkotlin hooks\nTooltips\n\n\n\nAndrew\n\n\nRomewalrus.ai\nJustin\n\n\nbettererMuse Apppolarizedzx\nDavid\n\n\nconcepts.appdelta\nAdam\n\n\nreaflowMax Mix Project",
    genres: [
      {
        name: "Technology",
        id: "1318"
      }
    ],
    episodeGuid: "Buzzsprout-8564054"
  },
  {
    previewUrl: "https://www.buzzsprout.com/1772992/8521347-david-sheldrick-patch-package.mp3",
    artworkUrl160: "https://is5-ssl.mzstatic.com/image/thumb/Podcasts115/v4/74/4a/3a/744a3a10-0b6d-8c7d-98a1-6c05e0fbedf7/mza_7762033313959794772.jpg/160x160bb.jpg",
    episodeFileExtension: "mp3",
    episodeContentType: "audio",
    episodeUrl: "https://www.buzzsprout.com/1772992/8521347-david-sheldrick-patch-package.mp3",
    artworkUrl600: "https://is5-ssl.mzstatic.com/image/thumb/Podcasts115/v4/74/4a/3a/744a3a10-0b6d-8c7d-98a1-6c05e0fbedf7/mza_7762033313959794772.jpg/600x600bb.jpg",
    collectionViewUrl: "https://itunes.apple.com/us/podcast/devtools-fm/id1566647758?mt=2&uo=4",
    trackViewUrl: "https://podcasts.apple.com/us/podcast/david-sheldrick-patch-package/id1566647758?i=1000521764412&uo=4",
    trackTimeMillis: 2801e3,
    contentAdvisoryRating: "Clean",
    artworkUrl60: "https://is5-ssl.mzstatic.com/image/thumb/Podcasts115/v4/74/4a/3a/744a3a10-0b6d-8c7d-98a1-6c05e0fbedf7/mza_7762033313959794772.jpg/60x60bb.jpg",
    releaseDate: "2021-05-14T17:00:00Z",
    trackId: 1000521764412,
    trackName: "David Sheldrick - patch-package",
    shortDescription: "",
    closedCaptioning: "none",
    collectionId: 1566647758,
    collectionName: "devtools.fm",
    feedUrl: "https://feeds.buzzsprout.com/1772992.rss",
    artistIds: [],
    country: "USA",
    kind: "podcast-episode",
    wrapperType: "podcastEpisode",
    description: "In this episode we interview David Sheldrick, the creator of patch-package.\n\n\nhttps://github.com/ds300/patch-package/https://github.com/artsy/eigenArtsy's mobile apphttps://www.artsy.nethttps://pulley.com/Where David is going nexthttps://github.com/artsy/gudetamaA tool David worked on at Artsyhttps://github.com/artsy/eigen/pull/3210Artsy's automated move to strict type checking in their react native apphttps://github.com/ds300/patch-package/pull/295PR to add create issue feature to patch-packagehttps://github.com/ds300/jetztDavid's speed reader chrome extensionhttps://www.npmjs.com/package/ts-nodehttps://deno.land/https://www.rust-lang.org/https://twitter.com/orta/https://ipfs.io/\nToolTips\n\n\nAndrew\nhttps://relative-ci.com/https://github.com/iamakulov/awesome-webpack-perfhttps://www.npmjs.com/package/speed-measure-webpack-pluginhttps://uiw.tf/Justin\nhttps://github.com/RobinCsl/awesome-js-tooling-not-in-jshttps://paperclip.devhttps://github.com/phoenixframework/phoenix_live_viewhttps://github.com/nerves-project/nerveshttps://github.com/fhunleth/nerves_livebookDavid\nhttps://coderwall.com/p/cq_lkg/remapping-caps-lock-key-to-something-more-natural-on-mac-os-xhttps://code.visualstudio.com/docs/editor/userdefinedsnippetshttps://code.visualstudio.com/docs/editor/codebasics#_save-auto-save",
    genres: [
      {
        name: "Technology",
        id: "1318"
      }
    ],
    episodeGuid: "Buzzsprout-8521347"
  },
  {
    previewUrl: "https://www.buzzsprout.com/1772992/8479086-the-state-of-javascript-monorepo-tooling.mp3",
    artworkUrl160: "https://is5-ssl.mzstatic.com/image/thumb/Podcasts115/v4/74/4a/3a/744a3a10-0b6d-8c7d-98a1-6c05e0fbedf7/mza_7762033313959794772.jpg/160x160bb.jpg",
    episodeFileExtension: "mp3",
    episodeContentType: "audio",
    episodeUrl: "https://www.buzzsprout.com/1772992/8479086-the-state-of-javascript-monorepo-tooling.mp3",
    artworkUrl600: "https://is5-ssl.mzstatic.com/image/thumb/Podcasts115/v4/74/4a/3a/744a3a10-0b6d-8c7d-98a1-6c05e0fbedf7/mza_7762033313959794772.jpg/600x600bb.jpg",
    collectionViewUrl: "https://itunes.apple.com/us/podcast/devtools-fm/id1566647758?mt=2&uo=4",
    trackViewUrl: "https://podcasts.apple.com/us/podcast/the-state-of-javascript-monorepo-tooling/id1566647758?i=1000520699842&uo=4",
    trackTimeMillis: 3406e3,
    contentAdvisoryRating: "Clean",
    artworkUrl60: "https://is5-ssl.mzstatic.com/image/thumb/Podcasts115/v4/74/4a/3a/744a3a10-0b6d-8c7d-98a1-6c05e0fbedf7/mza_7762033313959794772.jpg/60x60bb.jpg",
    releaseDate: "2021-05-07T18:00:00Z",
    trackId: 1000520699842,
    trackName: "The State of JavaScript Monorepo Tooling",
    shortDescription: "",
    closedCaptioning: "none",
    collectionId: 1566647758,
    collectionName: "devtools.fm",
    feedUrl: "https://feeds.buzzsprout.com/1772992.rss",
    artistIds: [],
    country: "USA",
    kind: "podcast-episode",
    wrapperType: "podcastEpisode",
    description: "Welcome! This is the very first episode of the devtools.fm podcast \u{1F389} On this podcast we plan to have in-depth conversations about developer tools with the people who make them. In this first episode we explore a category of tooling that is near and dear to both out hearts and our workflow: monorepos. There are many tools to get your monorepo off the ground and choosing between them can be intimidating. Whether it's installing dependencies or publishing you packages, there's many options to choose from.\n\nLinks\n\n\nAndrew's monorepo blog postautointuitortasemantic-releaselernarushchangesetsprobotnxyarnpaletteturborepomightystadiaTooltips\nalfred1passwordsemgreptj/nfigastro",
    genres: [
      {
        name: "Technology",
        id: "1318"
      }
    ],
    episodeGuid: "Buzzsprout-8479086"
  }
];

// src/itunes/getItunesShowEpisodes.ts
async function getItunesShowEpisodes(itunesId) {
  return itunesExample;
  const results = (await import_axios2.default.get(
    "https://itunes.apple.com/lookup?id=" + itunesId + "&country=US&media=podcast&entity=podcastEpisode&limit=100000"
  )).data.results.filter(
    (episode) => episode.wrapperType === "podcastEpisode"
  );
  return results;
}

// src/itunes/types.ts
var import_zod = require("zod");
var ItunesEpisodeSchema = import_zod.z.object({
  previewUrl: import_zod.z.string(),
  artworkUrl160: import_zod.z.string(),
  episodeFileExtension: import_zod.z.string(),
  episodeContentType: import_zod.z.string(),
  episodeUrl: import_zod.z.string(),
  artworkUrl600: import_zod.z.string(),
  collectionViewUrl: import_zod.z.string(),
  trackViewUrl: import_zod.z.string(),
  trackTimeMillis: import_zod.z.number(),
  contentAdvisoryRating: import_zod.z.string(),
  artworkUrl60: import_zod.z.string(),
  releaseDate: import_zod.z.string(),
  trackId: import_zod.z.number(),
  trackName: import_zod.z.string(),
  shortDescription: import_zod.z.string(),
  closedCaptioning: import_zod.z.string(),
  collectionId: import_zod.z.number(),
  collectionName: import_zod.z.string(),
  feedUrl: import_zod.z.string(),
  artistIds: import_zod.z.array(import_zod.z.number()),
  country: import_zod.z.string(),
  kind: import_zod.z.string(),
  wrapperType: import_zod.z.string(),
  description: import_zod.z.string(),
  genres: import_zod.z.array(import_zod.z.object({ name: import_zod.z.string(), id: import_zod.z.string() })),
  episodeGuid: import_zod.z.string()
});

// src/itunes/convertItunesToFeed.ts
function convertItunesToFeed(episodes) {
  let items = [];
  for (const item of episodes) {
    let itemFeed = {
      title: item.trackName,
      duration: item.trackTimeMillis / 1e3,
      pubDate: item.releaseDate,
      explicit: false,
      description: item.description,
      guid: item.episodeGuid,
      episodeType: "full" /* Full */,
      itunesId: item.trackId,
      image: { url: item.artworkUrl600 },
      author: "",
      summary: "",
      enclosure: { url: "" },
      lastBuildDate: ""
    };
    items.push(itemFeed);
  }
  return items;
}

// src/popularPodcasts/list.ts
var import_helper = require("@entitree/helper");
var POPULAR_PODCASTS = [
  {
    id: "Q66141312",
    prefix: "The Ben Shapiro Show - ",
    img: "https://podcast.nothispute.com/images/ben_shapiro3000.jpg",
    title: "The Ben Shapiro Show",
    episodeMatch: "Show Ep. (\\d{1,4})$",
    guestMatch: "(.*) | The Ben Shapiro Show Sunday Special",
    presenter: true,
    description: `Daily political podcast and live radio show produced by The Daily Wire and hosted by Ben Shapiro
    
    Full descr:
    Tired of the lies? Tired of the spin? Are you ready to hear the hard-hitting truth in comprehensive, conservative, principled fashion? The Ben Shapiro Show brings you all the news you need to know in the most fast moving daily program in America. Ben brutally breaks down the culture and never gives an inch! Monday thru Friday.`
  },
  {
    id: "Q30323986",
    guestMatch: "- (.*)",
    remove: ["The Joe Rogan Experience ", "JRE "],
    prefix: "JRE ",
    presenter: true,
    episodeMatch: "#(\\d{3,4}) ",
    addClaims: {
      [import_helper.WD_RECORDED_AT_STUDIO_OR_VENUE]: "Q109352672",
      [import_helper.WD_COUNTRY_OF_ORIGIN]: "Q30"
    },
    img: "https://podcast.nothispute.com/images/jre1500.jpg",
    title: "The Joe Rogan Experience"
  },
  {
    id: "Q109238858",
    prefix: "The Jordan B. Peterson Podcast - ",
    remove: [
      "| The Jordan B. Peterson Podcast",
      "| The Jordan Peterson Podcast"
    ],
    presenter: true,
    img: "https://podcast.nothispute.com/images/jordan_peterson.jpg",
    title: "The Jordan B. Peterson Podcast",
    guestMatch: `\\|(.[^\\|]*)`,
    guestMatchIndex: 1,
    description: `Join intellectual phenomenon Dr. Jordan Peterson and his daughter Mikhaila for enlightening discourse that will change the way you think. This podcast breaks down the dichotomy of life through interviews and lectures that explain how individuals and culture are shaped by values, music, religion, and beyond. It will give you a new perspective and a modern understanding of your creativity, competence, and personality.`
  },
  {
    id: "Q109650493",
    prefix: "The Michael Shermer Show - ",
    title: "The Michael Shermer Show",
    episodeMatch: "#(\\d{3,4}) ",
    presenter: true,
    guestMatchIndex: 1,
    guestMatch: `\\d{2,4}\\. (.*?) (about|on|-|\u2014)`
  },
  {
    id: "Q56542667",
    prefix: "Stay Tuned with Preet - ",
    title: "Stay Tuned with Preet",
    presenter: true,
    guestMatch: `(with (.*))`
  },
  {
    id: "Q109248984",
    title: "Lex Fridman Podcast",
    episodeMatch: "#(\\d{3,4}) ",
    prefix: "Lex Fridman Podcast ",
    guestMatch: `\\d (\u2013|\\-) (.*):`,
    guestMatchIndex: 2
  },
  {
    id: "Q109943764",
    prefix: "The Tim Dillon Show ",
    title: "The Tim Dillon Show",
    presenter: true,
    episodeMatch: "^(\\d{2,4}) ",
    guestMatch: `((with|ft\\.) (.*))`
  },
  {
    id: "Q109892507",
    prefix: "The Megyn Kelly Show ",
    title: "The Megyn Kelly Show",
    episodeMatch: "Ep. (\\d{1,4})$",
    presenter: true,
    guestMatch: `(with|ft\\.) (.*) \\|`
  },
  {
    id: "Q110493748",
    prefix: "Here's The Thing with Alec Baldwin - ",
    title: "Here's The Thing with Alec Baldwin",
    presenter: true
  },
  {
    id: "Q2856080",
    title: "Radiolab"
  },
  {
    id: "Q61855877",
    title: "Pod Save America",
    guestMatch: `(\\(with (.*)\\))`
  },
  {
    id: "Q48807376",
    title: "Under The Skin with Russell Brand",
    prefix: "Under The Skin with Russell Brand - ",
    episodeMatch: "#(\\d{3,4}) ",
    guestMatch: `(\\(with (.*)\\))`
  },
  {
    id: "Q110783309",
    title: "Deddy Corbuzier Podcast",
    download: true,
    languageCode: "id",
    description: `Podcast ini merupakan konten di Channel Youtube "Deddy Corbuzier" yang membahas tentang kondisi terkini di Indonesia, berita terbaru, kisah inspiratif, dan sisi lain para narasumber yang belum banyak diketahui masyarakat.`,
    img: "https://d3t3ozftmdmh3i.cloudfront.net/production/podcast_uploaded_nologo/3292581/3292581-1582607586354-90856d151bba7.jpg"
  },
  {
    id: "Q109750235",
    title: "The Tim Ferriss Show",
    prefix: "The Tim Ferriss Show "
  },
  {
    id: "Q95626082",
    title: "The Vergecast",
    prefix: ""
  },
  {
    id: "Q110247066",
    title: "Talking Indonesia"
  }
];

// src/popularPodcasts/types.ts
var DESCRIPTIONS_DEFAULT = {
  presenter: false,
  guestMatchIndex: 2,
  languageCode: "en",
  title: ""
};

// src/wikidata/convertFeedEpisodeToWikidata.ts
var import_helper2 = require("@entitree/helper");

// src/wikidata/helper/extractGuests.ts
function extractGuests(text, regex, matchIndex) {
  try {
    let match = text.match(new RegExp(regex, ""));
    let guests = match == null ? void 0 : match[matchIndex].trim().split(/,| and | \& | as well as | \+ |;/).map((guest) => {
      return guest.trim();
    });
    return guests;
  } catch (e) {
    return [];
  }
}

// src/wikidata/helper/extractProductionCode.ts
function extractProductionCode(text, regex = "#(\\d{1,4}) ") {
  try {
    let match = text.match(new RegExp(regex, ""));
    return match == null ? void 0 : match[1];
  } catch (e) {
  }
}

// src/wikidata/helper/extractRecordingDate.ts
function extractRecordingDate(text) {
  try {
    let recorded = text.match(new RegExp("recorded in (20\\d{2})", "i"));
    if (recorded) {
      return {
        value: recorded[1] + "-00-00",
        statedAs: recorded[0]
      };
    }
    recorded = text.match(
      new RegExp("recorded (in |)([a-zA-Z]+ 20\\d{2})", "i")
    );
    recorded = text.match(
      new RegExp("recorded (on |)((.{4,22}) 20\\d{2})", "i")
    );
  } catch (e) {
    return null;
  }
}

// src/wikidata/convertFeedEpisodeToWikidata.ts
async function convertFeedEpisodeToWikidata(episode, podcast) {
  var _a, _b, _c, _d;
  const language = "en";
  let wikidataLabel = episode.title;
  if (podcast == null ? void 0 : podcast.prefix) {
    wikidataLabel = podcast.prefix + wikidataLabel;
  }
  const labels = {
    [language]: wikidataLabel
  };
  const aliases = {
    [language]: episode.title
  };
  const descriptions = {
    [language]: "podcast episode"
  };
  let url = episode.enclosure.url;
  let contentDelieverer = null;
  let fileFormat = "Q42591";
  if (url.match("traffic.megaphone.fm/")) {
    url = "https://traffic.megaphone.fm/" + url.split("traffic.megaphone.fm/")[1].split("?")[0];
    contentDelieverer = "Q29096473";
  }
  let cleanTitle = episode.title;
  if (podcast == null ? void 0 : podcast.remove) {
    cleanTitle = cleanTitle.replace(podcast.remove[0], "");
  }
  let today = new Date().toJSON().slice(0, 10);
  const reference = null;
  let claims = {
    [import_helper2.WD_INSTANCE_OF]: [import_helper2.WDQ_PODCAST_EPISODE],
    [import_helper2.WD_TITLE]: [{ text: episode.title, language }],
    [import_helper2.WD_PART_OF_THE_SERIES]: [podcast == null ? void 0 : podcast.id],
    [import_helper2.WD_PODCAST_LOGO_URL]: [(_a = episode.image) == null ? void 0 : _a.url],
    [import_helper2.WD_STATED_AS]: episode.description,
    [import_helper2.WD_DURATION]: [{ amount: Math.floor(episode.duration), unit: import_helper2.WDQ_SECOND }],
    [import_helper2.WD_PUBLICATION_DATE]: [
      {
        value: episode.pubDate.substring(0, 10)
      }
    ]
  };
  if (url) {
    claims[import_helper2.WD_FULL_WORK_AVAILABLE_AT_URL] = [
      {
        value: url,
        qualifiers: {
          [import_helper2.WD_CONTENT_DELIVERER]: contentDelieverer,
          [import_helper2.WD_FILE_FORMAT]: fileFormat
        },
        references: [reference]
      }
    ];
  }
  if ((podcast == null ? void 0 : podcast.seasons) && episode.season) {
    let currentSeason = podcast.seasons[episode.season];
    claims[import_helper2.WD_SEASON] = [
      {
        value: currentSeason,
        qualifiers: {
          [import_helper2.WD_SERIES_ORDINAL]: (_b = episode.episode) == null ? void 0 : _b.toString()
        }
      }
    ];
  }
  if (podcast == null ? void 0 : podcast.guestMatch) {
    let guests = extractGuests(
      cleanTitle,
      podcast.guestMatch,
      podcast.guestMatchIndex || 1
    );
    if (guests) {
      claims[import_helper2.WD_TALK_SHOW_GUEST] = [];
      for (let guest of guests) {
        claims[import_helper2.WD_TALK_SHOW_GUEST].push(guest);
      }
    }
  }
  if (podcast == null ? void 0 : podcast.presenterId) {
    claims[import_helper2.WD_PRESENTER] = [{ value: podcast.presenterId }];
  }
  if ((_c = episode.image) == null ? void 0 : _c.url) {
    claims[import_helper2.WD_PODCAST_LOGO_URL] = [(_d = episode.image) == null ? void 0 : _d.url];
  }
  let recordedDate = extractRecordingDate(episode.description);
  if (recordedDate) {
    claims[import_helper2.WD_RECORDING_DATE] = [
      {
        time: recordedDate.value,
        references: {
          [import_helper2.WD_BASED_ON_HEURISTIC]: import_helper2.WDQ_INFERRED_FROM_PODCAST_DESCRIPTION,
          [import_helper2.WD_STATED_IN_REFERENCE_AS]: recordedDate.statedAs
        }
      }
    ];
  }
  let hasQuality = [];
  if (episode.explicit) {
    hasQuality.push(import_helper2.WDQ_EXPLICIT_EPISODE);
  }
  const episodeTypeId = import_helper2.WDQ_EPISODE_TYPE_MATCH[episode.episodeType];
  if (episode.episodeType && episode.episodeType !== "full") {
    hasQuality.push(episodeTypeId);
  }
  if (episode.explicit) {
    claims[import_helper2.WD_HAS_QUALITY] = hasQuality;
  }
  if (episode.itunesId) {
    claims[import_helper2.WD_APPLE_PODCASTS_PODCAST_EPISODE_ID] = [
      { value: episode.itunesId.toString() }
    ];
  }
  if (episode.spotifyId) {
    claims[import_helper2.WD_SPOTIFY_SHOW_EPISODE_ID] = [
      {
        value: episode.spotifyId
      }
    ];
  }
  let productionCode = extractProductionCode(cleanTitle, podcast == null ? void 0 : podcast.episodeMatch);
  if (productionCode) {
    claims[import_helper2.WD_PRODUCTION_CODE] = {
      value: productionCode,
      references: {
        [import_helper2.WD_BASED_ON_HEURISTIC]: import_helper2.WDQ_INFERRED_FROM_TITLE
      }
    };
  }
  if (podcast == null ? void 0 : podcast.addClaims) {
    claims = { ...claims, ...podcast == null ? void 0 : podcast.addClaims };
  }
  console.log(claims);
  return {
    type: "item",
    labels,
    aliases,
    descriptions,
    claims,
    sitelinks: []
  };
}

// src/wikidata/convertFeedToWikidata.ts
async function convertFeedToWikidata(episodes, podcast) {
  const episodesWikidata = await Promise.all(
    episodes.map(async (episode) => {
      const episodeWikidata = await convertFeedEpisodeToWikidata(
        episode,
        podcast
      );
      return episodeWikidata;
    })
  );
  return episodesWikidata;
}

// src/wikidata/renameClaimIdtoLabel.ts
var import_helper3 = require("@entitree/helper");
async function renameClaimIdtoLabel(episodes) {
  episodes.map((item) => {
    const claims = {};
    for (let key in item.claims) {
      claims[import_helper3.WIKIDATA_LABELS_EN[key]] = item.claims[key];
    }
    item.claims = claims;
  });
  return episodes;
}

// src/wikidata/getPodcastInfo.ts
var import_helper4 = require("@entitree/helper");
async function getPodcastInfo(podcast) {
  let data = `SELECT DISTINCT
   ?item ?itemLabel ?language ?languageLabel ?languageCode 
   ?genre ?genreLabel ?producer ?producerLabel  ?presenter ?presenterLabel 
   ?itunesGenre ?itunesGenreId ?logo ?spotifyId ?appleId
WHERE 
{
  VALUES ?item {wd:${podcast}}
  OPTIONAL { ?item wdt:P407 ?language.
  ?language wdt:P218 ?languageCode . }
  OPTIONAL { ?item wdt:P136 ?genre. }  
  OPTIONAL { ?item wdt:P495 ?country. }  
  OPTIONAL { ?item wdt:P162 ?producer. }  
  OPTIONAL { ?item wdt:P371 ?presenter. }  
  #OPTIONAL { ?item wdt:P10150 ?itunesGenre. }  
  #OPTIONAL { ?itunesGenre wdt:P10151 ?itunesGenreId. }  
  OPTIONAL { ?item wdt:${import_helper4.WD_PODCAST_LOGO_URL} ?logo. }  
  OPTIONAL { ?item wdt:${import_helper4.WD_SPOTIFY_SHOW_ID} ?spotifyId. }  
  OPTIONAL { ?item wdt:${import_helper4.WD_APPLE_PODCASTS_PODCAST_ID} ?appleId. }  

  SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
}`;
  const [info] = await (0, import_helper4.getWikidataSparql)(data);
  return {
    id: info.item,
    genre: info.genre,
    language: info.language,
    languageCode: info.languageCode,
    producer: info.producer,
    presenter: info.presenter,
    spotifyId: info.spotifyId,
    appleId: info.appleId
  };
}
async function getPodcastFeed(podcast) {
  let data = `SELECT ?item ?itemLabel ?spotifyShowId ?itunesShowId ?language ?feed ?languageLabel ?languageCode ?genre ?genreLabel ?producer ?producerLabel  ?presenter ?presenterLabel ?itunesGenre ?itunesGenreId ?logo
WHERE 
{
  VALUES ?item {wd:${podcast}}
  OPTIONAL { ?item wdt:P407 ?language.
  ?language wdt:P218 ?languageCode . }
  OPTIONAL { ?item wdt:${import_helper4.WD_WEB_FEED_URL} ?feed. }  
  OPTIONAL { ?item wdt:P136 ?genre. }  
  OPTIONAL { ?item wdt:P5916 ?spotifyShowId. }  
  OPTIONAL { ?item wdt:P5842 ?itunesShowId. }    
  OPTIONAL { ?item wdt:P162 ?producer. }  
  OPTIONAL { ?item wdt:P371 ?presenter. }  
  OPTIONAL { ?item wdt:P10150 ?itunesGenre. }  
  OPTIONAL { ?itunesGenre wdt:P10151 ?itunesGenreId. }  
  OPTIONAL { ?item wdt:${import_helper4.WD_PODCAST_LOGO_URL} ?logo. }  

  SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
}`;
  const ids = await (0, import_helper4.getWikidataSparql)(data);
  return ids;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DESCRIPTIONS_DEFAULT,
  ItunesEpisodeSchema,
  POPULAR_PODCASTS,
  convertFeedEpisodeToWikidata,
  convertFeedToWikidata,
  convertItunesToFeed,
  convertSpotifyToFeed,
  extractGuests,
  extractProductionCode,
  extractRecordingDate,
  getItunesShowEpisodes,
  getPodcastFeed,
  getPodcastInfo,
  getSpotifyShowEpisodes,
  renameClaimIdtoLabel
});
