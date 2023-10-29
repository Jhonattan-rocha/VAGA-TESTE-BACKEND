import Auth from '../models/Auth';
import { InitTenantAuth, InitTenantModels } from '../database/Index';
import jwt from "jsonwebtoken";
import { GetConnection } from '../services/TenantLoader';

require('dotenv').config()

class TokenController {
  async store(req, res, next) {
    try{
        await InitTenantAuth('auth', true);
    
        const { email='', password='' } = req.body;
        const md5 = require('md5')
    
        if (!email || !password){   
            return res.status(400).json({
                result: null,
                error: "Email ou senha vazios"
            });
        }
    
        const user = await Auth.findOne({where: {
            email: email
        }});
    
        if(user.getDataValue("password_hash") === String(md5(password))){
            const { id } = user;
            const { tenant_id } = user;
            const ex = "7d"
            const token = jwt.sign({id, email, tenant_id}, process.env.TOKENSECRET, {
                expiresIn: ex,
            });
            console.log(token)
            console.log(user)
            return res.status(200).json({token: token, user: { nome: user.nome, id: user.id_relacional, id_foto: user.id_foto, email: user.email, tenant_id: user.tenant_id}});
        }  
    
        return res.status(404).json({
            result: null,
            error: "Usuário não encontrado, senha inválida"
        });
    }catch(err){
        return res.status(404).json({
            result: null,
            error: "Usuário não encontrado, senha inválida"
        });
    }
    // Bearer
  };

  async verifyToken(req, res){
    try{
        const verify = jwt.verify(req.body.token, process.env.TOKENSECRET);
        if(verify){
            return res.status(200).json({
                result: "Token valido"
            });
        };
    }catch(err){
        console.log(err)
        return res.status(400).json({
            result: null,
            error: "Token inválido"
        });
    }
  }
};

export default new TokenController();
