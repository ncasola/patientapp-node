const users = require("../controllers/user.controller");
const permit = require("../middlewares/authorization");
module.exports = (app) => {
  const users = require("../controllers/user.controller.js");
  const router = require("express").Router();

  // Create a new User
  router.post("/", permit("admin"), users.create);

  // Public routes
  router.post("/public/login", users.login);

  // Retrieve all Users
  router.get("/", permit("admin"), users.findAll);

  // Retrieve a single User with id
  router.get("/:id", permit("admin"), users.findOne);

  // Update a User with id
  router.put("/:id", permit("admin"), users.update);

  // Delete a User with id
  router.delete("/:id", permit("admin"), users.delete);

  // Delete all Users
  router.delete("/", permit("admin"), users.deleteAll);

  // Profile
  router.post("/profile", permit('admin', 'worker'), users.profile);

  app.use("/api/users", router);
};
