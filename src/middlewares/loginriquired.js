import jwt from 'jsonwebtoken'
import Auth from '../models/Auth';
import { InitTenantModels, InitTenantAuth } from '../database/Index';
import { GetConnection } from '../services/TenantLoader';

export default async (req, res, next) =>{
    require('dotenv').config()
    const { authorization } = req.headers;
    if (!authorization){
        return res.status(401).json({
            errors: ['Login required']
        })
    }

    await InitTenantAuth('auth', true);

    const [texto, token] = authorization.split(" ")

    try{
        const dados = jwt.verify(token, process.env.TOKENSECRET)
        const { id, email, tenant_id } = dados
        const user = await Auth.findOne({
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
