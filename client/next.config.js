/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  env: {
    REG_URL: 'http://localhost:4000/reg',
    SCAN_URL: 'http://localhost:4000/scan',
    GET_URL: 'http://localhost:4000/sList'
  }
};
