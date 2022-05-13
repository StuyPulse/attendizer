const { Sequelize } = require("../database");

module.exports = (sequelizeInstance, Sequelize) => {
    const entry = sequelizeInstance.define(
        "entry", {
            name: {
                type: Sequelize.STRING
            },
            meetingsAttended: {
                type: Sequelize.INTEGER
            }
        }
    )
}