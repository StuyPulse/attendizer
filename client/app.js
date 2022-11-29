const dbinit = require('./models/database.js');

(async () => {
  const db = await dbinit();
  await db.sequelize.sync({ force: false }, { alter: true });
})();

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
