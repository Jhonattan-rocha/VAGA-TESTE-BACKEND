import funcionarioRouter from './routes/funcionarioRoutes';
import chamadoRouter from "./routes/chamadoRoutes";
import tokenRouter from './routes/tokenRoutes';
import empresaRouter from './routes/empresaRoutes';
import filialRouter from './routes/filialRoutes';
import arquivosRouter from './routes/arquivosRoutes';
import perfilRouter from './routes/perfilRoutes';
import setorRouter from './routes/setorRouter';
import categoriaRouter from './routes/categoriaRouter';
import subcategoriaRouter from './routes/subcategoriaRouter';
import comentarioRouter from './routes/comentarioRouter';
import toolsRouter from './routes/toolsRoutes';
import statusRouter from './routes/statusRotes';
import cargoRouter from './routes/cargoRouter';

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';


require('dotenv').config()

const whitelist = [
  'http://localhost:3000'
]

const corsops = {
  origin: function (origin, callback){
      if (whitelist.indexOf(origin) !== -1 || !origin){
        callback(null, true);
      } else{
        callback(new Error('Not allowed by CORS'));
      }
  }
};

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(helmet());
    this.app.use(cors(corsops));  
    this.app.use(express.urlencoded({ extended: true, limit: "50mb" }));
    this.app.use(express.json());
    this.app.use(express.static(path.resolve(__dirname, '..', 'uploads')));
    // this.app.use('/images/', express.static(resolve(__dirname, '..', 'uploads', 'images')));
  }

  routes() {
    this.app.use(funcionarioRouter);
    this.app.use(chamadoRouter);
    this.app.use(tokenRouter);
    this.app.use(empresaRouter);
    this.app.use(filialRouter);
    this.app.use(arquivosRouter);
    this.app.use(perfilRouter);
    this.app.use(setorRouter);
    this.app.use(categoriaRouter);
    this.app.use(subcategoriaRouter);
    this.app.use(comentarioRouter);
    this.app.use(statusRouter);
    this.app.use(toolsRouter);
    this.app.use(cargoRouter);
  }

}

export default new App().app;
