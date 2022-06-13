const Sequelize = require('./database');

module.exports = async (sequelize, Sequelize) => {
  const entry = await sequelize.define(
    'entry',
    {
      // scanIn: {
      //   type: Sequelize.BOOLEAN,
      //   primaryKey: true
      // }
      // studentId: {
      //     type: Sequelize.INTEGER
      // },
      // meetingId: {
      //     type: Sequelize.INTEGER
      // }
    }
  );
  return entry;
};
