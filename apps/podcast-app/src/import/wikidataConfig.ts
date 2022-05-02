export const generalConfig = {
  // A Wikibase instance is required
  instance: "https://www.wikidata.org",

  // The instance script path, used to find the API endpoint
  // Default: /w
  wgScriptPath: "/w",

  // One authorization mean is required (unless in anonymous mode, see below)
  credentials: {
    // either a username and password
    // username: "Germartin1",
    // // Optional: generate a dedicated password with tailored rights on /wiki/Special:BotPasswords
    // // See the 'Credentials' paragraph below
    // password: "my-wikidata-password",

    // OR OAuth tokens
    oauth: {
      // Obtained at registration
      // https://www.mediawiki.org/wiki/OAuth/For_Developers#Registration
      consumer_key: process.env.WD_CONSUMER_TOKEN,
      consumer_secret: process.env.WD_CONSUMER_SECRET,
      // Obtained when the user authorized your service
      // see https://www.mediawiki.org/wiki/OAuth/For_Developers#Authorization
      token: process.env.WD_ACCESS_TOKEN,
      token_secret: process.env.WD_ACCESS_SECRET,
    },
  },

  // Flag to activate the 'anonymous' mode,
  // which actually isn't anonymous as it signs with your IP
  // Default: false
  // anonymous: true,

  // Optional
  // See https://meta.wikimedia.org/wiki/Help:Edit_summary
  // Default: empty
  summary: "PodcastBot",

  // See https://www.mediawiki.org/wiki/Manual:Tags
  // Default: on Wikidata [ 'WikibaseJS-edit' ], empty for other Wikibase instances
  // tags: ["WikidataJS-edit"],

  // Default: `wikidata-edit/${pkg.version} (https://github.com/maxlath/wikidata-edit)`
  userAgent: "wikidata-edit/v0.0.1 (https://project.website)",

  // See https://www.mediawiki.org/wiki/Manual:Bots
  // Default: false
  // bot: true,

  // See https://www.mediawiki.org/wiki/Manual:Maxlag_parameter
  // Default: 5
  // maxlag: 2,
};
