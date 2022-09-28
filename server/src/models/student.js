const Sequelize = require('./database');

// Stores each student, allows us to see what meetings they have attended, as well as storing their osis, uid, and name for when they scan.

module.exports = async (sequelize, Sequelize) => {
  const student = await sequelize.define(
    'student',
    {
      name: {
        type: Sequelize.STRING
      },
      osis: {
        type: Sequelize.INTEGER,
        unique: true
      },
      uid: {
        type: Sequelize.INTEGER,
        unique: true
      }
    }
  );

  return student;
};
