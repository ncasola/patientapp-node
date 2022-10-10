const {DataTypes} = require("sequelize");
module.exports = (sequelize, Sequelize) => {
    let User;
    return User = sequelize.define("user", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        password: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        }
    });

};