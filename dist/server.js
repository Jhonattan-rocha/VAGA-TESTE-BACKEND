"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _app = require('./app'); var _app2 = _interopRequireDefault(_app);
var _appConfig = require('./config/appConfig'); var _appConfig2 = _interopRequireDefault(_appConfig);
var _Index = require('./database/Index');
var _Auth = require('./models/Auth'); var _Auth2 = _interopRequireDefault(_Auth);
var _TenantLoader = require('./services/TenantLoader');

// import fs from 'fs';
// import https from 'https';

// const privateKey = fs.readFileSync('C:\\Users\\Jhinattan Rocha\\Documents\\Trabalho\\chave-privada.pem', 'utf8');
// const certificate = fs.readFileSync('C:\\Users\\Jhinattan Rocha\\Documents\\Trabalho\\certificado.pem', 'utf8');
// const credentials = { key: privateKey, cert: certificate };

// const server = https.createServer(credentials, app);

_app2.default.listen(_appConfig2.default.PORT, _appConfig2.default.IP, async ()=>{
    // para funcionar no emulador android, precisa ser essa url http://10.0.2.2:3000/
    console.log(`rodando na url http://${_appConfig2.default.IP}:${_appConfig2.default.PORT}/`);

    const con = _TenantLoader.GetConnection.call(void 0, 'auth');
    if(!con){
        await _Index.InitTenantAuth.call(void 0, 'auth', true);
    }else{
        _Auth2.default.init(con);
    }
})
