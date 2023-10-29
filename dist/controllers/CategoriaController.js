"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Categoria = require('../models/Categoria'); var _Categoria2 = _interopRequireDefault(_Categoria);

class CategoriaContrroller {
  async store(req, res) {
    try{
      const categoria = await _Categoria2.default.create(req.body, req.fields)
      return res.status(200).json({result: categoria})
    }catch(err){
      console.log(err)
      return res.status(400).json({
          result: null,
          error: "Erro ao criar a categoria"
      });
    }
  };

  async index(req, res){
    try{
      const rules = {...req.fields, ...req.filter}
      const categorias = await _Categoria2.default.findAll(rules);
      return res.status(200).json({result: categorias});
    }catch(err){
      console.log(err)
      return res.status(400).json({
        result: null,
        error: "Erro ao buscar as categorias cadastradas"
      });
    };
  };

  async show(req, res){
    try{
      const id = req.params.id;
      if (!id){
        return res.status(404).json({
          result: null,
          error: "ID não encontrado ou inválido"
        });
      };
      const categoria = await _Categoria2.default.findByPk(id, req.fields);

      return res.status(200).json({result: categoria});
    }catch(err){
      return res.status(400).json({
        result: null,
        error: "Erro ao buscar as categorias cadastradas"
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

      const categoria = await _Categoria2.default.findByPk(id, req.fields);

      if (!categoria){
        return res.status(404).json({
          result: null,
          error: "Categoria não registrada"
        });
      };

      const result = await categoria.update(req.body);

      return res.status(200).json({result: result});
    }catch(err){
      return res.status(400).json({
        result: null,
        error: "Erro ao buscar as categorias cadastradas"
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
      const categoria = await _Categoria2.default.findByPk(id, req.fields);

      if (!categoria){
        return res.status(404).json({
          result: null,
          error: "Categoria não registrada"
        });
      };

      await categoria.destroy();

      return res.status(200).json({result: categoria});
    }catch(err){
      return res.status(400).json({
        result: null,
        error: "Erro ao buscar a categoria registrada"
      });
    };
  };
};

exports. default = new CategoriaContrroller();
