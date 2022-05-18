const req = require('express/lib/request');
const mysql = require('mysql2');
const Sequelize = require('sequelize');
const databaseConfig = require('../config/database_config.js');
const students = require('./student.js')(sequelizeInstance, Sequelize);
const meetings = require('./meeting.js')(sequelizeInstance, Sequelize);
const entries = require('./attendanceEntry.js')(sequelizeInstance, Sequelize);

const sequelizeInstance = new Sequelize('sqlite::memory:');

try {
  sequelizeInstance.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

const db = {};

db.Sequelize = Sequelize;
db.sequelizeInstance = sequelizeInstance;

(async () => {
  db.students = await students;
  db.meetings = await meetings;
  db.entries = await entries;

  db.students.belongsToMany(db.meetings, { through: db.entries });
  db.meetings.belongsToMany(db.students, { through: db.entries });
})();

module.exports = db;
