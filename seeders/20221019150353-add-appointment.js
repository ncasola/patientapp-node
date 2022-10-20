'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const newDateStart = new Date();
    const newDateEnd = new Date(newDateStart.getTime() + 3600000);
    await queryInterface.bulkInsert(
      "appointments",
      [
        {
          patientId: 1,
          dateAppointmentStart: new Date(),
          dateAppointmentEnd: newDateEnd,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("appointments", null, {});
  }
};
