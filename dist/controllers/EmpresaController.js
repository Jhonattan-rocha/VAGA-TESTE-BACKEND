"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } }var _Index = require('../database/Index');
var _Auth = require('../models/Auth'); var _Auth2 = _interopRequireDefault(_Auth);
var _Empresa = require('../models/Empresa'); var _Empresa2 = _interopRequireDefault(_Empresa);
var _md5 = require('md5'); var _md52 = _interopRequireDefault(_md5);
var _TenantLoader = require('../services/TenantLoader');

class EmpresaController {
  async store(req, res) {
    try {

      await _Index.InitTenantAuth.call(void 0, 'auth', true);

      if (String(req.body.cnpj).replace(/\D/g, '').length !== 11){
          return res.status(400).json({
            result: null,
            error: "cpf inválido"
          }); 
      }

      req.body.cnpj = String(req.body.cnpj).replace(/\D/g, '');
      req.body.telefone = String(req.body.telefone).replace(/\D/g, '');

      try{
        const find = await _Auth2.default.findOne({ where: { cpf_cnpj: req.body.cnpj } });
  
        if(find) {
          return res.status(409).json({
            result: null,
            error: "CPF já cadastrado"
          });
        }
      }catch(err){
        return res.status(409).json({
          result: null,
          error: "CPF já cadastrado"
        });
      }
      const tenantid = _TenantLoader.generateRandomString.call(void 0, 20);
      const auth_user = await _Auth2.default.create({ nome: req.body.nome, cpf_cnpj: req.body.cnpj, email: req.body.email, password_hash: _md52.default.call(void 0, req.body.password), tenant_id: tenantid, salt: "" });
      
      await _Index.InitTenant.call(void 0, tenantid, false);

      const empresa = await _Empresa2.default.create(req.body, req.fields);
      empresa.setDataValue("password", "Não interessa");

      await auth_user.update({id_relacional: empresa.id, id_foto: _nullishCoalesce(empresa.id_foto, () => ( 0))});
      empresa.setDataValue('password', 'Não interessa');

      return res.status(200).json({result: empresa});
    }catch(err){
      console.log(err)
      return res.status(400).json({
            result: null,
            error: "Erro ao cadastrar empresa"
      });
    };
  };

  async index(req, res){
    try{
      const rules = {...req.fields, ...req.filter}
      const empresas = await _Empresa2.default.findAll({...rules});
      return res.status(200).json({result: empresas});
    }catch(err){
      console.log(err)
      return res.status(400).json({
            result: null,
            error: "Erro ao buscar os empresas"
      });
    };
  };

  async show(req, res){
    try{
      const id = req.params.id;
      if (!id){
        return res.status(404).json({
          result: null,
          error: "ID inválido ou não encontrado"
        });
      };
      const empresa = await _Empresa2.default.findByPk(id, req.fields);
      return res.status(200).json({result: empresa});
    }catch(err){
      return res.status(400).json({
        result: null,
        error: "Erro ao buscar a empresa"
      });
    };
  };

  async update(req, res){
    try{
      const id = req.params.id;
      if (!id){
        return res.status(200).json({
          result: null,
          error: "ID não encontrado ou inválido"
        });
      };
      const empresa = await _Empresa2.default.findByPk(id, req.fields);
      const auth = await _Auth2.default.findOne({where: {cpf_cnpj: empresa.cnpj}});

      if (!empresa){
        return res.status(404).json({
          result: null,
          error: "Usuario não encontrado"
        });
      };

      const result = await empresa.update({...req.body});
      const result2 = await auth.update({email: result.email, cpf_cnpj: result.cnpj, id_foto: _nullishCoalesce(result.id_foto, () => ( 0))});

      return res.status(200).json({result: result});
    }catch(err){
      console.log(err) 
      return res.status(400).json({
            result: null,
            error: "Erro ao buscar a empresa"
      });
    };
  };

  async delete(req, res){
    try{
      const id = req.params.id;

      if (!id){
        return res.status(404).json({
          result: null,
          error: "ID não encontrado ou inválido"
        });
      };
      const empresa = await _Empresa2.default.findByPk(id, req.fields);
      const auth = await _Auth2.default.findOne({where: {cpf_cnpj: empresa.cnpj}});

      if (!empresa){
        return res.status(404).json({
          result: null,
          error: "Usuario não encontrado"
        });
      };

      await auth.destroy();
      await empresa.destroy();

      return res.status(200).json({result: empresa});
    }catch(err){
      return res.status(400).json({
        result: null,
        error: "Erro ao buscar a empresa"
      });
    };
  };
}; 

exports. default = new EmpresaController();

/**
 * index - lista de tudo - GET
 * store/create - cria um novo usuario - POST
 * delete - DELETE
 * show - mostra um usuario - GET
 * update - PATCH PUT
 */
