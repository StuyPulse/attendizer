const req = require('express/lib/request');
const res = require('express/lib/response');
const dbinit = require('../../models/database.js');
const student = require('../../models/student.js');

module.exports = async (req, res) => {
  const db = await dbinit();
  const students = await db.students.findAll({raw : true});
  // console.log(students);
  if(students != null){
    res.send(students);
    return;
  }
  res.status(500).send({
    message: "Could not fetch students!"
  })
  // res.status(200).send(
  // {
  //   message: 'Students printed!'
  // }
  // );
};