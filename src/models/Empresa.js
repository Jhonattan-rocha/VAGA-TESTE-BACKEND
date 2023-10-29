import Sequelize, { Model } from 'sequelize';
import md5 from 'md5';


export default class Empresas extends Model{
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
          cnpj:{
            type: Sequelize.STRING(20),
            allowNull: false,
            unique: true,
            validate: { 
                cpfValidator: function(value){
                    if (String(value).replace(/\D/g, '').length > 20 || String(value).replace(/\D/g, '').length === 0){
                        throw new Error("CNPJ/CPF inválido")
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
            tableName: 'empresas'
        });
        
        this.addHook("beforeSave", empresa => {
            if(empresa.password){
                empresa.password_hash = md5(empresa.password)
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
}
