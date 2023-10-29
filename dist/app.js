"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _funcionarioRoutes = require('./routes/funcionarioRoutes'); var _funcionarioRoutes2 = _interopRequireDefault(_funcionarioRoutes);
var _chamadoRoutes = require('./routes/chamadoRoutes'); var _chamadoRoutes2 = _interopRequireDefault(_chamadoRoutes);
var _tokenRoutes = require('./routes/tokenRoutes'); var _tokenRoutes2 = _interopRequireDefault(_tokenRoutes);
var _empresaRoutes = require('./routes/empresaRoutes'); var _empresaRoutes2 = _interopRequireDefault(_empresaRoutes);
var _filialRoutes = require('./routes/filialRoutes'); var _filialRoutes2 = _interopRequireDefault(_filialRoutes);
var _arquivosRoutes = require('./routes/arquivosRoutes'); var _arquivosRoutes2 = _interopRequireDefault(_arquivosRoutes);
var _perfilRoutes = require('./routes/perfilRoutes'); var _perfilRoutes2 = _interopRequireDefault(_perfilRoutes);
var _setorRouter = require('./routes/setorRouter'); var _setorRouter2 = _interopRequireDefault(_setorRouter);
var _categoriaRouter = require('./routes/categoriaRouter'); var _categoriaRouter2 = _interopRequireDefault(_categoriaRouter);
var _subcategoriaRouter = require('./routes/subcategoriaRouter'); var _subcategoriaRouter2 = _interopRequireDefault(_subcategoriaRouter);
var _comentarioRouter = require('./routes/comentarioRouter'); var _comentarioRouter2 = _interopRequireDefault(_comentarioRouter);
var _toolsRoutes = require('./routes/toolsRoutes'); var _toolsRoutes2 = _interopRequireDefault(_toolsRoutes);
var _statusRotes = require('./routes/statusRotes'); var _statusRotes2 = _interopRequireDefault(_statusRotes);
var _cargoRouter = require('./routes/cargoRouter'); var _cargoRouter2 = _interopRequireDefault(_cargoRouter);

var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _cors = require('cors'); var _cors2 = _interopRequireDefault(_cors);
var _helmet = require('helmet'); var _helmet2 = _interopRequireDefault(_helmet);
var _path = require('path'); var _path2 = _interopRequireDefault(_path);


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
    this.app = _express2.default.call(void 0, );
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(_helmet2.default.call(void 0, ));
    this.app.use(_cors2.default.call(void 0, corsops));  
    this.app.use(_express2.default.urlencoded({ extended: true, limit: "50mb" }));
    this.app.use(_express2.default.json());
    this.app.use(_express2.default.static(_path2.default.resolve(__dirname, '..', 'uploads')));
    // this.app.use('/images/', express.static(resolve(__dirname, '..', 'uploads', 'images')));
  }

  routes() {
    this.app.use(_funcionarioRoutes2.default);
    this.app.use(_chamadoRoutes2.default);
    this.app.use(_tokenRoutes2.default);
    this.app.use(_empresaRoutes2.default);
    this.app.use(_filialRoutes2.default);
    this.app.use(_arquivosRoutes2.default);
    this.app.use(_perfilRoutes2.default);
    this.app.use(_setorRouter2.default);
    this.app.use(_categoriaRouter2.default);
    this.app.use(_subcategoriaRouter2.default);
    this.app.use(_comentarioRouter2.default);
    this.app.use(_statusRotes2.default);
    this.app.use(_toolsRoutes2.default);
    this.app.use(_cargoRouter2.default);
  }

}

exports. default = new App().app;
