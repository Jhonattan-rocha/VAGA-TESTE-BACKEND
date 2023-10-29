"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

class Arquivo extends _sequelize.Model{
    static init(sequelize){
        super.init({
          id: {
            type: _sequelize2.default.INTEGER,
            allowNull: false,
            unique: true,
            autoIncrement: true,
            primaryKey: true,
          },
          originalname: {
            type: _sequelize2.default.STRING(200),
            allowNull: false
          },
          filename: {
            type: _sequelize2.default.STRING(200),
            allowNull: false
          },
          id_dono: {
            type: _sequelize2.default.INTEGER,
            allowNull: true,
            references: {
              model: 'funcionarios',
              key: 'id',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          mime_type: {
            type: _sequelize2.default.STRING,
            allowNull: true
          },
          id_chamado: {
            type: _sequelize2.default.INTEGER,
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
            type: _sequelize2.default.DATE,
            allowNull: false,
          },
          updated_at: {
            type: _sequelize2.default.DATE,
            allowNull: false
          }
        }, {sequelize, tableName: 'arquivos'});

        return this;
    };

    static associate(models){
      this.belongsTo(models.Funcionario, {
        foreignKey: "id_dono",
        onDelete: "cascade"
      });
      this.belongsTo(models.Funcionario, {
        foreignKey: 'id', 
        onDelete: 'CASCADE',
        sourceKey: 'id_foto'
      });
      this.belongsTo(models.Empresa, {
        foreignKey: 'id', 
        onDelete: 'CASCADE',
        sourceKey: 'id_foto'
      });
      this.belongsTo(models.Filial, {
        foreignKey: 'id',  
        onDelete: 'CASCADE',
        sourceKey: 'id_foto'
      });
    }
};


exports. default = Arquivo;
