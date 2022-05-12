const mysql = require('mysql2');
const Sequelize = require('seqelize');
const databaseConfig = require("../config/database_config.js");

const sequelizeInstance = new Sequelize(databaseConfig.DB, databaseConfig.USER, databaseConfig.PASSWORD, {
  host: databaseConfig.HOST,
  dialect: databaseConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: databaseConfig.pool.max,
    min: databaseConfig.pool.min,
    acquire: databaseConfig.pool.acquire,
    idle: databaseConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelizeInstance = sequelizeInstance;

db.students = require("./Student.js")(sequelizeInstance, Sequelize);

module.exports = db;