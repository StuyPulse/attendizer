const Sequelize = require('./database');

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
