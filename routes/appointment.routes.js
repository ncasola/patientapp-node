const verifyToken = require("../middlewares/verifyToken");
module.exports = app => {
  const appointments = require("../controllers/appointment.controller.js");
  const verifyToken = require('../middlewares/verifyToken');
  const router = require("express").Router();

  // Create a new Appointment
  router.post("/", verifyToken, appointments.create);

  // Retrieve all Appointments with pagination
  router.get("/", verifyToken, appointments.findAllPaged);

  // Retrieve all Appointments
  router.get("/all", verifyToken, appointments.findAll);

  // Retrieve a single Appointment with id
  router.get("/:id", verifyToken, appointments.findOne);

  // Update a Appointment with id
  router.put("/:id", verifyToken, appointments.update);

  // Delete a Appointment with id
  router.delete("/:id", verifyToken, appointments.delete);

  // Delete all Appointments
  router.delete("/", verifyToken, appointments.deleteAll);
  app.use('/api/appointments', router);
};