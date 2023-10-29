import multer from 'multer';
import multerConfig from '../config/multerConfig';
import fs from 'fs';
import Arquivo from '../models/Arquivo';
import * as stream from "stream";
import { promisify } from 'util';

const upload = multer(multerConfig).single('file');

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

                const arquivo = await Arquivo.create({
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
  
          const arquivo = await Arquivo.findOne({
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
  
          const file = fs.createReadStream(`./uploads/arquivos/${arquivo.filename}`);
  
          res.setHeader('Content-Disposition', `attachment; filename="${arquivo.originalname}"`);
          
          const finished = promisify(stream.finished);
          
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
            const arquvios = await Arquivo.findAll(rules);
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
    
          const arquivo = await Arquivo.findByPk(id, req.fields);
    
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
          const arquivo = await Arquivo.findByPk(id, req.fields);
    
          if (!arquivo){
            return res.status(404).json({
              result: null,
              error: "Cargo não registrado"
            });
          };
    
          await arquivo.destroy();

          fs.unlink(`./uploads/arquivos/${arquivo.filename}`, (err)=> {
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

export default new ArquivosController();
