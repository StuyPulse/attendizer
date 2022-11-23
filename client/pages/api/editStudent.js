const req = require('express/lib/request');
const res = require('express/lib/response');
const dbinit = require('../../models/database.js');
const student = require('../../models/student.js');
require('dotenv').config();

module.exports = async (req, res) => {
  if (req.body.key != process.env.KEY) {
    res.status(400).send({
      message: 'Invalid key!'
    });
    return;
  }
  const db = await dbinit();
  // Takes in the first element of the array sent, as the frontend only sends arrays through the route.
  // This is done as to maintain consistency with the addStudent.

  let editedStudent = req.body.students[0];

  console.log(editedStudent);

  // Checks the updated information to check format.
  if (!editedStudent.name) {
    res.status(400).send({
      message: 'Must need name!'
    });
    return;
  }

  if (editedStudent.osis.toString().length != 9) {
    res.status(400).send({
      message: 'Student ID length invalid.'
    });
    return;
  }

  if (editedStudent.uid.toString().length != 13) {
    res.status(400).send({
      message: 'Student UID length invalid.'
    });
    return;
  }

  // Finds the student based on the unique id assigned on creation.
  const updatedStudent = await db.students.findOne({
    where: {
      id: editedStudent.id
    }
  });

  // If student cannot be found, return an error.
  if (updatedStudent == null) {
    res.status(400).send({
      message: 'Could not find student from ID.'
    });
    return;
  }

  // Otherwise, update the student.
  updatedStudent.set({
    name: editedStudent.name,
    osis: editedStudent.osis,
    uid: editedStudent.uid
  });

  await updatedStudent.save();

  res.send({
    message: "Student Updated!"
  });
};