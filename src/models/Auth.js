import Sequelize, { Model } from 'sequelize';
import md5 from 'md5';


export default class Auth extends Model{
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
            type: Sequelize.STRING,
            allowNull: false
          },
          id_relacional: {
            type: Sequelize.INTEGER,
            allowNull: true
          },
          cpf_cnpj:{
            type: Sequelize.STRING(20),
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
            type: Sequelize.STRING(150),
            allowNull: false,
            unique: true
          },
          password_hash:{
            type: Sequelize.STRING(50),
            allowNull: false,
          },
          tenant_id: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          salt: {
            type: Sequelize.STRING,
            allowNull: false,
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
}
