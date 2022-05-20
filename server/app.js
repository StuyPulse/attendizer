const express = require('express');
const app = express();
const dbinit = require("./src/models/database.js");
require("./src/routes/routes.js")(app);

const testFuncs = require("./src/utils/interfaces/studentInterface.js");

const port = process.env.PORT || 4000;

(async () => {
  const db = await dbinit();
  await db.sequelize.sync({force : false});
})();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
