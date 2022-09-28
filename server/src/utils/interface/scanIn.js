const req = require('express/lib/request');
const res = require('express/lib/response');
const dbinit = require('../../models/database.js');
const student = require('../../models/student.js');

module.exports = async (req, res) => {
  const db = await dbinit();
  const id = req.body.scanEntry;
  const len = id.toString().length;

  // Checks format of the id.
  if (len != 9 && len != 13) {
    res.status(400).send({
      message: 'Student ID length invalid.'
    });
    return;
  }

  // Attempts to find the student.
  if (len == 9) {
    foundStudent = await db.students.findOne({ where: { osis: id } });
  }
  if (len == 13) {
    foundStudent = await db.students.findOne({ where: { uid: id } });
  }
  // If the student cannot be found (meaning the student is not in the system), return an error.
  if (foundStudent == null) {
    res.status(400).send({
      message: 'Could not find student from osis.'
    });
    return;
  }

  // If student is found, attempt to find a meeting where the date is today.
  meeting = await db.meetings.findOne({
    where: { date: Date() }
  });

  // If meeting not found, create a meeting for today.
  if (meeting == null) {
    meeting = await db.meetings.create({});
  }

  // Check if the student has scanned in for todays meeting.
  scanIn = await db.entries.findOne({
    where: {
      studentId: foundStudent.id,
      meetingId: meeting.id
    }
  });

  // If the student has not, create an attendance entry for them.
  if (scanIn == null) {
    db.entries.create({
      studentId: foundStudent.id,
      meetingId: meeting.id
    });
  
    res.send({
      name: foundStudent.name,
      time: new Date().toLocaleTimeString()
    });
  }
  else{
    // Otherwise, send an error.
    res.status(400).send({
      message: 'Student has already swiped in today!'
    });
    return;
  }

  // Old scan out code, not in use anymore (for now...?)

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