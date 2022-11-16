const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = db["user"];
const Roles = db["roles"];
const Op = db.Sequelize.Op;

const { calculateLimitAndOffset } = require ('../helpers/pagination');

// Create and Save a new User
exports.create = async (req, res) => {
  const isEmailExist = User.findOne({ email: req.body.email });
  if (isEmailExist) {
    return res.status(400).json({ error: "Email ya registrado" });
  }

  const password = bcrypt.hash(req.body.password.toString(), 10);

  const user = new User({
    name: req.body.name,
    lastname: req.body.lastname,
    email: req.body.email,
    password: password,
  });
  try {
    // save user with roles
    const userRole = req.body.role;
    const savedUser = user.save();
    const role = await Roles.findByPk(userRole);
    await savedUser.setRoles(role);
    res.json({
      error: null,
      data: savedUser,
    });
  } catch (error) {
    res.status(400).json({ error });
  }
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  User.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete User with id=" + id,
      });
    });
};

// Delete all User from the database.
exports.deleteAll = (req, res) => {
  User.destroy({
    where: {},
    truncate: false,
  })

    .then((nums) => {
      res.send({ message: `${nums} Users were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all users.",
      });
    });
};

// Update a User by the id in the request

exports.update = async (req, res) => {
  const id = req.params.id;
  const user = await User.findByPk(req.params.id, {
    include: [
      {
        model: Roles,
        as: "roles",
        attributes: ["id", "name"],
        through: {
          attributes: [],
        },
      },
    ],
  });
  if (!user) return res.status(400).json({ error: "Usuario no encontrado" });
  // update all user attributes which match the ones from the request
  const updatedUser = await user.update(req.body);
  // update user roles
  const userRole = req.body.role;
  const role = await Roles.findByPk(userRole);
  await updatedUser.setRoles(role);
  return res.send({
    message: "Patient was updated successfully.",
  });
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  const { page, size, search, searchBy } = req.query;
  const condition = (search && searchBy) ? { [searchBy]: { [Op.like]: `%${search}%` } } : null;
  const { offset, limit } = calculateLimitAndOffset(page, size);
  User.findAndCountAll({
    where: condition,
    limit: limit,
    offset: offset,
    distinct: true,
    include: [
      {
        model: Roles,
        as: "roles",
        attributes: ["id", "name"],
        through: {
          attributes: [],
        },
      },
    ],
  })
    .then((data) => {
      const { count, rows } = data;
      const response = {
        items: rows,
        totalItems: count,
      };
      res.send(response);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving patients.",
      });
    });
};

// Find a single User with an id
exports.findOne = async (req, res) => {
  const user = await User.findByPk(req.params.id, {
    include: [
      {
        model: Roles,
        as: "roles",
        attributes: ["id", "name"],
        through: {
          attributes: [],
        },
      },
    ],
  });
  if (!user) return res.status(400).json({ error: "Usuario no encontrado" });
  res.send(user);
};

// Find a single User with an id
exports.login = async (req, res) => {
  const user = await User.findOne({
    attributes: ["id", "name", "lastname", "email", "password"],
    include: [
      {
        model: Roles,
        as: "roles",
        attributes: ["id", "name"],
        through: {
          attributes: [],
        },
      },
    ],
    where: { email: req.body.email },
  });
  if (!user) return res.status(400).json({ error: "Usuario no encontrado" });
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(400).json({ error: "contraseña no válida" });
  // create token
  let token = jwt.sign(
    { roles: user.roles, user_id: user.id },
    process.env.TOKEN_SECRET,
    { expiresIn: "2h" }
  );
  // const maxAge 2 hours in miliseconds
  const maxAge = 2 * 60 * 60 * 1000;
  res.cookie("token", token, {
    maxAge: maxAge,
    httpOnly: true,
    expires: new Date(Date.now() + maxAge),
  });
  // delete password from response
  delete user.password;
  res.send(user);
};

exports.profile = async (req, res) => {
  const userId = req.user.user_id;
  const user = await User.findByPk(userId, {
    include: [
      {
        model: Roles,
        as: "roles",
        attributes: ["id", "name"],
        through: {
          attributes: [],
        },
      },
    ],
  });
  if (!user) return res.status(400).json({ error: "Usuario no encontrado", info: userId});
  // update all user attributes which match the ones from the request
  const updatedUser = await user.update(req.body);
  // update user roles
  const userRole = req.body.role;
  const role = await Roles.findByPk(userRole);
  await updatedUser.setRoles(role);
  return res.send({
    message: "Patient was updated successfully.",
  });
};