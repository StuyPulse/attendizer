const req = require('express/lib/request');
const res = require('express/lib/response');
const dbinit = require('../../models/database.js');
const student = require('../../models/student.js');

exports.addOne = async (req, res) => {
  students = req.body.students;

  finalMessage = "";

  console.log(req.body);

  if (!req.body.students) {
    res.status(400).send({
      message: 'Array not sent!'
    });
    return;
  }

  const db = await dbinit();

  for(let i = 0; i<students.length; i++){
    if (!students[i].name) {
      res.status(400).send({
        message: '[' + i + '] ' + 'Must need name!'
      });
      continue;
    }

    if (students[i].osis.toString().length != 9) {
      res.status(400).send({
        message: '[' + i + '] ' + 'Student ID length invalid.'
      });
      continue;
    }

    if (students[i].uid.toString().length != 13) {
      res.status(400).send({
        message: '[' + i + '] ' + 'Student UID length invalid.'
      });
      continue;
    }

    const newStudent = {
      name: students[i].name,
      osis: students[i].osis,
      uid: students[i].uid
    };
  
    await db.students
    .create(newStudent, { fields: ['name', 'osis', 'uid'] })
    .catch((err) => {
      finalMessage += i + ", ";
    });
  }

  if(finalMessage != ""){
    res.status(500).send({
      message: finalMessage + "Failed to load, likely due to these OSIS or UID already existing in the system. "
    });
  } else {
    res.status(500).send({
      message: "All students loaded!"
    });
  }
};