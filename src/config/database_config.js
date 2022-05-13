module.exports = {
    HOST: "localhost",
    USER: "root", // doesn't have to be root
    PASSWORD: "", // insert password when set up
    DB: "", // insert database name here when set up
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };