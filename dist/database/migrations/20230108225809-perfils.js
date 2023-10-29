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
        create_empresa: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
        },
        update_empresa: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
        },
        delete_empresa: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
        },
        view_empresa: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
        },
        // ---
        create_funcionario: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
        },
        update_funcionario: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
        },
        delete_funcionario: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
        },
        view_funcionario: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
        },
        // ---
        create_chamado: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
        },
        update_chamado: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
        },
        delete_chamado: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
        },
        view_chamado: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
        },
        // ---
        create_chat: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
        },
        update_chat: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
        },
        delete_chat: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
        },
        view_chat: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
        },
        // ---
        create_arquivo: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
        },
        update_arquivo: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
        },
        delete_arquivo: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
        },
        view_arquivo: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
        },
        // ---
        create_cargo: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
        },
        update_cargo: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
        },
        delete_cargo: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
        },
        view_cargo: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
        },
        // ---
        create_categoria: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
        },
        update_categoria: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
        },
        delete_categoria: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
        },
        view_categoria: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
        },
        // ---
        create_subcategoria: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
        },
        update_subcategoria: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
        },
        delete_subcategoria: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
        },
        view_subcategoria: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
        },
        // ---
        create_comentario: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
        },
        update_comentario: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
        },
        delete_comentario: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
        },
        view_comentario: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
        },
        // ---
        create_filial: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
        },
        update_filial: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
        },
        delete_filial: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
        },
        view_filial: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
        },
        // ---
        create_perfil: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
        },
        update_perfil: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
        },
        delete_perfil: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
        },
        view_perfil: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
        },
        // ---
        create_setores: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
        },
        update_setores: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
        },
        delete_setores: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
        },
        view_setores: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
        },
        // ---
        create_status: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
        },
        update_status: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
        },
        delete_status: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
        },
        view_status: {
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
