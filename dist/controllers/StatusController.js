"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Status = require('../models/Status'); var _Status2 = _interopRequireDefault(_Status);

class StatusController {
  async store(req, res) {
    try{
      console.log(req.dbConnection)
      const status = await _Status2.default.create(req.body, req.fields)
      return res.status(200).json({result: status})
    }catch(err){
      console.log(err)
      return res.status(400).json({
          result: null,
          error: "Erro ao criar o status"
      });
    }
  };

  async index(req, res){
    try{
      const rules = {...req.fields, ...req.filter}
      const status = await _Status2.default.findAll(rules);
      return res.status(200).json({result: status});
    }catch(err){
      console.log(err)
      return res.status(400).json({
        result: null,
        error: "Erro ao buscar os status cadastrados"
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
      const status = await _Status2.default.findByPk(id, req.fields);

      return res.status(200).json({result: status});
    }catch(err){
      return res.status(400).json({
        result: null,
        error: "Erro ao buscar os status cadastrados"
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

      const status = await _Status2.default.findByPk(id, req.fields);

      if (!status){
        return res.status(404).json({
          result: null,
          error: "Setor não encontrado"
        })
      };

      const result = await status.update(req.body);

      return res.status(200).json({result: result});
    }catch(err){
      return res.status(400).json({
        result: null,
        error: "Erro ao buscar os status cadastrados"
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
      const status = await _Status2.default.findByPk(id, req.fields);

      if (!status){
        return res.status(200).json({
          result: null,
          error: "Status não encontrado"
        });
      };

      await status.destroy();

      return res.status(200).json({result: status});
    }catch(err){
      return res.status(400).json({
        result: null,
        error: "Erro ao buscar o status"
      });
    };
  };
};

exports. default = new StatusController();
