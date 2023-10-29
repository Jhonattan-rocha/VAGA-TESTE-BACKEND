"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _ChamadoController = require('../controllers/ChamadoController'); var _ChamadoController2 = _interopRequireDefault(_ChamadoController);
var _loginriquired = require('../middlewares/loginriquired'); var _loginriquired2 = _interopRequireDefault(_loginriquired);
var _getAtributes = require('../middlewares/getAtributes'); var _getAtributes2 = _interopRequireDefault(_getAtributes);
var _filter = require('../middlewares/filter'); var _filter2 = _interopRequireDefault(_filter);
var _TenantMiddleWare = require('../middlewares/TenantMiddleWare'); var _TenantMiddleWare2 = _interopRequireDefault(_TenantMiddleWare);

const router = new (0, _express.Router)();

router.post('/chamado/', _loginriquired2.default, _TenantMiddleWare2.default, _ChamadoController2.default.store);
router.get("/chamados/", _loginriquired2.default, _getAtributes2.default, _filter2.default, _TenantMiddleWare2.default, _ChamadoController2.default.index);
router.get("/chamado/:id", _loginriquired2.default, _getAtributes2.default, _TenantMiddleWare2.default, _ChamadoController2.default.show);
router.put('/chamado/:id', _loginriquired2.default, _getAtributes2.default, _TenantMiddleWare2.default, _ChamadoController2.default.update);
router.delete('/chamado/:id', _loginriquired2.default, _getAtributes2.default, _TenantMiddleWare2.default, _ChamadoController2.default.delete);

exports. default = router;
