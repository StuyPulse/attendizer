const req = require("express/lib/request");
const res = require("express/lib/response");
const dbinit = require("../../models/database.js");
const student = require("../../models/student.js");

exports.addStudent = async (req, res) => {
    const db = await dbinit();
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

    if(req.body.uid.toString().length != 13){
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
        return;
    });
}

exports.scanID = async (req, res) => {
    const db = await dbinit();
    const id = req.body.id;
    const len = id.toString().length;
    if(len != 9 && len != 13){
        res.status(400).send({
            message: "Student ID length invalid."
        });
        return;
    }
    if(len == 9){
        foundStudent = await db.students.findOne({where: {osis: id}});
    }
    if(len == 13){
        foundStudent = await db.students.findOne({where: {uid: id}});
    }
    if(foundStudent == null) {
        res.status(400).send({
            message: "Could not find student from osis."
        });
        return;
    }

    meeting = await db.meetings.findOne({where: {date: new Date(new Date().toDateString())}});
    if(meeting == null) {
        meeting = await db.meetings.create({});
    }

    entryExist = await db.entries.findOne({
        where : {
            studentId: foundStudent.id, 
            meetingId: meeting.id
        }
    });

    if(entryExist != null){
        res.status(400).send({
            message: "Student has already swiped in today!"
        });
        return;
    }

    console.log(meeting.id);
    db.entries.create({
        studentId: foundStudent.id, 
        meetingId: meeting.id
    })

    res.send({
        name: foundStudent.name,
        time: new Date().toLocaleTimeString()
    })
}