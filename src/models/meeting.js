const Sequelize = require('./database');

module.exports = async (sequelizeInstance, Sequelize) => {
  const meeting = await sequelizeInstance.define(
    'meeting',
    {
      Id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true
      },
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
