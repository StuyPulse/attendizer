import { PrismaClient } from '@prisma/client';
 
const prisma = new PrismaClient();

module.exports = async (req, res) => {
  if (req.body.key != process.env.KEY) {
    res.status(400).send({
      message: 'Invalid key!'
    });
    return;
  }

  // Grabs all students from the database.
  // Raw tells it to grab all information, including meetings attended.
  const students = await prisma.students.findMany();
  if(students != null){
    res.json(students);
    return;
  }
  res.status(500).send({
    message: "Could not fetch students!"
  })
};