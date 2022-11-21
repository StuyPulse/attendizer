/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  env: {
    REG_URL: 'http://localhost:3000/api/addStudent',
    EDIT_URL: 'http://localhost:3000/api/editStudent',
    SCAN_URL: 'http://localhost:3000/api/scanIn',
    GET_STUDENTS_URL: 'http://localhost:3000/api/getStudents',
    GET_MEETINGS_URL: 'http://localhost:3000/api/getMeetings',
    DEL_URL: 'http://localhost:3000/api/delStudent',
    DEL_MEETING_URL: "http://localhost:3000/api/delMeeting"
  }
};
