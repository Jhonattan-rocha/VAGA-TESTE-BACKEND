"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Perfil = require('../models/Perfil'); var _Perfil2 = _interopRequireDefault(_Perfil);

class PerfilController{
    async store(req, res){
        try {
            const perfil = await _Perfil2.default.create(req.body, req.fields)
            return res.status(200).json({result: perfil})
          }catch(err){
            console.log(err)
            return res.status(400).json({
              result: null,
              error: "Erro ao criar perfil"
          });
        };
    }

    async index(req, res){
        try{ 
            const perfil = await _Perfil2.default.findAll(req.fields)
            return res.status(200).json({result: perfil});
        }catch(err){
          console.log(err)
          return res.status(400).json({
            result: null,
            error: "Erro ao buscar perfils"
        });
        };
    }

    async show(req, res){
        try{
            const id = req.params.id;
            if (!id){
              return res.status(404).json({
                result: null,
                error: "ID não encontrado ou inválido"
              });
            };
            const perfil = await _Perfil2.default.findByPk(id, req.fields);
            return res.status(200).json({result: perfil});
        }catch(err){
          return res.status(400).json({
            result: null,
            error: "Erro ao buscar perfils"
           });
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
            const perfil = await _Perfil2.default.findByPk(id, req.fields);
      
            if (!perfil){
              return res.status(404).json({
                result: null,
                error: "Perfil não encontrado"
              });
            };
      
            const result = await perfil.update(req.body);
      
            return res.status(200).json({result: result});
        }catch(err){
            return res.status(400).json({
                result: null,
                error: "Erro ao buscar o perfil"
            });
        };
    }

    async delete(req, res){
        try{
            const id = req.params.id;
            if (!id){
              return res.status(404).json({
                result: null,
                error: "ID não encontrado ou inválido"
              });
            };
            const perfil = await _Perfil2.default.findByPk(id, req.fields);
      
            if (!perfil){
              return res.status(404).json({
                result: null,
                error: "Perfil não encontrado"
              });
            };
      
            await perfil.destroy();
      
            return res.status(200).json({result: perfil});
          }catch(err){
            return res.status(400).json({
                result: null,
                error: "Erro ao buscar o perfil"
            });
          };
    };
}
   

exports. default = new PerfilController();


