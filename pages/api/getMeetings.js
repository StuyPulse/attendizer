import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// const meetings = require('../../models/attendanceEntry.js');

module.exports = async (req, res) => {
  if (req.body.key != process.env.KEY) {
    res.status(400).send({ message: 'Invalid key!' });
    return;
  }

  const entries = await prisma.entries.findMany({
    include: {
      meetings: true
    }
  });

  if (!entries) {
    res.status(500).send({ message: 'Could not fetch meetings!' });
    return;
  }

  const meetings = [];
  let attendees = 0;

  const pushMeet = (entry, attendees) =>
    meetings.push({
      id: entry.meetingId,
      date: entry.meetings.date,
      attendees: attendees
    });

  let i = 0;

  // first meeting
  const firstId = entries[0].meetingId;

  for (; i < entries.length; ++i) {
    if (entries[i].meetingId == firstId) ++attendees;
    else break;
  }

  pushMeet(entries[0], attendees);
  attendees = 0;
  let b = false;

  for (; i < entries.length; ++i) {
    if (b && entries[i - 1].meetingId != entries[i].meetingId) {
      pushMeet(entries[entries[i].meetingId - firstId], attendees);
      attendees = 0;
    }
    ++attendees;
    if (i == entries.length - 1) {
      pushMeet(entries[enries[i].meetingId - firstId], attendees);
    }

    b = true;
  }

  console.log('meetings');
  console.log(JSON.stringify(meetings));
  res.send(meetings);
};
