"use strict";'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('perfils', { 
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        nome: {
            type: Sequelize.STRING(200),
            allowNull: false
        },
        model: {
            type: Sequelize.STRING(200),
            allowNull: false
        },
        create: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
        },
        updated: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
        },
        delete: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
        },
        view: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
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
    await queryInterface.dropTable('perfils');
  }
};
