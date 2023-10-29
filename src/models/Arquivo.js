import Sequelize, { Model } from "sequelize";

class Arquivo extends Model{
    static init(sequelize){
        super.init({
          id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            unique: true,
            autoIncrement: true,
            primaryKey: true,
          },
          originalname: {
            type: Sequelize.STRING(200),
            allowNull: false
          },
          filename: {
            type: Sequelize.STRING(200),
            allowNull: false
          },
          id_dono: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
              model: 'funcionarios',
              key: 'id',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          mime_type: {
            type: Sequelize.STRING,
            allowNull: true
          },
          id_chamado: {
            type: Sequelize.INTEGER,
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
            type: Sequelize.DATE,
            allowNull: false,
          },
          updated_at: {
            type: Sequelize.DATE,
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


export default Arquivo;
