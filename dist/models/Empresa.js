"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);
var _md5 = require('md5'); var _md52 = _interopRequireDefault(_md5);


 class Empresas extends _sequelize.Model{
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
            type: _sequelize2.default.STRING(100),
            allowNull: false
          },
          cnpj:{
            type: _sequelize2.default.STRING(11),
            allowNull: false,
            unique: true,
            validate: {
                cpfValidator: function(value){
                    if (String(value).replace(/\D/g, '').length !== 14){
                        throw new Error("CPF inválido")
                    }
                }
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
          email: {
            type: _sequelize2.default.STRING(150),
            allowNull: false,
            unique: true
          },
          dtnasc:{
            type: _sequelize2.default.DATE,
          },
          telefone: {
            type: _sequelize2.default.STRING(20),
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
          id_foto: {
            type: _sequelize2.default.INTEGER,
            allowNull: true,
            references: {
              model: 'arquivos',
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
        },{
            sequelize,
            tableName: 'empresas'
        });
        
        this.addHook("beforeSave", empresa => {
            if(empresa.password){
                empresa.password_hash = _md52.default.call(void 0, empresa.password)
            }
        });

        
        return this;
    }

    static associate(models){
      this.hasMany(models.Arquivo, { 
        foreignKey: 'id_dono', 
        onDelete: 'cascade',
        as: 'Files',
      });
      this.hasOne(models.Arquivo, { 
        foreignKey: 'id', 
        onDelete: 'CASCADE',
        as: 'Photo',
        sourceKey: 'id_foto'
      });
    }
} exports.default = Empresas;
