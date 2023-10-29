"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } }var _Index = require('../database/Index');
var _TenantLoader = require('../services/TenantLoader');
var _Auth = require('../models/Auth'); var _Auth2 = _interopRequireDefault(_Auth);
var _Funcionario = require('../models/Funcionario'); var _Funcionario2 = _interopRequireDefault(_Funcionario);
var _md5 = require('md5'); var _md52 = _interopRequireDefault(_md5);

class FuncionarioController {
  //criar um usuario, store 
  async store(req, res) {
    try {

      await _Index.InitTenantAuth.call(void 0, 'auth', true);

      if (String(req.body.cpf).replace(/\D/g, '').length !== 11){
          return res.status(400).json({
            result: null,
            error: "cpf inválido"
          }); 
      }

      req.body.cpf = String(req.body.cpf).replace(/\D/g, '');
      req.body.telefone = String(req.body.telefone).replace(/\D/g, '');

      try{
        const find = await _Auth2.default.findOne({ where: { cpf_cnpj: req.body.cpf } });
  
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

      const auth_user = await _Auth2.default.create({ nome: req.body.nome, cpf_cnpj: req.body.cpf, email: req.body.email, password_hash: _md52.default.call(void 0, req.body.password), tenant_id: req.body.tenant_id, salt: "" });
      
      await _Index.InitTenant.call(void 0, req.body.tenant_id, true);

      const funcionario = await _Funcionario2.default.create(req.body, req.fields);
      funcionario.setDataValue("password", "Não interessa");

      await auth_user.update({id_relacional: funcionario.id, id_foto: _nullishCoalesce(funcionario.id_foto, () => ( 0))});

      return res.status(200).json({result: funcionario});
    }catch(err){
      console.log(err)
      return res.status(400).json({
            result: null,
            error: "Erro ao cadastrar funcionario"
      });
    };
  };

  async index(req, res){
    try{
      const rules = {...req.fields, ...req.filter}
      const funcionarios = await _Funcionario2.default.findAll({...rules});
      return res.status(200).json({result: funcionarios});
    }catch(err){
      console.log(err)
      return res.status(400).json({
            result: null,
            error: "Erro ao buscar os funcionarios"
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
      const funcionario = await _Funcionario2.default.findByPk(id, req.fields);
      return res.status(200).json({result: funcionario});
    }catch(err){
      return res.status(400).json({
        result: null,
        error: "Erro ao buscar o funcionario"
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
      const funcionario = await _Funcionario2.default.findByPk(id, req.fields);
      const auth = await _Auth2.default.findOne({where: {cpf_cnpj: funcionario.cpf}});

      if (!funcionario){
        return res.status(404).json({
          result: null,
          error: "Usuario não encontrado"
        });
      };

      const result = await funcionario.update({...req.body});
      const result2 = await auth.update({email: result.email, cpf_cnpj: result.cpf, id_foto: _nullishCoalesce(result.id_foto, () => ( 0))});

      return res.status(200).json({result: result});
    }catch(err){
      console.log(err) 
      return res.status(400).json({
            result: null,
            error: "Erro ao buscar o funcionario"
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
      const funcionario = await _Funcionario2.default.findByPk(id, req.fields);
      const auth = await _Auth2.default.findOne({where: {cpf_cnpj: funcionario.cpf}});

      if (!funcionario){
        return res.status(404).json({
          result: null,
          error: "Usuario não encontrado"
        });
      };

      await auth.destroy();
      await funcionario.destroy();

      return res.status(200).json({result: funcionario});
    }catch(err){
      return res.status(400).json({
        result: null,
        error: "Erro ao buscar o funcionario"
      });
    };
  };
}; 

exports. default = new FuncionarioController();

/**
 * index - lista de tudo - GET
 * store/create - cria um novo usuario - POST
 * delete - DELETE
 * show - mostra um usuario - GET
 * update - PATCH PUT
 */
