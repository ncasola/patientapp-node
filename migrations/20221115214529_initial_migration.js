const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * createTable() => "patients", deps: []
 * createTable() => "roles", deps: []
 * createTable() => "users", deps: []
 * createTable() => "appointments", deps: [patients]
 * createTable() => "user_roles", deps: [users, roles]
 *
 */

const info = {
  revision: 1,
  name: "initial_migration",
  created: "2022-11-15T21:45:29.702Z",
  comment: "",
};

const migrationCommands = (transaction) => [
  {
    fn: "createTable",
    params: [
      "patients",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          primaryKey: true,
          autoIncrement: true,
        },
        name: { type: Sequelize.STRING, field: "name" },
        lastname: { type: Sequelize.STRING, field: "lastname" },
        email: { type: Sequelize.STRING, field: "email" },
        phone: { type: Sequelize.STRING, field: "phone" },
        address: { type: Sequelize.STRING, field: "address" },
        city: { type: Sequelize.STRING, field: "city" },
        state: { type: Sequelize.STRING, field: "state" },
        country: { type: Sequelize.STRING, field: "country" },
        zip: { type: Sequelize.STRING, field: "zip" },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "roles",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          primaryKey: true,
          autoIncrement: true,
        },
        name: { type: Sequelize.STRING, field: "name" },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "users",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          primaryKey: true,
          autoIncrement: true,
        },
        name: { type: Sequelize.STRING, field: "name" },
        lastname: { type: Sequelize.STRING, field: "lastname" },
        password: { type: Sequelize.STRING, field: "password" },
        email: { type: Sequelize.STRING, field: "email" },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "appointments",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          primaryKey: true,
          autoIncrement: true,
        },
        patientId: {
          type: Sequelize.INTEGER,
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          references: { model: "patients", key: "id" },
          allowNull: true,
          field: "patientId",
        },
        dateAppointmentStart: {
          type: Sequelize.DATE,
          field: "dateAppointmentStart",
        },
        dateAppointmentEnd: {
          type: Sequelize.DATE,
          field: "dateAppointmentEnd",
        },
        status: { type: Sequelize.STRING, field: "status" },
        observations: { type: Sequelize.STRING, field: "observations" },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "user_roles",
      {
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
        userId: {
          type: Sequelize.INTEGER,
          field: "userId",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          references: { model: "users", key: "id" },
          primaryKey: true,
        },
        roleId: {
          type: Sequelize.INTEGER,
          field: "roleId",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          references: { model: "roles", key: "id" },
          primaryKey: true,
        },
      },
      { transaction },
    ],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: "dropTable",
    params: ["appointments", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["patients", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["roles", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["users", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["user_roles", { transaction }],
  },
];

const pos = 0;
const useTransaction = true;

const execute = (queryInterface, sequelize, _commands) => {
  let index = pos;
  const run = (transaction) => {
    const commands = _commands(transaction);
    return new Promise((resolve, reject) => {
      const next = () => {
        if (index < commands.length) {
          const command = commands[index];
          console.log(`[#${index}] execute: ${command.fn}`);
          index++;
          queryInterface[command.fn](...command.params).then(next, reject);
        } else resolve();
      };
      next();
    });
  };
  if (useTransaction) return queryInterface.sequelize.transaction(run);
  return run(null);
};

module.exports = {
  pos,
  useTransaction,
  up: (queryInterface, sequelize) =>
    execute(queryInterface, sequelize, migrationCommands),
  down: (queryInterface, sequelize) =>
    execute(queryInterface, sequelize, rollbackCommands),
  info,
};
