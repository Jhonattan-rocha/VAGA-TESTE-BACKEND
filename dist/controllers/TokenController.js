"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Auth = require('../models/Auth'); var _Auth2 = _interopRequireDefault(_Auth);
var _Index = require('../database/Index');
var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _TenantLoader = require('../services/TenantLoader');

require('dotenv').config()

class TokenController {
  async store(req, res, next) {
    try{
        await _Index.InitTenantAuth.call(void 0, 'auth', true);
    
        const { email='', password='' } = req.body;
        const md5 = require('md5')
    
        if (!email || !password){   
            return res.status(400).json({
                result: null,
                error: "Email ou senha vazios"
            });
        }
    
        const user = await _Auth2.default.findOne({where: {
            email: email
        }});
    
        if(user.getDataValue("password_hash") === String(md5(password))){
            const { id } = user;
            const { tenant_id } = user;
            const ex = "7d"
            const token = _jsonwebtoken2.default.sign({id, email, tenant_id}, process.env.TOKENSECRET, {
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
        const verify = _jsonwebtoken2.default.verify(req.body.token, process.env.TOKENSECRET);
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

exports. default = new TokenController();
