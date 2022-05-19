const Sequelize = require('./database');

module.exports = async (sequelize, Sequelize) => {
  const entry = await sequelize.define(
    'entry',
    {
      // studentId: {
      //     type: Sequelize.INTEGER
      // },
      // meetingId: {
      //     type: Sequelize.INTEGER
      // }
    },
    { timestamps: false }
  );
  return entry;
};
