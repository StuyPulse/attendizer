const req = require('express/lib/request');
const res = require('express/lib/response');
const dbinit = require('../../models/database.js');
const student = require('../../models/student.js');

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
  const students = await db.students.findAll({raw : true});
  if(students != null){
    res.json(students);
    return;
  }
  res.status(500).send({
    message: "Could not fetch students!"
  })
};