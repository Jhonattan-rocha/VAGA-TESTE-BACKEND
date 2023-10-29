"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Setores = require('../models/Setores'); var _Setores2 = _interopRequireDefault(_Setores);

class SetorController {
  async store(req, res) {
    try{

      const setor = await _Setores2.default.create(req.body, req.fields)
      return res.status(200).json({result: setor})
    }catch(err){
      console.log(err)
      return res.status(400).json({
          result: null,
          error: "Erro ao criar o Setor"
      });
    }
  };

  async index(req, res){
    try{
      const rules = {...req.fields, ...req.filter}
      const setor = await _Setores2.default.findAll(rules);
      return res.status(200).json({result: setor});
    }catch(err){
      console.log(err)
      return res.status(400).json({
        result: null,
        error: "Erro ao buscar os setores cadastrados"
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
      const setor = await _Setores2.default.findByPk(id, req.fields);

      return res.status(200).json({result: setor});
    }catch(err){
      return res.status(400).json({
        result: null,
        error: "Erro ao buscar os setores cadastrados"
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

      const setor = await _Setores2.default.findByPk(id, req.fields);

      if (!setor){
        return res.status(404).json({
          result: null,
          error: "Setor não encontrado"
        })
      };

      const result = await setor.update(req.body);

      return res.status(200).json({result: result});
    }catch(err){
      return res.status(400).json({
        result: null,
        error: "Erro ao buscar os setores cadastrados"
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
      const setor = await _Setores2.default.findByPk(id, req.fields);

      if (!setor){
        return res.status(200).json({
          result: null,
          error: "Setor não encontrado"
        });
      };

      await setor.destroy();

      return res.status(200).json({result: setor});
    }catch(err){
      return res.status(400).json({
        result: null,
        error: "Erro ao buscar o setor"
      });
    };
  };
};

exports. default = new SetorController();
