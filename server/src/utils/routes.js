module.exports = (app) => {
    const bodyParser = require('body-parser');

    const addStudent = require("./interface/addStudent.js");
    const editStudent = require("./interface/editStudent.js");
    const scanIn = require("./interface/scanIn.js");
    const getStudents = require("./interface/getStudents.js");
    const getMeetings = require("./interface/getMeetings.js");
    const deleteStudent = require("./interface/delStudent.js");
    const deleteMeeting = require("./interface/delMeeting.js");
    var router = require("express").Router();

    router.get("/", (req, res) => {
        res.json("Welcome to Attendizer - Backend!!!");
    });
    router.post("/reg", addStudent);
    router.post("/edit", editStudent);
    router.post("/scan", scanIn);
    router.get("/sList", getStudents);
    router.get("/mList", getMeetings);
    router.post("/delete", deleteStudent);
    router.post("/delMeeting", deleteMeeting);
    app.use(bodyParser.urlencoded({extended: false }));
    app.use(bodyParser.json());
    app.use("/", router);
}