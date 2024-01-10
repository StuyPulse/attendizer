import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// const meetings = require('../../models/attendanceEntry.js');

module.exports = async (req, res) => {
  const meetings = [];

  for (let i = 1; i < 10; ++i) {
    meetings.push({
      id: i,
      date: `2024-01-0${i}`,
      attendees: Array.from(
        { length: Math.floor(Math.random() * 100) },
        () => 0
      )
    });
  }

  res.send(meetings);
};
