const Sequelize = require('./database');

module.exports = async (sequelizeInstance, Sequelize) => {
  const Student = await sequelizeInstance.define('Student', {
    name: {
      type: Sequelize.STRING
    },
    studentID: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      unique: true
    },
    UID: {
      type: Sequelize.INTEGER,
      unique: true
    }
  });
};
