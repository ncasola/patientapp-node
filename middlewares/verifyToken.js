const jwt = require('jsonwebtoken');

require('dotenv').config()

function verifyToken(req, res, next) {
    console.log(req)
    const authCookie = req.cookies.token;
    if (authCookie == null) return res.sendStatus(401)

    jwt.verify(authCookie, process.env.TOKEN_SECRET, (err, user) => {

        if (err) return res.sendStatus(403)

        req.user = user

        next()
    })
}

module.exports = verifyToken;