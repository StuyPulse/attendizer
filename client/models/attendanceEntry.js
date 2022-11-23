const Sequelize = require('./database');

// This is the through table in which meetings and students are connected. Whenever a student swipes successfully, one of these will be created.
module.exports = async (sequelize, Sequelize) => {
  const entry = await sequelize.define(
    'entry',
    {
      scannedOut: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      timeIn: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    }
  );
  return entry;
};
