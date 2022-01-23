/** @type {import('next').NextConfig} */
const path = require('path');

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
};

module.exports = {
  reactStrictMode: true,
  webpack(config) {
    config.resolve.modules.push(__dirname); // 추가
    return config;
  },

  env: {
    LOCAL_SERVER: 'http://localhost:3000/api',
    PROD_SERVER: 'https://insta-frontend.vercel.app/api',
  },
};
