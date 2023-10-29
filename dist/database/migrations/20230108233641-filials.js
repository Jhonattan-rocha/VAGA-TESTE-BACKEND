"use strict";'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('filials', { 
      id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      razao_social: {
        type: Sequelize.STRING,
      },
      nome: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
        unique: true
      },
      telefone: {
        type: Sequelize.STRING(15),
      },
      status: {
        type: Sequelize.STRING(30),
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
      },
      password_hash:{
        type: Sequelize.STRING,
      },
      cnpj: {
        type: Sequelize.STRING(14),
        allowNull: false,
        unique: true,
        validate: {
            len: [14],
            msg: "CNPJ inválido"
        }
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
    await queryInterface.dropTable('filials');
  }
};
