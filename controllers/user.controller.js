const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = db["user"];

// Create and Save a new Book
exports.create = (req, res) => {
    const isEmailExist = User.findOne({ email: req.body.email });
    if (isEmailExist) {
        return res.status(400).json({error: 'Email ya registrado'})
    }

    const password = bcrypt.hash(req.body.password.toString(), 10);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: password
    });
    try {
        const savedUser = user.save();
        res.json({
            error: null,
            data: savedUser
        })
    } catch (error) {
        res.status(400).json({error})
    }
};


// Find a single Book with an id
exports.findOne = async (req, res) => {
    const user = await User.findByPk(req.user.user_id);
    res.json({
        error: null,
        data: {user}
    });
};

// Find a single Book with an id
exports.login = async (req, res) => {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) return res.status(400).json({error: 'Usuario no encontrado'});
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).json({error: 'contraseña no válida'})
    // create token
    let token = jwt.sign({email: user.email, user_id: user.id}, process.env.TOKEN_SECRET, {expiresIn: '2h'});
    // const maxAge 2 hours in miliseconds
    const maxAge = 2 * 60 * 60 * 1000;
    res.cookie('token', token, {maxAge: maxAge, httpOnly: true, expires: new Date(Date.now() + maxAge)});
    res.json({
        error: null,
        data: {email: user.email}
    })
};