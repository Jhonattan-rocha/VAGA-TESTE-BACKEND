import { GetConnection } from '../services/TenantLoader';
import { InitTenant, InitTenantModels } from '../database/Index';

export default async (req, res, next) => {
    try{
        const tenantId = req.tenant_id; // Supondo que o ID da empresa esteja nos parâmetros da requisição
        
        if(!tenantId){
            return next();
        }

        const existingConnection = GetConnection(tenantId);
        if (existingConnection) {
            // Se a conexão já existe, associe-a ao objeto de solicitação para uso posterior
            await InitTenantModels(tenantId, existingConnection);
            req.dbConnection = existingConnection;
            return next();
        } else {
            // Se a conexão não existe, crie uma nova e associe-a ao objeto de solicitação
            await InitTenant(tenantId, true);
            const newConnection = GetConnection(tenantId);
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
