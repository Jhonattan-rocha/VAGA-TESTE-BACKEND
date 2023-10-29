"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Comentario = require('../models/Comentario'); var _Comentario2 = _interopRequireDefault(_Comentario);

class ComentarioController {
  async store(req, res) {
    try{
      const comentario = await _Comentario2.default.create(req.body, req.fields)
      return res.status(200).json({result: comentario})
    }catch(err){
      console.log(err);
      return res.status(400).json({
          result: null,
          error: "Erro ao criar o comentario"
      });
    }
  };

  async index(req, res){
    try{
      const rules = {...req.fields, ...req.filter}
      console.log(rules)
      const comentario = await _Comentario2.default.findAll(rules);
      return res.status(200).json({result: comentario});
    }catch(err){
      return res.status(400).json({
        result: null,
        error: "Erro ao buscar o comentario"
    });
    };
  };

  async show(req, res){
    try{
      const id = req.params.id;
      if (!id){
        return res.status(404).json({
          result: null,
          error: "Comentario não encontrado ou não existe"
      });
      };
      const comentario = await _Comentario2.default.findByPk(id, req.fields);

      return res.status(200).json({result: comentario});
    }catch(err){
      return res.status(400).json({
        result: null,
        error: "Erro ao buscar o comentario"
      });
    };
  };

  async update(req, res){
    try{

      const id = req.params.id;
      
      if (!id){
        return res.status(404).json({
          result: null,
          error: "ID não encontrado ou inválido"
        })
      };

      const comentario = await _Comentario2.default.findByPk(id, req.fields);

      if (!comentario){
        return res.status(404).json({
          result: null,
          error: "comentario não encontrado"
        })
      };

      const result = await comentario.update(req.body);

      return res.status(200).json({result: result});
    }catch(err){
      return res.status(400).json({
        result: null,
        error: "Erro ao atualizar o comentario"
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
      const comentario = await _Comentario2.default.findByPk(id, req.fields);

      if (!comentario){
        return res.status(404).json({
          result: null,
          error: "comentario não encontrado"
        });
      };

      await comentario.destroy();

      return res.status(200).json({result: comentario});
    }catch(err){
      return res.status(400).json({
        result: null,
        error: "Erro ao buscar o comentario"
      });
    };
  };
};

exports. default = new ComentarioController();
