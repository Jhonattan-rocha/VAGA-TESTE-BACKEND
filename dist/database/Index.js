"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);
var _database = require('../config/database'); var _database2 = _interopRequireDefault(_database);
var _Funcionario = require('../models/Funcionario'); var _Funcionario2 = _interopRequireDefault(_Funcionario);
var _Empresa = require('../models/Empresa'); var _Empresa2 = _interopRequireDefault(_Empresa);
var _Filial = require('../models/Filial'); var _Filial2 = _interopRequireDefault(_Filial);
var _Chamado = require('../models/Chamado'); var _Chamado2 = _interopRequireDefault(_Chamado);
var _Arquivo = require('../models/Arquivo'); var _Arquivo2 = _interopRequireDefault(_Arquivo);
var _Perfil = require('../models/Perfil'); var _Perfil2 = _interopRequireDefault(_Perfil);
var _Categoria = require('../models/Categoria'); var _Categoria2 = _interopRequireDefault(_Categoria);
var _Setores = require('../models/Setores'); var _Setores2 = _interopRequireDefault(_Setores);
var _Comentario = require('../models/Comentario'); var _Comentario2 = _interopRequireDefault(_Comentario);
var _Status = require('../models/Status'); var _Status2 = _interopRequireDefault(_Status);
var _SubCategoria = require('../models/SubCategoria'); var _SubCategoria2 = _interopRequireDefault(_SubCategoria);
var _Cargo = require('../models/Cargo'); var _Cargo2 = _interopRequireDefault(_Cargo);
var _Auth = require('../models/Auth'); var _Auth2 = _interopRequireDefault(_Auth);

var _TenantLoader = require('../services/TenantLoader');

 async function InitTenantAuth(schema, tenantOk=false){
    const connection = new (0, _sequelize2.default)(_database2.default)
    const models = [_Auth2.default]

    await connection.query(`CREATE SCHEMA IF NOT EXISTS ${schema};`)
    await connection.query(`USE ${schema};`)
    models.forEach(model=>{model.init(connection)});
    if(!tenantOk){
        await connection.sync();
    }
    
    _TenantLoader.InsertConnection.call(void 0, 'auth', connection);
} exports.InitTenantAuth = InitTenantAuth;


 async function InitTenant(schema, tenantOk=false){
    const models = [_Perfil2.default, _Cargo2.default, _Status2.default, _Empresa2.default, _Funcionario2.default, _Setores2.default, _Filial2.default, _Categoria2.default, _SubCategoria2.default, _Chamado2.default, _Comentario2.default, _Arquivo2.default]

    const connection = new (0, _sequelize2.default)(_database2.default)

    await connection.query(`CREATE SCHEMA IF NOT EXISTS ${schema};`);
    await connection.query(`USE ${schema};`);
    models.forEach(model=>{model.init(connection)});
    if(!tenantOk){
        await connection.sync({force: true});
        await connection.query(`
            drop procedure if exists CountChamados;

            delimiter $$

            create procedure CountChamados()
            begin
                select count(ch.id_status) as qtd, ch.id_status, sts.nome, date(ch.created_at) as 'date', date(ch.updated_at) as 'ModifieDdate', dtfim
                from chamados as ch inner join statuses as sts on ch.id_status = sts.id group by ch.id_status, sts.nome, ch.created_at, ch.updated_at, dtfim order by ch.created_at;
            end$$

            delimiter ;
        `);
    }
    
    models.forEach(model=>{model.associate && model.associate(connection.models)});

    _TenantLoader.InsertConnection.call(void 0, schema, connection);
} exports.InitTenant = InitTenant;

 async function InitTenantModels(schema, connection){
    const models = [_Perfil2.default, _Cargo2.default, _Status2.default, _Empresa2.default, _Funcionario2.default, _Setores2.default, _Filial2.default, _Categoria2.default, _SubCategoria2.default, _Chamado2.default, _Comentario2.default, _Arquivo2.default]
    await connection.query(`CREATE SCHEMA IF NOT EXISTS ${schema};`);
    await connection.query(`USE ${schema};`);
    models.forEach(model=>{model.init(connection)});
    models.forEach(model=>{model.associate && model.associate(connection.models)});
} exports.InitTenantModels = InitTenantModels;
