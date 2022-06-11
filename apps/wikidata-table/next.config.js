/** @type {import('next').NextConfig} */
//Restart dev to see changes
module.exports = {
  reactStrictMode: true,
  env: {
    GC_BUCKET: process.env.GC_BUCKET,
  },
  images: {
    domains: ["storage.googleapis.com", `upload.wikimedia.org`],
  },
  async headers() {
    return [
      {
        source: "/:api*{/}?",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
        ],
      },
    ];
  },
};
