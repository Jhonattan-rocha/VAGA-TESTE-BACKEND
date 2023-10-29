"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _empresaRoutes = require('./routes/empresaRoutes'); var _empresaRoutes2 = _interopRequireDefault(_empresaRoutes);
var _tokenRoutes = require('./routes/tokenRoutes'); var _tokenRoutes2 = _interopRequireDefault(_tokenRoutes);
var _arquivosRoutes = require('./routes/arquivosRoutes'); var _arquivosRoutes2 = _interopRequireDefault(_arquivosRoutes);

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
    this.app.use(_empresaRoutes2.default);
    this.app.use(_tokenRoutes2.default);
    this.app.use(_arquivosRoutes2.default);
  }

}

exports. default = new App().app;
