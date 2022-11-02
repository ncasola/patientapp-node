'use strict';
const { faker } = require('@faker-js/faker');
/** @type {import('sequelize-cli').Migration} */

const patients = [...Array(100)].map((patient) => (
  {
    name: faker.name.firstName(),
    lastname: faker.name.lastName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    address: faker.address.streetAddress(),
    city: faker.address.city(),
    state: faker.address.state(),
    country: faker.address.country(),
    zip: faker.address.zipCode(),
    createdAt: new Date(),
    updatedAt: new Date()
  }
));

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('patients', patients, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("patients", null, {});
  }
};
