module.exports = (app) => {
    const bodyParser = require('body-parser');

    const addStudent = require("./interface/addStudent.js");
    const scanIn = require("./interface/scanIn.js");
    const getStudents = require("./interface/getStudents.js");

    var router = require("express").Router();

    router.get("/", (req, res) => {
        res.json("Welcome to Attendizer - Backend!!!");
    });
    router.post("/reg", addStudent);
    router.post("/scan", scanIn);
    router.get("/sList", getStudents);

    app.use(bodyParser.urlencoded({extended: false }));
    app.use(bodyParser.json());
    app.use("/", router);
}