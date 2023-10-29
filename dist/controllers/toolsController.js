"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _TenantLoader = require('../services/TenantLoader');

class ToolsController {
    async consult(req, res) {
        try{
          const { query } = req.body;
          const tenantId = req.tenant_id; 
          const connection = _TenantLoader.GetConnection.call(void 0, tenantId)
          connection.query(query)
          .then((results) => {
            if (Array(results).length > 0) {
              return res.status(200).json({ result: results });
            } else {
              return res.status(200).json({ result: [] }); // Retorna um array vazio
            }
          })
          .catch((err) => {
            console.log(err);
            return res.status(400).json({
              result: null,
              error: "Erro ao executar a query",
            });
          });
        }catch(err){
          console.log(err);
          return res.status(400).json({
            result: null,
            error: "Erro ao executar a query",
          });
        }
    }
  }
  

exports. default = new ToolsController();
