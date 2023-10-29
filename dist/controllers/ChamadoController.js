"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Chamado = require('../models/Chamado'); var _Chamado2 = _interopRequireDefault(_Chamado);

class ChamadoController {
  async store(req, res) {
    try{
      const chamado = await _Chamado2.default.create(req.body, req.fields)
      return res.status(200).json({result: chamado})
    }catch(err){
      console.log(err)
      return res.status(400).json({
          result: null,
          error: "Erro ao criar o Chamado"
      });
    }
  };

  async index(req, res){
    try{
      const rules = {...req.fields, ...req.filter}
      const chamados = await _Chamado2.default.findAll(rules);
      return res.status(200).json({result: chamados});
    }catch(err){
      console.log(err)
      return res.status(400).json({
        result: null,
        error: "Erro ao buscar os Chamados"
      });
    };
  };

  async show(req, res){
    try{
      const id = req.params.id;
      if (!id){
        return res.status(404).json({
          result: null,
          error: "Chamado não encontrado"
        });
      };
      const chamado = await _Chamado2.default.findByPk(id, req.fields);

      return res.status(200).json({result: chamado});
    }catch(err){
      return res.status(404).json({
        result: null,
        error: "Erro ao buscar o chamado"
      });
    };
  };

  async update(req, res){
    try{

      const id = req.params.id;
      
      if (!id){
        return res.status(404).json({
          result: null,
          error: "ID não encontrado"
        })
      };

      const chamado = await _Chamado2.default.findByPk(id, req.fields);

      if (!chamado){
        return res.status(404).json({
          result: null,
          error: "Chamado não exite"
        })
      };
      const result = await chamado.update(req.body);
      return res.status(200).json({result: result});
    }catch(err){
      console.log(err)
      return res.status(400).json({
        result: null,
        error: "Erro ao atualizar o chamado"
      });
    };
  };

  async delete(req, res){
    try{

      const id = req.params.id;
      
      if (!id){
        return res.status(404).json({
          result: null,
          error: "ID não encontrado"
        });
      };
      const chamado = await _Chamado2.default.findByPk(id, req.fields);

      if (!chamado){
        return res.status(404).json({
          result: null,
          error: "Chamado não encontrado"
        });
      };

      await chamado.destroy();

      return res.status(200).json({result: chamado});
    }catch(err){
      return res.status(400).json({
        result: null,
        error: "Erro ao buscar o Chamado"
      });
    };
  };
};

exports. default = new ChamadoController();
