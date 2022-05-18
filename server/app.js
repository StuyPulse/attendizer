const express = require('express');
const app = express();
const db = require("./src/models/database.js");

const port = process.env.PORT || 3000;

(async () => {
  await db.sequelizeInstance.sync({ force: true });

  newStudent = {
    Id: 123123123,
    name: "Vincent Lin",
    uid: 1231231231231
  }

  console.log(db.students)
})();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
