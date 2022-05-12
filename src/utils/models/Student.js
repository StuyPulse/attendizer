const { Sequelize } = require("../database");

module.exports = (sequelizeInstance, Sequelize) => {
    const Student = sequelizeInstance.define(
        "Student", {
            name: {
                type: Sequelize.STRING
            },
            studentID: {
                type: Sequelize.INTEGER
            },
            UUID: {
                type: Sequelize.INTEGER
            },
            meetingsAttended: {
                type: Sequelize.INTEGER
            }
        }
    )
}