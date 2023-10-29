import Sequelize, { Model } from 'sequelize';
import md5 from 'md5';


export default class Funcionario extends Model{
    static init(sequelize){
        super.init({
          id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            unique: true,
            autoIncrement: true,
            primaryKey: true,
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
                    if (String(value).length > 0 && String(value).replace(/\D/g, '').length !== 8){
                      throw new Error("cep inválido")
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
          setor: {
            type: Sequelize.INTEGER,
            foreignKey: true,
            allowNull: true,
            references: {model: "setores", key: "id"},
          },
          setor_responsavel: { 
            type: Sequelize.INTEGER, 
            foreignKey: true,
            allowNull: true,
            references: {model: "setores", key: "id"},
          },
          perfil_id: {
            type: Sequelize.INTEGER, 
            foreignKey: true, 
            allowNull: true,
            references: {model: "perfils", key: "id"},
          },
          password: {
            type: Sequelize.VIRTUAL
          },
          password_hash:{
            type: Sequelize.STRING(50),
            validate: {
                len: [10, 50],
                msg: "A senha deve ter no minimo 10 caracteres até 50 caracteres"
            }
          },
          id_empresa: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
              model: 'empresas',
              key: 'id',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
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
        },{
            sequelize,
            tableName: 'funcionarios'
        });
        
        this.addHook("beforeSave", funcionario => {
            if(funcionario.password){
                funcionario.password_hash = md5(funcionario.password)
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
}
