import { PrismaClient } from '@prisma/client';
 
const prisma = new PrismaClient();

require('dotenv').config();

module.exports = async (req, res) => {
  let id = req.body.scanEntry;
  const len = id.toString().length;
  if (req.body.key != process.env.KEY) {
    res.status(400).send({
      message: 'Invalid key!'
    });
    return;
  }
  // Checks format of the id.
  if (len != 9 && len != 13) {
    res.status(400).send({
      message: 'Student ID length invalid.'
    });
    return;
  }

  let foundStudent = {};
  // Attempts to find the student.
  id = parseInt(id);
  if (len == 9) {
    foundStudent = await prisma.students.findUnique({ where: { osis: id } });
  }
  if (len == 13) {
    foundStudent = await prisma.students.findUnique({ where: { uid: id } });
  }
  // If the student cannot be found (meaning the student is not in the system), return an error.
  if (foundStudent == null) {
    res.status(400).send({
      message: 'Could not find student from ID.'
    });
    return;
  }

  // If student is found, attempt to find a meeting where the date is today.
  let meeting = await prisma.meetings.findUnique({
    where: { date: req.body.time }
  });

  // If meeting not found, create a meeting for today.
  if (meeting == null) {
    meeting = await prisma.meetings.create(/*{date: req.body.time}*/);
  }

  // Check if the student has scanned in for todays meeting.
  let scanIn = await prisma.entries.findUnique({
    where: {
      studentId_meetingId: {
        studentId: foundStudent.id,
        meetingId: meeting.id
      }
    }
  });

  // If the student has not, create an attendance entry for them.
  if (scanIn == null) {
    prisma.entries.create({
      data: {
        studentId: foundStudent.id,
        meetingId: meeting.id,
      }
    }).catch(err => console.log(err));
    console.log(await prisma.entries.findMany().then(res => res));
    
    res.send({
      name: foundStudent.name,
      time: new Date(req.body.time).toLocaleTimeString()
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
