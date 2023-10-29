'use strict';

const md5 = require('md5');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert('empresas', [{
        nome: 'tudo',
        razao_social: "nada",
        email: "tudo@nada.com.br",
        telefone: "11910995348",
        status: "ativo",
        endereco: "lugar nenhum",
        password_hash: md5("123456789"),
        cnpj: "18639641000156",
        created_at: new Date(),
        updated_at: new Date(),
      }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('empresas', null, {});
  }
};
