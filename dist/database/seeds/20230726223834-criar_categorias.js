"use strict";'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
    insert into categorias(prioridade, nome,  criador, created_at, updated_at) values(1, 'internet', null, current_date(), current_date());
    insert into categorias(prioridade, nome,  criador, created_at, updated_at) values(2, 'Hardware', null, current_date(), current_date());
    insert into categorias(prioridade, nome,  criador, created_at, updated_at) values(2, 'Problema de Software', null, current_date(), current_date());
    insert into categorias(prioridade, nome,  criador, created_at, updated_at) values(5, 'Bug no sistema', null, current_date(), current_date());
    insert into categorias(prioridade, nome,  criador, created_at, updated_at) values(5, 'Sistema indisponpivel', null, current_date(), current_date());
    `, { type: queryInterface.sequelize.QueryTypes.INSERT });
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('categorias', null, {});
  }
};
