/** @type {import('next').NextConfig} */
//Restart dev to see changes
module.exports = {
  reactStrictMode: true,
  env: {
    GC_BUCKET: process.env.GC_BUCKET,
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
