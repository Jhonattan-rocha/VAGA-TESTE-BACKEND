"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

 class Comentario extends _sequelize.Model {
    static init(sequelize){
        super.init({
            id: {
                type: _sequelize2.default.INTEGER,
                allowNull: false,
                unique: true,
                autoIncrement: true,
                primaryKey: true,
            },
            conteudo: {
                type: _sequelize2.default.STRING(255),
                allowNull: false,
            },
            id_chamado: {
                type: _sequelize2.default.INTEGER,
                allowNull: false,
                references: {
                  model: 'chamados',
                  key: 'id',
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
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
            tableName: 'comentarios'
        })
    };

    static associate(models){
        this.belongsTo(models.Funcionario, {
          foreignKey: 'id_funcionario_criador',
          onDelete: 'cascade',
        });
        this.belongsTo(models.Chamado, {
            foreignKey: 'id_chamado',
            onDelete: 'cascade',
        });
    }
} exports.default = Comentario;
