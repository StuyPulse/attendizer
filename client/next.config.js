/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  env: {
    REG_URL: 'https://attendizer.stuypulse.com/api/addStudent',
    EDIT_URL: 'https://attendizer.stuypulse.com/api/editStudent',
    SCAN_URL: 'https://attendizer.stuypulse.com/api/scanIn',
    GET_STUDENTS_URL: 'https://attendizer.stuypulse.com/api/getStudents',
    GET_MEETINGS_URL: 'https://attendizer.stuypulse.com/api/getMeetings',
    DEL_URL: 'https://attendizer.stuypulse.com/api/delStudent',
    DEL_MEETING_URL: 'https://attendizer.stuypulse.com/api/delMeeting'
  }
};
