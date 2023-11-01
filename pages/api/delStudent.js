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
  let studentId = req.body.id;
  console.log(req.body);
  const removedStudent = await prisma.students.findUnique({
    where: {
      id: parseInt(studentId)
    }
  });

  if (removedStudent == null) {
    res.status(400).send({
      message: 'Could not find student from ID.'
    });
    return;
  }

  await prisma.students.delete({
    where: {
      id: parseInt(studentId)
    }
  })

  res.send({
    message: "Student Deleted!"
  });
}