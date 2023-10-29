"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _TenantLoader = require('../services/TenantLoader');
var _Index = require('../database/Index');

exports. default = async (req, res, next) => {
    try{
        const tenantId = req.tenant_id; // Supondo que o ID da empresa esteja nos parâmetros da requisição
        
        if(!tenantId){
            return next();
        }

        const existingConnection = _TenantLoader.GetConnection.call(void 0, tenantId);
        if (existingConnection) {
            // Se a conexão já existe, associe-a ao objeto de solicitação para uso posterior
            await _Index.InitTenantModels.call(void 0, tenantId, existingConnection);
            req.dbConnection = existingConnection;
            return next();
        } else {
            // Se a conexão não existe, crie uma nova e associe-a ao objeto de solicitação
            await _Index.InitTenant.call(void 0, tenantId, true);
            const newConnection = _TenantLoader.GetConnection.call(void 0, tenantId);
            if (newConnection) {
                req.dbConnection = newConnection;
                return next();
            } else {
                // Trate o erro de inicialização do tenant, se necessário
                return res.status(500).json({ error: 'Erro na inicialização do tenant.' });
            }
        }
    }catch(err){
        console.log(err)
        return next();
    }
}
