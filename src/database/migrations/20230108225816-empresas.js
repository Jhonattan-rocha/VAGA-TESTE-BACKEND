'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('empresas', { 
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
      cnpj:{
        type: Sequelize.STRING(11),
        allowNull: false,
        unique: true,
        validate: {
            cpfValidator: function(value){
                if (String(value).replace(/\D/g, '').length !== 14){
                    throw new Error("CNPJ inválido")
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
      password_hash:{
        type: Sequelize.STRING,
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
