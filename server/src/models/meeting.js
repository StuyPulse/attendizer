const Sequelize = require('./database');

module.exports = async (sequelize, Sequelize) => {
  const meeting = await sequelize.define(
    'meeting',
    {
      meetingDate: {
        // type: Sequelize.INTEGER,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        unique: true
      }
    },
    { timestamps: false }
  );

  return meeting;
};
