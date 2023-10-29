"use strict";'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // queryInterface.changeColumn('table', 'name of column', {column: new_config})
    await queryInterface.createTable('empresas', { 
      id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      razao_social: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: {
          msg: "Email já existe"
        }
      },
      telefone: {
        type: Sequelize.STRING(15),
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING(30),
        allowNull: false
      },
      endereco: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },
      password_hash:{
        type: Sequelize.STRING(50),
        validate: {
            len: [10, 50],
            msg: "A senha deve ter no minimo 10 caracteres até 50 caracteres"
        }
      },
      cnpj: {
        type: Sequelize.STRING(14),
        allowNull: false,
        unique: true,
        validate: {
            cnpjValidator: function(value){
                if (String(value).replace(/\D/g, '').length !== 14){
                    throw new Error("CNPJ inválido")
                }
            }
        },
      },
      endereco: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      bairro: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      numero: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      cep:{
        type: Sequelize.STRING(20),
        allowNull: true,
          validate: {
            cpfValidator: function(value){
                if (String(value).replace(/\D/g, '').length !== 8){
                    throw new Error("CPF inválido")
                }
            }
        }
      },
      id_foto: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'arquivos',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
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
    await queryInterface.dropTable('empresas');
  }
};
