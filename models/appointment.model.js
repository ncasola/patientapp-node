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
    dateAppointmentStart: {
        type: DataTypes.DATE
    },
    dateAppointmentEnd: {
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