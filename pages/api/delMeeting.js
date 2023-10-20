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
  const removedMeeting = await prisma.meetings.findUnique({
      where: {
        id: parseInt(req.body.meetingId)
      }
  });

  if(removedMeeting == null){
      res.status(400).send({
          message: 'Could not find Meeting from ID.'
      });
      return;
  }
  
  await prisma.entries.delete({
    where: {
      id: removedMeeting.id
    }
  })
  
  res.send({
      message: "Meeting Deleted!"
  });
}