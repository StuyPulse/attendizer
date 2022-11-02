const req = require('express/lib/request');
const res = require('express/lib/response');
const dbinit = require('../../models/database.js');
const meeting = require('../../models/student.js');

module.exports = async (req, res) => {
    const db = await dbinit();

    console.log(req.body);
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