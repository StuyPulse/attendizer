const req = require('express/lib/request');
const res = require('express/lib/response');
const dbinit = require('../../models/database.js');
const student = require('../../models/student.js');

module.exports = async (req, res) => {
  const db = await dbinit();
  const id = req.body.scanEntry;
  const len = id.toString().length;
  if (len != 9 && len != 13) {
    res.status(400).send({
      message: 'Student ID length invalid.'
    });
    return;
  }
  if (len == 9) {
    foundStudent = await db.students.findOne({ where: { osis: id } });
  }
  if (len == 13) {
    foundStudent = await db.students.findOne({ where: { uid: id } });
  }
  if (foundStudent == null) {
    res.status(400).send({
      message: 'Could not find student from osis.'
    });
    return;
  }

  meeting = await db.meetings.findOne({
    where: { date: Date() }
  });
  if (meeting == null) {
    meeting = await db.meetings.create({});
  }

  scanIn = await db.entries.findOne({
    where: {
      // scanIn: true,
      studentId: foundStudent.id,
      meetingId: meeting.id
    }
  });

  // scan = true;
  if (scanIn == null) {
    db.entries.create({
      // scanIn: true,
      studentId: foundStudent.id,
      meetingId: meeting.id
    });
  
    res.send({
      name: foundStudent.name,
      time: new Date().toLocaleTimeString()
    });
  }
  else{
    res.status(400).send({
      message: 'Student has already swiped in today!'
    });
    return;
  }

  // scanOut = await db.entries.findOne({
  //   where: {
  //     scanIn: false,
  //     studentId: foundStudent.id,
  //     meetingId: meeting.id
  //   }
  // });

  // if (scanOut == null) {
  //   db.entries.create({
  //     scanIn: false,
  //     studentId: foundStudent.id,
  //     meetingId: meeting.id
  //   });
  
  //   res.send({
  //     name: foundStudent.name,
  //     time: new Date().toLocaleTimeString()
  //   });
  // }
  // else{
  //   res.status(400).send({
  //     message: 'Student has already swiped out today!'
  //   });
  //   return;
  // }

  // console.log(meeting.id);
};