"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

 class Categoria extends _sequelize.Model {
    static init(sequelize){
        super.init({
          id: {
            type: _sequelize2.default.INTEGER,
            allowNull: false,
            unique: true,
            autoIncrement: true,
            primaryKey: true,
          },
          prioridade: {
            type: _sequelize2.default.INTEGER,
            defaultValue: 5,
            validate: {
              validartamanho: function(value){
                if(value < 1 || value > 5){
                  throw new Error("Prioridade Invalida")
                }
              }
            }
          },
          nome: { 
            type: _sequelize2.default.STRING(200),
          },
          criador: {
            type: _sequelize2.default.STRING(200)
          },
          created_at: {
              type: _sequelize2.default.DATE,
              allowNull: false,
          },
          updated_at: {
            type: _sequelize2.default.DATE,
            allowNull: false
          }
        }, {sequelize, tableName: 'categorias'});

        return this;
    }

    static associate(models){
        this.belongsToMany(models.Chamado, { through: "chamados", foreignKey: "categoria", onDelete: 'cascade' });
        this.hasMany(models.SubCategoria, { foreignKey: "id_categoria", onDelete: 'cascade' });
    }
} exports.default = Categoria;
