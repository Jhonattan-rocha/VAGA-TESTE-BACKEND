"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Cargo = require('../models/Cargo'); var _Cargo2 = _interopRequireDefault(_Cargo);

class CargoContrroller {
  async store(req, res) {
    try{
      const cargo = await _Cargo2.default.create(req.body, req.fields)
      return res.status(200).json({result: cargo})
    }catch(err){
      return res.status(400).json({
          result: null,
          error: "Erro ao criar o cargo"
      });
    }
  };

  async index(req, res){
    try{
      const rules = {...req.fields, ...req.filter}
      const cargo = await _Cargo2.default.findAll(rules);
      return res.status(200).json({result: cargo});
    }catch(err){
      console.log(err)
      return res.status(400).json({
        result: null,
        error: "Erro ao buscar os cargos cadastrados"
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
      const cargo = await _Cargo2.default.findByPk(id, req.fields);

      return res.status(200).json({result: cargo});
    }catch(err){
      return res.status(400).json({
        result: null,
        error: "Erro ao buscar os cargos cadastrados"
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

      const cargo = await _Cargo2.default.findByPk(id, req.fields);

      if (!cargo){
        return res.status(404).json({
          result: null,
          error: "Cargo não registrado"
        });
      };

      const result = await cargo.update(req.body);

      return res.status(200).json({result: result});
    }catch(err){
      return res.status(400).json({
        result: null,
        error: "Erro ao buscar os cargos cadastrados"
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
      const cargo = await _Cargo2.default.findByPk(id, req.fields);

      if (!cargo){
        return res.status(404).json({
          result: null,
          error: "Cargo não registrado"
        });
      };

      await cargo.destroy();

      return res.status(200).json({result: cargo});
    }catch(err){
      return res.status(400).json({
        result: null,
        error: "Erro ao buscar o cargo registrado"
      });
    };
  };
};

exports. default = new CargoContrroller();
