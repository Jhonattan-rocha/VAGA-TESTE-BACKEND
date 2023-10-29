"use strict";'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('funcionarios', { 
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      nome: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      cpf:{
        type: Sequelize.STRING(11),
        allowNull: false,
        unique: true,
        validate: {
            cpfValidator: function(value){
                if (String(value).replace(/\D/g, '').length !== 11){
                    throw new Error("CPF inválido")
                }
            }
        }
      },
      email: {
        type: Sequelize.STRING(150),
        allowNull: false,
        unique: true
      },
      dtnasc:{
        type: Sequelize.DATE,
      },
      telefone: {
        type: Sequelize.STRING(20),
      },
      id_cargo: {
        type: Sequelize.INTEGER,
        allowNull: true,
        foreignKey: true,
        references: {model: "cargos", key: "id"},
      },
      nivel: {
        type: Sequelize.INTEGER,
        defaultValue: 5,
        validate: {
          validartamanho: function(value){
            if(value < 1 || value > 5){
              throw new Error("Prioridade Invalida")
            }
          }
        },
        allowNull: false
      },
      setor: {
        type: Sequelize.INTEGER,
        foreignKey: true,
        allowNull: true,
        references: {model: "setores", key: "id"},
      },
      perfil_id: {
        type: Sequelize.INTEGER,
        foreignKey: true,
        allowNull: true,
        references: {model: "pefils", key: "id"},
      },
      password_hash:{
        type: Sequelize.STRING,
      },
      id_empresa: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true,
        references: {model: "empresas", key: "id"},
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
    await queryInterface.dropTable('funcionarios');
  }
};
