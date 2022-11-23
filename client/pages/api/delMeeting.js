const dbinit = require('../../models/database.js');
const meeting = require('../../models/student.js');
require('dotenv').config();
module.exports = async (req, res) => {
  if (req.body.key != process.env.KEY) {
    res.status(400).send({
      message: 'Invalid key!'
    });
    return;
  }
  const db = await dbinit();
  const removedMeeting = await db.meetings.findOne({
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