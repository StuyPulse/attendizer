/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  env: {
    REG_URL: 'http://localhost:3000/api/reg',
    SCAN_URL: 'http://localhost:3000/api/scan',
    GET_URL: 'http://localhost:3000/api/sList'
  }
};
