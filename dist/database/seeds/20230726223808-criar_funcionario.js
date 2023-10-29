"use strict";'use strict';

const md5 = require('md5');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert('funcionarios', [{
        nome: "jhonattan",
        cpf: "74993813902",
        email: 'jhonattan246rocha@gmail.com',
        departamento: "nada",
        dtnasc: null,
        telefone: "11910995348",
        cargo: null,
        nivel: 1,
        password_hash: md5("123"),
        id_empresa: 5,
        created_at: new Date(),
        updated_at: new Date(),
      }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('funcionarios', null, {});
  }
};
