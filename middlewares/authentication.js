const jwt = require("jsonwebtoken");
require("dotenv").config();

// middleware for authentication
async function authenticate(req, res, next) {
  const authCookie = req.cookies.token;
  if (req.path === "/api/users/login") {
    next();
  } else {
    if (authCookie == null) return res.sendStatus(401);
    jwt.verify(authCookie, process.env.TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  }
}

module.exports = authenticate;
