const req = require("express/lib/request");
const res = require("express/lib/response");
const dbinit = require("../../models/database.js");
const db = (async () => {await dbinit()})();

exports.addStudent = async (req, res) => {
    // const db = await dbinit();
    console.log(req.body);
    if(!req.body.name){
        res.status(400).send({
            message: "Must need name!"
        });
        return;
    }

    if(req.body.osis.toString().length != 9){
        res.status(400).send({
            message: "Student ID length invalid."
        });
        return;
    }

    if(req.body.uid.length != 13){
        res.status(400).send({
            message: "Student UID length invalid."
        });
        return;
    }

    const newStudent = {
        name: req.body.name,
        osis: req.body.osis,
        uid: req.body.uid,
    };

    await db.students.create(newStudent, { fields: ['name', 'osis', 'uid'] }).catch(err => {
        res.status(500).send({
            message:
            err.message + ", likely due to this OSIS or UID already existing in the system."
        })
    });
}

exports.scanID = async (req, res) => {
    const id = req.body.id;
    const len = id.toString().length;
    if(len != 9 || len != 13){
        res.status(400).send({
            message: "Student ID length invalid."
        });
        return;
    }
    if(len == 9){
        const student = await db.students.findOne({where: {osis: id}});
    }
    if(len == 13){
        const student = await db.students.findOne({where: {osis: id}});
    }
    if(student == null) {
        res.status(400).send({
            message: "Could not find student from osis."
        });
        return;
    }

    const meeting = await db.meetings.findOne({where: {date: new Date(new Date(Date.now()).toDateString())}});
    if(meeting == null) {
        meeting = await db.meetings.create({});
    }

    db.entries.create(student.studentId, meeting.meetingId);
}