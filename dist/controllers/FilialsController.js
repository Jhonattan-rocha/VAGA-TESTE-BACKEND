"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } }var _Index = require('../database/Index');
var _Auth = require('../models/Auth'); var _Auth2 = _interopRequireDefault(_Auth);
var _Filial = require('../models/Filial'); var _Filial2 = _interopRequireDefault(_Filial);
var _TenantLoader = require('../services/TenantLoader');

class FilialController{
    async store(req, res){
        await _Index.InitTenantAuth.call(void 0, 'auth', true);

        const copy = {...req.body}

        if (String(copy.cnpj).replace(/\D/g, '').length !== 14){
            return res.status(400).json({
              result: null,  
              error: "CNPJ inválido"
            }); 
        }

        req.body.cnpj = String(req.body.cnpj).replace(/\D/g, '');
        req.body.telefone = String(req.body.telefone).replace(/\D/g, '');

        try{
          const find = await _Auth2.default.findOne({ where: { cpf_cnpj: req.body.cnpj } });
    
          if(find) {
            return res.status(409).json({
              result: null,
              error: "CNPJ já cadastrado"
            });
          }
        }catch(err){
          return res.status(409).json({
            result: null,
            error: "CNPJ já cadastrado"
          });
        }

        try {
            const auth_user = await _Auth2.default.create({ nome: req.body.nome, cpf_cnpj: req.body.cnpj, email: req.body.email, password_hash: md5(req.body.password), tenant_id: req.body.tenant_id, salt: "" });

            await _Index.InitTenant.call(void 0, req.body.tenant_id, true)

            const filial = await _Filial2.default.create(req.body, req.fields)

            await auth_user.update({id_relacional: filial.id, id_foto: _nullishCoalesce(filial.id_foto, () => ( 0))});
            return res.status(200).json({result: filial})
          }catch(err){
            return res.status(400).json({
              result: null,
              error: "Erro ao cadastrar a filial"
            }); 
        };
    }

    async index(req, res){
    
        try{
            const filials = await _Filial2.default.findAll(req.fields)
            return res.status(200).json({result: filials});
        }catch(err){
            return res.status(400).json({
              result: null,
              error: "Erro ao buscar as empresas"
            })
        };
    }

    async show(req, res){
        try{
            const id = req.params.id;
            if (!id){
              return res.status(404).json({
                result: null,
                error: "Id inválido ou não existe"
              });
            };
            const filial = await _Filial2.default.findByPk(id, req.fields);
            return res.status(200).json({result: filial});
        }catch(err){
            return res.status(400).json({
              result: null,
              error: "Erro ao buscar empresa"
            })
        };
    }

    async update(req, res){
        try{
            const id = req.params.id;
            if (!id){
              return res.status(404).json({
                result: null,
                error: "ID não encontrado ou inválido"
              });
            };
            const filial = await _Filial2.default.findByPk(id, req.fields);
            const auth = await _Auth2.default.findOne({where: {cpf_cnpj: filial.cnpj}});

            if (!filial){
              return res.status(404).json({
                result: null,
                error: "Usuario não encontrado ou não existe"
              });
            };
      
            const result = await filial.update(req.body);
            await auth.update({email: result.email, cpf_cnpj: result.cnpj, id_foto: _nullishCoalesce(result.id_foto, () => ( 0))});

            return res.status(200).json({result: result});
        }catch(err){
            return res.status(400).json({
                result: null,
                error: "Erro ao buscar a filial"
            });;
        };
    }

    async delete(req, res){
        try{
            const id = req.params.id;
            if (!id){
              return res.status(404).json({
                result: null,
                error: "ID não econtrado ou inválido"
              });
            };
            const filial = await _Filial2.default.findByPk(id, req.fields);
            const auth = await _Auth2.default.findOne({where: {cpf_cnpj: filial.cnpj}});

            if (!filial){
              return res.status(404).json({
                result: null,
                error: "Usuario não encontrado"
              });
            };
      
            await filial.destroy();
            await auth.destroy();
      
            return res.status(200).json({result: filial});
        }catch(err){
          return res.status(400).json({
            result: null,
            error: "Erro ao deletar a empresa"
          })
        };
    }
}

exports. default = new FilialController();
