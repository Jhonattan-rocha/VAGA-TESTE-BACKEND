import { InitTenant, InitTenantAuth, InitTenantModels } from "../database/Index";
import Auth from "../models/Auth";
import Empresa from "../models/Empresa";
import md5 from "md5";
import { GetConnection, generateRandomString } from "../services/TenantLoader";

class EmpresaController {
  async store(req, res) {
    try {
      await InitTenantAuth('auth', true);

      if (String(req.body.cnpj).replace(/\D/g, '').length !== 14){
          return res.status(400).json({
            result: null,
            error: "cpf inválido"
          }); 
      }

      req.body.cnpj = String(req.body.cnpj).replace(/\D/g, '');
      req.body.telefone = String(req.body.telefone).replace(/\D/g, '');

      try{
        const find = await Auth.findOne({ where: { cpf_cnpj: req.body.cnpj } });
  
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
      const tenantid = generateRandomString(20);
      const auth_user = await Auth.create({ nome: req.body.nome, cpf_cnpj: req.body.cnpj, email: req.body.email, password_hash: md5(req.body.password), tenant_id: tenantid, salt: "" });
      
      await InitTenant(tenantid, false);
      console.log(req.body)
      const empresa = await Empresa.create(req.body, req.fields);
      empresa.setDataValue("password", "Não interessa");

      await auth_user.update({id_relacional: empresa.id, id_foto: empresa.id_foto ?? 0});
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
      const empresas = await Empresa.findAll({...rules});
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
      const empresa = await Empresa.findByPk(id, req.fields);
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
      const empresa = await Empresa.findByPk(id, req.fields);
      const auth = await Auth.findOne({where: {cpf_cnpj: empresa.cnpj}});

      if (!empresa){
        return res.status(404).json({
          result: null,
          error: "Usuario não encontrado"
        });
      };

      const result = await empresa.update({...req.body});
      const result2 = await auth.update({email: result.email, cpf_cnpj: result.cnpj, id_foto: result.id_foto ?? 0});

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
      const empresa = await Empresa.findByPk(id, req.fields);
      const auth = await Auth.findOne({where: {cpf_cnpj: empresa.cnpj}});

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

export default new EmpresaController();

/**
 * index - lista de tudo - GET
 * store/create - cria um novo usuario - POST
 * delete - DELETE
 * show - mostra um usuario - GET
 * update - PATCH PUT
 */
