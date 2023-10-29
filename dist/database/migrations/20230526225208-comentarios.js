"use strict";'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('comentarios', { 
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
      },
      conteudo: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      id_chamado: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true,
        references: {model: "chamados", key: "id"},
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
    await queryInterface.dropTable('comentarios'); 
  }
};
