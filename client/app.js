// const express = require('express');
// const app = express();
// const cors = require('cors');
const dbinit = require('./src/models/database.js');
// app.use(cors());
// require('../server/src/utils/routes.js')(app);

// const testFuncs = require('./src/utils/studentInterface.js');

// const port = process.env.PORT || 4000;

(async () => {
  const db = await dbinit();
  await db.sequelize.sync({ force: false }, { alter: true });
})();

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });