"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');

var _ArquivosController = require('../controllers/ArquivosController'); var _ArquivosController2 = _interopRequireDefault(_ArquivosController);
var _loginriquired = require('../middlewares/loginriquired'); var _loginriquired2 = _interopRequireDefault(_loginriquired);
var _filter = require('../middlewares/filter'); var _filter2 = _interopRequireDefault(_filter);
var _TenantMiddleWare = require('../middlewares/TenantMiddleWare'); var _TenantMiddleWare2 = _interopRequireDefault(_TenantMiddleWare);

const router = new (0, _express.Router)();

router.post('/arquivo/', _loginriquired2.default, _TenantMiddleWare2.default, _ArquivosController2.default.store);
router.get('/arquivos/', _loginriquired2.default, _filter2.default, _TenantMiddleWare2.default, _ArquivosController2.default.index);
router.post('/download/', _loginriquired2.default, _TenantMiddleWare2.default, _ArquivosController2.default.show);
router.put('/arquivo/:id', _loginriquired2.default, _TenantMiddleWare2.default, _ArquivosController2.default.update);
router.delete('/arquivo/:id', _loginriquired2.default, _TenantMiddleWare2.default, _ArquivosController2.default.delete);

exports. default = router;