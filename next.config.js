/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  webpack(config) {
    config.resolve.modules.push(__dirname); // 추가
    return config;
  },

  env: {
    AWS_SERVER:
      'http://ec2-3-34-110-210.ap-northeast-2.compute.amazonaws.com:8080',
    LOCAL_SERVER: 'http://localhost:3000/api/v1',
  },
};
