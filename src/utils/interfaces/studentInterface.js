const req = require("express/lib/request");
const res = require("express/lib/response");
const db = require("../models");
const studentList = db.students;
const entry = db.attendanceEntry;

exports.addStudent = (req, res) => {
    if(!req.body.name){
        res.status(400).send({
            message: "Cannot be empty!"
        });
        return;
    }

    if(req.body.studentID.toString() != 9){
        res.status(400).send({
            message: "Student ID length invalid."
        });
        return;
    }

    if(req.body.UUID.length.toString() != 13){
        res.status(400).send({
            message: "Student UUID length invalid."
        });
        return;
    }

    const newStudent = {
        name: req.body.name,
        studentID: req.body.studentID,
        UUID: req.body.UUID,
    };

    await studentList.create(newStudent, { fields: ['name', 'studentID', 'UUID'] });
}

exports.scanID = (req, res) => {
    const len = req.body.ID.toString().length;
    if(len != 9 || len != 13){
        res.status(400).send({
            message: "Student ID length invalid."
        });
    }
    if(len == 9){
        student = studentList.findbyPK(id);
        await studentList.update({  }, {
            where: {
                ID: req.body.ID
            }
          });
    }
    if(len == 13){

    }
}