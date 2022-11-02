const db = require("../models");
const Appointment = db["appointment"];
const Patient = db["patient"];
const Op = db.Sequelize.Op;
const { calculateLimitAndOffset } = require("../helpers/pagination");

// Create and Save a new Appointment
exports.create = (req, res) => {
  // Validate request
  if (!req.body.patientId) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a Appointment
  const appointment = {
    patientId: req.body.patientId,
    dateAppointmentStart: req.body.dateAppointmentStart,
    dateAppointmentEnd: req.body.dateAppointmentEnd,
    status: req.body.status,
    observations: req.body.observations,
  };

  // Save Appointment in the database
  Appointment.create(appointment)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Appointment.",
      });
    });
};

// Retrieve all Appointments from the database.
exports.findAllPaged = (req, res) => {
  const { page, size } = req.query;
  const { offset, limit } = calculateLimitAndOffset(page, size);
  Appointment.findAndCountAll({
    limit: limit,
    offset: offset,
    include: Patient,
    where: {
      dateAppointmentStart: {
        [Op.gt]: new Date(),
      },
    },
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
          err.message || "Some error occurred while retrieving appointments.",
      });
    });
};

exports.findAll = (req, res) => {
  Appointment.findAll({
    include: Patient,
    where: {
      dateAppointmentStart: {
        [Op.gt]: new Date(),
      },
    },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving appointments.",
      });
    });
};

exports.findByUserId = (req, res) => {
  const id = req.params.id;
  Appointment.findAll({
    where: {
      patientId: id,
      dateAppointmentStart: {
        [Op.gt]: new Date(),
      },
    },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving appointments.",
      });
    });
};

// Find a single Appointment with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Appointment.findByPk(id, { include: Patient })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Appointment with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Appointment with id=" + id,
      });
    });
};

// Update a Appointment by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Appointment.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Appointment was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Appointment with id=${id}. Maybe Appointment was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Appointment with id=" + id,
      });
    });
};

// Delete a Appointment with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Appointment.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Appointment was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Appointment with id=${id}. Maybe Appointment was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Appointment with id=" + id,
      });
    });
};

// Delete all Appointments from the database.
exports.deleteAll = (req, res) => {
  Appointment.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Appointments were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all appointments.",
      });
    });
};
