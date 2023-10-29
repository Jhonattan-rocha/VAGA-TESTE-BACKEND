"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);
var _md5 = require('md5'); var _md52 = _interopRequireDefault(_md5);


 class Funcionario extends _sequelize.Model{
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
          cpf:{
            type: _sequelize2.default.STRING(11),
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
          id_cargo: {
            type: _sequelize2.default.INTEGER,
            allowNull: true,
            foreignKey: true,
            references: {model: "cargos", key: "id"}, 
          },
          setor: {
            type: _sequelize2.default.INTEGER,
            foreignKey: true,
            allowNull: true,
            references: {model: "setores", key: "id"},
          },
          setor_responsavel: { 
            type: _sequelize2.default.INTEGER, 
            foreignKey: true,
            allowNull: true,
            references: {model: "setores", key: "id"},
          },
          perfil_id: {
            type: _sequelize2.default.INTEGER, 
            foreignKey: true, 
            allowNull: true,
            references: {model: "perfils", key: "id"},
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
            allowNull: false
          }
        },{
            sequelize,
            tableName: 'funcionarios'
        });
        
        this.addHook("beforeSave", funcionario => {
            if(funcionario.password){
                funcionario.password_hash = _md52.default.call(void 0, funcionario.password)
            }
        });

        
        return this;
    }

    static associate(models){
      this.hasMany(models.Chamado, {
        foreignKey: "id_funcionario_criador", 
        onDelete: 'cascade' 
      });
      this.hasMany(models.Chamado, {
        foreignKey: "id_funcionario_resp",
        onDelete: 'cascade' 
      });
      this.belongsTo(models.Perfil,{ 
        foreignKey: "perfil_id",  
        onDelete: 'cascade' 
      });
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
      this.hasMany(models.Comentario, { 
        foreignKey: 'id_funcionario_criador', 
        onDelete: 'cascade' 
      });
      this.belongsTo(models.Cargo, {
        foreignKey: "id_cargo",
        onDelete: 'cascade'
      });
      this.belongsTo(models.Setores, {
        foreignKey: 'setor',
        onDelete: "cascade"
      });
      this.belongsTo(models.Setores, {
        foreignKey: 'setor_responsavel',
        onDelete: "cascade"
      });
    }
} exports.default = Funcionario;
