"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _Auth = require('../models/Auth'); var _Auth2 = _interopRequireDefault(_Auth);
var _Index = require('../database/Index');
var _TenantLoader = require('../services/TenantLoader');

exports. default = async (req, res, next) =>{
    require('dotenv').config()
    const { authorization } = req.headers;
    if (!authorization){
        return res.status(401).json({
            errors: ['Login required']
        })
    }

    await _Index.InitTenantAuth.call(void 0, 'auth', true);

    const [texto, token] = authorization.split(" ")

    try{
        const dados = _jsonwebtoken2.default.verify(token, process.env.TOKENSECRET)
        const { id, email, tenant_id } = dados
        const user = await _Auth2.default.findOne({
            where: {
                id,
                email,
                tenant_id
            }
        });

        const promises = Promise.all([user])

        promises.then(response => {    
            if (!response[0]){
                return res.status(401).json({
                    errors: ['Usuário inválido']
                })
            }
            
            req.id = id;
            req.email = email;
            req.tenant_id = tenant_id;
            return next()
        })
        .catch(erro => {
            console.log(erro)
            return res.status(400).json({
                errors: ['Usuário inválido']
            })
        }); 

    }catch(err){
        console.log(err)
        return res.status(401).json({
            errors: ['Token expired']
        });
    }
}
