"use strict";'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

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
      },
      tenantOk: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
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
        allowNull: true,
      },
      perfil_id: {
        type: Sequelize.INTEGER,
        foreignKey: true,
        allowNull: true,
        references: {model: "perfils", key: "id"},
      },
      password_hash:{
        type: Sequelize.STRING,
      },
      id_foto: {
        type: Sequelize.INTEGER,
        allowNull: true,
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

    await queryInterface.createTable('setores', { 
      id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
          unique: true,
        },
        nome: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },
        responsavel: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
    });

    await queryInterface.addConstraint('funcionarios', {
      fields: ['setor'],
      type: 'foreign key',
      references: {
        table: 'setores',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    await queryInterface.addConstraint('setores', {
      fields: ['responsavel'],
      type: 'foreign key',
      references: {
        table: 'funcionarios',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('setores');
    await queryInterface.dropTable('empresas');
    await queryInterface.dropTable('funcionarios');
  }
};
