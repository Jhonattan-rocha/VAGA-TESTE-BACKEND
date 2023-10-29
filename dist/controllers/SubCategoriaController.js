"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _SubCategoria = require('../models/SubCategoria'); var _SubCategoria2 = _interopRequireDefault(_SubCategoria);

class SubCategoriaContrroller {
  async store(req, res) {
    try{
      const subcategoria = await _SubCategoria2.default.create(req.body, req.fields)
      return res.status(200).json({result: subcategoria})
    }catch(err){
      return res.status(400).json({
          result: null,
          error: "Erro ao criar a subcategoria"
      });
    }
  };

  async index(req, res){
    try{
      const rules = {...req.fields, ...req.filter}
      const subcategoria = await _SubCategoria2.default.findAll(rules);
      return res.status(200).json({result: subcategoria});
    }catch(err){
      console.log(err)
      return res.status(400).json({
        result: null,
        error: "Erro ao buscar as subcategorias cadastradas"
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
      const subcategoria = await _SubCategoria2.default.findByPk(id, req.fields);

      return res.status(200).json({result: subcategoria});
    }catch(err){
      return res.status(400).json({
        result: null,
        error: "Erro ao buscar as subcategorias cadastradas"
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

      const subcategoria = await _SubCategoria2.default.findByPk(id, req.fields);

      if (!subcategoria){
        return res.status(404).json({
          result: null,
          error: "SubCategoria não registrada"
        });
      };

      const result = await subcategoria.update(req.body);

      return res.status(200).json({result: result});
    }catch(err){
      return res.status(400).json({
        result: null,
        error: "Erro ao buscar as subcategorias cadastradas"
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
      const subcategoria = await _SubCategoria2.default.findByPk(id, req.fields);

      if (!subcategoria){
        return res.status(404).json({
          result: null,
          error: "SubCategoria não registrada"
        });
      };

      await subcategoria.destroy();

      return res.status(200).json({result: subcategoria});
    }catch(err){
      return res.status(400).json({
        result: null,
        error: "Erro ao buscar a subcategoria registrada"
      });
    };
  };
};

exports. default = new SubCategoriaContrroller();
