/** @type {import('next').NextConfig} */
// Needs a refactor
module.exports = {
  reactStrictMode: true,
  env: {
    REG_URL: '/api/addStudent',
    EDIT_URL: '/api/editStudent',
    SCAN_URL: '/api/scanIn',
    GET_STUDENTS_URL: '/api/getStudents',
    GET_MEETINGS_URL: '/api/getMeetings',
    DEL_URL: '/api/delStudent',
    DEL_MEETING_URL: '/api/delMeeting'
  }
};
