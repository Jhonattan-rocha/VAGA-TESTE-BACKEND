"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);
var _database = require('../config/database'); var _database2 = _interopRequireDefault(_database);
var _Empresa = require('../models/Empresa'); var _Empresa2 = _interopRequireDefault(_Empresa);
var _Arquivo = require('../models/Arquivo'); var _Arquivo2 = _interopRequireDefault(_Arquivo);
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
    const models = [_Arquivo2.default, _Empresa2.default]

    const connection = new (0, _sequelize2.default)(_database2.default)

    await connection.query(`CREATE SCHEMA IF NOT EXISTS ${schema};`);
    await connection.query(`USE ${schema};`);
    models.forEach(model=>{model.init(connection)});
    if(!tenantOk){
        await connection.sync({force: true});
    }
    
    models.forEach(model=>{model.associate && model.associate(connection.models)});

    _TenantLoader.InsertConnection.call(void 0, schema, connection);
} exports.InitTenant = InitTenant;

 async function InitTenantModels(schema, connection){
    const models = [_Arquivo2.default, _Empresa2.default]
    await connection.query(`CREATE SCHEMA IF NOT EXISTS ${schema};`);
    await connection.query(`USE ${schema};`);
    models.forEach(model=>{model.init(connection)});
    models.forEach(model=>{model.associate && model.associate(connection.models)});
} exports.InitTenantModels = InitTenantModels;
