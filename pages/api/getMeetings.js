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
  // Grabs all students from the database.
  // Raw tells it to grab all information, including meetings attended.
  const meetings = await prisma.meetings.findMany({
      include: {
        entries: true
      }
    });
  if(meetings != null){
    res.send(meetings);
    return;
  }
  res.status(500).send({
    message: "Could not fetch students!"
  })
};