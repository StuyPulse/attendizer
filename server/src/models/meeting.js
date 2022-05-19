const Sequelize = require('./database');

module.exports = async (sequelize, Sequelize) => {
  const today = new Date(new Date(Date.now()).toDateString());
  const meeting = await sequelize.define(
    'meeting',
    {
      date: {
        // type: Sequelize.INTEGER,
        type: Sequelize.DATEONLY,
        defaultValue: today,
        unique: true
      }
    },
    { timestamps: false }
  );

  return meeting;
};
