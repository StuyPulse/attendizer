import { PrismaClient } from '@prisma/client';
 
const prisma = new PrismaClient();

// const meetings = require('../../models/attendanceEntry.js');

module.exports = async (req, res) => {
  if (req.body.key != process.env.KEY) {
    res.status(400).send({
      message: 'Invalid key!'
    });
    return;
  }
  let entries = await prisma.entries.findMany({
    include: {
      students: true,
      meetings: true
    }
  });
  for (let i = 0; i < entries.length; i++) {
    let entry = entries[i];
    entry.id = entry.meetingId;
    entry.date = entry.meetings.date;
    entry["students.id"] = entry.studentId;
    entry["students.name"] = entry.students.name;
    entry["students.osis"] = entry.students.osis;
    entry["students.uid"] = entry.students.uid;
  }
  if(entries != null){
    console.log("entries");
    console.log(JSON.stringify(entries));
    res.send(entries);
    return;
  }
  res.status(500).send({
    message: "Could not fetch students!"
  })
};