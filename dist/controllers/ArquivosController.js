"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);
var _multerConfig = require('../config/multerConfig'); var _multerConfig2 = _interopRequireDefault(_multerConfig);
var _fs = require('fs'); var _fs2 = _interopRequireDefault(_fs);
var _Arquivo = require('../models/Arquivo'); var _Arquivo2 = _interopRequireDefault(_Arquivo);
var _stream = require('stream'); var stream = _interopRequireWildcard(_stream);
var _util = require('util');

const upload = _multer2.default.call(void 0, _multerConfig2.default).single('file');

class ArquivosController{
    async store(req, res){
        //req.file é onde fica os dados do arquivo
        return upload(req, res, async (err) => {
            if(err){
              console.log(err)
                return res.status(401).json({
                    errors: [err],
                });
            }
 
            try{
                const {originalname, filename, mimetype} = req.file;
                const {id_dono, id_chamado} = req.body;

                const arquivo = await _Arquivo2.default.create({
                    originalname: originalname,
                    filename: filename,
                    id_dono: id_dono,

                    mime_type: mimetype,
                    id_chamado: id_chamado,
                });

                return res.status(200).json(arquivo);
            }catch(err){
                console.log(err)
                return res.status(404).json({  
                    error: ['Empresa não exite'],
                });
            }
        });
    }

    async show(req, res, next) {
      try {

          const { originalname, filename } = req.body;
  
          const arquivo = await _Arquivo2.default.findOne({
              where: {
                  filename: filename,
                  originalname: originalname
              }
          });
  
          if (!arquivo) {
              return res.status(404).json({
                  error: ['Arquivo não encontrado'],
              });
          }
  
          const file = _fs2.default.createReadStream(`./uploads/arquivos/${arquivo.filename}`);
  
          res.setHeader('Content-Disposition', `attachment; filename="${arquivo.originalname}"`);
          
          const finished = _util.promisify.call(void 0, stream.finished);
          
          file.pipe(res);
  
          await finished(file);
  
          console.log('Download concluído com sucesso');
          } catch (err) {
              console.log(err);
              return res.status(500).json({
                  error: ['Ocorreu um erro no servidor'],
              });
          }
      }
  

    async index(req, res){
        try{
            const rules = {...req.fields, ...req.filter}
            const arquvios = await _Arquivo2.default.findAll(rules);
            console.log(rules, arquvios)
            return res.status(200).json({result: arquvios});
        }catch(err){
            console.log(err)
            return res.status(400).json({
            result: null,
            error: "Erro ao buscar os arquivos"
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
    
          const arquivo = await _Arquivo2.default.findByPk(id, req.fields);
    
          if (!arquivo){
            return res.status(404).json({
              result: null,
              error: "Cargo não registrado"
            });
          };
    
          const result = await arquivo.update(req.body);
    
          return res.status(200).json({result: result});
        }catch(err){
          return res.status(400).json({
            result: null,
            error: "Erro ao buscar os arquivos"
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
          const arquivo = await _Arquivo2.default.findByPk(id, req.fields);
    
          if (!arquivo){
            return res.status(404).json({
              result: null,
              error: "Cargo não registrado"
            });
          };
    
          await arquivo.destroy();

          _fs2.default.unlink(`./uploads/arquivos/${arquivo.filename}`, (err)=> {
            console.log(err)
          })
    
          return res.status(200).json({result: arquivo});
        }catch(err){
          return res.status(400).json({
            result: null,
            error: "Erro ao buscar o arquivo"
          });
        };
      };
}

exports. default = new ArquivosController();
