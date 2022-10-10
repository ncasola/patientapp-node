const {DataTypes} = require("sequelize");
module.exports = (sequelize, Sequelize) => {
  let appointment;
  return appointment = sequelize.define("appointment", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    patientId: {
      type: DataTypes.INTEGER
    },
    dateAppointment: {
        type: DataTypes.DATE
    },
    status: {
        type: DataTypes.STRING
    },
    observations: {
        type: DataTypes.STRING
    }
  });

};