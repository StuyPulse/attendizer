const req = require('express/lib/request');
const res = require('express/lib/response');
const dbinit = require('../../models/database.js');
const student = require('../../models/student.js');
require('dotenv').config();

module.exports = async (req, res) => {
  students = req.body.students;
  if (req.body.key != process.env.KEY) {
    res.status(200).send();
    return;
}
  // This is used to avoid errors with changing the result after sending it.
  finalMessage = "";

  // console.log(req.body);

  const db = await dbinit();

  // Loops through an array of students, checking if their information is correctly formatted.
  // This will then add that student to the database.

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

  // Returns errors, or if there are no errors, sends back a positive result.
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