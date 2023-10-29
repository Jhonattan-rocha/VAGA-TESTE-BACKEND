"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

 class Perfil extends _sequelize.Model{
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
                type: _sequelize2.default.STRING(200),
                allowNull: false
            },
            create_empresa: {
                type: _sequelize2.default.BOOLEAN,
                allowNull: false,
            },
            update_empresa: {
                type: _sequelize2.default.BOOLEAN,
                allowNull: false,
            },
            delete_empresa: {
                type: _sequelize2.default.BOOLEAN,
                allowNull: false,
            },
            view_empresa: {
                type: _sequelize2.default.BOOLEAN,
                allowNull: false,
            },
            // ---
            create_funcionario: {
                type: _sequelize2.default.BOOLEAN,
                allowNull: false,
            },
            update_funcionario: {
                type: _sequelize2.default.BOOLEAN,
                allowNull: false,
            },
            delete_funcionario: {
                type: _sequelize2.default.BOOLEAN,
                allowNull: false,
            },
            view_funcionario: {
                type: _sequelize2.default.BOOLEAN,
                allowNull: false,
            },
            // ---
            create_chamado: {
                type: _sequelize2.default.BOOLEAN,
                allowNull: false,
            },
            update_chamado: {
                type: _sequelize2.default.BOOLEAN,
                allowNull: false,
            },
            delete_chamado: {
                type: _sequelize2.default.BOOLEAN,
                allowNull: false,
            },
            view_chamado: {
                type: _sequelize2.default.BOOLEAN,
                allowNull: false,
            },
            // ---
            create_chat: {
                type: _sequelize2.default.BOOLEAN,
                allowNull: false,
            },
            update_chat: {
                type: _sequelize2.default.BOOLEAN,
                allowNull: false,
            },
            delete_chat: {
                type: _sequelize2.default.BOOLEAN,
                allowNull: false,
            },
            view_chat: {
                type: _sequelize2.default.BOOLEAN,
                allowNull: false,
            },
            // ---
            create_arquivo: {
                type: _sequelize2.default.BOOLEAN,
                allowNull: false,
            },
            update_arquivo: {
                type: _sequelize2.default.BOOLEAN,
                allowNull: false,
            },
            delete_arquivo: {
                type: _sequelize2.default.BOOLEAN,
                allowNull: false,
            },
            view_arquivo: {
                type: _sequelize2.default.BOOLEAN,
                allowNull: false,
            },
            // ---
            create_cargo: {
                type: _sequelize2.default.BOOLEAN,
                allowNull: false,
            },
            update_cargo: {
                type: _sequelize2.default.BOOLEAN,
                allowNull: false,
            },
            delete_cargo: {
                type: _sequelize2.default.BOOLEAN,
                allowNull: false,
            },
            view_cargo: {
                type: _sequelize2.default.BOOLEAN,
                allowNull: false,
            },
            // ---
            create_categoria: {
                type: _sequelize2.default.BOOLEAN,
                allowNull: false,
            },
            update_categoria: {
                type: _sequelize2.default.BOOLEAN,
                allowNull: false,
            },
            delete_categoria: {
                type: _sequelize2.default.BOOLEAN,
                allowNull: false,
            },
            view_categoria: {
                type: _sequelize2.default.BOOLEAN,
                allowNull: false,
            },
            // ---
            create_subcategoria: {
                type: _sequelize2.default.BOOLEAN,
                allowNull: false,
            },
            update_subcategoria: {
                type: _sequelize2.default.BOOLEAN,
                allowNull: false,
            },
            delete_subcategoria: {
                type: _sequelize2.default.BOOLEAN,
                allowNull: false,
            },
            view_subcategoria: {
                type: _sequelize2.default.BOOLEAN,
                allowNull: false,
            },
            // ---
            create_comentario: {
                type: _sequelize2.default.BOOLEAN,
                allowNull: false,
            },
            update_comentario: {
                type: _sequelize2.default.BOOLEAN,
                allowNull: false,
            },
            delete_comentario: {
                type: _sequelize2.default.BOOLEAN,
                allowNull: false,
            },
            view_comentario: {
                type: _sequelize2.default.BOOLEAN,
                allowNull: false,
            },
            // ---
            create_filial: {
                type: _sequelize2.default.BOOLEAN,
                allowNull: false,
            },
            update_filial: {
                type: _sequelize2.default.BOOLEAN,
                allowNull: false,
            },
            delete_filial: {
                type: _sequelize2.default.BOOLEAN,
                allowNull: false,
            },
            view_filial: {
                type: _sequelize2.default.BOOLEAN,
                allowNull: false,
            },
            // ---
            create_perfil: {
                type: _sequelize2.default.BOOLEAN,
                allowNull: false,
            },
            update_perfil: {
                type: _sequelize2.default.BOOLEAN,
                allowNull: false,
            },
            delete_perfil: {
                type: _sequelize2.default.BOOLEAN,
                allowNull: false,
            },
            view_perfil: {
                type: _sequelize2.default.BOOLEAN,
                allowNull: false,
            },
            // ---
            create_setores: {
                type: _sequelize2.default.BOOLEAN,
                allowNull: false,
            },
            update_setores: {
                type: _sequelize2.default.BOOLEAN,
                allowNull: false,
            },
            delete_setores: {
                type: _sequelize2.default.BOOLEAN,
                allowNull: false,
            },
            view_setores: {
                type: _sequelize2.default.BOOLEAN,
                allowNull: false,
            },
            // ---
            create_status: {
                type: _sequelize2.default.BOOLEAN,
                allowNull: false,
            },
            update_status: {
                type: _sequelize2.default.BOOLEAN,
                allowNull: false,
            },
            delete_status: {
                type: _sequelize2.default.BOOLEAN,
                allowNull: false,
            },
            view_status: {
                type: _sequelize2.default.BOOLEAN,
                allowNull: false,
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
            tableName: 'perfils'
        });

        return this;
    }
    static associate(models){
        this.hasMany(models.Funcionario, { foreignKey: "perfil_id", onDelete: 'cascade'});
    }
} exports.default = Perfil;
