import { InitTenantAuth } from "../database/Index";
import Auth from "../models/Auth";

class AuthController {
  async index(req, res){
    try{

      await InitTenantAuth('auth', true);

      const rules = {...req.fields, ...req.filter};
      console.log(rules)
      const auth = await Auth.findAll({...rules});
      return res.status(200).json({result: auth});
    }catch(err){
      console.log(err)
      return res.status(400).json({
            result: null,
            error: "Erro ao buscar os usuários"
      });
    };
  };

  async show(req, res){
    try{
      await InitTenantAuth('auth', true);

      const id = req.params.id;
      if (!id){
        return res.status(404).json({
          result: null,
          error: "ID inválido ou não encontrado"
        });
      };
      const auth = await Auth.findByPk(id, req.fields);
      return res.status(200).json({result: auth});
    }catch(err){
      return res.status(400).json({
        result: null,
        error: "Erro ao buscar o usuário"
      });
    };
  };

  async update(req, res){
    try{
      await InitTenantAuth('auth', true);

      const id = req.params.id;
      if (!id){
        return res.status(200).json({
          result: null,
          error: "ID não encontrado ou inválido"
        });
      };
      const auth = await Auth.findOne({where: {cpf_cnpj: req.body.cnpj}});

      if (!auth){
        return res.status(404).json({
          result: null,
          error: "Usuario não encontrado"
        });
      };

      const result = await auth.update(req.body);

      return res.status(200).json({result: result});
    }catch(err){
      console.log(err) 
      return res.status(400).json({
            result: null,
            error: "Erro ao buscar o usuário"
      });
    };
  };

  async delete(req, res){
    try{
      await InitTenantAuth('auth', true);

      const id = req.params.id;

      if (!id){
        return res.status(404).json({
          result: null,
          error: "ID não encontrado ou inválido"
        });
      };
      const auth = await Auth.findOne({where: {cpf_cnpj: empresa.cnpj}});

      if (!auth){
        return res.status(404).json({
          result: null,
          error: "Usuario não encontrado"
        });
      };

      await auth.destroy();

      return res.status(200).json({result: auth});
    }catch(err){
      return res.status(400).json({
        result: null,
        error: "Erro ao buscar o usuário"
      });
    };
  };
}; 

export default new AuthController();

/**
 * index - lista de tudo - GET
 * store/create - cria um novo usuario - POST
 * delete - DELETE
 * show - mostra um usuario - GET
 * update - PATCH PUT
 */
