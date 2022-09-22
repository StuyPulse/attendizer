const req = require('express/lib/request');
const res = require('express/lib/response');
const dbinit = require('../../models/database.js');
const student = require('../../models/student.js');

exports.addOne = async (req, res) => {
  students = req.body.students;

  finalMessage = "";

  console.log(req.body);
  if (!req.body.students[0].name) {
    res.status(400).send({
      message: 'Array not sent!'
    });
    return;
  }

  const db = await dbinit();

  for(let i = 0; i<students.length; i++){
    if (!students[i].name) {
      finalMessage += '[' + i + '] ' + 'No name.\n'
      continue;
    }

    if (students[i].osis.toString().length != 9) {
      finalMessage += '[' + i + '] ' + 'Student ID length invalid.\n'
      continue;
    }

    if (students[i].uid.toString().length != 13) {
      finalMessage += '[' + i + '] ' + 'Student UID length invalid.\n'
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
      finalMessage += '[' + i + '] ' + "Failed to load, likely due to this OSIS or UID already existing in the system. ";
    });
  }

  if(finalMessage != ""){
    res.status(500).send({
      message: finalMessage
    });
  } else {
    res.send({
      message: "All students loaded!"
    });
  }
};