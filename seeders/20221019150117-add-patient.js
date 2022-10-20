'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "patients",
      [
        {
          name: "Juan",
          lastName: "Perez",
          email: "nestor@gmail.com",
          phone: "671223155",
          address: "Pasaje 1",
          city: "Madrid",
          state: "Madrid",
          zip: "28001",
          country: "España",
          createdAt: new Date(),
          updatedAt: new Date(),

        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("patients", null, {});
  }
};
