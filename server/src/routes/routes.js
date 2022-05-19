module.exports = (app) => {
    const interface = require("../utils/interfaces/studentInterface.js");

    var router = require("express").Router();

    router.post("/reg", interface.addStudent);
}