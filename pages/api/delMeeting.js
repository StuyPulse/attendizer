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
  const removedMeeting = await primsa.meetings.findOne({
      where: {
        id: req.body.meetingId
      }
  });

  if(removedMeeting == null){
      res.status(400).send({
          message: 'Could not find Meeting from ID.'
      });
      return;
  }
  
  await removedMeeting.destroy();
  
  res.send({
      message: "Meeting Deleted!"
  });
}