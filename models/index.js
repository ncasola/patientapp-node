const Sequelize = require("sequelize");
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite'
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.patients = require("./patient.model.js")(sequelize, Sequelize);
db.users = require("./user.model.js")(sequelize, Sequelize);
db.appointments = require("./appointment.model.js")(sequelize, Sequelize);

db.patients.hasMany(db.appointments);
db.appointments.belongsTo(db.patients);

module.exports = db;
