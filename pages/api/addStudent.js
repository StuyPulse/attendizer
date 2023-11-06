import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

require('dotenv').config();

module.exports = async (req, res) => {
  if (req.body.key != process.env.KEY) {
    res.status(400).send({
      message: 'Invalid key!'
    });
    return;
  }
  let students = req.body.students;
  // This is used to avoid errors with changing the result after sending it.
  let finalMessage = '';

  // console.log(req.body);

  // Loops through an array of students, checking if their information is correctly formatted.
  // This will then add that student to the database.

  for (let i = 0; i < students.length; i++) {
    if (!students[i].name) {
      finalMessage += '[' + i + '] ' + 'No name.\n';
      continue;
    }

    if (students[i].osis.toString().length != 9) {
      finalMessage += '[' + i + '] ' + 'Student ID length invalid.\n';
      continue;
    }

    if (students[i].uid.toString().length != 13) {
      finalMessage += '[' + i + '] ' + 'Student UID length invalid.\n';
      continue;
    }

    const newStudent = {
      name: students[i].name,
      osis: students[i].osis,
      uid: students[i].uid
    };

    await prisma.students
      .create({
        data: {
          name: newStudent.name,
          osis: parseInt(newStudent.osis),
          uid: parseInt(newStudent.uid)
        }
      })
      .catch((err) => {
        finalMessage +=
          'Failed to load, likely due to this OSIS or UID already existing in the system. ';
      });
  }

  // Returns errors, or if there are no errors, sends back a positive result.
  if (finalMessage != '') {
    res.status(500).send({
      message: finalMessage
    });
  } else {
    res.send({
      message: 'All students loaded!'
    });
  }
};
