const Sequelize = require('./database');

module.exports = async (sequelizeInstance, Sequelize) => {
  const student = await sequelizeInstance.define(
    'student',
    {
      Id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        unique: true
      },
      name: {
        type: Sequelize.STRING
      },
      uid: {
        type: Sequelize.INTEGER,
        unique: true
      }
    },
    { timestamps: false }
  );

  return student;
};
