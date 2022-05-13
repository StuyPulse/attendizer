const { Sequelize } = require("./database");

module.exports = (sequelizeInstance, Sequelize) => {
    const Student = sequelizeInstance.define(
        "Student", {
            name: {
                type: Sequelize.STRING
            },
            studentID: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                unique: true 
            },
            UUID: {
                type: Sequelize.INTEGER,
                unique: true 
            },
            meetingsAttended: {
                type: Sequelize.INTEGER,
                defaultValue: 0 
            }
        }
    )
    return Student;
}