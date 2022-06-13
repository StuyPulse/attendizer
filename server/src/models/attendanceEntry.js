const Sequelize = require('./database');

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
