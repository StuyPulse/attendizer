const req = require('express/lib/request');
const res = require('express/lib/response');
const dbinit = require('../../models/database.js');
const student = require('../../models/student.js');

module.exports = async (req, res) => {
  const db = await dbinit();
  console.log(req.body);
  if (!req.body.name) {
    res.status(400).send({
      message: 'Must need name!'
    });
    return;
  }

  if (req.body.osis.toString().length != 9) {
    res.status(400).send({
      message: 'Student ID length invalid.'
    });
    return;
  }

  if (req.body.uid.toString().length != 13) {
    res.status(400).send({
      message: 'Student UID length invalid.'
    });
    return;
  }

  const updatedStudent = db.students.findOne({
    where: {
      id: req.id
    }
  });

  if (updatedStudent == null) {
    res.status(400).send({
      message: 'Could not find student from ID.'
    });
    return;
  }

  updatedStudent.set({
    name: req.body.name,
    osis: req.body.osis,
    uid: req.body.uid
  });

  await updatedStudent.save();
};