const appointments = require("../controllers/appointment.controller.js");
const permit = require("../middlewares/authorization");
module.exports = app => {
  const router = require("express").Router();

  // Create a new Appointment
  router.post("/", permit('admin', 'worker'), appointments.create);

  // Retrieve all Appointments with pagination
  router.get("/", permit('admin', 'worker'), appointments.findAllPaged);

  // Retrieve all Appointments
  router.get("/all", permit('admin', 'worker'), appointments.findAll);

  // Retrieve a single Appointment with id
  router.get("/:id", permit('admin', 'worker'), appointments.findOne);

  // Update a Appointment with id
  router.put("/:id", permit('admin', 'worker'), appointments.update);

  // Delete a Appointment with id
  router.delete("/:id", permit('admin', 'worker'), appointments.delete);

  // Delete all Appointments
  router.delete("/", permit('admin', 'worker'), appointments.deleteAll);
  app.use('/api/appointments', router);
};