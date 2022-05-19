const express = require('express');
const app = express();
const dbinit = require("./src/models/database.js");
require("./src/routes/routes.js")(app);

const testFuncs = require("./src/utils/interfaces/studentInterface.js");

const port = process.env.PORT || 4000;

(async () => {
  const db = await dbinit();

  newStudent = {
    osis: 123123123,
    name: "Vincent Lin",
    uid: 1231231231231
  }
  newStudent2 = {
    osis: 123123122,
    name: "Anthony",
    uid: 1231231231233
  }


  // db.students.create(newStudent2);
  // await db.sequelize.sync();
  const students = await db.students.findAll();

  newMeeting = db.meetings.create({});

  console.log(await newMeeting);
})();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
