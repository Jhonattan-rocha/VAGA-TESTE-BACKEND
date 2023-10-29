import Sequelize  from "sequelize";
import database from "../config/database";
import Empresa from "../models/Empresa";
import Arquivo from "../models/Arquivo";
import Auth from "../models/Auth";

import {InsertConnection} from '../services/TenantLoader';

export async function InitTenantAuth(schema, tenantOk=false){
    const connection = new Sequelize(database)
    const models = [Auth]

    await connection.query(`CREATE SCHEMA IF NOT EXISTS ${schema};`)
    await connection.query(`USE ${schema};`)
    models.forEach(model=>{model.init(connection)});
    if(!tenantOk){
        await connection.sync();
    }
    
    InsertConnection('auth', connection);
}


export async function InitTenant(schema, tenantOk=false){
    const models = [Empresa, Arquivo]

    const connection = new Sequelize(database)

    await connection.query(`CREATE SCHEMA IF NOT EXISTS ${schema};`);
    await connection.query(`USE ${schema};`);
    models.forEach(model=>{model.init(connection)});
    if(!tenantOk){
        await connection.sync({force: true});
    }
    
    models.forEach(model=>{model.associate && model.associate(connection.models)});

    InsertConnection(schema, connection);
}

export async function InitTenantModels(schema, connection){
    const models = [Empresa, Arquivo]
    await connection.query(`CREATE SCHEMA IF NOT EXISTS ${schema};`);
    await connection.query(`USE ${schema};`);
    models.forEach(model=>{model.init(connection)});
    models.forEach(model=>{model.associate && model.associate(connection.models)});
}
