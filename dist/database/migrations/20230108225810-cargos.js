"use strict";'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('cargos', { 
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        autoIncrement: true,
        primaryKey: true
      },
      nome: {
        type: Sequelize.STRING(200),
        allowNull: false
      },
      nivel: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      criador: {
        type: Sequelize.STRING(200),
        allowNull: false
      },
      created_at: {
          type: Sequelize.DATE,
          allowNull: false,
      },
      updated_at: {
          type: Sequelize.DATE,
          allowNull: false
      }
     });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('cargos');
  }
};
