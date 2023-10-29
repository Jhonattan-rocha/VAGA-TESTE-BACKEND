'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('arquivos', { 
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      originalname: {
        type: Sequelize.STRING(200),
        allowNull: false
      },
      filename: {
        type: Sequelize.STRING(200),
        allowNull: false
      },
      id_dono: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
            model: 'funcionarios',
            key: 'id',
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
      },
      mime_type: {
        type: Sequelize.STRING,
        allowNull: true
      },
      id_chamado: {
        type: Sequelize.INTEGER,
        unique: false,
        allowNull: true,
        references: {
            model: 'chamados',
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

    await queryInterface.addConstraint('empresas', {
      fields: ['id_foto'],
      type: 'foreign key',
      references: {
        table: 'arquivos',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    await queryInterface.addConstraint('funcionarios', {
      fields: ['id_foto'],
      type: 'foreign key',
      references: {
        table: 'arquivos',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    await queryInterface.addConstraint('filials', {
      fields: ['id_foto'],
      type: 'foreign key',
      references: {
        table: 'arquivos',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });


  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('arquivos');
  }
};
