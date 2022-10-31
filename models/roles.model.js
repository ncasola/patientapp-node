const {DataTypes} = require("sequelize");
module.exports = (sequelize, Sequelize) => {
    let Roles;
    return Roles = sequelize.define("roles", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING
        }
    });

};