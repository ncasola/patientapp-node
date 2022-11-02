'use strict';
const { faker } = require('@faker-js/faker');
/** @type {import('sequelize-cli').Migration} */

// for loop to create 200 appointments
const appointments = [];
for (let i = 1; i < 200; i++) {
  const dateAppointmentStart = faker.date.future();
  // add 1 hour to dateAppointmentStart
  const dateAppointmentEnd = new Date(dateAppointmentStart.getTime() + 3600000);
  appointments.push({
    patientId: faker.datatype.number({ min: 1, max: 100 }),
    dateAppointmentStart: dateAppointmentStart,
    dateAppointmentEnd: dateAppointmentEnd,
    status: "Pendiente",
    observations: faker.lorem.sentence(),
    createdAt: new Date(),
    updatedAt: new Date()
  });
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('appointments', appointments, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("appointments", null, {});
  }
};
