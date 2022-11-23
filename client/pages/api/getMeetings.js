const req = require('express/lib/request');
const res = require('express/lib/response');
const dbinit = require('../../models/database.js');
const meetings = require('../../models/meeting.js');

// const meetings = require('../../models/attendanceEntry.js');

module.exports = async (req, res) => {
  if (req.body.key != process.env.KEY) {
    res.status(400).send({
      message: 'Invalid key!'
    });
    return;
  }
  const db = await dbinit();
  // Grabs all students from the database.
  // Raw tells it to grab all information, including meetings attended.
  const meetings = await db.meetings.findAll({
      raw : true,
      include: db.students
    });
  if(meetings != null){
    res.send(meetings);
    return;
  }
  res.status(500).send({
    message: "Could not fetch students!"
  })
};