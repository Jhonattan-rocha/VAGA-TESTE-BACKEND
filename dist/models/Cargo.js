"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

 class Cargo extends _sequelize.Model {
    static init(sequelize){
        super.init({
          id: {
            type: _sequelize2.default.INTEGER,
            allowNull: false,
            unique: true,
            autoIncrement: true,
            primaryKey: true,
          },
          nome: {
            type: _sequelize2.default.STRING(200),
            allowNull: false
          },
          nivel: {
            type: _sequelize2.default.INTEGER,
            allowNull: false
          },
          criador: {
            type: _sequelize2.default.STRING(200),
            allowNull: false
          },
          created_at: {
              type: _sequelize2.default.DATE,
              allowNull: false,
          },
          updated_at: {
              type: _sequelize2.default.DATE,
              allowNull: false
          }
        }, {sequelize, tableName: 'cargos'});

        return this;
    }

    static associate(models){
        this.belongsToMany(models.Funcionario, { through: "funcionarios", foreignKey: "id_cargo", onDelete: 'cascade' });
    }
} exports.default = Cargo;
