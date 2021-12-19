/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    GRAPHQL_URL: process.env.GRAPHQL_URL,
  },
}
