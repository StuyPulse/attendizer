const req = require("express/lib/request");
const res = require("express/lib/response");
const db = require("../../models");
const studentList = db.students;
const entry = db.attendanceEntry;

exports.addStudent = (req, res) => {
    if(!req.body.name){
        res.status(400).send({
            message: "Cannot be empty!"
        });
        return;
    }

    if(req.body.osis.toString() != 9){
        res.status(400).send({
            message: "Student ID length invalid."
        });
        return;
    }

    if(req.body.uid.length.toString() != 13){
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

    studentList.create(newStudent, { fields: ['name', 'osis', 'uid'] });
}

exports.scanID = (req, res) => {
    const id = req.body.id;
    const len = id.toString().length;
    if(len != 9 || len != 13){
        res.status(400).send({
            message: "Student ID length invalid."
        });
        return;
    }
    if(len == 9){
        const student = db.students.findOne({where: {osis: id}});
        if(student == null) {
            res.status(400).send({
                message: "Could not find student from osis."
            });
            return;
        }

        const meeting = db.meetings.findOne({where: {date: new Date(new Date(Date.now()).toDateString())}});
    }
    if(len == 13){

    }
}
