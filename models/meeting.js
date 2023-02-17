const Sequelize = require('./database');

// This is how each indivudal meeting is stored. These are done so we can check attendance for an individual meeting.
// This is conencted to the students table through attendanceEntry.

module.exports = async (sequelize, Sequelize) => {
  // Sets the date object to just the date without time, ensuring no meetings are created for the same day.
  const today = new Date();
  const meeting = await sequelize.define(
    'meeting',
    {
      date: {
        type: Sequelize.DATEONLY,
        defaultValue: today,
        unique: true
      }
    }
  );

  return meeting;
};
