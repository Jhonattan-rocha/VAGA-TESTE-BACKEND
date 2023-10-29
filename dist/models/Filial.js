"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);
var _md5 = require('md5'); var _md52 = _interopRequireDefault(_md5);


class Filial extends _sequelize.Model{
    static init(sequelize){
        super.init({
          id:{
            type: _sequelize2.default.INTEGER,
            allowNull: false,
            unique: true,
            autoIncrement: true,
            primaryKey: true,
          },
          id_empresa: {
            type: _sequelize2.default.INTEGER,
            allowNull: false,
            references: {
              model: 'empresas',
              key: 'id',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          razao_social: {
            type: _sequelize2.default.STRING,
          },
          nome: {
            type: _sequelize2.default.STRING,
          },
          email: {
            type: _sequelize2.default.STRING,
            unique: true
          },
          telefone: {
            type: _sequelize2.default.STRING(15),
          },
          status: {
            type: _sequelize2.default.STRING(30),
          },
          endereco: {
            type: _sequelize2.default.STRING(200),
          },
          password: {
            type: _sequelize2.default.VIRTUAL
          },
          password_hash:{
            type: _sequelize2.default.STRING(50),
            validate: {
                len: [10, 50],
                msg: "A senha deve ter no minimo 10 caracteres até 50 caracteres"
            }
          },
          cnpj: {
            type: _sequelize2.default.STRING(14),
            allowNull: false,
            unique: true,
            validate: {
                len: [14],
                msg: "CNPJ inválido"
            }
          },
          endereco: {
            type: _sequelize2.default.STRING(255),
            allowNull: true
          },
          bairro: {
            type: _sequelize2.default.STRING(255),
            allowNull: true
          },
          numero: {
            type: _sequelize2.default.INTEGER,
            allowNull: true
          },
          cep:{
            type: _sequelize2.default.STRING(20),
            allowNull: true,
              validate: {
                cpfValidator: function(value){
                  if (String(value).length > 0 && String(value).replace(/\D/g, '').length !== 8){
                    throw new Error("cep inválido")
                  }
                }
            }
          },
          id_foto: {
            type: _sequelize2.default.INTEGER,
            allowNull: true,
            // references: {
            //   model: 'arquivos',
            //   key: 'id',
            // },
            // onDelete: 'CASCADE',
            // onUpdate: 'CASCADE',
          },
          created_at: {
            type: _sequelize2.default.DATE,
            allowNull: false,
          },
          updated_at: {
            type: _sequelize2.default.DATE,
            allowNull: false
          }
        }, {
            sequelize, tableName: 'filials'
        });

        this.addHook("beforeSave", filial => {
            if(filial.password){
                filial.password_hash = _md52.default.call(void 0, filial.password)
            }
        });
        
        return this;
    };

    static associate(models){
      this.hasOne(models.Arquivo, { 
        foreignKey: 'id', 
        onDelete: 'CASCADE',
        as: 'Photo',
        sourceKey: 'id_foto'
      });
  }
};

// RelationShips

exports. default = Filial;
