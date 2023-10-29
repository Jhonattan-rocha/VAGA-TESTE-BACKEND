"use strict";'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.sequelize.query(`
      insert into statuses(nome, created_at, updated_at) values("Em andamento", current_date(), current_date());
      insert into statuses(nome, created_at, updated_at) values("Concluido", current_date(), current_date());
      insert into statuses(nome, created_at, updated_at) values("Em aberto", current_date(), current_date());
      insert into statuses(nome, created_at, updated_at) values("Não resolvido", current_date(), current_date());
      `, { type: queryInterface.sequelize.QueryTypes.INSERT });
  },

  async down (queryInterface, Sequelize) {
      await queryInterface.bulkDelete('statuses', null, {});
  }
};
