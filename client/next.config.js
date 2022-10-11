/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  env: {
    REG_URL: 'http://localhost:4000/reg',
    EDIT_URL: 'http://localhost:4000/edit',
    SCAN_URL: 'http://localhost:4000/scan',
    GET_URL: 'http://localhost:4000/sList',
    DEL_URL: 'http://localhost:4000/delete',
  }
};
