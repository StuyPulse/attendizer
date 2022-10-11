const req = require('express/lib/request');
const res = require('express/lib/response');
const dbinit = require('../../models/database.js');
const meetings = require('../../models/meeting.js');

module.exports = async (req, res) => {
  const db = await dbinit();
  // Grabs all students from the database.
  // Raw tells it to grab all information, including meetings attended.
  const meetings = await db.meetings.findAll({raw : true});
  if(meetings != null){
    res.send(meetings);
    return;
  }
  res.status(500).send({
    message: "Could not fetch students!"
  })
};