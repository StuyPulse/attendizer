const req = require('express/lib/request');
const mysql = require('mysql2');
const Sequelize = require('sequelize');
const sequelize = new Sequelize('sqlite://attendance.sqlite3');

const students = require('./student.js')(sequelize, Sequelize);
const meetings = require('./meeting.js')(sequelize, Sequelize);
const entries = require('./attendanceEntry.js')(sequelize, Sequelize);

try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Initializes the database.
async function initialize() {
  db.students = await students;
  db.meetings = await meetings;
  db.entries = await entries;

  db.students.belongsToMany(db.meetings, { through: db.entries });
  db.meetings.belongsToMany(db.students, { through: db.entries });

  return db;
};

module.exports = initialize;
