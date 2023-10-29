"use strict";'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('chamados', { 
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      causa: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      operador: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      descricao: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      id_status:{
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true,
        references: {model: "statuses", key: "id"},
      },
      dtcriação: {
        type: Sequelize.DATE,
      },
      dtinicio: {
        type: Sequelize.DATE,
      },
      dtfim: {
        type: Sequelize.DATE,
      },
      id_funcionario_criador: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true,
        references: {model: "funcionarios", key: "id"},
      },
      id_funcionario_resp: {
        type: Sequelize.INTEGER,
        foreignKey: true,
        references: {model: "funcionarios", key: "id"},
      },
      setor: {
        type: Sequelize.INTEGER,
        foreignKey: true,
        allowNull: true,
        references: {model: "setores", key: "id"},
      },
      categoria: {
        type: Sequelize.INTEGER,
        foreignKey: true,
        allowNull: true,
        references: {model: "categorias", key: "id"}, 
      },
      subcategoria: {
        type: Sequelize.INTEGER,
        foreignKey: true,
        allowNull: true,
        references: {model: "subcategorias", key: "id"}, 
      },
      agendamento: {
        type: Sequelize.DATE,
        defaultValue: new Date(),
        allowNull: true
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
    await queryInterface.dropTable('chamados'); 
  }
};
