const Sequelize  = require("./database");

module.exports = async (sequelizeInstance, Sequelize) => {
    const entry = await sequelizeInstance.define(
        "entry", {
            studentId: {
                type: Sequelize.INTEGER
            },
            meetingId: {
                type: Sequelize.INTEGER
            }
        },
        { timestamps: false }
    )
    return entry;
}