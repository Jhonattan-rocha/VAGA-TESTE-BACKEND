"use strict";'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('setores', { 
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        nome: {
            type: Sequelize.STRING(255),
            allowNull: false,
        },
        responsavel: {
            type: Sequelize.INTEGER,
            allowNull: true,
            foreignKey: true,
            references: {model: "funcionarios", key: "id"},
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
    await queryInterface.dropTable('setores');
  }
};
