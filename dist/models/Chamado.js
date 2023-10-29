"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

 class Chamado extends _sequelize.Model {
    static init(sequelize){
        super.init({
          id: {
            type: _sequelize2.default.INTEGER,
            allowNull: false,
            unique: true,
            autoIncrement: true,
            primaryKey: true,
          },
          causa: {
            type: _sequelize2.default.STRING(255),
            allowNull: false,
          },
          operador: {
            type: _sequelize2.default.STRING(100),
            allowNull: false
          },
          descricao: {
            type: _sequelize2.default.STRING(255),
            allowNull: false
          },
          id_status:{
            type: _sequelize2.default.INTEGER,
            allowNull: true,
            references: {
              model: 'statuses',
              key: 'id',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          dtcriação: {
            type: _sequelize2.default.DATE,
          },
          dtinicio: {
            type: _sequelize2.default.DATE,
          },
          dtfim: {
            type: _sequelize2.default.DATE,
          },
          id_funcionario_criador: {
            type: _sequelize2.default.INTEGER,
            allowNull: false,
            references: {
              model: 'funcionarios',
              key: 'id',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          id_funcionario_resp: {
            type: _sequelize2.default.INTEGER,
            allowNull: true,
            references: {
              model: 'funcionarios',
              key: 'id',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          categoria: {
            type: _sequelize2.default.INTEGER,
            allowNull: true,
            references: {
              model: 'categorias',
              key: 'id',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          subcategoria: {
            type: _sequelize2.default.INTEGER,
            allowNull: true,
            references: {
              model: 'subcategorias',
              key: 'id',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          agendamento: {
            type: _sequelize2.default.DATE,
            defaultValue: new Date()
          },
          setor: {
            type: _sequelize2.default.INTEGER,
            allowNull: true,
            references: {
              model: 'setores',
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

        }, {
            sequelize,
            tableName: 'chamados'
        });
        return this;
    }
    
    static associate(models){
      this.belongsTo(models.Funcionario, {
        foreignKey: 'id_funcionario_criador',
        onDelete: 'cascade',
        });
        this.belongsTo(models.Funcionario, {
            foreignKey: 'id_funcionario_resp',
            onDelete: 'cascade',
        });
        this.belongsTo(models.Categoria, {
            foreignKey: 'categoria',
            onDelete: 'cascade',
        });
        this.belongsTo(models.SubCategoria, {
          foreignKey: 'subcategoria',
          onDelete: 'cascade',
        });
        this.hasMany(models.Comentario, { 
            foreignKey: 'id_chamado', 
            onDelete: 'cascade' 
        });
        this.belongsTo(models.Status, {
            foreignKey: 'id_status',
            onDelete: "cascade"
        });
        this.belongsTo(models.Setores, {
          foreignKey: 'setor',
          onDelete: "cascade"
        });
    }
} exports.default = Chamado;;
