"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);
var _md5 = require('md5'); var _md52 = _interopRequireDefault(_md5);


 class Auth extends _sequelize.Model{
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
            type: _sequelize2.default.STRING,
            allowNull: false
          },
          id_relacional: {
            type: _sequelize2.default.INTEGER,
            allowNull: true
          },
          cpf_cnpj:{
            type: _sequelize2.default.STRING(20),
            allowNull: false,
            unique: true,
            validate: { 
                cpfValidator: function(value){
                    if (String(value).replace(/\D/g, '').length > 20 || String(value).replace(/\D/g, '').length === 0){
                        throw new Error("CPF inválido")
                    }
                }
            }
          },
          email: {
            type: _sequelize2.default.STRING(150),
            allowNull: false,
            unique: true
          },
          password_hash:{
            type: _sequelize2.default.STRING(50),
            allowNull: false,
          },
          tenant_id: {
            type: _sequelize2.default.STRING,
            allowNull: false,
          },
          salt: {
            type: _sequelize2.default.STRING,
            allowNull: false,
          },
          id_foto: {
            type: _sequelize2.default.INTEGER,
            allowNull: true,
          },
          created_at: {
            type: _sequelize2.default.DATE,
            allowNull: false,
          },
          updated_at: {
            type: _sequelize2.default.DATE,
            allowNull: false,
          }
        },{
            sequelize,
            tableName: 'auth',
        });

        return this;
    }
 
    static associate(models){
    
    }
} exports.default = Auth;
