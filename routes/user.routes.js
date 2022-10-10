const users = require("../controllers/user.controller");
module.exports = app => {
    const users = require("../controllers/user.controller.js");
    const verifyToken = require('../middlewares/verifyToken');
    const router = require("express").Router();

    // Create a new User
    router.post("/register", users.create);

    // Login Users
    router.post("/login", users.login);

    // Retrieve all Users
    router.get("/profile", verifyToken, users.findOne);

    app.use('/api/users', router);
};