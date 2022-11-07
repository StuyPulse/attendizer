const req = require('express/lib/request');
const res = require('express/lib/response');
const dbinit = require('../../models/database.js');
const meeting = require('../../models/student.js');
require('dotenv').config();
module.exports = async (req, res) => {
    const db = await dbinit();
    if (req.body.key != process.env.KEY) {
        res.status(200).send();
        return;
    }
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