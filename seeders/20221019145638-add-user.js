"use strict";
const { faker } = require('@faker-js/faker');
const bcrypt = require("bcrypt");
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    const password = await bcrypt.hash("123456", 10);
    const users = [...Array(1)].map( () => (
      {
        name: faker.name.firstName(),
        lastname: faker.name.lastName(),
        email: "ncasolajimenez@gmail.com",
        password: password,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ));
    await queryInterface.bulkInsert("users", users, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
