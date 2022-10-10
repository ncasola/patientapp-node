const verifyToken = require("../middlewares/verifyToken");
module.exports = app => {
  const patients = require("../controllers/patient.controller.js");
  const verifyToken = require('../middlewares/verifyToken');
  const router = require("express").Router();

  // Create a new Patient
  router.post("/", verifyToken, patients.create);

  // Retrieve all Patients
  router.get("/", verifyToken, patients.findAll);

  // Retrieve a single Patient with id
  router.get("/:id", verifyToken, patients.findOne);

  // Update a Patient with id
  router.put("/:id", verifyToken, patients.update);

  // Delete a Patient with id
  router.delete("/:id", verifyToken, patients.delete);

  // Delete all Patients
  router.delete("/", verifyToken, patients.deleteAll);
  app.use('/api/patients', router);
};
