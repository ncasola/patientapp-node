const permit = require("../middlewares/authorization");
const patients = require("../controllers/patient.controller.js");
module.exports = app => {
  const router = require("express").Router();

  // Create a new Patient
  router.post("/", permit('admin', 'worker'), patients.create);

  // Retrieve all Patients with pagination
  router.get("/", permit('admin', 'worker'), patients.findAllPaged);

  // Retrieve all Patients
  router.get("/all", permit('admin', 'worker'), patients.findAll);

  // Retrieve a single Patient with id
  router.get("/:id", permit('admin', 'worker'), patients.findOne);

  // Update a Patient with id
  router.put("/:id", permit('admin', 'worker'), patients.update);

  // Delete a Patient with id
  router.delete("/:id", permit('admin', 'worker'), patients.delete);

  // Delete all Patients
  router.delete("/", permit('admin', 'worker'), patients.deleteAll);
  app.use('/api/patients', router);
};
