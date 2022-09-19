module.exports = (app) => {
    const bodyParser = require('body-parser');
    const interface = require("../utils/interfaces/studentInterface.js");

    var router = require("express").Router();

    router.get("/", (req, res) => {
        res.json("Welcome to Attendizer - Backend!!!");
    });
    router.post("/reg", interface.addStudent);
    router.post("/scan", interface.scanID);

    app.use(bodyParser.urlencoded({extended: false }));
    app.use(bodyParser.json());
    app.use("/", router);
}