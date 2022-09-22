const req = require('express/lib/request');
const res = require('express/lib/response');
const dbinit = require('../../models/database.js');
const student = require('../../models/student.js');

module.exports = async (req, res) => {
  const db = await dbinit();

  editedStudent = req.body.students[0];

  console.log(editedStudent);

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

  const updatedStudent = await db.students.findOne({
    where: {
      id: editedStudent.id
    }
  });

  if (updatedStudent == null) {
    res.status(400).send({
      message: 'Could not find student from ID.'
    });
    return;
  }

  updatedStudent.set({
    name: editedStudent.name,
    osis: editedStudent.osis,
    uid: editedStudent.uid
  });

  await updatedStudent.save();

  res.status(500).send({
    message: "Finishes!"
  });
};